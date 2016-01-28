var stream = require('stream')
var concat = require('concat-stream')
var assign = require('object-assign')
var sourceMapURL = require("source-map-url")
var createFilter = require('rollup-pluginutils').createFilter

function parseSourceMap(code) {
  var map = sourceMapURL.getFrom(code)
  try {
    return JSON.parse(new Buffer(map.split(',', 2)[1], "base64").toString())
  } catch(error) {
    return { mappings: '' }
  }
}

function extract(code) {
  if (sourceMapURL.existsIn(code)) {
    var map = sourceMapURL.getFrom(code)
    return {
      code: sourceMapURL.removeFrom(code),
      map: parseSourceMap(code)
    }
  } else {
    return {
      code: code,
      map: { mappings: '' }
    }
  }
}

module.exports = function browserifyTransform(transform, options) {
  options = assign({}, options, { _flags: { debug: true }})
  var filter = createFilter(options.include, options.exclude)

  return {
    transform: function(code, id) {
      if (!filter(id)) return null

      return new Promise(function(resolve, reject) {
        var stream = transform(id, options)
        stream.pipe(concat(function(output) {
          resolve(extract(output.toString('utf-8')))
        }))

        stream.on('error', reject)
        stream.write(code)
        stream.end()
      })
    }
  }
}

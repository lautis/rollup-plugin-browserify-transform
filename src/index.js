import concat from 'concat-stream'
import assign from 'object-assign'
import sourceMapURL from 'source-map-url'
import { createFilter } from 'rollup-pluginutils'

function parseSourceMap(code) {
  const map = sourceMapURL.getFrom(code)
  try {
    return JSON.parse(new Buffer(map.split(',', 2)[1], 'base64').toString())
  } catch(error) {
    return { mappings: '' }
  }
}

function extract(code) {
  if (sourceMapURL.existsIn(code)) {
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

export default function browserifyTransform(plugin, options = {}) {
  const browserifyOptions = assign({ _flags: { debug: true } }, options)
  const filter = createFilter(browserifyOptions.include, browserifyOptions.exclude)

  return {
    transform(code, id) {
      if (!filter(id)) return null

      return new Promise(function(resolve, reject) {
        const stream = plugin(id, browserifyOptions)
        stream.pipe(concat((output) => resolve(extract(output.toString('utf-8')))))
        stream.on('error', reject)
        stream.write(code)
        stream.end()
      })
    }
  }
}

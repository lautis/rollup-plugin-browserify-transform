import assert from 'assert'
import rollup from 'rollup'
import browserifyPlugin from '..'
import brfs from 'brfs'
import coffeeify from 'coffeeify'
import fs from 'fs'

process.chdir(__dirname)

describe('rollup-plugin-browserify-transform', () => {
  xit('transforms code with browserify transform', () => {
    const entry = 'sample/main.js'

    return rollup.rollup({
      entry: entry,
      plugins: [browserifyPlugin(brfs, {})]
    }).then((bundle) =>{
      const generated = bundle.generate()
      assert(generated.code.trim().includes('<b>beep boop</b>'))
    })
  })

  it('supports transforms with source maps', () => {
    const entry = 'sample/test.coffee'
    const source = fs.readFileSync(entry).toString()
    return rollup.rollup({
      entry: entry,
      plugins: [browserifyPlugin(coffeeify, {})]
    }).then((bundle) => {
      const generated = bundle.generate({ sourceMap: true })
      assert.equal(generated.map.sourcesContent[0], source)
    })
  })
})

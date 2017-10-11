import assert from 'assert'
import {rollup} from 'rollup'
import browserifyPlugin from '../src'
import brfs from 'brfs'
import coffeeify from 'coffeeify'
import fs from 'fs'

process.chdir(__dirname)

describe('rollup-plugin-browserify-transform', () => {
  it('transforms code with browserify transform', () => {
    const entry = 'sample/main.js'

    return rollup({
      input: entry,
      plugins: [browserifyPlugin(brfs, {})]
    })
      .then((bundle) => bundle.generate({ format: 'umd'}))
      .then((generated) => assert(generated.code.trim().includes('<b>beep boop</b>')))
  })

  it('supports transforms with source maps', () => {
    const entry = 'sample/test.coffee'
    const source = fs.readFileSync(entry).toString()
    return rollup({
      input: entry,
      plugins: [browserifyPlugin(coffeeify, {})]
    })
      .then((bundle) => bundle.generate({ format: 'cjs', sourcemap: true }))
      .then((generated) => assert.equal(generated.map.sourcesContent[0], source))
  })
})

var browserify = require('../../index')
import brfs from 'brfs'

export default {
  entry: 'main.js',
  format: 'cjs',
  dest: 'bundle.js',
  plugins: [browserify(brfs)]
}

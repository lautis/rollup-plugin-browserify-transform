import browserify from '../../dist/rollup-browserify-transform.es6'
import brfs from 'brfs'

export default {
  entry: 'main.js',
  format: 'cjs',
  dest: 'bundle.js',
  plugins: [browserify(brfs)]
}

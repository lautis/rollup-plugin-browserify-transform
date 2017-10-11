import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  plugins: [babel()],
  external: ['concat-stream', 'object-assign', 'source-map-url', 'rollup-pluginutils'] 
}

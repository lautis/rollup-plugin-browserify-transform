# rollup-plugin-browserify-transform
[![Build Status](https://travis-ci.org/lautis/rollup-plugin-browserify-transform.svg?branch=master)](https://travis-ci.org/lautis/rollup-plugin-browserify-transform)

Use any Browserify transform with Rollup.

## Why?

There isn't an equivalent for every Browserify transform as Rollup plugin.

## Installation

```bash
npm install --save-dev rollup-plugin-browserify-transform
```

## Usage

```js
// rollup.config.js
import browserifyPlugin from 'rollup-plugin-browserify-transform'
import brfs from 'brfs'

export default {
  entry: 'main.coffee',

  plugins: [
    browserifyPlugin(brfs)
  ]
}
```

Browserify transform plugin accepts `options.include` and `options.exclude`
(each a minimatch pattern, or an array of minimatch patterns) to determine which
files are handled by the Browserify transform. By default, all files are
transpiled.

You can give Browserify transform options through a second argument.

```js
// rollup.config.js
import browserifyPlugin from 'rollup-plugin-browserify-transform'
import coffeeify from 'coffeeify'

export default {
  entry: 'main.coffee',

  plugins: [
    browserifyPlugin(coffeeify, { bare: true })
  ]
}
```

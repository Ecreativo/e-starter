import { paths } from '../paths.js'
import { loaders } from './loaders'
import { plugins } from './plugins'
import merge from 'webpack-merge'

console.log(
  `Running webpack in the ${paths.env} mode`
)

let webpackConfig = {
  context: `${paths.SRC}/`,
  entry: {
    main: [
      './assets/javascripts/application.js',
      './assets/javascripts/bootstrap.js'
    ]
  },
  output: {
    filename: `${paths.static}/js/[name]${paths.MIN}.js`,
    path: paths.OUT_PATH,
    publicPath: '/'
  },
  module: {
    rules: [
      loaders.CSSLoader,
      loaders.SCSSLoader,
      loaders.PUGLoader,
      loaders.JSLoader,
      loaders.ESLintLoader
    ]
  },
  resolve: {
    alias: {
      '@assets': paths.assets,
      '@': paths.SRC
    }
  },
  plugins: [
    plugins.ExtractText,
    plugins.Notifier,
    plugins.Provide
  ]
}

if (!paths.IS_WP) {
  webpackConfig = merge.smart(webpackConfig, {
    plugins: [
      plugins.HTML
    ]
  })
}

module.exports = { webpackConfig }

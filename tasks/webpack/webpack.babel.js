import { paths } from '../paths.js'
import { plugins } from './plugins'
import { loaders } from './loaders'
import { webpackConfig as common } from './webpack.common.js'
import merge from 'webpack-merge'

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'none',
  // devtool: 'inline-source-map',
  devtool: 'eval',
  devServer: {
    contentBase: paths.OUT_PATH,
    overlay: true,
    port: 8079
  },
  module: {
    rules: [
      loaders.FontsDev,
      loaders.ImagesDev
    ]
  },
  plugins: [
    plugins.Dashboard,
    plugins.HtmlWebpackHarddisk,
    plugins.BrowserSync
  ]
})

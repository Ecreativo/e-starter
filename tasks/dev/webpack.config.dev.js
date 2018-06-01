import merge from 'webpack-merge'
import common from '../webpack.js'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'

export let config = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // devtool: 'eval',
  plugins: [
    // Show Dashboard
    new DashboardPlugin(),
    new HtmlWebpackHarddiskPlugin()
  ]
})

module.exports = { config }

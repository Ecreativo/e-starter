import path from 'path'
import merge from 'webpack-merge'
import { webpackConfig as common } from '../webpack.js'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'none',
  // devtool: 'inline-source-map',
  devtool: 'eval',
  devServer: {
    // publicPath:
    contentBase: path.join(__dirname, '../../public_html'),
    overlay: true,
    port: 8079
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico|cur|svg|)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Show Dashboard
    new DashboardPlugin(),
    new HtmlWebpackHarddiskPlugin(),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        host: 'localhost',
        port: 8080,
        // proxy the Webpack Dev Server endpoint
        // through BrowserSync
        proxy: 'http://localhost:8079/'
        // injectChanges: true
        // files: path.join(__dirname, '../../src/**/*'),
        // files: [{
        //     match: [
        //         '**/*.hbs'
        //     ],
        //     fn: function(event, file) {
        //         if (event === "change") {
        //             const bs = require('browser-sync').get('bs-webpack-plugin');
        //             bs.reload();
        //         }
        //     }
        // }]
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
        // injectCss: true
      }
    )
  ]
})

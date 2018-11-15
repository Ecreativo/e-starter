import path from 'path'
import webpack from 'webpack'

import merge from 'webpack-merge'
import { webpackConfig as common } from '../webpack.js'
import DashboardPlugin from 'webpack-dashboard/plugin'

// import HtmlCriticalPlugin from 'html-critical-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'

const isEnv = process.env.NODE_ENV
const isWp = (isEnv === 'wp')

let config = merge(common, {
  mode: 'production',
  devtool: 'none',
  // devtool: 'source-map',
  module: {
    rules: [
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-url-loader',
      //   options: {
      //     // Inline files smaller than 10 kB (10240 bytes)
      //     limit: 10 * 1024,
      //     // Remove the quotes from the url
      //     // (they’re unnecessary in most cases)
      //     // noquotes: true
      //     name: 'static/images/[name].[ext]', // Output below ./fonts
      //     publicPath: '../../' // Take the directory into account
      //   }
      // },
      // {
      //   test: /\.(png|jpe?g|gif|ico|cur)$/,
      //   loader: 'url-loader',
      //   options: {
      //     // Inline files smaller than 10 kB (10240 bytes)
      //     limit: 10 * 1024,
      //     name: 'static/images/[name].[ext]', // Output below ./fonts
      //     publicPath: '../../' // Take the directory into account
      //   }
      // }
    ]
  },
  optimization: {
    nodeEnv: 'production',
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/, // you may add 'vendor.js' here if you want to
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        },
        css: {
          test: /\.(css|sass|scss)$/,
          name: 'styles',
          chunks: 'all',
          // enforce: true,
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new DashboardPlugin(),
    // Make module IDs more stable
    new webpack.HashedModuleIdsPlugin(),
    // Concatenate modules where possible
    // https://developers.google.com/web/fundamentals/performance/webpack/decrease-frontend-size#enable_module_concatenation_for_es_modules_aka_scope_hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})

if (!isWp) {
  config = merge.smart(config, {
    plugins: [
      // new HtmlCriticalPlugin({
      //   base: path.resolve(__dirname, '../../public_html'),
      //   src: 'index.html',
      //   dest: 'index.html',
      //   inline: true,
      //   minify: true,
      //   extract: true,
      //   width: 1200,
      //   height: 600,
      //   penthouse: {
      //     blockJSRequests: false
      //   }
      // }),
      new FaviconsWebpackPlugin({
        // Your source logo
        logo: path.resolve(__dirname, '../../src/assets/images/brand/logo.png'),
        // The prefix for all image files (might be a folder or a name)
        prefix: 'static/images/icons/',
        // Emit all stats of the generated icons
        emitStats: false,
        // Generate a cache file with control hashes and
        // don't rebuild the favicons until those hashes change
        persistentCache: true,
        // Inject the html into the html-webpack-plugin
        inject: true,
        // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
        background: '#fff',
        // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
        title: 'e-starter-kit',
        // which icons should be generated (https://github.com/haydenbleasel/favicons#usage)
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      })
    ]
  })
}

module.exports = { config }

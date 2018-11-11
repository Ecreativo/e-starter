import path from 'path'
import webpack from 'webpack'

import merge from 'webpack-merge'
import { webpackConfig as common } from '../webpack.js'

// import HtmlCriticalPlugin from 'html-critical-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'

const isWp = (process.env.WP === 'true')

let config = merge(common, {
  mode: 'production',
  devtool: 'none',
  // devtool: 'source-map',
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
    // Make module IDs more stable
    new webpack.HashedModuleIdsPlugin(),
    // Concatenate modules where possible
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

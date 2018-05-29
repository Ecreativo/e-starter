import path from 'path'
import webpack from 'webpack'

import merge from 'webpack-merge'
import common from '../webpack.js'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'

export let config = merge(common, {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        ecma: 8,
        warnings: false,
        compress: true
      }
    }),
    // Make module IDs more stable
    new webpack.HashedModuleIdsPlugin(),
    // Concatenate modules where possible
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: path.resolve(__dirname, '../../src/_assets/images/brand/logo.png'),
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
    }),
    // Replace `process.env.NODE_ENV` with `"production"`
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
module.exports = { config }

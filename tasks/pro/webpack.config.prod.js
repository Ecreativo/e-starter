import webpack from 'webpack'
import process from 'process'

import merge from 'webpack-merge'
import common from '../webpack.js'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

export let config = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common'
    // }),
    // Make module IDs more stable
    new webpack.HashedModuleIdsPlugin(),
    // Concatenate modules where possible
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Replace `process.env.NODE_ENV` with `"production"`
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
module.exports = { config }

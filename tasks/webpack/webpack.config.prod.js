import { paths } from '../paths.js'
import { loaders } from './loaders'
import { plugins } from './plugins'
import { webpackConfig as common } from './webpack.js'
import webpack from 'webpack'
import merge from 'webpack-merge'

let config = merge(common, {
  mode: 'production',
  devtool: 'none',
  // devtool: 'source-map',
  module: {
    rules: [
      loaders.ImagesPro,
      loaders.FontsPro,
      loaders.SVG
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
    plugins.HashedModuleIds,
    plugins.ModuleConcatenation,
    plugins.BundleAnalyzer
  ]
})

if (!paths.IS_WP) {
  config = merge.smart(config, {
    plugins: [
      plugins.Favicons
    ]
  })
}

export function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if (err) console.log('Webpack', err)
    console.log(stats.toString('errors-only'))
    resolve()
  }))
}

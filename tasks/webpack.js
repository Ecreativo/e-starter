import path from 'path'
import webpack from 'webpack'
import process from 'process'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// to-do
const isProduction = (process.env.NODE_ENV === 'production')

const extractSass = new ExtractTextPlugin({
  filename: 'static/css/main.css',
  allChunks: true
})

console.log(
  `Running webpack in the ${isProduction ? 'production' : 'development'} mode`
)

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    scripts: [
      './_assets/javascripts/application.js',
      './_assets/javascripts/bootstrap.js'
    ]
  },
  output: {
    filename: 'static/js/[name].js',
    path: path.resolve(__dirname, '../src/')
  },
  module: {
    rules: [
      // eslint options
      {
        // This will apply the loader before the other ones
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, '../../src/_assets/javascripts')],
        options: {
          // eslint options (if necessary)
          fix: true
        }
      },
      // compresses images
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre'
      },
      // include pug-loader to process the pug files
      {
        test: /\.pug$/,
        // use: 'pug-loader'
        use: ['html-loader', 'pug-html-loader']
      }, {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      },
      {
        test: /\.(scss)$/,
        use: extractSass.extract({
          fallback: 'style-loader', // inject CSS to page
          use: [{
            // $to-to 4
            loader: 'css-loader',
            options: { sourceMap: true } // translates CSS into CommonJS
          }, {
            loader: 'postcss-loader',
            options: {
              config: { path: __dirname },
              sourceMap: true
            }
          },
          // resolve-url-loader may be chained before sass-loader if necessary
          { loader: 'resolve-url-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: { sourceMap: true } // compiles Sass to CSS
          }]
        })
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          // noquotes: true
        }
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|ico)$/,
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // In case you imported plugins individually, you must also require them here:
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover'
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      inject: false,
      template: './index.pug',
      filename: '../public_html/index.html',
      // chunks: ['common', 'bootstrap', 'chandaportal', 'main'],
      // chunksSortMode: 'manual',
      alwaysWriteToDisk: true
    }),
    extractSass
  ]
}

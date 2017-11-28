const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "static/css/main.css",
});

const isProduction = (process.env.NODE_ENV === 'production');

let config = {
  entry: {
    scripts: [
      './_assets/javascripts/application.js',
      './_assets/javascripts/bootstrap.js',
      'flickity'
    ],
  },
  output: {
    filename: 'static/js/[name].js',
    path: path.resolve(__dirname, 'site/public_html/')
  },
  devtool: "source-map",
  module: {
    rules: [
      // Include pug-loader to process the pug files
      {
        test: /\.pug$/,
        use: 'pug-loader'
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
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [{
              loader: "css-loader",
              options: { sourceMap: true } // translates CSS into CommonJS
            }, {
              loader: 'postcss-loader',
              options: {
                config: { path: __dirname },
                sourceMap: true
              }
            },
            { loader: 'resolve-url-loader', options: { sourceMap: true } },
            {
              loader: "sass-loader",
              options: { sourceMap: true } // compiles Sass to CSS
            }
          ]
        })
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        loader: 'url-loader'
      },
    ]
  },
  context: path.resolve(__dirname, './site/src'),
  plugins: isProduction ? [
    new UglifyJSPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../public_html/index.html',
      template: './index2.pug'
    }),
    extractSass
  ] : [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Flickity: "flickity"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './index.pug',
      filename: '../public_html/index.html'
    }),
    extractSass
  ]
}

//module.exports = { config };

module.exports = config;
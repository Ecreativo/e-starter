const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')

const extractSass = new ExtractTextPlugin({
  filename: "styles.css",
});

module.exports = {
  entry: {
    scripts: [
      './_assets/javascripts/application.js',
      './_assets/javascripts/bootstrap.js',
    ],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  //devtool: "source-map",
  module: {
    rules: [{
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
            loader: "css-loader", options: { sourceMap: true, includeContent: true } // translates CSS into CommonJS
          }, {
            loader: "sass-loader", options: { sourceMap: true, includeContent: true } // compiles Sass to CSS
          }]
        })
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        loader: 'url-loader'
      },
    ]
  },
  context: path.resolve(__dirname, './site.com/src'),
  plugins: [
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
    extractSass
  ]
};
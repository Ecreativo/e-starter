import path from 'path';
import webpack from 'webpack';
import process from 'process';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const extractSass = new ExtractTextPlugin({
  filename: "static/css/main.css",
});

//to-do  
const isProduction = (process.env.NODE_ENV === 'production');

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

export let config = {
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
          use: [{
              //$to-to 4
              loader: "css-loader",
              options: { sourceMap: true } // translates CSS into CommonJS
            }, {
              loader: 'postcss-loader',
              options: {
                config: { path: __dirname },
                sourceMap: true
              }
            },
            //resolve-url-loader may be chained before sass-loader if necessary
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
  //$to-to 2
  plugins: isProduction ? [
    //$to-to 3 
    new UglifyJSPlugin({
      sourceMap: true
    }),
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
      template: './index.pug',
      filename: '../public_html/index.html'
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
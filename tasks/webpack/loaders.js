import { paths } from '../paths.js'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const CSSLoader = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader'
  ]
}

const SCSSLoader = {
  test: /\.(scss)$/,
  use: [
    !paths.IS_PRO ? 'style-loader' : MiniCssExtractPlugin.loader, {
      // $to-to 4
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 2
      } // translates CSS into CommonJS
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
      options: {
        sourceMap: true,
        implementation: require('sass')
      } // compiles Sass to CSS
    }]
}

const PUGLoader = {
  // include pug-loader to process the pug files
  test: /\.pug$/,
  use: 'pug-loader'
}

const JSLoader = {
  test: /\.js$/,
  exclude: file => (
    /node_modules/.test(file) &&
    !/\.vue\.js/.test(file)
  ),
  use: [{
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env', {
            modules: false,
            useBuiltIns: 'entry',
            corejs: 3
          }
        ]
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
          '@babel/plugin-transform-runtime', {
            'regenerator': true
          }
        ]
      ],
      cacheDirectory: true,
      babelrc: false
    }
  }]
}

const ESLintLoader = {
  // eslint options
  // This will apply the loader before the other ones
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  include: [`${paths.assets}/javascripts`],
  options: {
    // eslint options (if necessary)
    fix: true
  }
}

const FontsDev = {
  test: /\.(ttf|eot|woff|woff2)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: `${paths.static}/fonts/[name].[ext]`
      }
    }
  ]
}

const ImagesDev = {
  test: /\.(jpe?g|png|gif|ico|cur|svg|)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: `${paths.static}/images/[name].[ext]`
      }
    }
  ]
}

const FontsPro = {
  test: /\.(ttf|eot|woff|woff2)$/,
  loader: 'url-loader',
  options: {
    limit: 10 * 1024,
    // limit: 50000,
    // Todo separate by differents mimetype
    // mimetype: 'application/font-woff',
    name: `${paths.static}/fonts/[name].[ext]`, // Output below ./fonts
    publicPath: paths.ROOT // Take the directory into account
  }
}

const ImagesPro = {
  test: /\.(jpe?g|png|gif|ico|cur)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        // Inline files smaller than 10 kB (10240 bytes)
        limit: 10 * 1024,
        name: `${paths.static}/images/[name].[ext]`
      }
    },
    {
      loader: 'img-loader',
      options: {
        plugins: [
          require('imagemin-gifsicle')({
            interlaced: true
          }),
          require('imagemin-mozjpeg')({
            progressive: true,
            arithmetic: false,
            quality: 65
          }),
          require('imagemin-pngquant')({
            floyd: 0.5,
            speed: 4,
            quality: '65-90'
          })
        ]
      }
    }
  ]
}

const SVG = {
  test: /\.svg$/i,
  use: [
    {
      loader: 'svg-url-loader',
      options: {
        // Inline files smaller than 10 kB (10240 bytes)
        limit: 10 * 1024,
        // Remove the quotes from the url
        // (they’re unnecessary in most cases)
        // noquotes: true
        name: `${paths.static}/images/[name].[ext]`
      }
    },
    {
      loader: 'img-loader',
      options: {
        plugins: [
          require('imagemin-svgo')({
            plugins: [
              { removeTitle: true },
              { convertPathData: false },
              { removeViewBox: true },
              { cleanupIDs: false }
            ]
          })
        ]
      }
    }
  ],
  enforce: 'pre'
}

export const loaders = {
  JSLoader,
  ESLintLoader,
  SCSSLoader,
  CSSLoader,
  PUGLoader,
  FontsDev,
  ImagesDev,
  FontsPro,
  ImagesPro,
  SVG
}

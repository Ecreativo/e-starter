import { paths } from '../paths.js'
import webpack from 'webpack'
// webpack plugins
// import ImageminWebpWebpackPlugin from 'imagemin-webp-webpack-plugin'
// const ManifestPlugin = require('webpack-manifest-plugin');
import HtmlCriticalPlugin from 'html-critical-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import WebpackNotifier from 'webpack-notifier'

import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

// const Dashboard = new ImageminWebpWebpackPlugin()
const HtmlCritical = new HtmlCriticalPlugin({
  base: paths.OUT_PATH,
  src: 'index.html',
  dest: 'index.html',
  inline: true,
  minify: true,
  extract: true,
  width: 1200,
  height: 600,
  penthouse: {
    blockJSRequests: false
  }
})

const Favicons = new FaviconsWebpackPlugin({
  // Your source logo
  logo: `${paths.assets}/images/brand/logo.png`,
  // The prefix for all image files (might be a folder or a name)
  prefix: `${paths.static}/images/icons/`,
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

// Make module IDs more stable
const HashedModuleIds = new webpack.HashedModuleIdsPlugin()
// Concatenate modules where possible
// https://developers.google.com/web/fundamentals/performance/webpack/decrease-frontend-size#enable_module_concatenation_for_es_modules_aka_scope_hoisting
const ModuleConcatenation = new webpack.optimize.ModuleConcatenationPlugin()
// make webp images
const BundleAnalyzer = new BundleAnalyzerPlugin()

const Dashboard = new DashboardPlugin()
const HtmlWebpackHarddisk = new HtmlWebpackHarddiskPlugin()
const BrowserSync = new BrowserSyncPlugin(
  // BrowserSync options
  {
    host: 'localhost',
    port: 8080,
    // proxy the Webpack Dev Server endpoint
    // through BrowserSync
    proxy: 'http://localhost:8079/'
    // injectChanges: true
    // files: path.join(__dirname, '../../src/**/*'),
    // files: [{
    //     match: [
    //         '**/*.hbs'
    //     ],
    //     fn: function(event, file) {
    //         if (event === "change") {
    //             const bs = require('browser-sync').get('bs-webpack-plugin');
    //             bs.reload();
    //         }
    //     }
    // }]
  },
  // plugin options
  {
    // prevent BrowserSync from reloading the page
    // and let Webpack Dev Server take care of this
    reload: false
    // injectCss: true
  }
)

const ExtractText = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: `${paths.static}/css/[name]${paths.MIN}.css`,
  chunkFilename: `${paths.static}/css/[id]${paths.MIN}.css`
})

const Notifier = new WebpackNotifier({
  title: `Webpack ${paths.env}`,
  excludeWarnings: true,
  alwaysNotify: true
})

const Provide = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  Popper: ['popper.js', 'default'],
  // In case you imported plugins individually, you must also require them here:
  Util: 'exports-loader?Util!bootstrap/js/dist/util',
  Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
  Popover: 'exports-loader?Popover!bootstrap/js/dist/popover'
})

const HTML = new HtmlWebpackPlugin({
  title: 'Home',
  inject: true,
  template: './views/pages/index.pug',
  filename: `${paths.OUT_PATH}/index.html`,
  chunks: ['main', 'vendor'],
  alwaysWriteToDisk: true
})

export const plugins = {
  ExtractText,
  Notifier,
  Provide,
  HTML,
  Dashboard,
  HtmlWebpackHarddisk,
  BrowserSync,
  HashedModuleIds,
  ModuleConcatenation,
  BundleAnalyzer,
  Favicons,
  HtmlCritical
}

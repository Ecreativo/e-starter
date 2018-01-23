import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import stripAnsi from 'strip-ansi'
import { config as webpackConfig } from './webpack'

const browser = browserSync.create('development')
const config = require('../config').browsersync.development
const bundler = webpack(webpackConfig)

export function reload(done) {
  browserSync.get('development').reload()
  done()
}
/**
 * Reload all devices when bundle is complete
 * or send a fullscreen error message to the browser instead
 */
bundler.plugin('done', function(stats) {
  if (stats.hasErrors() || stats.hasWarnings()) {
    var errMessage = stripAnsi(stats.toString('errors-only'))
    var timeout = 100000
    return browserSync.get('development').notify(errMessage, timeout)
  }
  browserSync.get('development').reload()
})

export function server(done) {
  config.middleware = webpackDevMiddleware(bundler, { stats: 'minimal' })
  browser.init(config)
  done()
}

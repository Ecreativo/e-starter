import gulp from 'gulp'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import stripAnsi from 'strip-ansi'
import { config as webpackConfig } from './webpack'

const browser = browserSync.create('development')
const config = require('../config').browsersync.development;
const bundler = webpack(webpackConfig)

export function reload(done) {
  browserSync.get('development').reload();
  done();
}
/**
 * Reload all devices when bundle is complete
 * or send a fullscreen error message to the browser instead
 */
bundler.plugin('done', function(stats) {
  if (stats.hasErrors() || stats.hasWarnings()) {
    return browser.sockets.emit('fullscreen:message', {
      title: "Webpack Error:",
      body: stripAnsi(stats.toString("errors-only")),
      timeout: 100000
    });
  }
  browserSync.get('development').reload();
});

export function server(done) {
  config.middleware = webpackDevMiddleware(bundler, { stats: "minimal" /*,quiet: true*/ });
  browser.init(config);
  done();
}
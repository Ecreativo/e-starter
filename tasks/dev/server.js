import gulp        from 'gulp'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import { config as webpackConfig } from './webpack'

const browser = browserSync.create('development')
const config = require('../config').browsersync.development;

const bundler = webpack(webpackConfig)

export function reload(done) {
    browserSync.get('development').reload();
    done();
}

export function server(done) {
    config.middleware = webpackDevMiddleware(bundler, { quiet: true });
    browser.init(config);
    done();
}

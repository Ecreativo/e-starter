import gulp from 'gulp'
import browserSync from 'browser-sync'
const browser = browserSync.create('production')
const config = require('../config').browsersync.production;

export function server(done) {
  browser.init(config);
  done();
}

export function reload(done) {
    browserSync.get('production').reload();
    done();
}
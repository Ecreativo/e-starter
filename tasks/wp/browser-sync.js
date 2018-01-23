import browserSync from 'browser-sync'
import cache from 'gulp-cache'
const server = browserSync.create('wp')
const config = require('../config').browsersync.wp

export function clear(done) {
  cache.clearAll(done)
}

export function reload(done) {
  browserSync.get('wp').reload()
  done()
}

export function serve(done) {
  server.init(config)
  done()
}

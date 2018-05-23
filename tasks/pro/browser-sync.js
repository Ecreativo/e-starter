import browserSync from 'browser-sync'
import connectPHP from 'gulp-connect-php'

const browser = browserSync.create('production')
const config = require('../config')

export function server(done) {
  connectPHP.server(config.phpserver, function() {
    browser.init(config.browsersync.production)
  })
  done()
}

export function reload(done) {
  browserSync.get('production').reload()
  done()
}

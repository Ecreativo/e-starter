import browserSync from 'browser-sync'
import { paths } from '../paths.js'
import {} from 'dotenv/config'

const browser = browserSync.create(paths.env)

let config
if (paths.env === 'wp') {
  config = {
    proxy: `${paths.DEV_URL}/`,
    injectChanges: true,
    open: false,
    port: 8082
  }
} else if (paths.env === 'production') {
  config = {
    server: {
      baseDir: paths.OUT_PATH + '/'
    },
    open: false,
    port: 8081
  }
}

export function server(done) {
  browser.init(config)
  done()
}

export function reload(done) {
  browserSync.get(paths.env).reload()
  done()
}

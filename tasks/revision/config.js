import { paths } from '../paths.js'
import {} from 'dotenv/config'

let config

config = {
  src: {
    assets: [
      paths.STATIC + '/css/*.css',
      paths.STATIC + '/js/*.js'
      // paths.STATIC + '/images/**/*'
    ],
    base: paths.STATIC
  },
  dest: {
    assets: paths.STATIC + '/',
    manifest: {
      name: 'manifest.json',
      path: paths.STATIC + '/'
    }
  }
}

export default config

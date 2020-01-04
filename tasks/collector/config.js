import { paths } from '../paths.js'
import {} from 'dotenv/config'

let config
if (paths.env === 'wp') {
  config = {
    src: [
      paths.STATIC + '/manifest.json',
      paths.SRC + '/inc/inc/theme-functions/enqueue.php'
    ],
    dest: paths.WP + '/inc'
  }
} else if (paths.env === 'production') {
  config = {
    src: [
      paths.STATIC + '/manifest.json',
      paths.BUILD + '/**/*.{html,php}'
    ],
    dest: paths.BUILD
  }
}

export default config

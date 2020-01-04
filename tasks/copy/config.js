import { paths } from '../paths.js'
import {} from 'dotenv/config'

const config = {
  src: [
    // paths.SRC + '/.htaccess',
    './node_modules/apache-server-configs/dist/.htaccess',
    // paths.SRC + '/inc/**/*.{html,php}',
    paths.SRC + '/inc/**/*'
    // paths.SRC + '/**/*',
    // '!' + paths.SRC + '/views',
  ],
  dest: paths.OUT_PATH,
  fonts: {
    src: [`${paths.assets}/fonts/**`],
    dest: `${paths.STATIC}/fonts/`
  }
}

export default config

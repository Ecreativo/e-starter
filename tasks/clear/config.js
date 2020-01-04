import { paths } from '../paths.js'
import {} from 'dotenv/config'

let config = {
  src: [
    paths.STATIC + '/css/**',
    paths.STATIC + '/js/**'
  ]
}

if (paths.env === 'wp') {
  config.src.push(`!${paths.STATIC}/css/editor-style.css`)
} else {
  config = {
    src: [
      paths.BUILD
    ]
  }
}

export default config

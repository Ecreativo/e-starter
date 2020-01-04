import { paths } from '../paths.js'
const config = {
  src: paths.BUILD + '/*.html',
  dest: paths.BUILD,
  remplace: {
    js: {
      x: /(js\/(application|main|head))\.js/g,
      y: '$1.min.js'
    },
    css: {
      x: /(css\/(main))\.css/g,
      y: '$1.min.css'
    }
  }
}

export default config

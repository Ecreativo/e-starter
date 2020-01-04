import {} from 'dotenv/config'
import { paths } from '../paths.js'

const config = {
  src: paths.BUILD + '/**',
  options: {
    destination: `~/${paths.URL}`,
    root: paths.BUILD,
    hostname: paths.HOST,
    username: paths.USER,
    incremental: true,
    progress: true,
    relative: true,
    emptyDirectories: true,
    recursive: true,
    clean: true,
    exclude: ['.DS_Store'],
    include: []
  }
}

export default config

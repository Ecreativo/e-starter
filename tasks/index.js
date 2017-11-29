import gulp from 'gulp'

import { scripts } from './dev/webpack'
import { server } from './dev/server'

export const dev = gulp.series(server)
export const build = gulp.series(scripts)

export default dev
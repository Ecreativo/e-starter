import gulp from 'gulp'
import requireDir from 'require-dir';
import { scripts } from './dev/webpack'
import { server } from './dev/server'

requireDir('./', { recurse: true });

export const dev = gulp.series('build:dev');
export const build = gulp.series(scripts)

export default dev
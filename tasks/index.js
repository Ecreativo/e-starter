import gulp from 'gulp'
import requireDir from 'require-dir'
import { savePsiReport } from './util/pagespeed'
import { clearDev } from './dev/build'
import { clearPro } from './pro/build'
import {clear} from './util/clear'


requireDir('./', { recurse: true })

export const dev = gulp.series(clearDev, 'build:dev', 'server:dev')
export const build = gulp.series(clearPro, 'build:pro', 'copy:pro', 'server:pro')
export const wp = gulp.series(clear, 'server:wp')
export const deploy = gulp.series('rsync', 'ping')
export const seo = gulp.series('mobile', 'desktop', savePsiReport, 'ping')
export {clear} from './util/clear'
export {clearCache} from './util/clear-cache'

export default dev

import gulp from 'gulp'
import requireDir from 'require-dir'
import { savePsiReport } from './util/pagespeed'
import { clearDev } from './dev/build'
import { clearPro } from './pro/build'
import { clearWp } from './wp/build'

requireDir('./', { recurse: true })

export const dev = gulp.series(clearDev, 'build:dev', 'server:dev')
export const build = gulp.series(clearPro, 'build:pro', 'copy:pro', 'rev:pro', 'server:pro')
export const wp = gulp.series(clearWp, 'build:pro', 'server:wp')
export const deploy = gulp.series('rsync', 'ping')
export const seo = gulp.series('mobile', 'desktop', savePsiReport, 'ping')
export {clear} from './util/clear'
export {clearCache} from './util/clear-cache'

export default dev

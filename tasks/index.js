import gulp from 'gulp'
import requireDir from 'require-dir'
import { savePsiReport } from './util/pagespeed'
import { clear } from './clear'
import { clearCache } from './clear/clear-cache'
import { server } from './server'
import { revision } from './revision'
import { revcollect } from './collector'
import { copyFonts, copyFiles } from './copy'
import { scripts } from './webpack/webpack.prod.js'

requireDir('./', { recurse: true })

gulp.task(
  'server',
  gulp.series(server)
)

gulp.task(
  'rev',
  gulp.series(
    revision,
    revcollect
  )
)

gulp.task(
  'build:pro',
  gulp.series(
    scripts
  )
)

export const build = gulp.series(clear, 'build:pro', copyFiles, 'rev', 'server')
export const wp = gulp.series(clear, 'build:pro', copyFonts, 'rev', 'server')
export const deploy = gulp.series('rsync')
export const seo = gulp.series('mobile', 'desktop', savePsiReport)
export const clearGulp = gulp.series(clear, clearCache)
export { rename } from './rename'

export default build

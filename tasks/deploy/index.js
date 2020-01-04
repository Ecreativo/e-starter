import gulp from 'gulp'
import rsync from 'gulp-rsync'
import config from './config.js'
/**
 * Copy files and folder to server
 * via rsync
 */

gulp.task('rsync', function(done) {
  return gulp.src(config.src)
    .pipe(rsync(config.options))
  done()
})

export const deploy = gulp.series('rsync')
export default deploy

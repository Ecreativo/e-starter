import gulp from 'gulp'
import rsync from 'gulp-rsync'

const config = require('../config').rsync

/**
 * Copy files and folder to server
 * via rsync
 */
gulp.task('rsync', function(done) {
  return gulp.src(config.src)
    .pipe(rsync(config.options))
  done()
})

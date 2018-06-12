import gulp from 'gulp'
import cache from 'gulp-cache'

/**
 * Clear Cache from gulp-cache
 * Fix problem in img process
 */
gulp.task('clear', () =>
  cache.clearAll()
)

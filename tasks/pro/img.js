import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
const config = require('../config').images.production

/**
 * Copy and minimize image files
 */
export function images(done) {
  return gulp.src(config.src)
    .pipe($.cache($.imagemin(config.options)))
    .pipe(gulp.dest(config.dest))
  done()
}

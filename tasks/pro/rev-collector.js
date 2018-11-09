import gulp from 'gulp'
import collect from 'gulp-rev-collector'
const config = require('../config').collect

/**
 * Replace all links to assets in files
 * from a manifest file
 */
export function revcollectPro() {
  return gulp.src(config.src)
    .pipe(collect())
    .pipe(gulp.dest(config.dest))
}

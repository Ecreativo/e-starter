import gulp from 'gulp'
import rev from 'gulp-rev'
const config = require('../config').revision

/**
 * Revision all asset files and
 * write a manifest file
 */
export function revisionPro() {
  return gulp.src(config.src.assets, { base: config.src.base })
    .pipe(gulp.dest(config.dest.assets))
    .pipe(rev())
    .pipe(gulp.dest(config.dest.assets))
    .pipe(rev.manifest({
      base: './'
      // ,merge: true
    }))
    .pipe(gulp.dest(config.dest.manifest.path))
}

import gulp from 'gulp'
import rev from 'gulp-rev'
const config = require('../config').revision.wp

/**
 * Revision all asset files and
 * write a manifest file
 */
export function revisionWp() {
  return gulp.src(config.src.assets, { base: config.src.base })
    .pipe(gulp.dest(config.dest.assets))
    .pipe(rev({
      base: './'
      //, merge: true
    }))
    .pipe(gulp.dest(config.dest.assets))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.dest.manifest.path))
};

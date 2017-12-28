import gulp from 'gulp'
import collect from 'gulp-rev-collector'
const config = require('../config').collect.wp

/**
 * Replace all links to assets in files
 * from a manifest file
 */
export function revcollect() {
  return gulp.src(config.src)
    .pipe(collect({
      replaceReved: true
      /* dirReplacements: {
      'static/css/': 'static/css/',
      'static/js/': 'static/js/'
      } */
    }))
    .pipe(gulp.dest(config.dest));
};

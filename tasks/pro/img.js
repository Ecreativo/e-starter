import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const config = require('../config').images.production;

/**
 * Copy and minimize image files
 */
export function images(done) {
  var from = $.size();
  var to = $.size();
  return gulp.src(config.src)
    .pipe(from)
    .pipe($.cache($.imagemin(config.options)))
    .pipe(gulp.dest(config.dest))
    .pipe(to)
    .pipe($.notify({
      title: 'Images',
      subtitle: 'Optimized',
      onLast: true,
      wait: true,
      message: function () {
        return from.prettySize + ' → ' + to.prettySize;
      }
    }));
  done();
};

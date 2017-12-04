import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import replace from 'gulp-replace'
import notify from 'gulp-notify'
import size from 'gulp-size'
const config = require('../config').html;

/**
 * Minimize HTML
 */
gulp.task('html:production', function () {
  var remplace = config.remplace;
  var from = size();
  var to = size();
  return gulp.src(config.src)
    .pipe(from)
    .pipe(htmlmin(config.options))
    //.pipe(replace(remplace.css.x, remplace.css.y))
    //.pipe(replace(remplace.js.x, remplace.js.y))
    .pipe(gulp.dest(config.dest))
    .pipe(to)
    .pipe(notify({
      title: 'Html',
      subtitle: 'Optimized',
      onLast: true,
      message: function () {
        return from.prettySize + ' → ' + to.prettySize;
      }
    }));
});

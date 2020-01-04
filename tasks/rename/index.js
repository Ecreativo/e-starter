import gulp from 'gulp'
import replace from 'gulp-replace'
import config from './config.js'

// Add .min to the css and js files
export function rename() {
  var remplace = config.remplace
  return gulp.src(config.src)
    .pipe(replace(remplace.css.x, remplace.css.y))
    .pipe(replace(remplace.js.x, remplace.js.y))
    .pipe(gulp.dest(config.dest))
}

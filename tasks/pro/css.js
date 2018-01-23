import gulp from 'gulp'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import browser from 'browser-sync'
import rename from 'gulp-rename'
import notify from 'gulp-notify'
import size from 'gulp-size'

const config = require('../config').css
const browserSync = browser.get('production')

/**
 * Copy and minimize CSS files
 */

export function css(done) {
  var from = size()
  var to = size()
  var processors = [
    cssnano()
  ]
  return gulp.src(config.src)
    .pipe(from)
    .pipe(postcss(processors))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream({ match: '**/*.css' }))
    .pipe(to)
    .pipe(notify({
      title: 'Css',
      subtitle: 'Optimized',
      onLast: true,
      wait: true,
      message: function () {
        return from.prettySize + ' → ' + to.prettySize
      }
    }))
  done()
}

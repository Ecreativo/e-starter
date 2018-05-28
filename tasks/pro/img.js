import gulp from 'gulp'
const imagemin = require('gulp-imagemin');
const config = require('../config').images.production

/**
 * Copy and minimize image files
 */
export function images(done) {
  return gulp.src(config.src)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest(config.dest))
  done()
}


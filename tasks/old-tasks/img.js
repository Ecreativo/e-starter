import gulp from 'gulp'
import cache from 'gulp-cache'
import imagemin from 'gulp-imagemin'
// import newer from 'gulp-newer'
const config = require('../config').images.production

/**
 * Copy and minimize image files
 */
export function images(done) {
  return gulp.src(config.src)
    // .pipe(newer(config.dest))
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ], {
      verbose: true
    })))
    .pipe(gulp.dest(config.dest))
  done()
}

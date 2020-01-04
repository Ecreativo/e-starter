import gulp from 'gulp'
import newer from 'gulp-newer'
import config from './config'

/**
 * Copy main files
 */
export function copyFiles(done) {
  return gulp.src(config.src)
    .pipe(newer(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest))
  done()
}

/**
 * Copy fonts to static folder
 * if not changed
 */
export const copyFonts = (done) => {
  return gulp.src(config.fonts.src, { force: true })
    .pipe(newer(config.fonts.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.fonts.dest))
  done()
}

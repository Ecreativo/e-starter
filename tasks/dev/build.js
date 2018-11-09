import gulp from 'gulp'
import del from 'del'
import { server } from './server.js'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
var config = require('../config')

/**
 * Copy fonts to static folder
 * if not changed
 */
const copyFontsDev = (done) => {
  return gulp.src(config.copy.fonts.src, { force: true })
    .pipe($.newer(config.copy.fonts.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.copy.fonts.dest))
  done()
}

/**
 * Copy images to static folder
 * if not changed
 */
const copyImagesDev = (done) => {
  return gulp.src(config.copy.images.src)
    .pipe($.newer(config.copy.images.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.copy.images.dest))
  done()
}

const watch = (done) => {
  gulp.watch(config.watch.development.images, gulp.series(copyImagesDev))
  gulp.watch(config.watch.development.fonts, gulp.series(copyFontsDev))
  done()
}

/**
 * Delete files in static folder
 */
export const clearDev = () => del(config.delete.development.src, { force: true })

gulp.task(
  'build:dev',
  gulp.series(
    gulp.parallel(copyFontsDev, copyImagesDev)
  )
)

gulp.task(
  'server:dev',
  gulp.series(
    server,
    watch
  )
)

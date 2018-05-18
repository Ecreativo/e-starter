import gulp from 'gulp'
import del from 'del'
import { server } from './server.js'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
var config = require('../config')
/**
 * Delete files in static folder
 */
const clean = (done) => {
  del.sync(config.delete.development.src, { force: true })
  done()
}



/**
 * Copy images to static folder
 * if not changed
 */
const copyImages = (done) => {
  return gulp.src(config.copy.images.src)
    .pipe($.newer(config.copy.images.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.copy.images.dest))
  done()
}

const watch = (done) => {
  gulp.watch(config.watch.development.images, gulp.series(copyImages))
  done()
}

gulp.task(
  'build:dev',
  gulp.series(
    clean,
    gulp.parallel(copyImages),
    server,
    watch
  )
)

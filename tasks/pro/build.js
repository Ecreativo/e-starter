import gulp from 'gulp'
import del from 'del'
import { server } from './browser-sync'
import { images } from './img'
import { scripts } from './scripts'
import { revision } from './revision'
import { revcollect } from './rev-collector'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
const config = require('../config')

/**
 * Delete files in build folder
 */
const clean = (done) => {
  del.sync(config.delete.production.src, { force: true }, done)
  done()
}

/**
 * Copy main files
 */
function copyFiles(done) {
  return gulp.src(config.copy.src)
    .pipe($.newer(config.copy.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.copy.dest))
  done()
}

const watch = (done) => {
  gulp.watch(config.watch.production.css, gulp.series(scripts))
  done()
}

gulp.task(
  'build',
  gulp.series(
    clean,
    images,
    gulp.parallel(
      scripts
    ),
    copyFiles,
    server,
    watch
  )
)

gulp.task(
  'rev',
  gulp.series(
    revision,
    revcollect
  )
)

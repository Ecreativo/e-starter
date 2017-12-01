import gulp from 'gulp'
import del from 'del'
import { css } from './css'
import { server, reload } from './browser-sync'
import { images } from './img'
import { scripts } from './scripts'
import { revision } from './revision'
import { revcollect } from './rev-collector'
import { rename } from './rename'
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

/**
 * Copy JS files
 */
function copyJs() {
  return gulp.src(config.copy.js.src)
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.copy.js.dest))
}

const watch = (done) => {
  gulp.watch(config.watch.production.css, gulp.series(scripts, css));
  done();
};

gulp.task(
  'build',
  gulp.series(
    clean,
    scripts,
    gulp.parallel(
      copyFiles,
      images,
      copyJs,
    ),
    css,
    rename,
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

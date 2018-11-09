import gulp from 'gulp'
import del from 'del'
import { server } from './browser-sync'
import { images } from './img'
import { scripts } from './scripts'
import { revisionPro } from './revision'
import { revcollectPro } from './rev-collector'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
const config = require('../config')

/**
 * Copy fonts to static folder
 * if not changed
 */
const copyFontsPro = (done) => {
  return gulp.src(config.copy.production.fonts.src, { force: true })
    .pipe($.newer(config.copy.production.fonts.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.copy.production.fonts.dest))
  done()
}

/**
 * Copy main files
 */
function copyFilesPro(done) {
  return gulp.src(config.copy.src)
    .pipe($.newer(config.copy.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.copy.dest))
  done()
}

const watch = (done) => {
  gulp.watch(config.watch.production.css, gulp.series(scripts, 'rev:pro'))
  gulp.watch(config.watch.production.js, gulp.series(scripts, 'rev:pro'))
  gulp.watch(config.watch.production.images, gulp.series(images))
  gulp.watch(config.watch.production.fonts, gulp.series(copyFontsPro))
  done()
}

/**
 * Delete files in build folder
 */
export const clearPro = () => del(config.delete.production.src, { force: true })

gulp.task(
  'rev:pro',
  gulp.series(
    revisionPro,
    revcollectPro
  )
)

gulp.task(
  'build:pro',
  gulp.series(
    images,
    gulp.parallel(
      scripts
    )
  )
)

gulp.task(
  'copy:pro',
  gulp.series(
    copyFontsPro,
    copyFilesPro
  )
)

gulp.task(
  'server:pro',
  gulp.series(
    'rev:pro',
    server,
    watch
  )
)

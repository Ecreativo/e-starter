import gulp from 'gulp'
import del from 'del'
import { serve, reload } from './browser-sync'
import { revisionWp } from './revision'
import { revcollectWp } from './rev-collector'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
const config = require('../config')

/**
 * Copy fonts to static folder
 * if not changed
 */
const copyFontsWp = (done) => {
  return gulp.src(config.copy.wp.fonts.src, { force: true })
    .pipe($.newer(config.copy.wp.fonts.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.copy.wp.fonts.dest))
  done()
}

const watch = (done) => {
  gulp.watch(config.watch.wp.css, gulp.series('rev:wp'))
  gulp.watch(config.watch.wp.js, gulp.series('rev:wp'))
  done()
}

gulp.task(
  'rev:wp',
  gulp.series(
    revisionWp,
    revcollectWp
  )
)

gulp.task(
  'copy:wp',
  gulp.series(
    copyFontsWp
  )
)

gulp.task(
  'server:wp',
  gulp.series(
    'copy:wp',
    'rev:wp',
    serve,
    watch
  )
)

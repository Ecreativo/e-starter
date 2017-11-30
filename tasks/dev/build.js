import gulp from 'gulp';
import del from 'del'
import { server, reload } from './server.js';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

/**
 * Delete files in static folder
 */
const clean = (done) => {
  const config = require('../config').delete.development
  del.sync(config.src, { force: true });
  done();
};

/**
 * Copy fonts to static folder
 * if not changed
 */
const copyFonts = (done) => {
  const config = require('../config').copy.fonts;
  return gulp.src(config.src, { force: true })
    .pipe($.newer(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest));
  done();
};

/**
 * Copy images to static folder
 * if not changed
 */
const copyImages = (done) => {
  const config = require('../config').copy.images;
  return gulp.src(config.src)
    .pipe($.newer(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest));
  done();
};

const watch = (done) => {
  const config = require('../config').watch.development;
  gulp.watch(config.images, gulp.series(copyImages));
  gulp.watch(config.fonts, gulp.series(copyFonts));
  done();
};

gulp.task(
  'build:dev',
  gulp.series(
    clean,
    gulp.parallel(copyFonts, copyImages),
    server,
    watch
  )
);
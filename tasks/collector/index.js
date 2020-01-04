import gulp from 'gulp'
import collect from 'gulp-rev-collector'
import config from './config'

/**
 * Replace all links to assets in files
 * from a manifest file
 */
export function revcollect() {
  return gulp.src(config.src)
    .pipe(collect({
      replaceReved: true
      /* dirReplacements: {
      `${paths.static}/css/`: `${paths.static}/css/`,
      `${paths.static}/js/`: `${paths.static}/js/`
      } */
    }))
    .pipe(gulp.dest(config.dest))
}

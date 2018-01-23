import gulp from 'gulp'
import { serve, reload } from './browser-sync'
import { revision } from './revision'
import { revcollect } from './rev-collector'

const config = require('../config').watch.wp

const watch = (done) => {
  gulp.watch(config.css, gulp.series('rev:wp', reload))
  done()
}

gulp.task(
  'rev:wp',
  gulp.series(
    revision,
    revcollect
  )
)

gulp.task(
  'build:wp',
  gulp.series(
    'rev:wp',
    serve,
    watch
  )
)

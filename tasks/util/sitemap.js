import process from 'process'
import gulp from 'gulp'
import sitemap from 'gulp-sitemap'
import save from 'gulp-save'

const config = require('../config').sitemap

// site url
const URL = process.env.URL

gulp.task('sitemap', function(done) {
  gulp.src(config.src, { read: false })
    .pipe(save('before-sitemap'))
    .pipe(sitemap({
      siteUrl: URL,
      priority: '0.5',
      changefreq: 'weekly'
    })) // Returns sitemap.xml
    .pipe(gulp.dest(config.dest))
    .pipe(save.restore('before-sitemap'))
    // restore all files to the state when we cached them
    // -> continue stream with original html files
    // ...
  done()
})

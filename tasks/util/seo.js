import process from 'process'
import gulp from 'gulp'
import request from 'request'

// site url
const URL = process.env.URL

gulp.task('ping', function(done) {
  request('http://www.google.com/webmasters/tools/ping?sitemap=' + URL + '/sitemap_index.xml')
  request('http://www.bing.com/webmaster/ping.aspx?siteMap=' + URL + '/sitemap_index.xml')
  done()
})

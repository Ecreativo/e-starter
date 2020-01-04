import { paths } from '../paths.js'
import gulp from 'gulp'
import request from 'request'
import {} from 'dotenv/config'

gulp.task('ping', function(done) {
  request('http://www.google.com/webmasters/tools/ping?sitemap=' + paths.URL + '/sitemap_index.xml')
  request('http://www.bing.com/webmaster/ping.aspx?siteMap=' + paths.URL + '/sitemap_index.xml')
  done()
})

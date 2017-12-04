import gulp     from 'gulp';
import request  from 'request';

gulp.task('ping', function(done) {
    request('http://www.google.com/webmasters/tools/ping?sitemap=http://www.site.com/sitemap_index.xml');
    request('http://www.bing.com/webmaster/ping.aspx?siteMap=http://www.site.com/sitemap_index.xml');
    done();
});
import gulp from 'gulp'
import requireDir from 'require-dir';
import { savePsiReport } from './util/pagespeed';
requireDir('./', { recurse: true });

export const dev = gulp.series('build:dev');
export const build = gulp.series( 'build' ,'sitemap' );
export const wp   = gulp.series( 'build:wp' );
export const deploy = gulp.series( 'rsync', 'ping' );
export const seo = gulp.series( 'mobile', 'desktop', savePsiReport, 'ping');

export default dev
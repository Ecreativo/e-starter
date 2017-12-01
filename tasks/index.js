import gulp from 'gulp'
import requireDir from 'require-dir';
requireDir('./', { recurse: true });

export const dev = gulp.series('build:dev');
export const build = gulp.series( 'build' /*, 'sitemap' */ );

export default dev
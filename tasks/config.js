const site = 'site';
const src = site + '/src';
const srcAssets = src + '/_assets';
const developmentAssets = src + '/static';
const build = site + '/public_html';
const productionAssets = build + '/static';

module.exports = {
  browsersync: {
    development: {
      server: {
        baseDir: src + '/',
      },
      middleware: [],
      port: 8080,
      files: src + '/*.html'
    }
  }
};
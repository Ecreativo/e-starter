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
      browser: 'google Chrome canary',
      //reload when files are changing without fire any other task
      //files: [src + '/**']
      plugins: ['bs-fullscreen-message']
    }
  },
  delete: {
    development: {
      src: [
        developmentAssets + '/**',
        '!' + developmentAssets,
      ],
    }
  },
  watch: {
    development: {
      images: srcAssets + '/images/**/*',
      fonts: srcAssets + '/fonts/**'
    },
  },
  copy: {
    fonts: {
      src: [
        srcAssets + '/fonts/**'
      ],
      dest: developmentAssets + '/fonts/'
    },
    images: {
      src: [
        srcAssets + '/images/**'
      ],
      dest: developmentAssets + '/images/'
    },
    dest: build
  }
};
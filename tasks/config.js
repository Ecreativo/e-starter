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
    },
    production: {
      server: {
        baseDir: build + '/',
      },
      browser: 'google Chrome canary',
      port: 8081
    },
  },
  delete: {
    development: {
      src: [
        developmentAssets + '/**',
        '!' + developmentAssets,
      ],
    },
    production: {
      src: [
        productionAssets + '/css/**',
        productionAssets + '/js/**',
        build + '/**/*.{php,html}'
      ]
    }
  },
  watch: {
    development: {
      images: srcAssets + '/images/**/*',
      fonts: srcAssets + '/fonts/**'
    }
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
    js: {
      src: [
        src + '/static/js/*.js'
      ],
      dest: productionAssets + '/js/'
    },
    src: [
      'node_modules/apache-server-configs/dist/.htaccess',
      //src + '/_includes/**/*.{html,php}',
      src + '/**/*',
      //src + '/.htaccess',
      '!' + src + '/_assets{,/**}',
      '!' + src + '/_bower_components{,/**}',
      '!' + src + '/static/css{,/**}',
      '!' + src + '/_includes{,/**}',
      '!' + src + '/*.{pug}',
      '!' + src + '/static/js{,/**}'
    ],
    dest: build
  },
  css: {
      src: developmentAssets + '/css/*.css',
      dest: productionAssets + '/css',
  },
  images: {
    production: {
      src: developmentAssets + '/images/**/*.{jpg,jpeg,png,gif,ico,JPG}',
      dest: productionAssets + '/images/',
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true,
        svgoPlugins: [{ removeViewBox: false }]
      }
    }
  },
  rename: {
    src: build + '/*.html',
    dest: build,
    remplace: {
      js: {
        x: /(js\/(application|scripts|head))\.js/g,
        y: '$1.min.js'
      },
      css: {
        x: /(css\/(main))\.css/g,
        y: '$1.min.css'
      }
    }
  }
};

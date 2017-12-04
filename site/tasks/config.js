const src = 'src';
const srcAssets = src + '/_assets';
const developmentAssets = src + '/static';
const build = '/public_html';
const productionAssets = build + '/static';
const wp = '/app/public/wp-content/themes/_s-child';
const wpAssets = wp + '/static';

import process from 'process';

const USER_ENV = process.env.USER_ENV;

module.exports = {
  browsersync: {
    development: {
      server: {
        baseDir: src + '/',
      },
      middleware: [],
      port: 8080,
      browser: 'google Chrome canary',
      open: false,
      //reload when files are changing without fire any other task
      //files: [src + '/**']
      plugins: ['bs-fullscreen-message']
    },
    production: {
      server: {
        baseDir: build + '/',
      },
      open: false,
      port: 8081
    },
    wp: {
      proxy: 'mka.dev/',
      injectChanges: true,
      open: false,
      //tunnel: true,
      //tunnel: "ppress",
      port: 8082,
      files: wpAssets + '/css/main.min.css'
    }
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
    },
    production: {
      css: srcAssets + '/scss/**/*{scss}'
    },
    wp: {
      css: productionAssets + '/css/**/*{css}'
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
  html: {
    src: build + '/**/*.html',
    dest: build,
    options: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
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
  },
  revision: {
    src: {
      assets: [
        productionAssets + '/css/*.css',
        productionAssets + '/js/*.js'
        //productionAssets + '/images/**/*'
      ],
      base: productionAssets
    },
    dest: {
      assets: productionAssets,
      manifest: {
        name: 'manifest.json',
        path: productionAssets
      }
    },
    wp: {
      src: {
        assets: [
          productionAssets + '/css/*.css',
          //productionAssets + '/js/*.js'
          //productionAssets + '/images/**/*'
        ],
        base: productionAssets + '/css/'
      },
      dest: {
        assets: wpAssets + '/css/',
        manifest: {
          name: 'manifest.json',
          path: wpAssets + '/css/'
        }
      }
    }
  },
  collect: {
    src: [
      productionAssets + '/rev-manifest.json',
      build + '/**/*.{html,php}'
    ],
    dest: build,
    wp: {
      src: [
        wpAssets + '/css/rev-manifest.json',
        wp + '/functions.php'
      ],
      dest: wp + '/'
    }
  },
  rsync: {
    src: build + '/**',
    options: {
      destination: '~/etheme.camiloruiz.co.uk/public_html',
      root: build,
      hostname: 'home683465163.1and1-data.host',
      username: USER_ENV,
      incremental: true,
      progress: true,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: ['.DS_Store'],
      include: []
    }
  },
  sitemap: {
    src: build + '/**/*.html',
    dest: build
  }
};

import process from 'process'

// paths
const src = 'src'
const srcAssets = src + '/_assets'
const developmentAssets = src + '/static'
const build = 'public_html'
const productionAssets = build + '/static'
const wp = 'app/public/wp-content/themes/_s-child'
const wpAssets = wp + '/static'

// user
const USER = process.env.USER

// site url
const URL = process.env.URL

// site host
const HOST = process.env.HOST

module.exports = {
  browsersync: {
    development: {
      // server: {
      //   baseDir: build + '/'
      // },
      server: [build + '/', src + '/'],
      middleware: [],
      port: 8080,
      open: false
      // reload when files are changing without fire any other task
      // files: [src + '/**']
    },
    production: {
      server: {
        baseDir: build + '/'
      },
      open: false,
      port: 8081
    },
    wp: {
      proxy: 'mka.dev/',
      injectChanges: true,
      open: false,
      // tunnel: true,
      // tunnel: "ppress",
      port: 8082,
      files: wpAssets + '/css/main.min.css'
    }
  },
  delete: {
    development: {
      src: [
        developmentAssets + '/**',
        '!' + developmentAssets
      ]
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
      './node_modules/apache-server-configs/dist/.htaccess',
      // src + '/_includes/**/*.{html,php}',
      src + '/**/*',
      // src + '/.htaccess',
      '!' + src + '/_assets{,/**}',
      '!' + src + '/*.pug'
    ],
    dest: build
  },
  css: {
    src: developmentAssets + '/css/*.css',
    dest: productionAssets + '/css'
  },
  images: {
    production: {
      src: developmentAssets + '/images/**/*.{jpg,jpeg,png,gif,ico,JPG,svg}',
      dest: productionAssets + '/images/'
    }
  },
  rename: {
    src: build + '/*.html',
    dest: build,
    remplace: {
      js: {
        x: /(js\/(application|main|head))\.js/g,
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
        // productionAssets + '/images/**/*'
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
          productionAssets + '/js/*.js'
          // productionAssets + '/images/**/*'
        ],
        base: productionAssets
      },
      dest: {
        assets: wpAssets + '/',
        manifest: {
          path: wpAssets + '/'
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
        wpAssets + '/rev-manifest.json',
        wp + '/functions.php'
      ],
      dest: wp + '/'
    }
  },
  rsync: {
    src: build + '/**',
    options: {
      destination: '~/' + URL,
      root: build,
      hostname: HOST,
      username: USER,
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
}

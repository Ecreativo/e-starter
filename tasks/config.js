import process from 'process'
import path from 'path'

// paths
const src = 'src'
const srcAssets = src + '/assets'
const developmentAssets = src + '/static'
const build = './public_html'
const productionAssets = build + '/static'
const wp = path.resolve(__dirname, '../')
// const wp = 'app/public/wp-content/themes/e-child-theme'
const wpInc = wp + '/inc'
const wpAssets = wp + '/static'

// user
const USER = process.env.USER

// site url
const URL = process.env.URL

// site host
const HOST = process.env.HOST

const isWp = (process.env.WP === 'true')
let imagesOutputPath = isWp ? wpAssets + '/images/' : productionAssets + '/images/'

module.exports = {
  browsersync: {
    development: {
      // server: {
      //   baseDir: build + '/'
      // },
      server: [build + '/', src + '/'],
      middleware: [],
      open: false,
      port: 8080
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
      proxy: 'site.local/',
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
      src: developmentAssets
    },
    production: {
      src: [
        productionAssets + '/css/**',
        productionAssets + '/js/**',
        build + '/**/*.{php,html}'
      ]
    },
    clear: {
      src: [
        developmentAssets,
        build,
        wpAssets,
        wpInc + '/enqueue.php'
      ]
    }
  },
  watch: {
    development: {
      images: srcAssets + '/images/**/*',
      fonts: srcAssets + '/fonts/**'
    },
    production: {
      css: srcAssets + '/scss/**/*.scss',
      js: srcAssets + '/javascripts/**/*',
      images: srcAssets + '/images{,/**}',
      fonts: srcAssets + '/fonts{,/**}'
    },
    wp: {
      css: productionAssets + '/css/*.css',
      js: productionAssets + '/js/*.js'
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
      // src + '/.htaccess',
      './node_modules/apache-server-configs/dist/.htaccess',
      // src + '/inc/**/*.{html,php}',
      src + '/inc/**/*.txt'
      // src + '/**/*',
      // '!' + src + '/views',
      // '!' + src + '/static{,/**}',
      // '!' + src + '/assets{,/**}'
    ],
    dest: build,
    production: {
      fonts: {
        src: [
          srcAssets + '/fonts/**'
        ],
        dest: productionAssets + '/fonts/'
      }
    },
    wp: {
      fonts: {
        src: [
          srcAssets + '/fonts/**'
        ],
        dest: wpAssets + '/fonts/'
      }
    }
  },
  css: {
    src: developmentAssets + '/css/*.css',
    dest: productionAssets + '/css'
  },
  images: {
    production: {
      src: srcAssets + '/images/**/*.{jpg,jpeg,png,gif,ico,JPG,svg}',
      dest: imagesOutputPath
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
          wpAssets + '/css/*.css',
          wpAssets + '/js/*.js'
          // productionAssets + '/images/**/*'
        ],
        base: wpAssets
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
        src + '/inc/enqueue.php'
      ],
      dest: wp + '/inc'
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

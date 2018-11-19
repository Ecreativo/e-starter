import process from 'process'
import path from 'path'
require('dotenv').config()

// paths
const src = 'src'
const srcAssets = src + '/assets'
const developmentAssets = src + '/static'
const build = './public_html'
const productionAssets = build + '/static'
const wp = path.resolve(__dirname, '../')
const wpInc = wp + '/inc'
const wpAssets = wp + '/static'

const isEnv = process.env.NODE_ENV
const isWp = (isEnv === 'wp')
const imagesOutputPath = isWp ? wpAssets + '/images/' : productionAssets + '/images/'
const deployEnv = process.env.DEPLOY_ENV

// user
let USER
// site url
let URL
// site host
let HOST

if (deployEnv === 'staging') {
  USER = process.env.STAGING_USER
  URL = process.env.STAGING_URL
  HOST = process.env.STAGING_HOST
} else if (deployEnv === 'production') {
  USER = process.env.PRODUCTION_USER
  URL = process.env.PRODUCTION_URL
  HOST = process.env.PRODUCTION_HOST
} else if (deployEnv === 'live') {
  USER = process.env.LIVE_USER
  URL = process.env.LIVE_URL
  HOST = process.env.LIVE_HOST
}

module.exports = {
  browsersync: {
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
      port: 8082
    }
  },
  delete: {
    development: {
      src: developmentAssets
    },
    production: {
      src: [
        productionAssets + '/css/**',
        productionAssets + '/js/**'
        // build + '/**/*.{php,html}'
      ]
    },
    wp: {
      src: [
        wpAssets + '/css/**',
        wpAssets + '/js/**'
      ]
    },
    clear: {
      src: [
        developmentAssets,
        build,
        wpAssets,
        wpInc + '/theme-functions/enqueue.php'
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
      css: srcAssets + '/scss/**/*.scss',
      js: srcAssets + '/javascripts/**/*'
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
      src + '/inc/**/*'
      // src + '/**/*',
      // '!' + src + '/views',
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
      assets: productionAssets + '/',
      manifest: {
        name: 'manifest.json',
        path: productionAssets + '/'
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
          name: 'manifest.json',
          path: wpAssets + '/'
        }
      }
    }
  },
  collect: {
    src: [
      productionAssets + '/manifest.json',
      build + '/**/*.{html,php}'
    ],
    dest: build,
    wp: {
      src: [
        wpAssets + '/manifest.json',
        src + '/inc/inc/theme-functions/enqueue.php'
      ],
      dest: wpInc
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

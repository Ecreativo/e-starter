import process from 'process'
import path from 'path'
import {} from 'dotenv/config'

const IS_WP = (process.env.NODE_ENV === 'wp')
const IS_PRO = (process.env.NODE_ENV === 'production')

const ROOT = path.resolve(__dirname, '../')
const BUILD = path.join(ROOT, process.env.BUILD)
const WP = process.env.WP || ROOT
const OUT_PATH = IS_WP ? WP : BUILD
const SRC = path.join(ROOT, process.env.SRC)
const DEV_URL = process.env.DEV_URL
const STATIC_NAME = 'static'
const MIN = IS_PRO || IS_WP ? '.min' : ''

const DEPLOY_ENV = process.env.DEPLOY_ENV

// user
let USER
// site url
let URL
// site host
let HOST

if (DEPLOY_ENV === 'staging') {
  USER = process.env.STAGING_USER
  URL = process.env.STAGING_URL
  HOST = process.env.STAGING_HOST
} else if (DEPLOY_ENV === 'production') {
  USER = process.env.PRODUCTION_USER
  URL = process.env.PRODUCTION_URL
  HOST = process.env.PRODUCTION_HOST
} else if (DEPLOY_ENV === 'live') {
  USER = process.env.LIVE_USER
  URL = process.env.LIVE_URL
  HOST = process.env.LIVE_HOST
}

export const paths = {
  SRC,
  DEV_URL,
  ROOT,
  BUILD,
  OUT_PATH,
  WP,
  MIN,
  assets: `${SRC}/assets`,
  STATIC: `${OUT_PATH}/${STATIC_NAME}`,
  static: STATIC_NAME,
  env: process.env.NODE_ENV,
  IS_PRO,
  IS_WP,
  USER,
  URL,
  HOST
}

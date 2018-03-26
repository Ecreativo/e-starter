import webpack from 'webpack'
import { config } from './webpack.config.pro'

export function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if (err) console.log('Webpack', err)
    console.log(stats.toString('errors-only'))
    resolve()
  }))
}

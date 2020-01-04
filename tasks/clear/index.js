import del from 'del'
import config from './config.js'

/**
 * Delete files and folders
 */
export const clear = () => del(config.src, { force: true })

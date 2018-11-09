import del from 'del'
const config = require('../config')

/**
 * Delete all builded files and folders
 */
export const clear = () => del(config.delete.clear.src, { force: true })

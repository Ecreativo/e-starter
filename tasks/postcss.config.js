module.exports = ({ file, options, env }) => ({
  plugins: {
    'rucksack-css': {},
    'postcss-cssnext': {features: {rem: {html: false}}},
    // 'postcss-cssnext': options.cssnext ? options.cssnext : false,
    // we dont need autoprefixer since we are using cssnext
    'cssnano': env === 'production'
  }
})

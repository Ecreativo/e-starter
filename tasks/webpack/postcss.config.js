module.exports = ({ file, options, env }) => ({
  plugins: {
    'rucksack-css': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions'
    },
    // 'postcss-cssnext': options.cssnext ? options.cssnext : false,
    // we dont need autoprefixer since we are using cssnext
    'cssnano': env === 'production'
  }
})

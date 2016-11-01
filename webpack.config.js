var webpack = require('webpack')

module.exports = {
  // devtool: 'eval-source-map',

  entry: `${__dirname}/themes/documentation/source/js/documentation.js`,
  output: {
    path: `${__dirname}/public/js`,
    publicPath: '/',
    filename: 'documentation.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
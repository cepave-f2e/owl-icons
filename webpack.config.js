const webpack = require('webpack')
const { NODE_ENV } = process.env
const isDev = !NODE_ENV
const isProd = NODE_ENV === 'production'
const isBuild = NODE_ENV === 'build'
const pkg = require('./package.json')

module.exports = {
  devtool: isDev ? '#eval': false,
  watch: isDev,

  entry: {
    [pkg.name]: [
      './src'
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    libraryTarget: isBuild ? 'commonjs2' : 'var',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },

    ]
  }
}

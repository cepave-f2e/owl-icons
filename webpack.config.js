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
    'owl-icons': ['./src']
  },
  output: {
    path: `${__dirname}/deploy/dist`,
    filename: '[name].js',
    library: 'OwlIcons',
    libraryTarget: isBuild ? 'umd' : 'var',
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
        loader: 'babel-loader'
      },

    ]
  }
}

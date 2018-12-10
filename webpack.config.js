const webpack = require('webpack')
const basePath = require('./build/helpers').basePath

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: basePath('dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': basePath('src'),
      'config': basePath('config'),
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        type: 'javascript/auto',
        enforce: 'pre',
        include: [basePath('src')],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        type: 'javascript/auto',
        include: [basePath('src')],
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        type: 'javascript/auto',
        include: [basePath('src')]
      }
    ]
  }
}

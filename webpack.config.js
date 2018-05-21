const basePath = require('./build/helpers').basePath

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: basePath('dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': basePath('src'),
      'config': basePath('config'),
      'vue$': 'vue/dist/vue.runtime.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [basePath('src')],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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
        include: [basePath('src')]
      }
    ]
  }
}

const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 10086,
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, 'example'),
  },
  entry: {
    'bundle':  path.resolve(__dirname, './example-mini-program/src/index.js')
  },
  
  output: {
    path: path.resolve(__dirname, 'example-mini-program/dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },

  resolve: {
    alias: {
      '@exprijs': path.resolve(__dirname, 'src'),
      '@exprijs/renderer': path.resolve(__dirname, 'src'),
      '@exprijs/document': path.resolve(__dirname, 'src'),
    },
  },

  module: {

    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
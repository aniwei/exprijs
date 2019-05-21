const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  devServer: {
    port: 10086,
    host: '0.0.0.0'
  },
  entry: {
    'bundle':  path.resolve(__dirname, './example/src/index.js')
  },
  
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 10000,
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, 'example'),
  },
  entry: {
    'bundle':  path.resolve(__dirname, './example/src/index.js')
  },
  
  output: {
    path: path.resolve(__dirname, 'example/dist'),  
    filename: '[name].js',
    publicPath: '/dist/'
  },

  resolve: {
    alias: {
      // 'react': path.resolve(__dirname, 'src/index'),
      // 'react-dom': path.resolve(__dirname, 'src/index'),
      'document': path.resolve(__dirname, 'src/document'),
    },
  },

  module: {

    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
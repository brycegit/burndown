var htmlWebpackPlugin = require('html-webpack-plugin');

var htmlWebpackPluginConfig = new htmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: __dirname + '/client/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    port: 8080
  },
  output: {
    filename: 'app_bundle.js',
    path: __dirname + '/public'
  },
  plugins: [
    htmlWebpackPluginConfig,
    ]
};

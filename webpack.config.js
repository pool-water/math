const webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'svv.im.bundled.min.js',
    publicPath: "assets/",
    libraryTarget: 'var',
    library: 'svv',
  },
  module: {
    rules: [
      {
        test: /\.(frag|vert)?$/,
        exclude: /node_modules/,
        loader: 'webpack-glsl-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  externals: {
    "THREE": "THREE",
    "react": "React",
    "react-dom": "ReactDOM",
  },
  mode: "development",
};

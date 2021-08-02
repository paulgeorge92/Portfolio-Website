const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/app.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 1234,
    contentBase: path.resolve(__dirname, 'src'),
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg|bmp)$/i,
        type: 'asset/resources',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Paul George Pullormadam',
      template: path.resolve(__dirname, './src/index.html'),
    }),
  ],
};

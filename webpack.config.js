const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/app.js'),
  },
  output: {
    filename: '[contenthash].js',
    chunkFilename: '[contenthash].js',
    assetModuleFilename: "[contenthash][ext][query]",
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 1111,
    contentBase: path.resolve(__dirname, 'src'),
    open: true,
  },
  module: {
    rules: [{
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
        test: /\.(gif|png|jpg|jpeg|svg|bmp|webp)$/i,
        //type: 'assets/resources',
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'assets/img/[hash].[ext]',
          }
        }]
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
const webpack = require("webpack");
const path = require('path');
const glob = require('glob');
const minifyPlugin = require("babel-minify-webpack-plugin");
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin')

let PROD;
process.env.NODE_ENV == 'production' ? PROD = true : PROD = false;
console.log(`WEBPACK: PROD: ${PROD}`)

const entry = {}
const entries = glob.sync('./src/*/*.js', {
  ignore: './src/*/_*.js'
});
entries.map(path => {
  entry[path.replace(/\.\/src/, '')] = path;
  return path;
});
console.log(`WEBPACK: entry files for webpack: ${JSON.stringify(entry)}`);

module.exports = {
  mode: PROD ? 'production' : 'development',
  entry: entry,
  plugins: [
    new minifyPlugin({}, {
      test: /\.js$/,
    }),
    new htmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new copyWebpackPlugin([
      {
        from: path.join(__dirname, 'src', 'manifest.json'),
        to: path.join(__dirname, 'public', 'manifest.json'),
        toType: 'file'
      },
      {
        from: path.join(__dirname, 'src', 'icon', 'icon192.png'),
        to: path.join(__dirname, 'public', 'icon', 'icon192.png'),
        toType: 'file'
      }
    ], {})
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        include: path.join(__dirname, 'src'),
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[path][name]___[hash:base64:5]',
              sourceMap: !PROD,
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !PROD,
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          'url-loader?limit=32768'
        ]
      }
    ]
  },
  devtool: PROD ? false : 'cheap-module-eval-source-map',
  output: {
    filename: '[name]', // 出力するファイルの名前
    path: path.join(__dirname, 'public') // 絶対パスじゃないとダメ
  }
};

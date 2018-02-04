const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//获取html-webpack-plugin配置参数
var getHtmlConfig = function(name){
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
};



module.exports = {
  entry: {
    index: './src/page/index/app.js',
    login: './src/page/login/app.js',
    common: './src/page/common/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist',
    filename: 'js/[name].js'
  },
  externals: {
    jquery: 'window.jQuery'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: '../'
        })
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist')
  // },
  plugins: [
    //打包成独立通用模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    //将css打包成单独的.css文件
    new ExtractTextPlugin("css/[name].css"),
    //html模版的处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ]
};
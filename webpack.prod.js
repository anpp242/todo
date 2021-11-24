const HtmlWepPackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CSsMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");

module.exports = {

  mode: 'production',
  output:{
    clean: true,
    filename: 'main.[contenthash].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CSsMinimizer(),
      new Terser()
    ]
  },
  module: {
    rules:[
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false,
          minimize: false,
        }
      },
      {
        test: /\.css$/i,
        exclude: /style\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /style\.css$/,
        use:[
              MiniCssExtractPlugin.loader,
              'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWepPackPlugin({
      title: 'My firs Webpack',
      template: './src/index.html',
      filename: './index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      //filename: '[name].css',
      filename: '[name].[fullhash].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets/" },
      ],
    }),
  ]

}

const HtmlWepPackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

  mode: 'development',
  output:{
    clean: true,
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
      filename: '[name].css',
      // filename: '[name].[fullhash].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets/" },
      ],
    }),
  ]

}

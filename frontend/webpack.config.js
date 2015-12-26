var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require('path')

var prod = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.ts',
  // Currently we need to add '.ts' to resolve.extensions array.
  resolve: {
    alias: {
      src: path.join(__dirname, 'src')
    },
    extensions: ['', '.ts', '.tsx', '.webpack.js', '.web.js', '.js']
  },

  output:{
    path: '../build/public/',
    filename: 'bundle.js',
    publicPath: '/'
  },

  // Source maps support (or 'inline-source-map' also works)
  devtool: 'source-map',

  // Add loader for .ts files.
  module: {
    // preLoaders: [
    //   {
    //     test: /\.tsx?$/,
    //     loader: 'tslint'
    //   }
    // ],
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css/,
        loader: prod
          ? ExtractTextPlugin.extract("style-loader", "css-loader")
          : 'style!css?sourceMap'
      },
      {
        test: /\.less$/,
        loader: prod
          ? ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
          : 'style!css!less?sourceMap'
      },
      {
        test: /\.(png|gif)$/,
        loader: 'file-loader?name=[sha512:hash:base36:7].[ext]'
      },
      {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file"
      }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("styles.css", {
      allChunks: true
    })
  ]
};
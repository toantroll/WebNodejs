"use strict";

const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  devtool: debug ? 'inline-sourcemap' : null,
  entry: path.join(__dirname, 'src', 'app-client.js'),
  devServer: {
    inline: true,
    port: 3333,
    contentBase: "src/static/",
    historyApiFallback: {
      index: '/index-static.html'
    }
  },
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    publicPath: "/js/",
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      loader: 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0',
    },
  { test: /\.css$/, loader: "style-loader!css-loader" },
     {
       test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
      loader: 'file-loader'
    },
    // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
        }
      },
    {
       test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
         loader: 'url-loader',
         options: {
           limit: 10000,
           mimetype: 'application/font-woff'
       }
     },
     // WOFF2 Font
           {
             test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
               loader: 'url-loader',
               options: {
                 limit: 10000,
                 mimetype: 'application/font-woff'
             }
           },
     {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'

        }
      }
    ]
  },
  plugins: debug ? [] : [

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    }),
  ]
};

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

import _debug from 'debug'
import config, { paths } from './config'
const { __DEV__, __PROD__ } = config.globals
const debug = _debug('server:webpack')

debug('Create configuration.')

const webpackConfig = {
  target: 'node',
  devtool: '#source-map',
  entry: {
    app: [
      'babel-polyfill'
      './index.js'
    ]
  },
  output: {
    path: paths.dist(),
    publicPath: config.compiler_public_path,
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2' // ????????
  },
  resolve: {
    alias: {
      'public': paths.base('./public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process??????
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: __PROD__
          ? ExtractTextPlugin.extract({
              use: 'css-loader?minimize',
              fallback: 'style-loader'
            })
          : ['style-loader', 'css-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: __PROD__ ? 'warning' : false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env)
    }),
    new VueSSRServerPlugin()
  ]
}

if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'common.[chunkhash].css'
    })
  )
} else {
  webpackConfig.plugins.push(new FriendlyErrorsPlugin())
}

module.exports = webpackConfig

const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
require('babel-polyfill')


const config = {
  entry: ['babel-polyfill', './vue/main.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'firebase/public'),
    publicPath: '/firebase/public/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: [
              { loader: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' },
              { loader: 'sass-resources-loader', options: { resources: path.resolve(__dirname, 'vue/assets/sass/global.sass') } }
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              { removeDoctype: true },
              { removeComments: true }
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new Dotenv()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': path.resolve(__dirname, 'vue'),
      '~comp': path.resolve(__dirname, 'vue', 'components')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    contentBase: path.join(__dirname, 'firebase/public'),
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false
      },
      '/socket.io': {
        target: 'http://localhost:4000',
        ws: true,
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}


// export
module.exports = config

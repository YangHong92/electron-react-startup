const webpack = require('webpack');
const path = require('path');
const root = path.resolve(__dirname);
const dest = path.join(root, 'browser-app/dist/js');
const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));


module.exports = {
  //The points where to start the application bundling process
  entry: {
    main: './main.jsx',
    about: './about.jsx',
    tray: './tray.jsx'
  },
  //The base directory, an absolute path, 
  // for resolving entry points and loaders from configuration.
  context: __dirname + '/browser-app/src/js',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    path: dest,
    filename: '[name].js',
    publicPath: 'http://localhost:8080/browser-app/dist/js/'
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }
        ]
      }, {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            modifyVars: {
              themeVariables
            },
            javascriptEnabled: true,
          },
        }]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
}
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
//const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');


const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

var config = [
  {
    mode: 'development',
    entry: APP_DIR + '/js/electron.ts',
    target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false
    },
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: BUILD_DIR,
      filename: 'electron.js'
    },
  },

  {
    mode: 'development',
    entry: APP_DIR + '/js/react.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    node: {
      __dirname: false,
      __filename: false
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: BUILD_DIR,
      filename: 'react.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/html/index.html'
      }),
    ]
  },
];

//config.target = webpackTargetElectronRenderer(config);

module.exports = config;

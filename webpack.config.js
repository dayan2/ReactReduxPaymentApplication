
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//
// module.exports = {
//   //entry: './src/index.js',
//   entry:  {
//     client : "./src/index.js",
//     server : "./server/server.js"
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].js', //filename: 'index_bundle.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       { test:  /\.json$/, loader: 'json-loader' },
//       { test: /\.(js)$/, use: 'babel-loader' },
//       { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
//       { test: /\.scss$/, use: [ 'style-loader', 'css-loader', {
//         loader: 'sass-loader',
//         options: {
//             sourceMap: true,
//         },
//     }]},
//     {
//       test: /\.svg$/,
//       loader: 'svg-inline-loader'
//     }
//     ]
//   },
//   devServer: {
//     historyApiFallback: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html'
//     })
//   ]
// };



// const path = require('path');
//
module.exports = {
  // inform webpack that I am building a bundle for nodejs rather than for the
  // browser
  target: 'node',

  // tell webpack the root file of my server application
  entry: './server/server.js',

  // tells webpack where to put the output file generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  // tells webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            'stage-0',
            ['env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  }
};


// const config = {
//   mode: 'development',
//   devtool: 'inline-source-map',
// };
//
// const nodeConfig = {
//   ...config,
//   target: 'node',
//   entry: './server/server.js',
//
//   // tells webpack where to put the output file generated
//   output: {
//     filename: 'bundle.node.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//
//   // tells webpack to run babel on every file it runs through
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         options: {
//           presets: [
//             'react',
//             'stage-0',
//             ['env', { targets: { browsers: ['last 2 versions'] } }]
//           ]
//         }
//       }
//     ]
//   }
// };
//
// const webConfig = {
//   ...config,
//   node: {
//     crypto: true,
//   },
//   target: 'web',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.web.js', //filename: 'index_bundle.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       { test:  /\.json$/, loader: 'json-loader' },
//       { test: /\.(js)$/, use: 'babel-loader' },
//       { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
//       { test: /\.scss$/, use: [ 'style-loader', 'css-loader', {
//         loader: 'sass-loader',
//         options: {
//             sourceMap: true,
//         },
//     }]},
//     {
//       test: /\.svg$/,
//       loader: 'svg-inline-loader'
//     }
//     ]
//   },
//   devServer: {
//     historyApiFallback: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html'
//     })
//   ]
// };
//
// module.exports = [nodeConfig];

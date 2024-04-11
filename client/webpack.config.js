const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Take Notes Netizens'}),

      new InjectManifest({
          swSrc: './src-sw.js',
          swDest: 'sw.js',
      }),
      
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true, 
        name: 'Take Notes Netizens',
        short_name: 'Take Notes',
        description: 'An app for taking notes',
        background_color: '#01579b',
        theme_color: '#01579b',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ]}),

      ],

    module: {
      // CSS loaders and Babel configuration
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          //use babel-loader to transpile JavaScript files
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        }
        
      ],
    },
  };
};

/* eslint-disable @typescript-eslint/no-var-requires */
/* global require, module, __dirname */

const path    = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: { application: './app/javascript/application.ts' },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFormat: 'module',
    path: path.resolve(__dirname, 'app/assets/builds'),
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      configType: 'flat',
    }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],
};

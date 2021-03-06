/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfig = require('./webpack.config');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const modeEnv = argv.mode || 'development';
  const config = webpackConfig(modeEnv);

  const optimizations = {
    minimizer: [
      // new UglifyJsPlugin(),
    ],
  };

  return {
    plugins: [
      new ESLintPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new Dotenv(),
      new CopyPlugin({
        patterns: [
          {
            from: './src/server/assets/img',
            to: './assets/img',
          },
          {
            from: './src/server/assets/video',
            to: './assets/video',
          },
        ],
      }),
    ],
    resolve: config.resolve,
    module: {
      rules: [config.modules.js, config.modules.sassIsomorph, config.modules.img],
    },
    entry: {
      main: './src/server/Server.tsx',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'server'),
    },
    performance: {
      hints: false,
    },
    optimization: optimizations,
    target: 'node',
    externals: [nodeExternals()],
    stats: {
      children: false,
    },
  };
};

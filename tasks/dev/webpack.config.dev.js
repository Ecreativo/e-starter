/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const isProduction = process.env.NODE_ENV === 'production';

console.log(
  `Running webpack in the ${isProduction ? 'production' : 'development'} mode`,
);

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  plugins: [
    // Force writing the HTML files to disk when running in the development mode
    // (otherwise, webpack-dev-server won’t serve the app)
    new HtmlWebpackHarddiskPlugin(),
    new DashboardPlugin()

  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
  }
});
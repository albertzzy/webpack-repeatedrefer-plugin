const path = require('path')

const webpack = require('webpack');
const rrp = require('webpack-repeatedrefer-plugin');

module.exports = {
  entry: {
    index:'./index.js',
    vendor:['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name:"vendor"
    }),
    new rrp({
      output:__dirname
    })

  ]
}
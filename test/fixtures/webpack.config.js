const path = require('path')

const webpack = require('webpack');
const rrp = require('../../lib/index.js');

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
      outputFile:path.join(__dirname,'res.json')
    })

  ]
}
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); 

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
      //'net$': 'express/lib/request.js' // 'vue/dist/vue.common.js' for webpack 1
      
    }
  },
  module: 
  {
    rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: [
          'vue-style-loader',
          'css-loader']
        },
        { test: /\.(png|svg|jpg|gif)$/, loader: ['file-loader'] },
        { test: /\.js$/, use: 'raw-loader' }
    ]
  },
  plugins:[
    new VueLoaderPlugin()
  ],
  
};
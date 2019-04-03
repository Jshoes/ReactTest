var webpack = require('webpack')
var path= require('path')
var HtmlPlugin = require('webpack-html-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")



var webpackConfig = {
  entry: {
    // app: './src/app.js' ,
	  vendors : [ 'antd', 'isomorphic-fetch', 'react', 'react-dom', 'react-redux', 'react-router', 'redux','redux-logger','redux-thunk','moment','g2','lodash','immutable']
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "client"),
    filename: "[name].bundle.js",
    //chunkFilename: "[name].[chunkhash].js"
    chunkFilename: "[name].js"
  },
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin({name:'vendors',filename:'vendors.js'}),
    // new HtmlPlugin({
    //     // template: path.join(__dirname, 'default_index.html'),
    //     filename: 'app.html',
    //     hash: false,
    //     title: 'App',
    //     hash:true,
    //     cache:false,
    //     showErrors:true,
    //     chunks: ['app','vendors']
    // }),
    // new HtmlPlugin({
    //     // template: path.join(__dirname, 'default_index.html'),
    //     filename: 'Sound.html',
    //     hash: false,
    //     title: 'Sound',
    //     hash:true,
    //     cache:false,
    //     showErrors:true,
    //     chunks: ['Sound','vendors']
    // }),
    // new HtmlPlugin({
    //     // template: path.join(__dirname, 'default_index.html'),
    //     filename: 'Job.html',
    //     hash: false,
    //     title: 'Job',
    //     hash:true,
    //     cache:false,
    //     showErrors:true,
    //     chunks: ['Job','vendors']
    // }),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh_CN/),
	 // extractTxtplugin,
    // new CopyWebpackPlugin([
    //   {
    //     from: 'src/main.js',
    //     to: 'main.js',
    //     transform:function(content,path){
    //       return content.toString().replace('../client/app.html','./app.html')
    //     }
    //   },
    // ]),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'client',
    //     to: 'E:\\workspace\\rms1.0\\WebRoot\\static\\js\\client',
    //     transform:function(content,path){
    //       return content.toString().replace('../client/app.html','./app.html')
    //     }
    //   },
    // ]),
    new webpack.optimize.UglifyJsPlugin({
      mangle: { // 排除不想要压缩的对象名称
           except: ['$super', '$', 'exports', 'require', 'module', '_']
      },
      output: {
         comments: true,  // remove all comments
      },
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.DllPlugin({
        path: 'manifest.json',
        name: '[name]',
        context: __dirname,
    }),
    // new webpack.DefinePlugin({
    //   'APP_VERSION':JSON.stringify(process.env.npm_package_version),
    //   'APP_SERVER':JSON.stringify(process.env.npm_package_config_serverAddress)
    // }),

  ],
  //devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },{
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader','css-loader'], // compiles Less to CSS
    },{
       test: /\.less$/,
	  // use:['style-loader','css-loader']
	   use:ExtractTextPlugin.extract({
			fallback:"style-loader",
			use:[{
				loader:"css-loader"
			},{
				loader:"less-loader"
			}]
		})
    },{
		 test: /\.(eot|woff|woff2|svg|ttf|png)([\?]?.*)$/,
		 use: ["file-loader"]
    }]
  },
  externals: {
    //'lodash': 'Lodash',
   // 'rc-editor-mention':true,
  //  'g2':true,
  //  'mockjs':true
  },
  // resolve: {
  //   "alias": {
  //      'components':  path.resolve(__dirname,'./src/components'),
  //      'common-utils':  path.resolve(__dirname,'./src/Utils'),
  //      'react':'react/cjs/react.production.min',
  //      'react-dom':'react-dom/cjs/react-dom.production.min',
  //      'react/lib/ReactMount':'react-dom',
  //   //   'antd':'antd/dist/antd.min',
  //    //  '~antd/dist/antd':'antd/dist/antd.less'
  //   },
  //   extensions: ['.js', '.jsx'],
  // }
};


module.exports = webpackConfig;

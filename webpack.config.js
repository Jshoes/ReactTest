var webpack = require('webpack')
var path= require('path')
//var HtmlPlugin = require('webpack-html-plugin')
var HtmlPlugin= require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
// const PrerenderSPAPlugin = require('prerender-spa-plugin')


const extractTxtplugin = new ExtractTextPlugin({
    //filename: '[name].[contenthash:8].css',
    filename: '[name].css',
});

var webpackConfig = {
  entry: {
    main: './src/main.js' ,
    Dashboard: './src/app_modules/Dashboard/app' ,
    Job:'./src/app_modules/Job/app',
    Dashboard:'./src/app_modules/Dashboard/app',
    Elite:'./src/app_modules/Elite/app',
    Resume:'./src/app_modules/Resume/app',
    Credit:'./src/app_modules/Credit/app',
    Interview:'./src/app_modules/Interview/app',
    Log:'./src/app_modules/Log/app',
    Notication:'./src/app_modules/Notication/app',
    Member:'./src/app_modules/Member/app',
    SoundList:'./src/app_modules/SoundList/app',
    Settings:'./src/app_modules/Settings/app',
    Member:'./src/app_modules/Member/app',
    Report:'./src/app_modules/Report/app',
    AppWrapper:'./src/app_modules/AppWrapper/app',
    // ApplyForm:'./src/app_modules/Settings/views/ApplyForm.view',
    // WeSite:'./src/app_modules/WeSite/index.js',
	  vendors : [ 'antd', 'isomorphic-fetch', 'react', 'react-dom', 'react-redux', 'react-router', 'redux','redux-thunk','moment']
  },
  // devtool: 'none',
  output: {
    path: path.resolve(__dirname, "client"),
    filename: "[name].bundle.js",
    //chunkFilename: "[name].[chunkhash].js"
    chunkFilename: "[name].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendors',filename:'vendors.js'}),
    new HtmlPlugin({
        template: 'default_index.html',
        filename: 'main.html',
        hash: false,
        title: 'main',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['main','vendors'],
    		window:{
    			APP_SERVER:"http://192.168.1.77:8086"
    		}
      }),

    new HtmlPlugin({
			// template: path.join(__dirname, 'default_index.html'),
			filename: 'Dashboard.html',
			hash: false,
			title: 'Dashboard',
			hash:true,
			cache:false,
			showErrors:true,
			chunks: ['Dashboard','vendors']
	}),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'Notication.html',
        hash: false,
        title: 'notication',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Notication','vendors']
		}),
		new HtmlPlugin({
			// template: path.join(__dirname, 'default_index.html'),
			filename: 'Report.html',
			hash: false,
			title: 'report',
			hash:true,
			cache:false,
			showErrors:true,
			chunks: ['Report','vendors']
	}),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'dashboard.html',
        hash: false,
        title: 'dashboard',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Dashboard','vendors']
    }),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'Log.html',
        hash: false,
        title: 'Log',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Log','vendors']
		}),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'Interview.html',
        hash: false,
        title: 'Interview',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Interview','vendors']
    }),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'Member.html',
        hash: false,
        title: 'Member',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Member','vendors']
    }),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'Job.html',
        hash: false,
        title: 'Job',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Job','vendors']
    }),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'Elite.html',
        hash: false,
        title: 'Elite',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Elite','vendors']
    }),

    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'Credit.html',
        hash: false,
        title: 'Credit',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Credit','vendors']
    }),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'SoundList.html',
        hash: false,
        title: 'SoundList',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['SoundList','vendors']
    }),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'Resume.html',
        hash: false,
        title: 'Resume',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Resume','vendors']
    }),
    new HtmlPlugin({
        // template: path.join(__dirname, 'default_index.html'),
        filename: 'Settings.html',
        hash: false,
        title: 'Settings',
        hash:true,
        cache:false,
        showErrors:true,
        chunks: ['Settings','vendors']
		}),
		new HtmlPlugin({
			// template: path.join(__dirname, 'default_index.html'),
			filename: 'AppWrapper.html',
			hash: false,
			title: 'AppWrapper',
			hash:true,
			cache:false,
			showErrors:true,
			chunks: ['AppWrapper','vendors']
	}),
// 	new HtmlPlugin({
// 		// template: path.join(__dirname, 'default_index.html'),
// 		filename: 'ApplyForm.html',
// 		hash: false,
// 		title: 'ApplyForm',
// 		hash:true,
// 		cache:false,
// 		showErrors:true,
// 		chunks: ['ApplyForm','vendors']
// }),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh_cn/),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new PrerenderSPAPlugin({
    //   // Required - The path to the webpack-outputted app to prerender.
    //   staticDir: path.join(__dirname, 'dist'),
    //   // Required - Routes to render.
    //   routes: [ '/'],
    // }),
	 // extractTxtplugin,

    // new CopyWebpackPlugin([
    //   {
    //     from: 'client',
    //     to: 'E:\\workspace\\rms2.0\\WebRoot\\static\\js\\client',
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
         comments: false,  // remove all comments
      },
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    // new webpack.dllplugin({
    //     path: 'manifest.json',
    //     name: '[name]',
    //     context: __dirname,
    // }),
    new webpack.DefinePlugin({
      // 'process.env': {
      //   NODE_ENV: JSON.stringify('production')
      // },
      'APP_VERSION':JSON.stringify(process.env.npm_package_version),
      'APP_SERVER':JSON.stringify(process.env.npm_package_config_serverAddress)
    }),

  ],
  //devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },{
      test: /\.text$/,
      loader: 'raw-loader'
    // },{
    //   test: /\.css$/,
    //   use: ['style-loader','css-loader'], // compiles Less to CSS
	},{
		test: /\.css$/,
		// exclude: /node_modules/,
		use: [{
				 loader: "style-loader"
		 }, {
				 // loader: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
				 loader: "css-loader"
		 }, ]
	},{
		test: /\.less$/,
		// exclude: /node_modules/,
		use: [{
				loader: "style-loader",
				// exclude: /node_modules/,
		 }, {
				 // loader: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
				loader: "css-loader",
				// exclude: /node_modules/,
		 }, {
				// exclude: /node_modules/,
				loader: "less-loader", options: {
					strictMath: false,
					noIeCompat: true
				}
		 }]
		},{
		 test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
		 use: ["file-loader"]
   },{
      test: /\.hbs$/,
      loader: "handlebars-loader"
   },{
　　　test: /\.(png|jpg)$/,
　　　loader: 'url-loader?limit=528192'
   }]
  },
  externals: {
   // 'lodash': 'Lodash',
   // 'rc-editor-mention':true,
   // 'mockjs':true
  },
  resolve: {
    "alias": {
       'components':  path.resolve(__dirname,'./src/components'),
       'common-utils':  path.resolve(__dirname,'./src/Utils'),
       'react':'react/cjs/react.production.min',
       'react-dom':'react-dom/cjs/react-dom.production.min',
       'react/lib/ReactMount':'react-dom',
    //   'antd':'antd/dist/antd.min',
     //  '~antd/dist/antd':'antd/dist/antd.less'
    },
    extensions: ['.js', '.jsx'],
  }
};


module.exports = webpackConfig;

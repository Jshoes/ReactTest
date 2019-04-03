var proxy = require('koa2-proxy');
var request = require('request');
var cors = require('koa2-cors');
var React = require('react');
var ReactDOM  = require('react-dom/server');

//var App = require('./ServerSideRender')


var cacheCookie;

request('http://hyx.qftx.net/clientlogin/logintest/qftx137?j_KernelVer=1', function(error, response, body) {
  console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
  console.log('header Cookie:', response.headers['set-cookie'].join(";"));
  cacheCookie = response.headers['set-cookie'].join(";");
});

// 本地静态服务器

// 本地模拟文件

// 解析smarty模板


/*
proxy.app.use((ctx, next) => {
  const start = new Date();
  next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log(`[${ctx.method}][${ms}ms] ${ctx.url}`);
})

proxy.app.use((ctx,next)=>{
  console.log(App.App)
  console.log(React.createElement(App.APP))
  var context=ReactDOM.renderToString(React.createElement(App.App))
  ctx.set('Content-Type', 'text/html');
  ctx.body = `
    <!doctype html>
    <html>
      <head><title>koa-webpack-server</title></head>
      <body>${context}</body>
    </html>
  `;
  //next();
})
*/
proxy.app.use(cors({credentials: true}))
// 转发请求到指定host
proxy.when('/', function(ctx) {
  ctx.request.host = 'hyx.qftx.net';
  ctx.request.protocol = 'http';
  ctx.request.header['cookie'] = cacheCookie
});

proxy.when({
  phase: 'response'
}, function(ctx) {
  //  ctx.response.body += '<div>test</div>';

  //  ctx.set('Access-Control-Allow-Origin', '*');
});
// 请求开始时转发本地请求到网络
proxy.on('start', function(ctx) {
  console.log('start: ', ctx.request.url, ctx.isLocal());
  //  console.log('start: ', JSON.stringify(ctx.request.header) );
});
// 请求结束时输出状态
proxy.on('end', function(ctx) {
  //    console.log('response header: ' + JSON.stringify(ctx.response.header));
  //  console.log("end ctx")
  // /  ctx.set('Access-Control-Allow-Origin', '*');

  // console.log('end: ' + ctx.response.get('content-type'));
  // console.log('end: ' + ctx.response.body);
});

// 监听端口
proxy.listen(3010);

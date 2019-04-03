import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import createContainer from 'app-utils/CreateContainer'
import { App } from 'app/layout'
import store, { history, injectReducer } from 'app/store'
import theme from 'app/themes/index.less'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import AppWrapper from './AppWrapper'
import { Error404, Error403 } from 'app_modules/Error'

// import AppRouter from 'app/router'

// console.log(AppRouter)

// ReactDOM.render(
// 	<AppWrapper/>
// 	, createContainer())


const dynamicRouter = (partialNextState, cb, importModule, reducerName) => {
	importModule.then((module) => {
		injectReducer(store, { key: reducerName, reducer: module.reducer })
		cb(null, [module.Routes])
	})
}



function authLogin(nextState, replaceState) {
	var pathname = nextState.location.pathname
	if (!hasPermission(pathname)) {
		replaceState("/403")
	}
}

function RootRoutes() {
	return [{
		path: '*',
		// indexRoute: {
		// 	onEnter: (nextState, replaceState) => replaceState("/dashboard")
		// },
		component: AppWrapper,
		// childRoutes: [
		// 	{
		// 		//   path: 'demo',
		// 		//   breadcrumbName: "demo",
		// 		//   // onEnter: authLogin,
		// 		//
		// 		// 	getChildRoutes:(partialNextState,cb)=>dynamicRouter(partialNextState,cb,import("app_modules/Demo"),"demoReducer")
		// 		// 	// getChildRoutes:dynamicDashboardRoutes
		// 		// }, {
		// 		path: 'dashboard',
		// 		breadcrumbName: "首页",
		// 		// onEnter: authLogin,
		// 		// childRoutes:RouteUtils.createRoutesFromReactChildren(dynamicDashboardRoutes)
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Dashboard"), "dashboardReducer")
		// 		// getChildRoutes:dynamicDashboardRoutes
		// 	}, {
		// 		path: 'soundlist',
		// 		breadcrumbName: "通话录音",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/SoundList"), "soundListReducer")
		// 	}, {
		// 		path: 'log',
		// 		breadcrumbName: "log",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Log"), "logReducer")
		// 	}, {
		// 		path: 'job',
		// 		breadcrumbName: "岗位管理",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Job"), "jobReducer")
		// 	}, {
		// 		path: 'resume',
		// 		breadcrumbName: "简历管理",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Resume"), "resumeReducer")
		// 	}, {
		// 		path: 'elite',
		// 		breadcrumbName: "人才库",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Elite"), "eliteReducer")
		// 	}, {
		// 		path: 'report',
		// 		breadcrumbName: "统计分析",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Report"), "reportReducer")
		// 	}, {
		// 		path: 'interview',
		// 		breadcrumbName: "面试管理",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Interview"), "interviewReducer")
		// 	}, {
		// 		path: 'member',
		// 		breadcrumbName: "员工管理",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Member"), "memberReducer")
		// 	}, {
		// 		path: 'settings',
		// 		breadcrumbName: "系统设置",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Settings"), "settingsReducer")
		// 	}, {
		// 		path: 'credit',
		// 		breadcrumbName: "诚信库",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Credit"), "creditReducer")
		// 	}, {
		// 		path: 'wesite',
		// 		breadcrumbName: "微站管理",
		// 		// onEnter: authLogin,
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/WeSite"), "wesiteReducer")
		// 	}, {
		// 		path: 'personal',
		// 		breadcrumbName: "个人中心",
		// 		getChildRoutes: (partialNextState, cb) => dynamicRouter(partialNextState, cb, import("app_modules/Personal"), "personalReducer")
		// 	}, {
		// 		path: '403',
		// 		breadcrumbName: "没有访问权限",
		// 		component: Error403
		// 	}, {
		// 		path: '404',
		// 		breadcrumbName: "找不到页面",
		// 		component: Error404
		// 	}, {
		// 		path: '*',
		// 		breadcrumbName: "找不到页面",
		// 		indexRoute: {
		// 			onEnter: (nextState, replace) => replace('/404')
		// 		}
		// 	}]
	}
	]
}

export default class AppRouter extends Component {

	render() {
		return (
			<Router routes={RootRoutes()} history={history}></Router>
		)
	}
}
ReactDOM.render(
	<Provider store={store}>
		<AppRouter />
	</Provider>

	, createContainer())

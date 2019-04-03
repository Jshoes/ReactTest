import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import {Router, hashHistory} from 'react-router'
import {routerReducer, syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
// import {persistReducer,persistStore} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import { createReducer } from 'redux-orm';
// import notify from 'redux-notify'
//import { persistState } from 'redux-devtools';

//import DevTools from 'app-utils/DevTools'

import appReducer from '../reducer/'
import notifycation from '../reducer/notifycation'
import dashboardReducer from '../app_modules/Dashboard/reducer'
import resumeReducer from '../app_modules/Resume/reducer'
import interviewReducer from '../app_modules/Interview/reducer'

import orm,{session} from '../model';
const fetchRequestReducer=function(state = {}, action) {
  if(/^fetch:\/\//.test(action.type)){
    let url=action.type.replace(/^fetch:\/\//,"")
    let spins={}
    if(action.payload instanceof Response){
      spins[url]=false
    }else{
      state[url]=true
    }
    return Object.assign({},state,spins)
  }
  return state
}
const ORMReducer = createReducer(orm);
const allReducers=Object.assign({}, {
  ORMReducer,
  appReducer,
  fetchRequestReducer,
  // dashboardReducer,
}, {notifycation,routing: routerReducer})
// })

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers
  })
}



const reducers = makeRootReducer(allReducers);

/*
const persistConfig = {
  key: 'root',
  storage: storage
}

const notifyEvents = [{
  catch:['dashboard_fetch_success','resume_fetch_success'],
  dispatch:[(caller)=>(dispatch,getState)=>{ dispatch({type:"NOTIFY_TOP",caller})}]
}]
*/



const fetchRequestMiddleware = store => next => action => {
  // console.log('dispatching', action.payload)
  // console.log(action.payload instanceof Request)
  if(action.payload && action.payload.request && action.payload.request instanceof Request){
    fetch(action.payload.request).then((res)=>{
      store.dispatch({type:`fetch:\/\/${action.payload.request.url}`,payload:res})
      res.json().then((json)=>{
        if(res.ok == true){
          store.dispatch(action.payload.success.call(this,json))
        }
      }).catch((err)=>{
        store.dispatch({type:`fetch:\/\/${action.payload.request.url}`,payload:res})
        store.dispatch(action.payload.failure.call(this,json))
      })


    })
  }

  // console.log('next state', store.getState())
  return next(action)
}

const panes = {
	'dashboard':{ title: '首页', key: 'dashboard' ,closable: false,src:"/static/js/client/main.html#/dashboard"},
	'log/1':{ title: '消息中心', key: 'log' ,src:"/static/js/client/main.html#/log/1"},
	'log/2':{ title: '消息中心', key: 'log' ,src:"/static/js/client/main.html#/log/2"},
	'log/3':{ title: '消息中心', key: 'log' ,src:"/static/js/client/main.html#/log/3"},
	'log/4':{ title: '消息中心', key: 'log' ,src:"/static/js/client/main.html#/log/4"},
	'log/5':{ title: '消息中心', key: 'log' ,src:"/static/js/client/main.html#/log/5"},
	'resume/list':{ title: '候选人管理', key: 'resume/list' ,src:"/static/js/client/main.html#/resume/list"},
	'resume/distributed':{ title: '待分配简历', key: 'resume/distributed' ,src:"/static/js/client/main.html#/resume/distributed"},
	'job/list':{ title: '职位管理', key: 'job/list' ,src:"/static/js/client/main.html#/job/list"},
	'/job/jobrelease/1/1':{ title: '发布职位', key: 'job/jobrelease' ,refresh:true,src:"/static/js/client/main.html#/job/jobrelease/1/1"},
	'job/search':{ title: '职位导入', key: 'job/search' ,src:"/static/js/client/main.html#/job/search"},
	'interview/list':{ title: '面试管理', key: 'interview/list' ,src:"/static/js/client/main.html#/interview/list"},
	'interview/calendar':{ title: '面试日历', key: 'interview/calendar' ,src:"/static/js/client/main.html#/interview/calendar"},
	'elite':{ title: '人才库', key: 'elite' ,src:"/static/js/client/main.html#/elite"},
	'member/list':{ title: '员工管理', key: 'member/list' ,src:"/static/js/client/main.html#/member/list"},
	'soundlist':{ title: '通话记录', key: 'soundlist' ,src:"/static/js/client/main.html#/soundlist"},
	'settings':{ title: '系统设置', key: 'settings' ,src:"/static/js/client/main.html#/settings"},
	'report':{ title: '统计分析', key: 'report' ,src:"/static/js/client/main.html#/report"},
}
const addTabByRouteMiddleware=(history)=> {
  return () => next => action => {
    if (action.type=='@@router/LOCATION_CHANGE' ) {
			if(action.payload.pathname.indexOf('dashboard')>-1||action.payload.pathname=='/'){
				window.changeTab&&window.changeTab('dashboard')
			}else if(action.payload.pathname.indexOf('log')>-1){

				window.addTab&&window.addTab(panes['log'])
			}else if(action.payload.pathname.indexOf('elite')>-1){
				window.addTab&&window.addTab(panes['elite'])
			}else if(action.payload.pathname.indexOf('settings')>-1){
				window.addTab&&window.addTab(panes['settings'])
			}else{
				window.addTab&&window.addTab(panes[action.payload.pathname])
			}
		}
		return next(action)
  }
}

const reduxRouterMiddleware = routerMiddleware(hashHistory)
const tabMiddleware = addTabByRouteMiddleware(hashHistory)
const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // 允许我们 dispatch() 函数
  reduxRouterMiddleware,
  fetchRequestMiddleware,
  loggerMiddleware, // 一个很便捷的 middleware，用来打印 action 日志
	// notify(notifyEvents)
	tabMiddleware
)(createStore)
//const enhancer = compose(DevTools.instrument())
// const store = createStoreWithMiddleware(reducers,window.__REDUX_DEVTOOLS_EXTENSION__())


//const store = createStoreWithMiddleware(persistReducer(persistConfig, reducers),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = createStoreWithMiddleware(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const history = syncHistoryWithStore(hashHistory, store)
// history.listen((location) => {
//   console.log(location)
//   if(location.state && location.state.breadcrumbName){
//     global.invokeMethod('updateTitle',location.state.breadcrumbName)
//   }
// })
// reduxRouterMiddleware.listenForReplays(store)
// let persistor = persistStore(store)
// export {history,persistor}

store.asyncReducers =allReducers

export const injectReducer = (store,{key,reducer}) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

// notifycation,routing: routerReducer
// injectReducer(store,{key:"notifycation",reducer:notifycation})
// injectReducer(store,{key:"routing",reducer:routerReducer})
// injectReducer(store,{key:"ORMReducer",reducer:ORMReducer})
// injectReducer(store,{key:"appReducer",reducer:appReducer})
injectReducer(store,{key:"dashboardReducer",reducer:dashboardReducer})
injectReducer(store,{key:"resumeReducer",reducer:resumeReducer})
injectReducer(store,{key:"interviewReducer",reducer:interviewReducer})


export {history}

export default store

/*
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

//import reducer from './Users.reducer'

const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
)(createStore)

//const store = createStoreWithMiddleware(reducer)

export default createStoreWithMiddleware
*/


import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import {Router, hashHistory} from 'react-router'
import {routerReducer, syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//import { persistState } from 'redux-devtools';

//import DevTools from 'app-utils/DevTools'
//import dashboardReducer from '../app_modules/Dashboard/reducer'



/*
const persistConfig = {
  key: 'root',
  storage: storage
}
*/

const reduxRouterMiddleware = routerMiddleware(hashHistory)
const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // 允许我们 dispatch() 函数
  reduxRouterMiddleware,
  loggerMiddleware, // 一个很便捷的 middleware，用来打印 action 日志
)(createStore)
//const store = createStoreWithMiddleware(persistReducer(persistConfig, reducers),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// const store = createStoreWithMiddleware(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const createStoreByReducer=function(reducers){
  return createStoreWithMiddleware(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

// let persistor = persistStore(store)
// export {history,persistor}
export default createStoreByReducer

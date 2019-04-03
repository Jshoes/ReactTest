import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {routerReducer, syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import {persistReducer,persistStore} from 'redux-persist'
import notify from 'redux-notify'

const persistConfig = {
  key: 'root',
  storage: storage
}

const notifyEvents = [{
  catch:['dashboard_fetch_success','save Dicts','interview_fetch_success'],
  dispatch:[(caller)=>(dispatch,getState)=>{ dispatch({type:"NOTIFY_TOP",caller})}]
}]

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // 允许我们 dispatch() 函数
  reduxRouterMiddleware,
  loggerMiddleware, // 一个很便捷的 middleware，用来打印 action 日志
  notify(notifyEvents)
)(createStore)

export default createStoreWithMiddleware

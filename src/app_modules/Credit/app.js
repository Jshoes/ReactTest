import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import createContainer from 'app-utils/CreateContainer'
import {Routes,reducer,Redirect} from './index'
import {App} from 'app/layout'
import store, {history,injectReducer} from 'app/store'
import theme from 'app/themes/index.less'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'

var AppRouter = (
  <Router path="/credit" >
    {Routes.props.children}
  </Router>
)

// console.log(AppRouter)
injectReducer(store,{key:'creditReducer',reducer:reducer})

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={store}>
      <App>
        <Router routes={AppRouter} history={history}></Router>
      </App>
    </Provider>
  </LocaleProvider>
, createContainer())
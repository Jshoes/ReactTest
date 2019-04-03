
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory} from 'react-router'
import createContainer from 'app-utils/CreateContainer'
import AppRouter from './router'
import {Provider} from 'react-redux'
import store, {history} from '../../store'

//    <Router  routes={AppRouter()} history={history}></Router>

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    {AppRouter()}
    </Router>
  </Provider>
, createContainer())

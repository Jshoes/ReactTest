
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory} from 'react-router'
import createContainer from 'app-utils/CreateContainer'
import Routes from './routes'
import {Provider} from 'react-redux'
import store, {history} from '../../store'
import reducer from './reducer'
import theme from '../../themes/themes.less'
import createRoutes from 'app-utils/CreateRoutes'

var AppRouter = (
  <Router path="/">
    {Routes.props.children}
  </Router>
)


// ReactDOM.render(
//   <Provider store={store}>
//     <Router routes={AppRouter} history={history} ></Router>
//   </Provider>
// , createContainer())

export {Routes,reducer}

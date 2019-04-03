
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, hashHistory} from 'react-router'
import Routes from './routes'
import reducer from './reducer'
import {Provider} from 'react-redux'
import theme from '../../themes/themes.less'


var AppRouter = (
  <Router path="/">
    {Routes.props.children}
  </Router>
)


// ReactDOM.render(
//   <Provider store={store}>
//     <Router routes={AppRouter} history={history}></Router>
//   </Provider>
// , createContainer())

export {Routes,reducer}

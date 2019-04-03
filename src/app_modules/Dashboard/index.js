
import React, {Component} from 'react'
import {Router, hashHistory} from 'react-router'
import Routes from './routes'
import reducer from './reducer'
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
//
export default AppRouter
export {Routes,reducer}

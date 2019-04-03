import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute} from 'react-router'

import Container from './container'
import Routes from './routes'
import reducer from './reducer'
import {Provider} from 'react-redux'
import store, {history} from '../../store'
import theme from '../../themes/themes.less'
import createRoutes from 'app-utils/CreateRoutes'
/*
let Routes = (
  <Router>
    <IndexRoute component={Container}/>
  </Router>
)

export default Routes
*/

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


import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute} from 'react-router'
import Container, {DashboardFormContainer,MessageCenterContainer} from './container'
import {RoutesResume} from '../Resume/routes'

let Routes = (
  <Router>
    <IndexRoute component={Container} />
    <Router component={Container}>
      <Route path="add" component={DashboardFormContainer} breadcrumbName="添加待办事件"/>
      <Route path="edit/:id" component={DashboardFormContainer} breadcrumbName="编辑待办事件"/>
      {React.createElement(Route,{},RoutesResume.props.children)}
    </Router>
    <Route path="message/:type" components={MessageCenterContainer} breadcrumbName="消息中心"/>
  </Router>
)
export {Container,RoutesResume}
export default Routes

import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute} from 'react-router'

import Container,{creditFormContainer} from './container'
import {DetailContainer} from '../Job/container'
import {ResumeDetailContainer} from '../Resume/container'
let Routes = (
  <Router>
    <IndexRoute component={Container}/>
    <Route path="list" components={null}/>
    <Route path=":resumeId/add" components={creditFormContainer} breadcrumbName="诚信记录"/>
    <Route path=":resumeId/detail" components={ResumeDetailContainer}/>{/*面试和诚信的id和resumeid互换位置 调取简历详情的时候*/}
  </Router>
)
export {Container}
export default Routes

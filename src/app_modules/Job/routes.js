import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute} from 'react-router'

import Container, {iframeContainer,DetailContainer,JobResetContainer,syncContainer,SearchJobContainer,JobPostReleaseContainer,ChangeDeptFormContainer,ChangeChargerFormContainer,ChangeFeederFormContainer} from './container'
import {OfferFormContainer,EntryFormContainer,RelatedFormContainer,JoinFormContainer,FeedFormContainer,FeedbackFormContainer,RejectFormContainer} from '../Resume/container'
import {ResumeDetailContainer} from '../Resume/container'
import {creditFormContainer} from '../Credit/container'
import {SearchContainer} from '../Resume/container'
import {RoutesResume} from '../Resume/routes'

let Routes = (
  <Router>
    <Route path="list" components={Container}>
      <Route path="sync" components={syncContainer} breadcrumbName="职位刷新"/>
      <Route path="changeDept" components={ChangeDeptFormContainer} breadcrumbName="修改部门"/>
      <Route path="changeCharger" components={ChangeChargerFormContainer} breadcrumbName="修改负责人"/>
      <Route path="changeFeeder" components={ChangeFeederFormContainer} breadcrumbName="修改面试官"/>
      <Route path=":jobId/searchResume(/query/:type)" components={SearchContainer}>
        <Route path=":jobDetailId/jobDetail" components={DetailContainer}/>
        {React.createElement(Route,{},RoutesResume.props.children)}
      </Route>
      </Route>
        {/*
        *step 当前tabs
        *jobId 职位id
        *type 编辑或新增
        */}
      <Route path="jobrelease(/:jobId)/:max/:step" components={JobPostReleaseContainer} breadcrumbName="职位发布">
        <Route path="changeCharger" components={ChangeChargerFormContainer} breadcrumbName="修改负责人"/>
        <Route path="changeFeeder" components={ChangeFeederFormContainer} breadcrumbName="修改面试官"/>
        <Route path="reset" components={JobResetContainer} breadcrumbName="修改面试官"/>
      </Route>

    <Route path="search" components={SearchJobContainer} />
    <Route path="iframe/:type" components={iframeContainer}/>
  </Router>
)

export default Routes

import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute,IndexRedirect} from 'react-router'

import Container,{connectContainer,addContainer,addFollowContainer,RecommondFormContainer,Move2EliteFormContainer,Relate2JobFormContainer} from './container'
import {
	SearchContainer,
  LabelFormContainer,
  ResumeDetailContainer,
  OfferFormContainer,
  EntryFormContainer,
  RelatedFormContainer,
  RejectFormContainer,
  FeedFormContainer,
  FolderContainer,
  RemarksFormContainer ,
  ResumeRemarkContainer,
  DistributedContainer,
  DistributedJobContainer,
  TalentFormContainer,
  DistributedFormContainer,
  Forward2OtherFormContainer,
  Recommend2OtherFormContainer,
  FollowFormContainer,
  DeleteFormContainer,
  CreditFilingReasonFormContainer,
  JoinTalentFormContainer
} from '../Resume/container'

import {creditFormContainer} from '../Credit/container'
import {DelayContainer,FeedBackFormContainer} from '../Interview/container'
let eliteRoute = (
  <Router path=":resumeId">
    <Route path=":resumeId/detail" components={ResumeDetailContainer}>
      <Route path="connect" components={connectContainer} breadcrumbName="关联职位"/>

			<Route path="add" components={creditFormContainer} breadcrumbName="诚信记录" />
      <Route path="entry" components={EntryFormContainer} breadcrumbName="入职"/>
      <Route path="connect" components={Relate2JobFormContainer} breadcrumbName="关联职位"/>
      <Route path="feed" components={FeedFormContainer} breadcrumbName="面试安排"/>
      <Route path="feedback" components={FeedBackFormContainer} breadcrumbName="面试反馈"/>
      <Route path="reject" components={RejectFormContainer} breadcrumbName="拒绝"/>
      <Route path="delay" components={DelayContainer} breadcrumbName="面试时间调整"/>
      <Route path="remarks" components={RemarksFormContainer} breadcrumbName="备注"/>
      <Route path="forward" components={Forward2OtherFormContainer} breadcrumbName="转发给用人部门"/>
      <Route path="recommend" components={Recommend2OtherFormContainer} breadcrumbName="推荐给其他部门"/>
      <Route path="label" components={LabelFormContainer} breadcrumbName="标签"/>
      <Route path="joinelite" components={JoinTalentFormContainer} breadcrumbName="加入人才库"/>
      <Route path="addcredit" components={CreditFilingReasonFormContainer} breadcrumbName="加入诚信库"/>
      <Route path="follow" components={FollowFormContainer} breadcrumbName="跟进提醒"/>
      <Route path="delete" components={DeleteFormContainer} breadcrumbName="删除候选人"/>
      <Route path="distr/:type" components={DistributedFormContainer} breadcrumbName="分配职位"/>
      <Route path="talent/:type" components={TalentFormContainer} breadcrumbName="放入人才库"/>
    </Route>
    <Route path=":resumeId(/detail)/connect" components={connectContainer} breadcrumbName="关联职位"/>

  </Router>
)

let Routes = (
  <Router >
      <IndexRoute component={Container} />
			<IndexRedirect to="3" />
			<Route path=":type" components={Container}>
				{React.createElement(Route,{},eliteRoute.props.children)}
				<Route path="recommond" components={RecommondFormContainer} breadcrumbName="推荐给面试官"/>
				<Route path="move" components={Move2EliteFormContainer} breadcrumbName="移入人才库"/>
				<Route path="relate" components={Relate2JobFormContainer} breadcrumbName="关联职位"/>
			</Route>
			{/*folowing may useless*/}
      <Route path="list" component={Container}>
        {React.createElement(Route,{},eliteRoute.props.children)}
        <Route path="addElite" components={addContainer} breadcrumbName="新增人才"/>
        <Route path="addFollow" components={addFollowContainer} breadcrumbName="新增人才跟进"/>
      </Route>
  </Router>
)

export {Container}
export default Routes

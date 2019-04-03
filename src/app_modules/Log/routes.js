
import React, { Component } from 'react'
import ReactRouter, { Router, Route, IndexRoute,  } from 'react-router'
import { LogListContainer,LogDetailContainer } from './container'
import {
  ResumeDetailContainer,
  EntryFormContainer,
  RelatedFormContainer,
  FeedbackFormContainer,
  RejectFormContainer,
  FeedFormContainer,
  RemarksFormContainer ,
  Forward2OtherFormContainer,
  Recommend2OtherFormContainer,
  FilingReasonFormContainer,
  FollowFormContainer,
  DeleteFormContainer,
  CreditFilingReasonFormContainer
} from '../Resume/container'

import {creditFormContainer} from '../Credit/container'
import {DelayContainer} from '../Interview/container'

let Routes = (
	<Router>
    <IndexRoute component={LogListContainer}/>
		<Route path=":type" component={LogListContainer}>
			<Route path="detail/:messageId" components={LogDetailContainer}/>
			<Route path=":resumeId/detail" components={ResumeDetailContainer} breadcrumbName="人才详情">
				<Route path="add" components={creditFormContainer} breadcrumbName="诚信记录" />
				<Route path="entry" components={EntryFormContainer} breadcrumbName="入职"/>
				<Route path="related" components={RelatedFormContainer} breadcrumbName="关联职位"/>
				<Route path="feed" components={FeedFormContainer} breadcrumbName="面试安排"/>
				<Route path="feedback" components={FeedbackFormContainer} breadcrumbName="面试反馈"/>
				<Route path="reject" components={RejectFormContainer} breadcrumbName="拒绝"/>
				<Route path="delay" components={DelayContainer} breadcrumbName="面试时间调整"/>
				<Route path="remarks" components={RemarksFormContainer} breadcrumbName="备注"/>
				<Route path="forward" components={Forward2OtherFormContainer} breadcrumbName="转发给用人部门"/>
				<Route path="recommend" components={Recommend2OtherFormContainer} breadcrumbName="推荐给其他部门"/>
				<Route path="addelite" components={FilingReasonFormContainer} breadcrumbName="加入人才库"/>
				<Route path="addcredit" components={CreditFilingReasonFormContainer} breadcrumbName="加入诚信库"/>
				<Route path="follow" components={FollowFormContainer} breadcrumbName="跟进提醒"/>
				<Route path="delete" components={DeleteFormContainer} breadcrumbName="删除候选人"/>
			</Route>
		</Route>
	</Router>
)
// export { Container }
export default Routes

import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute} from 'react-router'

import Container,{
  SearchContainer,
  LabelFormContainer,
  ResumeDetailContainer,
  ResumeDetailTabContainer,
  ResumeDetailSameContainer,
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
} from './container'
import {Relate2JobFormContainer} from '../Elite/container'
import {DetailContainer} from '../Job/container'
import {creditFormContainer} from '../Credit/container'
import {DelayContainer,FeedBackFormContainer} from '../Interview/container'
// let Routes = (
//   <Router component={null}>
//
//     <Route path="list" components={Container}>
//       <Route path="detail/:id/:resumeId" components={ResumeDetailContainer}/>
//       <Route path="jobDetail/:jobDetailId" components={DetailContainer}/>
//       <Route path="add/:resumeId" components={creditFormContainer} breadcrumbName="诚信记录" />
//       <Route path=":resumeId/offer" components={OfferFormContainer} breadcrumbName="offer"/>
//       <Route path=":resumeId/entry" components={EntryFormContainer} breadcrumbName="入职"/>
//       <Route path=":resumeId/:resumeIdentityId/related" components={RelatedFormContainer} breadcrumbName="关联职位"/>
//       <Route path=":resumeId/feed" components={FeedFormContainer} breadcrumbName="面试"/>
//       <Route path=":resumeId/feedback" components={FeedbackFormContainer} breadcrumbName="面试反馈"/>
//       <Route path=":resumeId/reject" components={RejectFormContainer} breadcrumbName="拒绝"/>
//       <Route path=":resumeId/join" components={JoinFormContainer} breadcrumbName="加入人才库"/>
//     </Route>
//     <Route path="folder" components={FolderContainer}>
//       <Route path="jobDetail/:jobDetailId" components={DetailContainer} />
//       <Route path="detail/:id/:resumeId" components={ResumeDetailContainer} />
//       <Route path="add/:resumeId" components={creditFormContainer} breadcrumbName="诚信记录" />
//       <Route path=":resumeId/offer" components={OfferFormContainer} breadcrumbName="offer"/>
//       <Route path=":resumeId/entry" components={EntryFormContainer} breadcrumbName="入职"/>
//       <Route path=":resumeId/:resumeIdentityId/related" components={RelatedFormContainer} breadcrumbName="关联职位"/>
//       <Route path=":resumeId/feed" components={FeedFormContainer} breadcrumbName="面试安排"/>
//       <Route path=":resumeId/feedback" components={FeedbackFormContainer} breadcrumbName="面试反馈"/>
//       <Route path=":resumeId/reject" components={RejectFormContainer} breadcrumbName="拒绝"/>
//       <Route path=":resumeId/join" components={JoinFormContainer} breadcrumbName="加入人才库"/>
//     </Route>
//   </Router>
// )
/*joinelite是详情中添加人才的路由*/
let RoutesResume =(
  <Router path=":resumeId">
    <Route path=":resumeId/detail" components={ResumeDetailContainer}>
      <Route path="add" components={creditFormContainer} breadcrumbName="诚信记录" />
      <Route path="entry" components={EntryFormContainer} breadcrumbName="入职"/>
      <Route path="connect" components={Relate2JobFormContainer} breadcrumbName="关联职位"/>
      <Route path="feed" components={FeedFormContainer} breadcrumbName="面试安排"/>
      <Route path="feedback" components={FeedBackFormContainer} breadcrumbName="面试反馈"/>
      <Route path="reject" components={RejectFormContainer} breadcrumbName="拒绝"/>
      <Route path="delay" components={DelayContainer} breadcrumbName="面试时间调整"/>
      <Route path="remarks" components={RemarksFormContainer} breadcrumbName="备注"/>
      <Route path="forward" components={Forward2OtherFormContainer} breadcrumbName="发送给面试官"/>
      <Route path="recommend" components={Recommend2OtherFormContainer} breadcrumbName="推荐给其他部门"/>
      <Route path="label" components={LabelFormContainer} breadcrumbName="标签"/>
      <Route path="joinelite" components={JoinTalentFormContainer} breadcrumbName="转入公共人才库"/>
      <Route path="addcredit" components={CreditFilingReasonFormContainer} breadcrumbName="加入诚信库"/>
      <Route path="follow" components={FollowFormContainer} breadcrumbName="跟进提醒"/>
      <Route path="delete" components={DeleteFormContainer} breadcrumbName="删除候选人"/>
      <Route path="distr/:type" components={DistributedFormContainer} breadcrumbName="分配职位"/>
      <Route path="talent/:type" components={TalentFormContainer} breadcrumbName="放入人才库"/>
    </Route>
    <Route path=":resumeId(/detail)/add" components={creditFormContainer} breadcrumbName="诚信记录" />
    <Route path=":resumeId(/detail)/entry" components={EntryFormContainer} breadcrumbName="入职"/>
    <Route path="connect" components={Relate2JobFormContainer} breadcrumbName="关联职位"/>
    <Route path=":resumeId(/detail)/feed" components={FeedFormContainer} breadcrumbName="面试安排"/>
    <Route path=":resumeId(/detail)/feedback" components={FeedBackFormContainer} breadcrumbName="面试反馈"/>
    <Route path=":resumeId(/detail)/reject" components={RejectFormContainer} breadcrumbName="拒绝"/>
    <Route path=":resumeId/delay" components={DelayContainer} breadcrumbName="面试时间调整"/>
    <Route path=":resumeId/remarks" components={RemarksFormContainer} breadcrumbName="备注"/>
    <Route path="forward" components={Forward2OtherFormContainer} breadcrumbName="发送给面试官"/>
    <Route path="recommend" components={Recommend2OtherFormContainer} breadcrumbName="推荐给其他部门"/>
    <Route path="joinelite" components={JoinTalentFormContainer} breadcrumbName="转入公共人才库"/>
    <Route path="addcredit" components={CreditFilingReasonFormContainer} breadcrumbName="加入诚信库"/>
    <Route path="follow" components={FollowFormContainer} breadcrumbName="跟进提醒"/>
    <Route path="delete" components={DeleteFormContainer} breadcrumbName="删除候选人"/>
    <Route path="distr/:type" components={DistributedFormContainer} breadcrumbName="分配职位"/>
    <Route path="talent/:type" components={TalentFormContainer} breadcrumbName="放入人才库"/>

    <Route path=":resumeId/samedetail" components={ResumeDetailSameContainer}>
      <Route path="add" components={creditFormContainer} breadcrumbName="诚信记录" />
      <Route path="entry" components={EntryFormContainer} breadcrumbName="入职"/>
      <Route path="connect" components={Relate2JobFormContainer} breadcrumbName="关联职位"/>
      <Route path="feed" components={FeedFormContainer} breadcrumbName="面试安排"/>
      <Route path="feedback" components={FeedBackFormContainer} breadcrumbName="面试反馈"/>
      <Route path="reject" components={RejectFormContainer} breadcrumbName="拒绝"/>
      <Route path="delay" components={DelayContainer} breadcrumbName="面试时间调整"/>
      <Route path="remarks" components={RemarksFormContainer} breadcrumbName="备注"/>
      <Route path="forward" components={Forward2OtherFormContainer} breadcrumbName="发送给面试官"/>
      <Route path="recommend" components={Recommend2OtherFormContainer} breadcrumbName="推荐给其他部门"/>
      <Route path="label" components={LabelFormContainer} breadcrumbName="标签"/>
      <Route path="joinelite" components={JoinTalentFormContainer} breadcrumbName="转入公共人才库"/>
      <Route path="addcredit" components={CreditFilingReasonFormContainer} breadcrumbName="加入诚信库"/>
      <Route path="follow" components={FollowFormContainer} breadcrumbName="跟进提醒"/>
      <Route path="delete" components={DeleteFormContainer} breadcrumbName="删除候选人"/>
      <Route path="distr/:type" components={DistributedFormContainer} breadcrumbName="分配职位"/>
      <Route path="talent/:type" components={TalentFormContainer} breadcrumbName="放入人才库"/>
    </Route>

    <Route path=":resumeId/tabdetail" components={ResumeDetailTabContainer}>
      <Route path="add" components={creditFormContainer} breadcrumbName="诚信记录" />
      <Route path="entry" components={EntryFormContainer} breadcrumbName="入职"/>
      <Route path="connect" components={Relate2JobFormContainer} breadcrumbName="关联职位"/>
      <Route path="feed" components={FeedFormContainer} breadcrumbName="面试安排"/>
      <Route path="feedback" components={FeedBackFormContainer} breadcrumbName="面试反馈"/>
      <Route path="reject" components={RejectFormContainer} breadcrumbName="拒绝"/>
      <Route path="delay" components={DelayContainer} breadcrumbName="面试时间调整"/>
      <Route path="remarks" components={RemarksFormContainer} breadcrumbName="备注"/>
      <Route path="forward" components={Forward2OtherFormContainer} breadcrumbName="发送给面试官"/>
      <Route path="recommend" components={Recommend2OtherFormContainer} breadcrumbName="推荐给其他部门"/>
      <Route path="label" components={LabelFormContainer} breadcrumbName="标签"/>
      <Route path="joinelite" components={JoinTalentFormContainer} breadcrumbName="转入公共人才库"/>
      <Route path="addcredit" components={CreditFilingReasonFormContainer} breadcrumbName="加入诚信库"/>
      <Route path="follow" components={FollowFormContainer} breadcrumbName="跟进提醒"/>
      <Route path="delete" components={DeleteFormContainer} breadcrumbName="删除候选人"/>
      <Route path="distr/:type" components={DistributedFormContainer} breadcrumbName="分配职位"/>
      <Route path="talent/:type" components={TalentFormContainer} breadcrumbName="放入人才库"/>
    </Route>
  </Router>
)

let Routes = (
  <Router component={null}>
    <Route path="list(/query/:status(/:jobId))" components={Container}>
      {React.createElement(Route,{},RoutesResume.props.children)}
    </Route>
    <Route path="folder" components={FolderContainer}>
      {React.createElement(Route,{},RoutesResume.props.children)}
    </Route>
		<Route path="search/:type/:text" components={SearchContainer}>
      {React.createElement(Route,{},RoutesResume.props.children)}
    </Route>
    <Route path="distributed" components={DistributedContainer}>
      <Route path="distr/:type" components={DistributedFormContainer} breadcrumbName="分配职位"/>
      <Route path="talent/:type" components={TalentFormContainer} breadcrumbName="放入人才库"/>
    </Route>
    <Route path="distrib/:id" components={DistributedJobContainer}>
      {React.createElement(Route,{},RoutesResume.props.children)}
    </Route>
  </Router>
)
export {Container,RoutesResume}
export default Routes


// export {Container}
// export default Routes

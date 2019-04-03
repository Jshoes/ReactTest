import React, {Component} from 'react'
import ReactRouter, {Router, Route, IndexRoute,IndexRedirect} from 'react-router'

import Container,{commincateContainer,hrReportContainer,ReportListContainer,ReasonReportContainer,WorkloadReportContainer,RecruitmentReportContainer,FeedbackReportContainer,ChannelReportContainer,CallReportContainer,RemarkReportContainer} from './container'

let Routes = (
  <Router>
		<IndexRedirect to="recruitment"/>
    <Route path="recruitment" components={RecruitmentReportContainer}/>
    <Route path="workload" components={WorkloadReportContainer}/>
    <Route path="feedback" components={FeedbackReportContainer}/>
    <Route path="channel" components={ChannelReportContainer}/>
    <Route path="call" components={CallReportContainer}/>
    <Route path="reason" components={ReasonReportContainer}/>
    <Route path="remark" components={RemarkReportContainer}/>
		{/* <Route path=":type" components={ReportListContainer}/> */}
		{/* last version */}
    <Route path="commin" components={commincateContainer}/>
    <Route path="hrreport" components={hrReportContainer} />
  </Router>
)

export {Container}
export default Routes

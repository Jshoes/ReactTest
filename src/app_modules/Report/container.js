/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-24T13:02:32+08:00
* @description:  connect state to view props for redux
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import SideLayout from 'app/decorators/SideLayout'

import ReportSideView from './views/ReportSide.view'
import ReportListView from './views/ReportList.view'
import ReasonReportView from './views/ReasonReport.view'
import RecruitmentReportView from './views/RecruitmentReport.view'
import WorkloadReportView from './views/WorkloadReport.view'
import FeedbackReportView from './views/FeedbackReport.view'
import ChannelReportView from './views/ChannelReport.view'
import CallReportView from './views/CallReport.view'
import RemarkReportView from './views/RemarkReport.view'
import ReportFormView from './Remind.view'
import ReportComView from './ReportCom.view'
import ReportHrView from './Reporthr.view'
import * as actions from './action'

const mapStateToProps = (state) => {
  return {reduce: state.reportReducer,appConfig:state.appReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

let ReportListContainer = connect((state,ownProps)=>{
	return {
		// items:reducerListSelector(state.ORMReducer,"Log"),
		// appReducer:state.appReducer,
		// logReducer:state.logReducer
  }
}, mapDispatchToProps, null, {pure: false})(SideLayout(ReportSideView)(ReportListView))
let ReasonReportContainer = connect((state,ownProps)=>{
	return {
		// items:reducerListSelector(state.ORMReducer,"Log"),
		appReducer:state.appReducer,
		reduce:state.reportReducer
  }
}, mapDispatchToProps, null, {pure: false})(SideLayout(ReportSideView)(ReasonReportView))

let Container = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideLayout(ReportSideView)(ReportFormView))



let RecruitmentReportContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideLayout(ReportSideView)(RecruitmentReportView))

let WorkloadReportContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideLayout(ReportSideView)(WorkloadReportView))

let FeedbackReportContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideLayout(ReportSideView)(FeedbackReportView))

let ChannelReportContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideLayout(ReportSideView)(ChannelReportView))

let CallReportContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideLayout(ReportSideView)(CallReportView))

let RemarkReportContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideLayout(ReportSideView)(RemarkReportView))



let commincateContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(ReportComView)
let hrReportContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(ReportHrView)

export { commincateContainer, hrReportContainer,ReportListContainer,ReasonReportContainer,WorkloadReportContainer,RecruitmentReportContainer,FeedbackReportContainer,ChannelReportContainer,CallReportContainer,RemarkReportContainer}
export default Container;

/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-15T10:23:59+08:00
* @description:  connect state to view props for redux
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import WrapperComponent from 'app/decorators/WrapperComponent'
import ModalView,{ModalWidthView} from 'app/components/Modal.view'
import SideLayout from 'app/decorators/SideLayout'
import JobDetailView from './views/JobDetail.view'
import JobviewSlide from './views/JobSlide.view'
import JobListView from './views/JobList.view'
import ChangeDeptView from './views/ChangeDept.view'
import ChangeChargerView from './views/ChangeCharger.view'
import ChangeFeederView from './views/ChangeFeeder.view'
import JobSearchView from './views/JobImportSearch.view'
import JobPostRelease from './views/JobPostRelease.view'
import JobResetView from './views/JobReset.view'
import IframeView from './views/iframe.view'
import SyncChannel from './views/syncChannel'
import * as actions from './action'

import {reducerListSelector,reducerItemSelector} from 'app-model/reducerSelector'

const mapStateToProps = (state) => {
  return {reduce: state.jobReducer,appConfig:state.appReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

let Container = connect((state)=>({
    items:reducerListSelector(state.ORMReducer,"Job"),
    appReducer:state.appReducer,
    reduce:state.jobReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(JobviewSlide)(JobListView))

// let FollowFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FollowFormView)
// let Container = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(JobListView)
let DetailContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(JobDetailView)
let iframeContainer= connect(mapStateToProps,mapDispatchToProps,null,{pure: false})(IframeView)
let syncContainer= connect(mapStateToProps,mapDispatchToProps,null,{pure: false})(SyncChannel)
let SearchJobContainer = connect(mapStateToProps,mapDispatchToProps,null,{pure:false})(JobSearchView)
let JobPostReleaseContainer = connect((state,props)=>{
  return {
  item:reducerItemSelector(state.ORMReducer,"Job",props.params.jobId),
  reduce: state.jobReducer,
  appReducer:state.appReducer
}},mapDispatchToProps,null,{pure:false})(JobPostRelease)

let JobResetContainer = connect((state,props)=>{
  return {
  item:reducerItemSelector(state.ORMReducer,"Job",props.params.jobId),
  reduce: state.jobReducer,
  appReducer:state.appReducer
}},mapDispatchToProps,null,{pure:false})(WrapperComponent(ModalView)(JobResetView))

let ChangeDeptFormContainer = connect(mapStateToProps,mapDispatchToProps,null,{pure:false})(WrapperComponent(ModalView)(ChangeDeptView))
let ChangeChargerFormContainer = connect(mapStateToProps,mapDispatchToProps,null,{pure:false})(WrapperComponent(ModalView)(ChangeChargerView))
let ChangeFeederFormContainer = connect(mapStateToProps,mapDispatchToProps,null,{pure:false})(WrapperComponent(ModalView)(ChangeFeederView))


export {iframeContainer,DetailContainer,JobResetContainer,syncContainer,SearchJobContainer,JobPostReleaseContainer,ChangeDeptFormContainer,ChangeChargerFormContainer,ChangeFeederFormContainer}

export default Container;

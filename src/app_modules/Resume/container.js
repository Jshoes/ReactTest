/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-11T15:48:17+08:00
* @description:  connect state to view props for redux
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import SideLayout from 'app/decorators/SideLayout'
import WrapperComponent from 'app/decorators/WrapperComponent'
import ModalView,{ModalWidthView,ModalDetailView} from 'app/components/Modal.view'
import ResumeListView from './views/ResumeList.view'
import ResumeDetailView from './views/ResumeDetail.view'
import ResumeDetailSameView from './views/ResumeDetailSame.view'

import EntryFormView from './views/EntryForm.view'
import RelatedFormView from './views/RelatedForm.view'
import FeedFormView from './views/FeedForm.view'
import RejectFormView from './views/RejectForm.view'
import LabelFormView from './views/LabelForm.view'
import RemarksFormView from './views/remarksForm.view'
import ResumeFolderListView from './views/ResumeFolderList.view'
import ResumeSearchListView from './views/SearchResult.view'

import JoinTalentFormView from './views/JoinTalentAction.view'

import CreditFilingReasonFormView from './views/CreditFilingReason.view'
import DeleteFormView from './views/DeleteResume.view'
import FollowFormView from './views/Follow.view'
import Forward2OtherFormView from './views/Forward2Other.view'
import Recommend2OtherFormView from './views/Recommend2Other.view'
import ResumeRemarkView from './views/ResumeRemark.view'


import DistributedView from './views/Distributed.view'
import DistributedForm from './views/DistributedAction.view'
import TalentForm from './views/TalentAction.view'
import DistributedJob from './views/DistributedJob.view'

import ResumeSide from './views/ResumeSlide.view'
import * as actions from './action'


import {reducerListSelector,reducerItemSelector} from 'app-model/reducerSelector'

const mapStateToProps = (state) => {
  return {reduce: state.resumeReducer,appConfig:state.appReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

let Container = connect((state)=>({
    items:reducerListSelector(state.ORMReducer,"Resume"),
    reduce:state.resumeReducer,
    appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(ResumeSide)(ResumeListView))

let SearchContainer = connect((state)=>({
    items:reducerListSelector(state.ORMReducer,"Resume"),
    reduce:state.resumeReducer
}), mapDispatchToProps, null, {pure: false})(ResumeSearchListView)


let ResumeDetailContainer = connect((state,props)=>({
    item:reducerItemSelector(state.ORMReducer,"Resume",props.params.resumeId),
    reduce:state.resumeReducer
}), mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalDetailView)(ResumeDetailView))

let ResumeDetailTabContainer = connect((state,props)=>({
    item:reducerItemSelector(state.ORMReducer,"Resume",props.params.resumeId),
    reduce:state.resumeReducer
}), mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalDetailView)(ResumeDetailView))

//let ResumeDetailTabContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(ResumeDetailView)

let ResumeDetailSameContainer = connect((state,props)=>({
    item:reducerItemSelector(state.ORMReducer,"Resume",props.params.resumeId),
    reduce:state.resumeReducer
}), mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalDetailView)(ResumeDetailSameView))

let DistributedContainer = connect((state,ownProps)=>{
  return {
    items:reducerListSelector(state.ORMReducer,"Distributed"),
    reduce:state.resumeReducer
  }
}, mapDispatchToProps, null, {pure: false})(DistributedView)

let DistributedJobContainer = connect((state,ownProps)=>{
  return {
    items:reducerListSelector(state.ORMReducer,"Resume"),
    reduce:state.resumeReducer
  }
}, mapDispatchToProps, null, {pure: false})(DistributedJob)


let DistributedFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(DistributedForm))
let TalentFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(TalentForm))
let JoinTalentFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(JoinTalentFormView))

// let Container = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(ResumeListView)
let EntryFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(EntryFormView))
let RelatedFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalWidthView)(RelatedFormView))
let RejectFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(RejectFormView))
let FeedFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalWidthView)(FeedFormView))

let Forward2OtherFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(Forward2OtherFormView))
let Recommend2OtherFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(Recommend2OtherFormView))
let CreditFilingReasonFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(CreditFilingReasonFormView))
let FollowFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(FollowFormView))
let DeleteFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(DeleteFormView))

let FolderContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(ResumeFolderListView)
let LabelFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WrapperComponent(ModalView)(LabelFormView))
let RemarksFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(RemarksFormView)
let ResumeRemarkContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(ResumeRemarkView)
export {
  ResumeDetailContainer,
  ResumeDetailSameContainer,
  ResumeDetailTabContainer,
  EntryFormContainer,
  RelatedFormContainer,
  RejectFormContainer,
  FeedFormContainer,
  FolderContainer,
  LabelFormContainer,
  SearchContainer,
	RemarksFormContainer,
	ResumeRemarkContainer,
  DistributedJobContainer,
  DistributedContainer,
  TalentFormContainer,
  DistributedFormContainer,
  Forward2OtherFormContainer,
  Recommend2OtherFormContainer,
  FollowFormContainer,
  DeleteFormContainer,
  CreditFilingReasonFormContainer,
  JoinTalentFormContainer
}

export default Container;

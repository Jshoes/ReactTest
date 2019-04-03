/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-16T10:50:52+08:00
* @description:  connect state to view props for redux
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import SideLayout from 'app/decorators/SideLayout'
import MemberListView,{MemberSide} from './views/MemberList.view'
import MemberFormView from './views/MemberForm.view'
import MemberDetailView from './views/Detail.view'
import MemberExportView from './views/MemberExport.view'
import MemberImportView from './views/MemberImport.view'
import MemberImportResultView from './views/MemberImportResult.view'
import * as actions from './action'
import * as resumeActions from '../Resume/action'

import {reducerListSelector,reducerItemSelector} from 'app-model/reducerSelector'

const mapStateToProps = (state) => {
  return {reduce: state.memberReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

let FormContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"Member",props.params.id),
  reduce:state.memberReducer
}), mapDispatchToProps, null, {pure: false})(MemberFormView)
let Container = connect((state)=>({
  items:reducerListSelector(state.ORMReducer,"Member"),
  reduce:state.memberReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(MemberSide)(MemberListView))
let DetailContainer = connect((state,props)=>({
	item:reducerItemSelector(state.ORMReducer,"Member",props.params.id),
  reduce:state.memberReducer
}), (dispatch)=>({
	actions:bindActionCreators(resumeActions, dispatch),
	memberActions:bindActionCreators(actions, dispatch),
  dispatch
}), null, {pure: false})(MemberDetailView)
let ExportContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(MemberExportView)
let ImportContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(MemberImportView)
let ImportResultContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(MemberImportResultView)

export {FormContainer,DetailContainer,ExportContainer,ImportContainer,ImportResultContainer}
export default Container;

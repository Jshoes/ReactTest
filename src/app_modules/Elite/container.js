/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-19T13:14:46+08:00
* @description:  connect state to view props for redux
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import SideLayout from 'app/decorators/SideLayout'
import EliteListView from './views/EliteList.view'
import EliteSide from './views/EliteSide.view'
import {RecommondEliteFormView,Move2EliteFormView,Relate2JobFormView} from './views/EliteForms.view'
import EliteDetailView from './EliteDetail.view'
import EliteConnectView from './EliteConnect.view'
import addEliteView from './addElite.view'
import AddFollow from './addFollow'
import * as actions from './action'

import {reducerListSelector} from 'app-model/reducerSelector'

const mapStateToProps = (state) => {
  return {reduce: state.eliteReducer,appConfig:state.appReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

// let FollowFormContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(FollowFormView)
let Container = connect((state)=>({
    items:reducerListSelector(state.ORMReducer,"Elite"),
    reduce:state.eliteReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(EliteSide)(EliteListView))


let RecommondFormContainer = connect((state)=>({
	// items:reducerListSelector(state.ORMReducer,"Elite"),
	reduce:state.eliteReducer
}), mapDispatchToProps, null, {pure: false})(RecommondEliteFormView)

let Move2EliteFormContainer = connect((state)=>({
	// items:reducerListSelector(state.ORMReducer,"Elite"),
	reduce:state.eliteReducer
}), mapDispatchToProps, null, {pure: false})(Move2EliteFormView)

let Relate2JobFormContainer = connect((state)=>({
	// items:reducerListSelector(state.ORMReducer,"Elite"),
	reduce:state.eliteReducer
}), mapDispatchToProps, null, {pure: false})(Relate2JobFormView)
let detailContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(EliteDetailView)
let connectContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(EliteConnectView)
let addContainer =  connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(addEliteView)
let addFollowContainer =  connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(AddFollow)

export {detailContainer,connectContainer,addContainer,addFollowContainer,RecommondFormContainer,Move2EliteFormContainer,Relate2JobFormContainer}
export default Container;

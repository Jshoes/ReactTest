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
import JobDetailView from './views/JobSlide.view'
import LogSideView from './views/LogSide.view'
import LogListView from './views/LogList.view'
import LogDetailView from './views/LogDetail.view'
import * as actions from './action'

import {reducerListSelector,reducerItemSelector} from 'app-model/reducerSelector'

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

// let Container = connect((state,ownProps)=>{
// 	return {
// 		items:reducerListSelector(state.ORMReducer,"Log"),
//     appReducer:state.appReducer
//   }
// }, mapDispatchToProps, null, {pure: false})(LogView)

// let LogSideContainer = connect((state,ownProps)=>{
// 	return {
// 		// items:reducerListSelector(state.ORMReducer,"Log"),
//     // appReducer:state.appReducer
//   }
// }, mapDispatchToProps, null, {pure: false})(LogSideView)


let LogListContainer = connect((state,ownProps)=>{
	return {
		 // items:[],
		items:reducerListSelector(state.ORMReducer,"Notication"),
		appReducer:state.appReducer,
		logReducer:state.noticationReducer
  }
}, mapDispatchToProps, null, {pure: false})(SideLayout(LogSideView)(LogListView))


let LogDetailContainer = connect((state,ownProps)=>{
	return {
		// items:reducerDetailSelector(state.ORMReducer,"Log"),
		// appReducer:state.appReducer,
		logDetail:state.noticationReducer.logDetail
  }
}, mapDispatchToProps, null, {pure: false})(LogDetailView)


export {LogListContainer,LogDetailContainer}
// export default Container;

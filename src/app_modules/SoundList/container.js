/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-15T14:28:58+08:00
* @description:  connect state to view props for redux
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import SoundListView,{SoundSideView} from './views/SoundList.view'
import SideLayout from 'app/decorators/SideLayout'
import * as actions from './action'


import {reducerListSelector} from 'app-model/reducerSelector'

const mapStateToProps = (state) => {
  return {reduce: state.soundListReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

let SoundListContainer = connect((state,ownProps)=>{
	return {
		items:reducerListSelector(state.ORMReducer,"Sound"),
    reduce:state.soundListReducer,
    appReducer:state.appReducer
	}
}, mapDispatchToProps, null, {pure: false})(SideLayout(SoundSideView)(SoundListView))

export {SoundListContainer}

export default SoundListContainer;

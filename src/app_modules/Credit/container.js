/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-24T13:38:44+08:00
* @description:  connect state to view props for redux
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import SideLayout from 'app/decorators/SideLayout'
import CreditListView,{CreditSide} from './views/CreditList.view'
import CreditFormView from './views/CreditForm.view'
import * as actions from './action'

import {reducerListSelector,reducerItemSelector} from 'app-model/reducerSelector'

const mapStateToProps = (state) => {
  return {reduce: state.creditReducer,appConfig:state.appReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

let Container = connect((state)=>({
  items:reducerListSelector(state.ORMReducer,"Credit"),
  reduce:state.creditReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(CreditSide)(CreditListView))

let creditFormContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"Credit",props.param.resumeId),
  reduce:state.creditReducer
}), mapDispatchToProps, null, {pure: false})(CreditFormView)

export {creditFormContainer}
export default Container;

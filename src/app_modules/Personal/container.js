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
import PersonalView from './PersonalCenter.view'
import RecordView from './PresentRecord.view'
import WithdrawalsFormView from './withdrawals.view'
import AuthentFormView from './Authentication.view'
import PasswordFormView from './ChangePassword.view'
import SharelView from './ShareWindow.view'

import * as actions from './action'

const mapStateToProps = (state) => {
  return {reduce: state.personalReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

let Container = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(PersonalView)
let recordContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(RecordView)
let withdrawContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(WithdrawalsFormView)
let authentContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(AuthentFormView)
let passwordContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(PasswordFormView)
let shareContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SharelView)


export {recordContainer,withdrawContainer,authentContainer,passwordContainer,shareContainer}
export default Container;

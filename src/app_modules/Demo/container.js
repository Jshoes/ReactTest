/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-02T09:36:53+08:00
* @description:  connect state to view props for redux
*/

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import DemoView from './Demo.view'
import * as actions from './action'

const mapStateToProps = (state) => {
  return {reduce: state.DemoReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

let Container = connect(mapStateToProps, mapDispatchToProps)(DemoView)
export {Container}
export default Container;

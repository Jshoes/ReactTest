/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-25T13:34:06+08:00
* @description:  connect state to view props for redux
*/

import React, {Component,PureComponent} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import DashboardView from './Dashboard.view'
import MessageCenterView from './MessageCenter.view'
import DashboardForm from './DashboardForm.view'


import * as actions from './action'
import {reducerItemSelector,reducerListSelector} from 'app-model/reducerSelector'



const mapStateToProps = (state,ownProps) => {
  return {reduce: state.dashboardReducer,appReducer:state.appReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}


let Container = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(DashboardView)

/*
let DashboardFormContainer = connect((state,ownProps)=>{
  const id = ownProps.params.id
	return {
		item:reducerItemSelector(Schedule,id)
	}
},mapDispatchToProps,null,{pure:false})(DashboardForm)
*/
/*
@connect((state,ownProps)=>{
	return {
		item:reducerItemSelector("Schedule",ownProps.params.id)
	}
},mapDispatchToProps,null,{pure:false})
class DashboardFormContainer extends PureComponent{
  // handleSubmit(values){
  //   let {actions,item,router} = this.props;
  //   actions.saveAction(values)
  //   actions.backRoute(router)
  // }
  render(){
    const {item,actions} = this.props
    return (<DashboardForm  item={item} actions={actions} />)
  }
}
*/

let DashboardFormContainer = connect((state,ownProps)=>{
  return {
    item:reducerItemSelector(state.ORMReducer,"Schedule",ownProps.params.id)
  }
}, mapDispatchToProps, null, {pure: false})(DashboardForm)


let MessageCenterContainer = connect((state,ownProps)=>{
	return {
		list:reducerItemSelector(Message,ownProps.params.id)
	}
}, mapDispatchToProps, null, {pure: false})(MessageCenterView)


export {DashboardFormContainer,MessageCenterContainer}
export default Container;

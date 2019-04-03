import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {routerActions, push, replace} from 'react-router-redux'
import {
    Row,
    Avatar,
    Col,
  Button,
  Input,
  Table,
  Dropdown,
  Icon,
} from 'antd'
import moment from 'moment';
import WrapperComponent from "app/decorators/WrapperComponent"
import JobDetailShow from 'app/components/JobDetails'
import NestedComponent from 'app/decorators/NestedComponent'
import PostRelease from 'app/components/PostRelease'
import {ModalDetailView} from 'app/components/Modal.view'

@NestedComponent()
export default class JobPostRelease extends Component{

  static childContextTypes = {
    actions: PropTypes.object
  }

  getChildContext(){
     let { actions } =this.props;
     return {
        actions:actions
     };
  }

  componentDidMount(){
    let {actions,params} = this.props
    if(params.jobId){
      actions.itemAction({jobId:params.jobId})
    }
  }
  componentWillReceiveProps(nextProps){
    let {actions} = this.props
    if(this.props.params !== nextProps.params){
      actions.itemAction({jobId:nextProps.params.jobId})
    }
  }
  render(){
    return (
      <PostRelease {...this.props}/>
    )
  }
}

import React, {Component, PropTypes} from 'react'
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
import {ModalDetailView} from 'app/components/Modal.view'


export default class JobDetailView extends Component {

  constructor(props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    let {actions,router} = this.props;
    let oldParams = prevProps.params
    let newParams = this.props.params
    if (JSON.stringify(newParams) !== JSON.stringify(oldParams)){
      actions.clearOldAction()
      actions.itemAction({...newParams})
    }
  }
  componentWillMount() {
    let {actions,router} = this.props;
      actions.itemAction({...router.params})
  }
  handleChange(value){
    let {actions,router:{params:{jobDetailId}}} = this.props
    let params = {
      status:value?1:3,
      jobDetailId:jobDetailId
    }
    actions.changeJobStatusAction(params)
  }
  handleClick(){
    let {actions,router,location,dispatch} = this.props
    let {params:{jobDetailId,jobId}} = router
    let params = {
        isDel:"1",
        jobDetailId:jobDetailId
      }
      let path = {
        pathname:`/job/list/${jobId}/searchResume`,
        state:{
          key:"reload"
        }
      }
      actions.changeJobStatusAction(params).then(()=>{
        setTimeout(function(){
          dispatch(routerActions.push(path))
        },2000)
    })
  }
  render() {
      let {actions,router,reduce,params} = this.props;
      //console.log(router.params.id)
      // console.log(this.props.router)
      return (
         <JobDetailShow router={router} actions={actions} reduce={reduce} params={params} handleClick={this.handleClick.bind(this)} handleChange={this.handleChange.bind(this)}/>
    )
  }
}

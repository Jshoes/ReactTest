/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-14T15:51:16+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row,
  Col,
  Modal,
  Button,
  Radio,
  Input,
  Form,
  DatePicker,
  Layout,
  Spin,
  Tree,
  Select,
  TreeSelect
} from 'antd'
import moment from 'moment'
import {FormPage} from 'app/components/Page'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import {TreeSelectPicker} from 'app/components/TreeView'
import FetchAPI from 'app/utils/FetchAPI'


const Option = Select.Option
const {TextArea} = Input
const RadioGroup = Radio.Group;
const TreeNode=Tree.TreeNode


export default class ChangeChargerForm extends FormPage{

  constructor(props){
    super(props)
    this.state = {
      dept:""
    }
  }

  componentDidMount(){
    new FetchAPI().fetch(`${APP_SERVER}/user/getInterviewerListJson`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          dept:json.list||[]
        });
    });
  }

  changeDept(value){
    new FetchAPI().fetch(`${APP_SERVER}/user/getInterviewerListJson?dept=${value}`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          dept:json.list||[]
        });
    });
  }

  renderHrOption(data,idx){
    return (<Select.Option value={data.account} key={idx}>{data.name}</Select.Option>)
  }


  handleSubmit(values){
    let {actions,router,location} = this.props;
    // console.log(location)
  //  console.log(values)
    actions.changeJobOptionSpec(values).then(()=>{
    actions.backRouteReload(router,location)
    })
  }

  render() {
    const {
      form,
      handleSubmit,
      updateFieldValue,
      children,
      saveFormRef,
      formFullItemLayout,
    } = this.props
    let {location:{state:{keys,hrAcc,interviewerIds}}} = this.props
    //console.log(this.props.location.state)
    /*updateType 5 为修改负责人*/
    return (
      <BaseForm onSubmit={this.handleSubmit.bind(this)} ref={this.saveFormRef}>
        <FormItem style={{marginBottom:0}}>
          <Input type="hidden" name="updateType" defaultValue={5}/>
        </FormItem>
        <FormItem style={{marginBottom:0}}>
          <Input type="hidden" name="jobIds" defaultValue={keys}/>
        </FormItem>
        <h4>已选择{keys.length}条职位</h4>
          <Row>
              <FormItem >
                <Select name="hrAcc" label="职位负责人" placeholder="请选择" defaultValue={hrAcc} fetch={`${APP_SERVER}/accountOperate/getHrList`} renderItem={this.renderHrOption} />
              </FormItem>
              <FormItem >
                <TreeSelectPicker
                  label="招聘部门"
                  name="groupId"
                  fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="选择部门"
                  treeDefaultExpandAll
                  onChange={this.changeDept.bind(this)}
                />
              </FormItem>
              <FormItem >
                <Select name="interviewerIds" label="选择面试官" placeholder="请选择" defaultValue={interviewerIds} fetch={this.state.dept} renderItem={this.renderHrOption} mode="multiple"/>
              </FormItem>
          </Row>
      </BaseForm>
    )
  }
}

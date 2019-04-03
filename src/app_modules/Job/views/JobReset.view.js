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
  TreeSelect,
  Tree,
  Select
} from 'antd'
import moment from 'moment'
import {FormPage} from 'app/components/Page'
import  FetchAPI from 'app/utils/FetchAPI'
import BaseForm,{FormItem} from 'app/components/BaseForm'
const Option = Select.Option
const RadioGroup = Radio.Group;
const TreeNode=Tree.TreeNode


export default class JobResetForm extends FormPage{

  constructor(props){
    super(props)
    this.state = {
      dept:""
    }
  }
  componentDidMount(){
    new FetchAPI().fetch(`${APP_SERVER}/jobNew/getJobList`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          dept:json.list||[]
        });
    });

  }

  changeDept(value){
    new FetchAPI().fetch(`${APP_SERVER}/jobNew/getJobList?groupId=${value}`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          dept:json.list||[]
        });
    });
  }

  renderHrOption(data,idx){
    return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
  }
  renderTreeData(item){
    return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id},this.loopTreeData(item.children))
  }

  handleSubmit(values){
    let {actions,router,location} = this.props;
  //  console.log(values)
    actions.resetAction(values).then(()=>{
      setTimeout(function(){
        actions.backRouteReload(router,location)
      },2000)
    })
  }
  loopTreeData(data){
    let that = this
    return data.map((item) => {
      if (item.children && item.children.length) {
        return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id},this.loopTreeData(item.children))
      }else{
        return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id})
      }
    })
  }

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
      formFullItemLayout,
    } = this.props
    let {location:{state:{keys,hrAcc,interviewerIds}}} = this.props
    /*updateType 4 为修改部门*/
    return (
      <BaseForm onSubmit={this.handleSubmit} ref={this.saveFormRef}>
        <FormItem style={{marginBottom:0}}>
          <Input type="hidden" name="type" defaultValue={1}/>
        </FormItem>
        <FormItem style={{marginBottom:0}}>
          <Input type="hidden" name="id" defaultValue={keys}/>
        </FormItem>
          <Row>
                <FormItem {...formFullItemLayout}>
                  <TreeSelect
                    label="选择部门"
                    name="groupId"
                    fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    renderItem={this.renderTreeData.bind(this)}
                    placeholder="选择部门"
                    treeDefaultExpandAll
                    onChange={this.changeDept.bind(this)}
                  />
                </FormItem>
                <FormItem {...formFullItemLayout}>
                  <Select name="jobId" label="选择职位" placeholder="请选择" fetch={this.state.dept} renderItem={this.renderHrOption}/>
                </FormItem>
          </Row>
      </BaseForm>
    )
  }
}

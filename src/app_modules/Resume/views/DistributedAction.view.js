/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-14T15:51:16+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row,
  Icon,
  Col,
  Modal,
  Button,
  Input,
  Form,
  DatePicker,
  Layout,
  Spin,
  Tree,
  Tooltip,
  Radio,
  Select,
  TreeSelect
} from 'antd'
import moment from 'moment'
import {FormPage} from 'app/components/Page'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import  FetchAPI from 'app/utils/FetchAPI'
import TreeView from 'app/components/TreeView'
import {TreeSelectPicker} from 'app/components/TreeView'

const Option = Select.Option
const {TextArea} = Input
const RadioGroup = Radio.Group;
const TreeNode=Tree.TreeNode


export default class DistributedForm extends FormPage{

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

  renderSelectOption(data,idx){
    return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
  }


  handleSubmit(values){
    let {actions,router,location,params:{type}} = this.props;
  //  console.log(values)
    console.log(values)
    if(type == "mulite"){
      actions.muliteDistAction(values)
    }else{
      actions.singleDistAction(values)
    }
    actions.backRoute(router)
  }
  renderRadioGroup(){
    let {params:{type}} = this.props
    let labelDom = <span>保存分配规则<Tooltip placement="bottom" title="选择“是”后，系统将此类简历自动匹配到所选职位"><Icon type="info-circle-o" /></Tooltip></span>
    if(type == "mulite"){
      return (
        <FormItem>
          <RadioGroup name="isAllot" label={labelDom} placeholder="请选择" defaultValue="0">
              <Radio value="1">是</Radio>
              <Radio value="0">否</Radio>
          </RadioGroup>
        </FormItem>
      )
    }
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
    let {location:{state:{ids}}} = this.props
    return (
      <BaseForm onSubmit={this.handleSubmit.bind(this)} ref={this.saveFormRef}>
          <FormItem style={{marginBottom:0}}>
            <Input type="hidden" name="ids" defaultValue={ids}/>
          </FormItem>
          <h4>已选中{ids.length}条数据</h4>
          <Row>
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
              <FormItem>
                <Select name="jobId" label="选择职位" placeholder="请选择"  fetch={this.state.dept} renderItem={this.renderSelectOption} rules={[{required:true,message:"分配职位不可为空"}]}/>
              </FormItem>
              {this.renderRadioGroup()}
          </Row>
      </BaseForm>
    )
  }
}

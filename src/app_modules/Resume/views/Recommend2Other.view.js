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
const TreeNode = TreeSelect.TreeNode;

export default class Recommend2OtherForm extends FormPage{

  componentDidMount(){
    new FetchAPI().fetch(`${APP_SERVER}/jobNew/getJobList`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          jobList:json.list||[]
        });
    });
  }
  changeDept(value){
    new FetchAPI().fetch(`${APP_SERVER}/jobNew/getJobList?groupId=${value}`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          jobList:json.list||[]
        });
    });
  }

  renderJobOption(data,idx){
    return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
  }

  handleSubmit(values){
    let {actions,router,location} = this.props;
    actions.recommendAction(values)
    actions.backRoute(router)
  }

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
      location:{state:{ids}}
    } = this.props
    /*updateType 4 为修改部门*/
    return (
      <BaseForm onSubmit={this.handleSubmit} ref={this.saveFormRef}>
        <FormItem>
          <Input type="hidden" name="ids" defaultValue={ids}/>
        </FormItem>
        <FormItem>
            <TreeSelectPicker
              label="用人部门"
              name="dept"
              fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              // renderItem={this.renderTreeData.bind(this)}
              placeholder="选择部门"
              treeDefaultExpandAll
              onChange={this.changeDept.bind(this)}
              rules={[{required:true,message:"所属部门不可为空"}]}
            />
        </FormItem>
        <FormItem>
          <Select name="jobId" label="职位" fetch={this.state.jobList} renderItem={this.renderJobOption} rules={[{required:true,message:"职位不可为空"}]}/>
        </FormItem>
      </BaseForm>
    )
  }
}

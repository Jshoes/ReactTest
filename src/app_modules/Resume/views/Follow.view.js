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
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import CalendarPicker from 'app/components/CalendarPicker'
import {TreeSelectPicker} from 'app/components/TreeView'
import DateTimePicker from 'app/components/DateTimePicker'

const Option = Select.Option
const {TextArea} = Input
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

export default class FollowForm extends FormPage{

  renderSelectOption(data,idx){
    return (<Select.Option value={data.optionId} key={idx}>{data.optionName}</Select.Option>)
  }

  handleSubmit(values){
    let {actions,router,location} = this.props;
    actions.followOptionAction(values)
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
          <Input type="hidden" name="resumeIds" defaultValue={ids}/>
        </FormItem>
        <FormItem>
          <DateTimePicker name="followRemindTime" label="跟进时间" rules={[{required: true, message: "跟进时间不可为空"},{validator:customRules.required}]}/>
        </FormItem>
        <FormItem>
          <TextArea  name="followRemindContent" label="跟进说明"  placeholder="填写跟进说明" rules={[{max:30,message:"跟进说明限制30个字"}]}/>
        </FormItem>
      </BaseForm>
    )
  }
}

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

const Option = Select.Option
const {TextArea} = Input
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

export default class CreditFilingReasonForm extends FormPage{

  renderSelectOption(data,idx){
    return (<Select.Option value={data.optionId} key={idx}>{data.optionName}</Select.Option>)
  }

  handleSubmit(values){
    let {actions,router,location} = this.props;
    actions.joinCreditAction(values)
    actions.backRoute(router)
  }

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
    } = this.props
    let {location:{state:{ids}}} = this.props
    /*updateType 4 为修改部门*/
    return (
      <BaseForm onSubmit={this.handleSubmit} ref={this.saveFormRef}>
      <FormItem>
        <Input type="hidden" name="id" defaultValue={ids}/>
      </FormItem>
        <FormItem>
          <Select name="adverseEvent" label="不良事件" placeholder="请选择"  fetch={`${APP_SERVER}/option/optionListJson?optionCode=bad_events`} renderItem={this.renderSelectOption} />
        </FormItem>
      </BaseForm>
    )
  }
}

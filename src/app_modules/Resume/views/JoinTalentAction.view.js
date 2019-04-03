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
import  FetchAPI from 'app/utils/FetchAPI'
const Option = Select.Option
const {TextArea} = Input
const RadioGroup = Radio.Group;
const TreeNode=Tree.TreeNode


export default class JoinTalentForm extends FormPage{
  renderSelectOption(data,idx){
    return (<Select.Option value={data.optionId} key={idx}>{data.optionName}</Select.Option>)
  }


  handleSubmit(values){
    let {actions,router,location,params:{type}} = this.props;
    actions.joinEliteAction(values)
    actions.backRoute(router)
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
    let {location:{state:{ids,libType}}} = this.props
    /*libType 1 为简历  4为诚信*/
    return (
      <BaseForm onSubmit={this.handleSubmit.bind(this)} ref={this.saveFormRef}>
        <FormItem style={{marginBottom:0}}>
          <Input type="hidden" name="ids" defaultValue={ids}/>
        </FormItem>
        <FormItem style={{marginBottom:0}}>
          <Input type="hidden" name="libType" defaultValue={libType}/>
        </FormItem>
          <Row>
              <FormItem>
                <Select name="filingReason" label="归档原因" placeholder="请选择"  fetch={`${APP_SERVER}/option/optionListJson?optionCode=file_reasons`} renderItem={this.renderSelectOption}  rules={[{required:true,message:"归档原因不可为空"}]}/>
              </FormItem>
              <FormItem>
                <TextArea name="filingRemark" label="归档描述" placeholder="请输入归档描述"  rules={[{max:50,message:"归档描述限制50个字"}]} />
              </FormItem>
          </Row>
      </BaseForm>
    )
  }
}

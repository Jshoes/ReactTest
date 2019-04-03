/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-17T17:32:29+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row,
  Col,
  Modal,
  Button,
  Input,
  Form,
  DatePicker,
  Layout,
  Spin,
  Rate,
  Select
} from 'antd'
import {FormPage} from 'app/components/Page'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import moment from 'moment'
const Option = Select.Option
const {TextArea} = Input

class EntryForm extends Component{

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
      id
    } = this.props
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
        <FormItem>
          <Input type="hidden" name="id" defaultValue={id} />
        </FormItem>
        <FormItem>
          <DatePicker label="预计入职日期" name="expectedEntryTime"   rules={[{required: true, message: "预计入职时间不可为空"}]}/>
        </FormItem>
      </BaseForm>
    )
  }
}

export default class EntryFormView extends FormPage{

  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,location} = this.props
    actions.entryWaiting(values)
    actions.backRoute(router)
  }
  render() {
    let {location:{state:{id}}} = this.props

    return (
      <Spin tip="Loading..." spinning={false}>
        <EntryForm handleSubmit={this.handleSubmit}  saveFormRef={this.saveFormRef} id={id}>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </EntryForm>
      </Spin>
    )
  }
}

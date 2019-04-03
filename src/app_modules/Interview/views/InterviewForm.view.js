/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-17T10:51:33+08:00
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
  Select
} from 'antd'
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem} from 'app/components/BaseForm'
const Option = Select.Option
const {TextArea} = Input


class InterviewForm extends Component {
  renderSelectOption(data,idx){
    return (<Select.Option value={data.account} key={idx}>{data.keyName}</Select.Option>)
  }
  render() {
    const {form, reduce, handleSubmit, children,saveRef} = this.props
    const formFullItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
    return (
      <BaseForm onSubmit={handleSubmit} saveRef={saveRef}>
          <FormItem {...formFullItemLayout} >
            <Input label="面试阶段" name="username" defaultValue={"1"} />
          </FormItem>
          <FormItem {...formFullItemLayout}  >
            <Select label="面试官" name="address" defaultValue={"1"}  renderItem={this.renderSelectOption} fetch={`${APP_SERVER}/constants/select`} />
          </FormItem>
          <FormItem {...formFullItemLayout} >
              <TextArea label="反馈信息" name="a1" />
          </FormItem>
        {/*children*/}
      </BaseForm>
    )
  }
}

class InterviewFormView extends Component {
  submit = (values) => {
    console.log(values)
  }
  componentWillMount() {
    let {params, data, actions} = this.props;
  }
  submitForm(values) {
    console.log(values)
  }
  saveFormRef(form){
    console.log(this,form)
  }
  render() {
    let {params, reduce,saveRef} = this.props;
    let model = {}
    return (
      <InterviewForm onSubmit={this.submitForm} initialValues={model} savemRef={saveRef}>
        <Button.Group>
          <Button htmlType="submit">保存</Button>
        </Button.Group>
      </InterviewForm>
    )
  }
}

export default InterviewFormView

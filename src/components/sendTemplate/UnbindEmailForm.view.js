/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-24T16:55:13+08:00
 */

import React, {Component, PropTypes} from 'react'
import API from '../../layout/api'
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
  Select,
  message
} from 'antd'
import {FormPage} from 'components/Page'
import ModalView from 'components/Modal.view'
import WrapperComponent from '../../decorators/WrapperComponent'
import BaseForm,{FormItem} from 'components/BaseForm'
import CountdownButton from 'components/CountdownButton'

class UnBindEmailForm extends Component {
  render() {
    const {
      form,
      initialValues,
      handleSubmit,
      children,
      saveFormRef,
      sendCode,
      email,
      params,
      buttonChanged,
      content,
      disabled
    } = this.props
    const formFullItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
        <FormItem {...formFullItemLayout}>
          <Input label="当前绑定邮箱" type="text" name="bindEmail" defaultValue={email} disabled={true}/>
        </FormItem>
        <FormItem {...formFullItemLayout} className="input-button-group">
          {
            buttonChanged?
            <Input addonAfter={<CountdownButton name="重新获取" time={60} buttonChanged={buttonChanged} clickEvent={sendCode} />} label="验证码" type="text" name="code" rules={[{required: true, message: "验证码不可为空",}]}/>
            :
            <Input addonAfter={<Button onClick={sendCode} disabled={disabled} className="extra-button">{content}</Button>} label="验证码" type="text" name="code" rules={[{required: true, message: "验证码不可为空",}]}/>
          }
        </FormItem>
      </BaseForm>
    )
  }
}

class UnBindEmailFormView extends FormPage{
  state = {
    visible: true,
    buttonChanged: false,
    disabled: false,
    content: "获取验证码"
  }
  //请求远程数据接口
  componentWillMount() {
    let {actions} = this.props;
  //  actions.itemAction("1")
  }
  //处理表格提交后动作
  handleOk(){
    this.onSubmit()

  }
  handleSubmit(values){
     console.log(values)
     let {hideModal,getEmailConfig}=this.props
     return new API().fetchCheckUnBindCode(values).then(json => {
       if(json.status == 1){
         message.success('解绑成功！')
         hideModal()
         getEmailConfig()
       }else if(json.status == 0){
         message.error('验证码过期！')
       }else if(json.status == -1){
         message.error('验证码错误！')
       }
     }).catch(ex => {
       return "error"
     })
  }
  handlerCountdown() {
    let self = this
    let time = 60
    let timer = setInterval(function(){
      self.setState({
        content: (time--) + "s",
        disabled: true
      })
      if(time<0){
        clearInterval(timer)
        self.setState({
          content: "重新获取",
          disabled: false,
          buttonChanged: true
        })
      }
    },1000)
  }
  sendCode() {
    let {buttonChanged} = this.state
    if(!buttonChanged){
      this.handlerCountdown()
    }
    return new API().fetchSendUnBindKeyCode().then(json => {
      message.success('验证码已发送！')
    })
  }

  render() {
    let {hideModal,email}=this.props
    let {buttonChanged,content,disabled} = this.state
    //	let model=preduce.list[0]
    return (
      <Modal
        title="解绑邮箱"
        visible={true}
        onOk={this.handleOk.bind(this)}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <UnBindEmailForm onSubmit={this.onSubmit} buttonChanged={buttonChanged} saveFormRef={this.saveFormRef} content={content} disabled={disabled} email={email} sendCode={this.sendCode.bind(this)}></UnBindEmailForm>
      </Modal>
    )
  }
}

export default UnBindEmailFormView

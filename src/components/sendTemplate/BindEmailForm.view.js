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

class EmailForm extends Component {
  render() {
    const {
      form,
      initialValues,
      handleSubmit,
      children,
      saveFormRef,
      configAccountPwd,
      buttonChanged,
      content,
      disabled,
      params
    } = this.props
    const formFullItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
    console.log(buttonChanged,content,disabled)
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
        <FormItem {...formFullItemLayout}>
          <Input label="邮箱帐号" type="email" name="email" rules={[{type:"email",message:"邮箱格式不正确"},{required: true, message: "邮箱不可为空",}]}/>
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <Input label="密码" type="password" name="password" rules={[{required: true, message: "密码不可为空",}]}/>
        </FormItem>
        <FormItem {...formFullItemLayout} className="input-button-group">
          {
            buttonChanged?
            <Input addonAfter={<CountdownButton name="重新获取" time={60} buttonChanged={buttonChanged} clickEvent={configAccountPwd} />} label="验证码" type="text" name="code" rules={[{required: true, message: "验证码不可为空",}]}/>
            :
            <Input addonAfter={<Button onClick={configAccountPwd} disabled={disabled} className="extra-button">{content}</Button>} label="验证码" type="text" name="code" rules={[{required: true, message: "验证码不可为空",}]}/>
          }
        </FormItem>
      </BaseForm>
    )
  }
}

class EmailFormView extends FormPage{
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
     let {hideModal,getEmailConfig}=this.props
     return new API().fetchBindEmail(values).then(json => {
       if(json.status == 1){
         message.success('邮箱绑定成功！')
         hideModal && hideModal()
         getEmailConfig && getEmailConfig()
       }else if(json.status == 0){
         message.success('验证码过期!')
       }else if(json.status == -1){
         message.success('验证码错误!')
       }
     }).catch(error => {
       try{
         error.response.json().then((json)=>{
             // message.error(`服务器请求失败${json.code}:${json.msg||""}`)
             message.error(`${json.msg||""}`)
         })
       }catch(e){
           message.error(error.response?error.response.statusText:"服务器请求失败")
       }
       return "error"
     })
  }
  sendCode() {
    return new API().fetchSendUnBindKeyCode().then(json => {
      message.success('验证码已发送！')
    })
  }

  sendBindCode() {
    return new API().fetchSendBindCode({
      email: this.form.getFieldValue('email'),
      password: this.form.getFieldValue('password')
    }).then(json => {
      message.success('验证码已发送！')
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

  configAccountPwd() {

    return new API().fetchCheckEmailPaw({
      email: this.form.getFieldValue('email'),
      password: this.form.getFieldValue('password')
    }).then(json => {
      if(json.status == 0){
        // this.sendCode()
        let {buttonChanged} = this.state
        if(!buttonChanged){
          this.handlerCountdown()
        }
        this.sendBindCode()
      }else{
        this.setState({
          buttonChanged: false
        })
        message.error('帐号或密码错误')
      }
    }).catch(error => {
      try{
        error.response.json().then((json)=>{
            // message.error(`服务器请求失败${json.code}:${json.msg||""}`)
            message.error(`${json.msg||""}`)
        })
      }catch(e){
          message.error(error.response?error.response.statusText:"服务器请求失败")
      }
      return "error"
    })
  }

  render() {
    let {hideModal}=this.props
    let {buttonChanged,content,disabled} = this.state
    //	let model=preduce.list[0]
    return (
      <Modal
        title="绑定邮箱"
        visible={true}
        onOk={this.handleOk.bind(this)}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <EmailForm onSubmit={this.onSubmit} buttonChanged={buttonChanged} saveFormRef={this.saveFormRef} content={content} disabled={disabled} configAccountPwd={this.configAccountPwd.bind(this)}></EmailForm>
      </Modal>
    )
  }
}

export default EmailFormView

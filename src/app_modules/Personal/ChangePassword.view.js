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
import {FormPage} from 'components/Page'
import ModalView from 'components/Modal.view'
import WrapperComponent from '../../decorators/WrapperComponent'
import BaseForm,{FormItem} from 'components/BaseForm'

const Option = Select.Option
const {TextArea} = Input

class PasswordForm extends Component{

  render() {
    const {
      handleSubmit,
      saveFormRef,
        accountInfo:{account},
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
          <Input label="原密码" name="oldPassword" type="password" rules={[{required:true,message:"原密码不可为空"}]}/>
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <Input label="新密码" name="newPassword" type="password" rules={[{required:true,message:"支付宝号不可为空"}]}/>
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <Input label="确认密码" name="confirmPassword" type="password" rules={[{required:true,message:"支付宝号不可为空"}]}/>
        </FormItem>
      </BaseForm>
    )
  }
}

@WrapperComponent(ModalView)
class PasswordFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props
      //actions.getAccActions()
  //  actions.itemAction("1")
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router} = this.props
      //editPassword
    actions.changePassAction(values)
    actions.backRoute(router)
  }
  render() {
    let {params, reduce:{spins:{formSpin},accountInfo}} = this.props

    //	let model=preduce.list[0]
    return (
      <Spin tip="Loading..." spinning={false}>
        <PasswordForm handleSubmit={this.handleSubmit} params={params}  saveFormRef={this.saveFormRef} accountInfo={accountInfo}>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </PasswordForm>
      </Spin>
    )
  }
}

export default PasswordFormView

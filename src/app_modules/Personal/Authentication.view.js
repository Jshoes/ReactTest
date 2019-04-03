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
import BaseForm,{FormItem,customRules} from 'components/BaseForm'

const Option = Select.Option
const {TextArea} = Input

class AuthForm extends Component{

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
          <Input label="手机号" name="account" readOnly defaultValue={account}/>
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <Input label="姓名" name="acctName" rules={[{required:true,message:"姓名不可为空"},{max:10,message:"姓名不能超过10个字"}]}/>
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <Input label="身份证" name="realNameCard" rules={[{required:true,message:"身份证号不可为空"},{validator:customRules.checkIDCard}]}/>
        </FormItem>
      </BaseForm>
    )
  }
}

@WrapperComponent(ModalView)
class AuthentFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props
      actions.getAccActions()
  //  actions.itemAction("1")
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router} = this.props
    actions.authentAction(values)
    actions.backRoute(router)
  }
  render() {
    let {params, reduce:{spins:{formSpin},accountInfo}} = this.props

    //	let model=preduce.list[0]
    return (
      <Spin tip="Loading..." spinning={false}>
        <AuthForm handleSubmit={this.handleSubmit} params={params}  saveFormRef={this.saveFormRef} accountInfo={accountInfo}>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </AuthForm>
      </Spin>
    )
  }
}

export default AuthentFormView

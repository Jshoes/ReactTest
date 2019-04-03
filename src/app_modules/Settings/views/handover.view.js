/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-17T17:32:29+08:00
 */

import React, {Component, PropTypes} from 'react'
import { Row, Col, Modal, Button, Input, Form, DatePicker, Spin, Rate, Select } from 'antd'

import WrapperComponent from 'app/decorators/WrapperComponent'
import {FormPage} from 'app/components/Page'
import ModalView from 'app/components/Modal.view'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'

const Option = Select.Option
const {TextArea} = Input

class HandoverForm extends Component{

    handleGetCode(){
        let {actions,accountInfo:{account}} =this.props
        actions.getCodeAction({account:account,codeType:1})
    }
    renderNewAcc(data,idx){
        return (<Select.Option value={data.account} key={idx}>{data.name}</Select.Option>)
    }

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
        account,
    } = this.props
    const formFullItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
      const formFullItemLayoutSpec = {
          labelCol: {
              span: 8
          },
          wrapperCol: {
              span: 16
          }
      };
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
        <FormItem>
            <Input type="hidden" name="oldAdminAcct" defaultValue={account}/>
        </FormItem>
        <FormItem>
            <Select label="选择交接管理员" name="newAdminAcct" fetch={`${APP_SERVER}/accountOperate/findAllAdmin`}  renderItem={this.renderNewAcc} rules={[{required:true,message:"交接管理员不可为空"}]}/>
        </FormItem>
      </BaseForm>
    )
  }
}

@WrapperComponent(ModalView)
export default class HandoverView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,location} = this.props
      actions.adminChangeAction(values)
      actions.backRoute(router)
  }
  render() {
    let {actions,params,params:{nowAcc}, reduce:{spins:{formSpin}}} = this.props
    //	let model=preduce.list[0]
    return (
      <Spin tip="Loading..." spinning={false}>
        <HandoverForm actions={actions} handleSubmit={this.handleSubmit} params={params}  saveFormRef={this.saveFormRef} account={nowAcc} >
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </HandoverForm>
      </Spin>
    )
  }
}

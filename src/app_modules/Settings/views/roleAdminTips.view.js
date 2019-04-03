/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-17T17:32:29+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
   Button, Input, Spin, Select
} from 'antd'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import {FormPage} from 'app/components/Page'
import ModalView,{ModalViewTitleProps} from 'app/components/Modal.view'
import styles from './styles.less'


const Option = Select.Option
const {TextArea} = Input

class AdminTipForm extends Component{

    handleGetCode(){
        let {actions,accountInfo:{account}} =this.props
        actions.getCodeAction({account:account})
    }
    renderNewAcc(data,idx){
        return (<Select.Option value={data.userId} key={idx}>{data.name}</Select.Option>)
    }

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
        data:{account,orgName}
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
      console.log(account,orgName)
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
          <div className="adminContent">
              <div className="title">提示：当前手机号已经是企业帐号，无法注册</div>
              <div className="account">手机号：<span>{account}</span></div>
              <div className="company">已经是<span>{orgName}</span></div>
              <div className="explain">的系统管理员帐号，请先登录原单位进行【管理员交接】操作</div>
          </div>
      </BaseForm>
    )
  }
}

@WrapperComponent(ModalViewTitleProps)
export default class AdminTipView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props

  }
  //处理表格提交后动作
  handleSubmit(values){
    let {closeFn} = this.props
      closeFn()
  }
  render() {
    let {actions,data,closeFn} = this.props
    return (
      <Spin tip="Loading..." spinning={false}>
        <AdminTipForm actions={actions} data={data} handleSubmit={this.handleSubmit} saveFormRef={this.saveFormRef} >
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </AdminTipForm>
      </Spin>
    )
  }
}

/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-17T17:32:29+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row, Col,  Button, Input, Spin, Select
} from 'antd'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import {FormPage} from 'app/components/Page'
import ModalView,{ModalViewTitleProps} from 'app/components/Modal.view'
import styles from './styles.less'

const Option = Select.Option
const {TextArea} = Input

class HrTipForm extends Component{

    handleGetCode(){
        let {actions,data:{account}} =this.props
        actions.getCodeAction({account:account,codeType:2})
    }
    renderNewAcc(data,idx){
        return (<Select.Option value={data.userId} key={idx}>{data.name}</Select.Option>)
    }
    /*account:"test1"
     orgName: "111a"
     roleType :1
     status:true*/
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
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
          <FormItem style={{marginBottom:0}}>
              <Input type="hidden" name="account" defaultValue={account}/>
          </FormItem>
          <div className="hrContent">
              <div className="title">当前添加帐号已存在于其他单位下</div>

              <div className="account">手机号：<span>{account}</span></div>
              <div className="company">已经是<span>{orgName}</span></div>
              <div className="explain">的在用帐号，如需继续添加，需要先从原单位删除，删除操作需原帐号的短信验证</div>
          </div>
          <Row>
              <Col span={18}>
                  <FormItem {...formFullItemLayoutSpec}>
                      <Input label="验证码" name="code"/>
                  </FormItem>
              </Col>
              <Col span={6}>
                  <Button style={{marginLeft:10}} onClick={this.handleGetCode.bind(this)}>获取验证码</Button>
              </Col>
          </Row>


      </BaseForm>
    )
  }
}

@WrapperComponent(ModalViewTitleProps)
export default class HrTipView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props

  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,location,closeFn} = this.props
      actions.hrChangeAction(values)
      closeFn()
  }
  render() {
    let {actions,data,closeFn} = this.props
    //	let model=preduce.list[0]
    return (
      <Spin tip="Loading..." spinning={false}>
        <HrTipForm actions={actions} handleSubmit={this.handleSubmit} data={data}  saveFormRef={this.saveFormRef} >
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </HrTipForm>
      </Spin>
    )
  }
}

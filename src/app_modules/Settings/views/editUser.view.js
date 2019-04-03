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
import WrapperComponent from 'app/decorators/WrapperComponent'
import {FormPage} from 'app/components/Page'
import ModalView from 'app/components/Modal.view'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import HrTipView from './roleHrTips.view'
import AdminTipView from './roleAdminTips.view'

const Option = Select.Option
const {TextArea} = Input

class UserForm extends Component{

    state = {
        userRights:false,
    }

    componentWillMount(){
        let {itemBox } = this.props
        if(itemBox){
            this.setState({
                userRights:itemBox.item.roleType == 1 || itemBox.item.roleType == 3 ? true: false
            })
        }

    }


    renderResoureOption(data,idx){
        return (<Select.Option value={data.resourceId} key={idx}>{data.resourceName}</Select.Option>)
    }
    handleChangeUserType(value){
        this.setState({
            userRights:value == 1 || value == 3 ? true: false
        })
    }

  render() {
    const {
      form,
      actions,
      handleSubmit,
      children,
      saveFormRef,
        itemBox,
        params:{userId},
        isReal
    } = this.props
    const formFullItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
    console.log(itemBox)
    let {userRights} = this.state
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
        <FormItem style={{marginBottom:0}}>
          <Input type="hidden" name="id" defaultValue={userId} />
        </FormItem>
          <FormItem style={{marginBottom:0}}>
              <Input type="hidden" name="account" defaultValue={itemBox && itemBox.item.account} />
          </FormItem>
          {itemBox && isReal?
              <FormItem style={{marginBottom:0}}>
                  <Input type="hidden" name="acctName" defaultValue={itemBox && itemBox.item.name} />
              </FormItem>
              :
              ""
          }
        <FormItem {...formFullItemLayout}>
          <Input label="用户名" name="account"
                 defaultValue={itemBox && itemBox.item.account}
                 disabled={true}
                 />
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <Input label="姓名" name="acctName" defaultValue={itemBox && itemBox.item.name} disabled={itemBox && isReal}/>
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <Select label="用户类别" name="acctType"
                  rules={[{required:true,message:"用户类别不可为空"}]}
                  defaultValue={(itemBox && itemBox.item.roleType.toString()) == 1? "系统管理员":itemBox&&itemBox.item.roleType.toString()}
                    onChange={this.handleChangeUserType.bind(this)}>
            <Option value="2">HR</Option>
            <Option value="3">面试官</Option>
          </Select>
        </FormItem>
          {(itemBox && itemBox.item.roleType.toString()) == 1?
              <FormItem style={{marginBottom:0}}>
              <Input type="hidden" name="acctType" defaultValue={"1"}/>
              </FormItem>
              :
              null
          }
        <FormItem {...formFullItemLayout}>
          <Input label="用户部门" name="dept" defaultValue={itemBox && itemBox.item.dept}/>
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <Select label="用户权限" name="resourceIdArr"
                  fetch={`${APP_SERVER}/userResource/listJson`}
                  renderItem={this.renderResoureOption}
                  mode="multiple"
                  defaultValue={itemBox && itemBox.item.resourceIdArr}
                  disabled = { userRights}/>
        </FormItem>
      </BaseForm>
    )
  }
}

@WrapperComponent(ModalView)
export default class UserEditView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params,location:{state}} = this.props
      if(state){
          actions.isRealNameAction({account:state.item.account})
      }
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,location} = this.props
      console.log(values)
      actions.saveUserAction(values)
      actions.backRoute(router)
  }
  render() {
    let {params,actions, reduce:{spins:{formSpin},isReal},location:{state}} = this.props
    //	let model=preduce.list[0]
    return (
      <Spin tip="Loading..." spinning={false}>
        <UserForm handleSubmit={this.handleSubmit} params={params} isReal={isReal} actions={actions}  saveFormRef={this.saveFormRef} itemBox={state} >
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </UserForm>
      </Spin>
    )
  }
}

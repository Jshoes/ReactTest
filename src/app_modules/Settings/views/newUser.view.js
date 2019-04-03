/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-17T17:32:29+08:00
 */

import React, {Component, PropTypes} from 'react'
import { Row, Col, Modal, Button, Input, Form, DatePicker, Layout, Spin, Rate, Select,TreeSelect } from 'antd'

import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'components/BaseForm'
import {TreeSelectPicker} from 'app/components/TreeView'
import {FormPage} from 'app/components/Page'
import ModalView from 'app/components/Modal.view'

import HrTipView from './roleHrTips.view'
import AdminTipView from './roleAdminTips.view'

const Option = Select.Option
const TreeNode = TreeSelect.TreeNode;
const {TextArea} = Input

@WrapperComponent(ModalView)
export default class UserOptionView extends FormPage{

  renderResoureOption(data,idx){
      return (<Select.Option value={data.resourceId} key={idx}>{data.resourceName}</Select.Option>)
  }
  renderRoleOption(data,idx){
      return (<Select.Option value={data.roleId} key={idx}>{data.roleName}</Select.Option>)
  }

  renderTreeData(item){
    return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id},this.loopTreeData(item.children))
  }

  loopTreeData(data){
    let that = this
    return data.map((item) => {
      if (item.children && item.children.length) {
        return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id},this.loopTreeData(item.children))
      }else{
        return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id})
      }
    })
  }

  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,location} = this.props
      actions.saveUserAction(values)
      actions.backRoute(router)
  }
  render() {
		let {actions, reduce:{spins:{formSpin}},item,routeParams,routeParams:{account}	} = this.props
    return (
      <Spin tip="Loading..." spinning={false}>
        <BaseForm onSubmit={this.handleSubmit} ref={this.saveFormRef}>
					<FormItem>
            <Input name="id" type='hidden' defaultValue={account}/>
          </FormItem>
          <FormItem>
            <Input label="姓名" name="acctName" rules={[{required:true,message:"用户名不可为空"}]} defaultValue={item.name}/>
          </FormItem>
          <FormItem>
            <Input label="用户名" name="account"
                   rules={[{required:true,message:"用户名不可为空"},{validator:customRules.checkMobile}]}
									 defaultValue={account}
									 disabled={routeParams.account?true:false}//编辑时不可修改
                   />
          </FormItem>
          <FormItem>
            <Select label="角色" name="roleId"
                    rules={[{required:true,message:"角色不可为空"}]}
                    fetch={`${APP_SERVER}/authRole/getRoleInfo`}
                    renderItem={this.renderRoleOption}
                    defaultValue={item.roleId}
                    />
          </FormItem>
          <FormItem>
              <TreeSelectPicker
                label="所属部门"
                name="dept"
                fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                // renderItem={this.renderTreeData.bind(this)}
                placeholder="选择部门"
                treeDefaultExpandAll
                defaultValue={item.dept}
                rules={[{required:true,message:"所属部门不可为空"}]}
              />
          </FormItem>
					<p>注：密码将以短信形式发送到成员手机。</p>
        </BaseForm>
      </Spin>
    )
  }
}

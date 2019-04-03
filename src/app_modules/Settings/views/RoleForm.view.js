import React, { Component } from 'react'
import { Input, Modal, Select,Row,Col,Tree } from 'antd'

import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm, {FormItem, customRules} from 'components/BaseForm'
import {FormPage} from 'app/components/Page'
import ModalView from 'app/components/Modal.view'
import DictUtils from 'app/utils/DictUtils'
import TreeView from 'app/components/TreeView'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
const {TreeNode} = Tree

const Option = Select.Option;

@WrapperComponent(ModalView)
 export default class RoleForm extends FormPage {

	componentDidMount() {
		let { actions, params,router } = this.props;
		console.log('paramsparamsparams',router)
		actions.roleDetailRemove()
		if(params.roleId){
			actions.saveRoleDetailAction(params.roleId)
		}
		actions.authTreeAction()
	}


	renderTree() {
    let self = this;
		let {reduce,} = this.props
		let checkedKeys=[]
    // let {spins:{tableSpin},key} = reduce
    // let page = reduce.page
		// let list = [...reduce.list.values()]
		console.log('reduce.roleDetail.authResourceList',reduce.roleDetail.authResourceList)
		if(reduce.roleDetail&&reduce.roleDetail.authResourceList){
			checkedKeys = reduce.roleDetail.authResourceList
			// checkedKeys = new Set(checkedKeys)
			// checkedKeys = Array.from(checkedKeys)
		}
		console.log(checkedKeys,'checkedKeyscheckedKeyscheckedKeys')
		const treeConfig = {
            checkable:true,
            checkStrictly:true,
			// defaultExpandAll: true,
			// checkedKeys当作defaultValue使用
			// checkedKeys:checkedKeys,
		}
    return (
			<TreeView  label="权限设置" name="resourceList" isTreeInModal={true} defaultValue={checkedKeys}  treeConfig={treeConfig} treeDataSource = {reduce.authTree}
				renderNode={
					(data)=> <TreeNode key={data.id} title={data.title||data.text}	/>}
			/>
		)
  }
	handleSubmit(values) {
		let { actions, router } = this.props;
		actions.saveRoleAction(values)
		actions.backRoute(router)
		console.log(values)
	}
	render() {
		//见FormPage.view.js
		const { onSubmit, saveFormRef,item ,reduce} = this.props
		console.log('reducereduce',reduce)
		return (
			<BaseForm onSubmit={onSubmit} ref={this.saveFormRef}>
				<FormItem>
					<Input name="roleId" type="hidden" defaultValue={item.roleId} />
				</FormItem>
				<FormItem>
					<Input label="角色名称" name="roleName" defaultValue={item.roleName}
						rules={[{required:true,message:"角色名称不可为空"}]} disabled={item.roleType==2&&item.isSystem==1?true:false}/>
				</FormItem>
				<FormItem>
					{this.renderTree()}
				</FormItem>
			</BaseForm>
		);
	}
}

/*
@WrapperComponent(ModalView)
class MailboxFormView extends FormPage {
	handleSubmit(values) {
		let { actions, router } = this.props;
		actions.saveMailboxItemAction(values)
		actions.backRoute(router)
	}
	updateFieldValue(value) {
		this.form.setFieldsValue({ host: value })
	}

	render() {
		return (
			<MailboxForm onSubmit={this.onSubmit} saveFormRef={this.saveFormRef} updateFieldValue={this.updateFieldValue.bind(this)}/>
		)
	}
}
export default MailboxFormView
*/

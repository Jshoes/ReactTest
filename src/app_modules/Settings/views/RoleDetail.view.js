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
		actions.authTreeAction()
		actions.roleDetailRemove()
		if(params.roleId){
			actions.saveRoleDetailAction(params.roleId)
		}
	}


	renderTree() {
    let self = this;
		let {reduce,} = this.props
		let checkedKeys=[]
    // let {spins:{tableSpin},key} = reduce
    // let page = reduce.page
		// let list = [...reduce.list.values()]
		if(reduce.roleDetail&&reduce.roleDetail.authResourceList){
			checkedKeys = reduce.roleDetail.authResourceList
		}
		const treeConfig = {
			checkable:true,
			disabled:true,
			// defaultExpandAll: true,
			// checkedKeys当作defaultValue使用
			// checkedKeys:checkedKeys,
		}
    return (
			<TreeView  label="权限设置" name="resourceList" isTreeInModal={true} defaultValue={checkedKeys}   treeConfig={treeConfig} treeDataSource = {reduce.authTree}
				renderNode={
					(data)=> <TreeNode key={data.id} title={data.title||data.text} disableCheckbox	/>}
			/>
		)
  }
	handleSubmit(values) {
		let { actions, router } = this.props;
		// actions.saveRoleAction(values)
		actions.backRoute(router)
		// console.log(values)
	}
	render() {
		//见FormPage.view.js
		const { onSubmit, saveFormRef,item ,reduce} = this.props
		return (
			<BaseForm onSubmit={onSubmit} ref={this.saveFormRef}>
				<FormItem>
					<Input name="roleId" type="hidden"  defaultValue={item.roleId} />
				</FormItem>
				<FormItem>
					<Input label="角色名称" name="roleName" disabled defaultValue={item.roleName}
						rules={[{required:true,message:"角色名称不可为空"}]}/>
				</FormItem>
				<FormItem>
					{this.renderTree()}
				</FormItem>
			</BaseForm>
		);
	}
}

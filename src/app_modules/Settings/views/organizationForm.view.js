import React, { Component } from 'react'
import { Input, Modal, Select, Row, Col, TreeSelect } from 'antd'

import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm, { FormItem, customRules } from 'components/BaseForm'
import { FormPage } from 'app/components/Page'
import ModalView from 'app/components/Modal.view'
import DictUtils from 'app/utils/DictUtils'

const Option = Select.Option;

@WrapperComponent(ModalView)
export default class OrganizationForm extends FormPage {
	state = {
		value: undefined,
		unAvailableOrg:[]
	}
	handleSubmit(values) {
		let { actions, router } = this.props;

		actions.saveOrgAction(values)
		actions.backRoute(router)
		// todo: fetch the whole tree after CRUD submit
		// actions.orgTreeAction()
		// console.log(values)
	}
	renderSelectOption(data, idx) {
		return (<Option value={data.account} key={idx}>{data.name}</Option>)
	}
	componentDidMount() {
		let { actions, reduce, params } = this.props;
		actions.orgTreeAction()
		console.log(params.orgId, 'params.orgIdparams.orgIdparams.orgId')
		actions.removeParentOrgAction()
		if (params.orgId) {
			actions.saveParentOrgAction({ groupId: params.orgId })
		}
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.reduce&&nextProps.reduce.parentOrg.editId&&nextProps.reduce.orgTree.length>0){
			const{editId} = nextProps.reduce.parentOrg
			console.log(nextProps.reduce.orgTree,'nextProps.reduce.orgTreenextProps.reduce.orgTree')
			let targetTreeNode = this._getTreeNode(nextProps.reduce.orgTree,editId)
			this._collectId(targetTreeNode)
			console.log(targetTreeNode,'targetTreeNodetargetTreeNodetargetTreeNode')
			// if(targetTreeNode&&targetTreeNode.length){
			// 	console.log(targetTreeNode,'targetTreeNodetargetTreeNodetargetTreeNode')
			// 	this._collectId(targetTreeNode)
			// }
		}
	}

	onChange = (value) => {
		console.log(value);
		this.setState({ value });
	}
	_getTreeNode(tree, value) {
		var stack = [];
		stack = stack.concat(tree);
		while (stack.length) {
			var temp = stack.shift();
			if (temp.children) {
				stack = temp.children.concat(stack);
			}
			if (value === temp.value) {
				return [temp]
			}
		}
	}
	_collectId(tree) {
		let {unAvailableOrg} = this.state
		for (var i = 0; i < tree.length; i++) {
			if (tree[i].children && tree[i].children.length > 0) {
				this._collectId(tree[i].children);
			}
			unAvailableOrg.push(tree[i].value)
			this.setState({unAvailableOrg})
		}
	}
	render() {
		const { onSubmit, saveFormRef, item, reduce, reduce: { parentOrg: parentOrg } } = this.props
		return (
			<BaseForm onSubmit={onSubmit} ref={this.saveFormRef}>
				<FormItem>
					<Input name="groupId" type="hidden" defaultValue={parentOrg.editId} />
				</FormItem>
				<FormItem>
					<Input label="部门名称" name="groupName" defaultValue={parentOrg.editName} rules={[{required:true,message:"部门名称不可为空"}]}/>
				</FormItem>
				<FormItem>
					{/* <Input label="上级部门" name="timeFrame" /> */}
					<TreeSelect
						label="上级部门"
						name="pid"
						// style={{ width: 300 }}
						// value={this.state.value}
						dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
						treeData={reduce.orgTree}
						placeholder="选择部门"
						treeDefaultExpandAll
						onChange={this.onChange}
						defaultValue={parentOrg.parentId}
						rules={[{required:true,message:"上级部门不可为空"},{validator:customRules.orgCompare,unAvailableIdArr:this.state.unAvailableOrg}]}
					/>
				</FormItem>
				<FormItem>
					{/* fetch 地址待后端更改 */}
					<Select label="部门负责人" name="leaders" mode="multiple" defaultValue={parentOrg.accList} fetch={`${APP_SERVER}/accountOperate/getHrList`} renderItem={this.renderSelectOption} />
				</FormItem>
			</BaseForm>
		);
	}
}

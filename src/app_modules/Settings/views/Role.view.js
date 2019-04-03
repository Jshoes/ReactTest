import React, { Component } from 'react'
import { Button, Card } from "antd"
import NestedComponent from 'app/decorators/NestedComponent'
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
import ButtonGroups from 'app/components/ButtonGroups'


@NestedComponent()
export default class Role extends PageView {
	componentDidMount() {
		let { actions } = this.props
		actions.roleListAction()
	}
	handleMenu(id,actionType){
    let { actions,router } = this.props
    actions[actionType].call(this,router,id)
  }
	renderToolbar() {
		let { actions, reduce } = this.props
		// let { mailboxList } = reduce
		return (
			<Button.Group>
				<Button type="primary" onClick={this.handleAdd.bind(this)} >添加角色</Button>
			</Button.Group>
		)
	}
	_renderTableList() {
		let { actions, reduce,items } = this.props
		let { spins:{tableSpin}} = reduce
		const tableConf = {
			loading:tableSpin,
			dataSource:items,
			rowkey: 'roleId',
			columns: [{
				title: '角色名称',
				dataIndex: 'roleName',
				key: 'roleName',
			}, {
				title: '操作',
				width: 120,
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => {
					if(record.isSystem==1&&record.roleType==3){
						return null
					}
					return (<ButtonGroups  handleClick={this.handleMenu.bind(this, record.roleId)}>
						<Button icon="profile" actionkey="detailRouteAction"/>
						{record.isSystem&&record.roleType==1?null:(<Button icon="edit" actionkey="editRoute"/>)}
						{record.isSystem?null:(<Button icon="delete" actionkey="deleteRoleAction" confirm="是否确认删除"/>)}
					</ButtonGroups>)
			},
			}],
		}
		return (
			<DataTable  {...tableConf} pagination={false} />
		)
	}
	handleDelete(data) {
		let { actions } = this.props
		// actions.deleteMailboxAction(data)
	}
	handleAdd() {
		let { actions, router } = this.props;
		actions.addRoute(router)
	}
	render() {
		const { children } = this.props
		return (
			<Card title={<div><h3 className="card-title">角色权限设置</h3></div>} extra={this.renderToolbar()} >
				{this._renderTableList()}
			</Card>
		);
	}
}

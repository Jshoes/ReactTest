import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import {Link} from 'react-router'
import { Button, Card, } from "antd"
import ButtonGroupExt from 'app/components/ButtonGroupExt'
@NestedComponent()
export default class SettingTable extends PageView {
	renderToolbar() {
		return (
			<Button.Group>
				<Button type="primary" onClick={this.handleAdd.bind(this)}>添加</Button>
			</Button.Group>
		)
	}
	handleAdd() {
		let { actions, router } = this.props;
		console.log(router)
		actions.addRoute(router)
	}

	// componentWillMount() {
	// 	let { actions,  } = this.props;

	// }
	handleBtnGroupClick(record,actionType){
		let { actions,router } = this.props
    actions[actionType].call(this,router,record.optionId)
  }
	_renderTableList() {
		let { actions, reduce, items,thTitle,routeName } = this.props
		let { spins: { tableSpin } } = reduce
		console.log("items",items)
		const tableConf = {
			loading: tableSpin,
			dataSource: items,
			rowkey: 'optionId',
			columns: [{
				title: thTitle,
				dataIndex: 'optionName',
				key: 'optionName',
			}, {
				title: '操作',
				width: 100,
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => (
					<ButtonGroupExt onClick={this.handleBtnGroupClick.bind(this,record)}>
							<Button icon="edit" actionkey="editRoute"   disabled={!!(record.isSystem)} >编辑</Button>
							<Button icon="delete" actionkey="deleteOptionAction" disabled={!!(record.isSystem)} confirm="确认删除？">删除</Button>
					</ButtonGroupExt>
				),
			}],
		}
		return (
			<DataTable  {...tableConf} pagination={false} />
		)
	}
	render() {
		const {title,subTitle} = this.props
		return (
			<Card title={<div><h3 className="card-title">{title}</h3><small className="card-subtitle">{subTitle}</small></div>}
						extra={this.renderToolbar()}>
				{this._renderTableList()}
			</Card>
		)
	}
}

import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import { Button, Card, } from "antd"
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import ButtonGroupExt from 'app/components/ButtonGroupExt'


@NestedComponent()
export default class CompanyView extends PageView {
	componentWillMount() {
		let { actions, } = this.props;
		actions.companyListAction()
	}

	renderToolbar() {
		return (
			<Button.Group>
				<Button type="primary" onClick={this.handleAdd.bind(this)}>添加</Button>
			</Button.Group>
		)
	}
	handleAdd() {
		let { actions, router } = this.props;
		actions.addRoute(router)
	}
	handleBtnGroupClick(record,actionType){
		let { actions,router } = this.props
    actions[actionType].call(this,router,record.id)
  }
	_renderTableList() {
		let { actions, reduce, items,router } = this.props
		let { spins: { tableSpin } } = reduce
		const tableConf = {
			loading: tableSpin,
			dataSource: items,
			rowkey: 'id',
			columns: [{
				title: "公司名称",
				width: 100,
				dataIndex: 'company',
				key: 'company',
			}, {
				title: "所在区域",
				width: 100,
				dataIndex: 'companyArea',
				key: 'companyArea',
				render: (text, record) => (
					record.province+record.city+record.county
				),
			}, {
				title: "详细地址",
				width: 100,
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '定位',
				width: 100,
				dataIndex: 'isLocation',
				key: 'isLocation',
				render: (text, record) => (
					!!(text) ? "已定位" : "未定位"
				),
			},
			{
				title: '操作',
				width: 100,
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => (
					<ButtonGroupExt onClick={this.handleBtnGroupClick.bind(this,record)}>
							<Button icon="edit" actionkey="editRoute" >编辑</Button>
							<Button icon="delete" disabled={record.isDefault?true:false} actionkey="deleteCompanyAction" confirm="确认删除？">删除</Button>
					</ButtonGroupExt>
				),
			}],
		}
		return (
			<DataTable  {...tableConf} pagination={false}/>
		)
	}
	render() {
		return (
			<Card title={<div><h3 className="card-title">公司信息设置</h3></div>} extra={this.renderToolbar()}>
				{this._renderTableList()}
			</Card>
		)
	}
}

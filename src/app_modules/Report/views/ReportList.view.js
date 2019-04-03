import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import { Layout, Button , Avatar, Checkbox, Cascader, Card } from 'antd';
import DataTable from 'app/components/DataTable'
import PageView from 'app/components/Page'

const CheckboxGroup = Checkbox.Group


@NestedComponent()
export default class ReportListView extends PageView {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			columns:[]
		}
	}
	renderToolbar() {
		return (
			<Button.Group>
				<Button type="primary" >查询</Button>
				<Button type="primary" >导出</Button>
			</Button.Group>
		)
	}
	componentDidMount() {
		const{actions,routeParams:{type}}=this.props
		console.log(type,'this.propsthis.propsthis.props')

	}

	_genTableColumns(type){
		if(type==2){
		}else if(type==3){
			this.setState({
				columns:[{
					title: '招聘负责人',
					dataIndex: 'hrName',
					key: 'hrName',
					width: 100,

				}, {
					title: '面试反馈',
					children: [{
						title: '面试反馈总数',
						dataIndex: 'interviewTotalNum',
						key: 'interviewTotalNum',
						width: 100,
					}, {
						title: '优秀率',
						dataIndex: 'interviewGoodNum',
						key: 'interviewGoodNum',
						width: 100,
					}, {
						title: '良好率',
						dataIndex: 'interviewFineNum',
						key: 'interviewFineNum',
						width: 100,
					}, {
						title: '及格率',
						dataIndex: 'interviewPassNum',
						key: 'interviewPassNum',
						width: 100,
					}, {
						title: '不及格率',
						dataIndex: 'interviewNopassNum',
						key: 'interviewNopassNum',
						width: 100,
					}],
				},{
					title: 'offer反馈',
					children: [{
						title: 'offer反馈总数',
						dataIndex: 'offerTotalNum',
						key: 'offerTotalNum',
						width: 100,
					}, {
						title: '接受率',
						dataIndex: 'offerAcceptNum',
						key: 'offerAcceptNum',
						width: 100,
					}, {
						title: '拒绝率',
						dataIndex: 'offerRefuseNum',
						key: 'offerRefuseNum',
						width: 100,
					}, ],
				}]
			})

		}else if(type==4){
			this.setState({
				columns: [{
					title: '渠道名称',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '发布职位数量',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '投递简历数量',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '插件简历数量',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '安排面试数量',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '发送offer数量',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '入职数量',
					dataIndex: 'hrName',
					key: 'hrName',
				}]
			})

		}else if(type==6){
			this.setState({
				columns: [{
					title: '日期',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '招聘负责人',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '通话时长',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '通话次数',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '短信数',
					dataIndex: 'hrName',
					key: 'hrName',
				},{
					title: '邮件数',
					dataIndex: 'hrName',
					key: 'hrName',
				}]
			})
		}
	}
	renderTable(){
		const tableConf = {
			// loading: tableSpin,
			bordered:true,
			dataSource: [],
			rowkey: 'jobId',
			columns: [{
				title: '招聘负责人',
				dataIndex: 'hrName',
				key: 'hrName',
			},{
				title: '阅读量',
				dataIndex: 'hrName',
				key: 'hrName',
			},{
				title: '插件入库量',
				dataIndex: 'hrName',
				key: 'hrName',
			},{
				title: '邀约量',
				dataIndex: 'hrName',
				key: 'hrName',
			},{
				title: '安排面试量',
				dataIndex: 'hrName',
				key: 'hrName',
			},{
				title: '发送offer量',
				dataIndex: 'hrName',
				key: 'hrName',
			},{
				title: '入职量',
				dataIndex: 'hrName',
				key: 'hrName',
			}],
		}
		return (
			<DataTable  {...tableConf}  />
		)
	}
	render() {
		const { params, items } = this.props
		const { data } = this.state
		return (
			<Card extra={this.renderToolbar()}>
				{this.renderTable()}
			</Card>
		)
	}
}

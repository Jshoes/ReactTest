import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import { Layout, Button, Avatar, Checkbox, Cascader, Card } from 'antd';
import DataTable from 'app/components/DataTable'
import PageView from 'app/components/Page'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import CalendarPicker from 'app/components/CalendarPicker'
import moment from 'moment';

const CheckboxGroup = Checkbox.Group


@NestedComponent()
export default class ReportListView extends PageView {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			exportParams:{time:[moment().subtract('days', 29),moment()]},
			defaultDate : [moment().subtract('days', 29),moment()]
		}
	}
	renderToolbar() {
		return (
			<AdvancedSearchForm autoSubmitForm={false} filterSubmitHandler={this.handleSubmit.bind(this)} >
				<CalendarPicker label="统计时间" name="time" defaultValue={this.state.defaultDate} />
			</AdvancedSearchForm>
		)
	}
	componentDidMount() {
		const { actions, routeParams: { type } } = this.props
		const{defaultDate} = this.state
		actions.workloadReportAction({time:defaultDate})

	}
	exportExcel(){
		const{actions}=this.props
		actions.exportAction('/report/reportWorkload/export',this.state.exportParams)

	}

	handleSubmit(v){
		console.log('page')
		const{actions,reduce:{page}}=this.props
		this.setState({
			exportParams:v
		})
		actions.workloadReportAction(v)
		console.log(v)
	}
	handleFilter(value){
		const{reduce:{page},actions}=this.props
		console.log('dasdasdasdasdas',value)
		actions.workloadReportAction(value)

	}
	renderTable() {
		let { reduce } = this.props
		let { spins: { tableSpin }, key, page } = reduce
		let list = reduce.recruitmentStatusList
		const tableConf = {
			loading: tableSpin,
			onChange:this.onChange.bind(this),
			dataSource: [],
			rowkey: 'jobId',
			columns: [{
				title: '招聘负责人',
				width: 120,
				dataIndex: 'hrName',
				key: 'hrName',
			}, {
				title: '阅读量',
				width: 120,
				dataIndex: 'readNum',
				key: 'readNum',
			}, {
				title: '插件入库量',
				width: 120,
				dataIndex: 'pluginLibraryNum',
				key: 'pluginLibraryNum',
			}, {
				title: '邀约量',
				width: 120,
				dataIndex: 'inviteNum',
				key: 'inviteNum',
			}, {
				title: '安排面试量',
				width: 120,
				dataIndex: 'arrangeInterviewNum',
				key: 'arrangeInterviewNum',
			}, {
				title: '发送offer量',
				width: 120,
				dataIndex: 'offerNum',
				key: 'offerNum',
			}, {
				title: '入职量',
				width: 120,
				dataIndex: 'entryNum',
				key: 'entryNum',
			}],
		}
		return (
			<DataTable  {...tableConf} dataSource={list} page={page}  />
		)
	}
	render() {
		return (
			<Card title={this.renderToolbar()} extra={<Button onClick={this.exportExcel.bind(this)}>导出</Button>}>
				{this.renderTable()}
			</Card>
		)
	}
}

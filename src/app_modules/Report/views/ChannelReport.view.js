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
			exportParams:{reportTimes:[moment().subtract('days', 29),moment()]},
			columns: [],
			defaultDate : [moment().subtract('days', 29),moment()]

		}
	}

	handleFilter(value) {
		let { actions } = this.props;
		this.setState({
			exportParams:value
		})
		actions.channelReportAction(value)
		console.log(value)

	}
	renderToolbar() {
		return (
			<AdvancedSearchForm autoSubmitForm={false} filterSubmitHandler={this.handleFilter.bind(this)} >
				<CalendarPicker label="统计时间" name="reportTimes" defaultValue={this.state.defaultDate} />
			</AdvancedSearchForm>
		)
	}
	componentDidMount() {
		const { actions, routeParams: { type } } = this.props
		const{defaultDate}=this.state
		actions.channelReportAction({reportTimes:defaultDate})

	}

	exportExcel(){
		const{actions}=this.props
		actions.exportAction('/reportChannel/export',this.state.exportParams)

	}
	renderTable() {
		let { reduce } = this.props
		let { spins: { tableSpin }, key, page } = reduce
		let list = reduce.recruitmentStatusList
		const tableConf = {
			loading: tableSpin,
			onChange:this.onChange.bind(this),
			dataSource: [],
			rowkey: 'id',
			columns: [{
				width: 120,
				title: '渠道名称',
				dataIndex: 'channelName',
				key: 'channelName',
			}, {
				width: 120,
				title: '发布职位数量',
				dataIndex: 'issueJobNum',
				key: 'issueJobNum',
			}, {
				width: 120,
				title: '投递简历数量',
				dataIndex: 'deliverResumeNum',
				key: 'deliverResumeNum',
			}, {
				width: 120,
				title: '插件简历数量',
				dataIndex: 'pluginNum',
				key: 'pluginNum',
			}, {
				width: 120,
				title: '安排面试数量',
				dataIndex: 'arrangeInterviewNum',
				key: 'arrangeInterviewNum',
			}, {
				width: 120,
				title: '发送offer数量',
				dataIndex: 'sendOfferNum',
				key: 'sendOfferNum',
			}, {
				width: 120,
				title: '入职数量',
				dataIndex: 'entryNum',
				key: 'entryNum',
			}],
		}
		return (
			<DataTable {...tableConf} dataSource={list} page={page} />
		)
	}
	render() {
		const { params, items } = this.props
		const { data } = this.state
		return (
			<Card title={this.renderToolbar()} extra={<Button onClick={this.exportExcel.bind(this)}>导出</Button>} >
				{this.renderTable()}
			</Card>
		)
	}
}

import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import { Layout, Button, Avatar, Checkbox, Cascader, Card,Input,Select,Tooltip } from 'antd';
import DataTable from 'app/components/DataTable'
import PageView from 'app/components/Page'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import CalendarPicker from 'app/components/CalendarPicker'
import moment from 'moment';
import API from '../api'
// import style from './style.less'
const CheckboxGroup = Checkbox.Group


@NestedComponent()
export default class ReportListView extends PageView {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			exportParams:{time:[moment().subtract('days', 29),moment()]},
			defaultDate : [moment().subtract('days', 29),moment()],
			inputAccArr:[]
		}
	}
	handleFilter(v){
		const{actions}=this.props
		this.setState({
			exportParams:v
		})
		actions.remarkReportAction(v)
		console.log(v)
	}
	renderJobOption(data,idx){
		return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
	}
	renderAccOption(data,idx){
		return (<Select.Option value={data.account} key={idx}>{data.name?data.name:data.account}</Select.Option>)
	}
	renderToolbar() {
		return (
			<AdvancedSearchForm autoSubmitForm={false} filterSubmitHandler={this.handleFilter.bind(this)} >
				<Select  name="jobId" label="职位名称" fetch={`${APP_SERVER}/jobNew/getJobList`} renderItem={this.renderJobOption} style={{width:'120px'}}/>
				<Select  name="inputAcc" label="备注人" fetch={this.state.inputAccArr} renderItem={this.renderAccOption} style={{width:'120px'}}/>
				<CalendarPicker label="统计时间" name="time" defaultValue={this.state.defaultDate} />
			</AdvancedSearchForm>
		)
	}
	componentDidMount() {
		const { actions, routeParams: { type } } = this.props
		const{defaultDate}=this.state
		actions.remarkReportAction({time:defaultDate})
		new API().fetchRightList().then((json) => {
			this.setState({
				inputAccArr:json.list||[]
			});
		});
	}
	exportExcel(){
		const{actions}=this.props
		actions.exportAction('/report/reportWorkload/export',this.state.exportParams)

	}

	renderTable() {
		let { reduce } = this.props
		let { spins: { tableSpin }, key, page } = reduce
		let list = reduce.recruitmentStatusList
		const tableConf = {
			loading: tableSpin,
			dataSource: [],
			onChange:this.onChange.bind(this),
			rowkey: 'id',
			columns: [{
				title: '姓名',
				width: 120,
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '职位名称',
				width: 120,
				dataIndex: 'jobTitle',
				key: 'jobTitle',
			}, {
				title: '备注人',
				width: 120,
				dataIndex: 'inputName',
				key: 'inputName',
				render(text,record){
					return text?text:record.inputAcc
				}
			}, {
				title: '备注时间',
				width: 120,
				dataIndex: 'inputTime',
				key: 'inputTime',
			}, {
				title: '备注',
				width: 180,
				dataIndex: 'context',
				key: 'context',
				render(text,record){
					return <Tooltip title={text}>
						<span>{text&&text.length>20?text.slice(0,20)+'...':text}</span>
					</Tooltip>
				}
			}, ],
		}
		return (
			<DataTable  {...tableConf} dataSource={list} page={page}  />
		)
	}
	render() {
		return (
			<Card title={this.renderToolbar()} className="report-container" >
				{this.renderTable()}
			</Card>
		)
	}
}

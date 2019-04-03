import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import { Row, Col, Button, Avatar, Checkbox, Cascader, Card, Input, } from 'antd';
import DataTable from 'app/components/DataTable'
import PageView from 'app/components/Page'
import CalendarPicker from 'app/components/CalendarPicker'
import Pie from 'app/components/Charts/NewPie'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import style from './styles.less'
import moment from 'moment';
const CheckboxGroup = Checkbox.Group


@NestedComponent()
export default class ReasonReportView extends PageView {
	constructor(props) {
		super(props)
		this.state = {
			exportParams:{time:[moment().subtract('days', 29),moment()]},
			defaultDate : [moment().subtract('days', 29),moment()],
			data: []
		}
	}
	componentDidMount() {
		const { actions } = this.props
		const{defaultDate}=this.state
		actions.reasonReportAction({time:defaultDate})
	}
	handleFilter(value) {
		const{actions}=this.props
		this.setState({
			exportParams:value
		})
		actions.reasonReportAction(value)
	}
	exportExcel(){
		const{actions}=this.props
		// actions.exportAction('/reportFeedback/export',this.state.exportParams)

	}
	renderToolbar() {
		return (
			<AdvancedSearchForm autoSubmitForm={false} filterSubmitHandler={this.handleFilter.bind(this)} >
				<CalendarPicker label="统计时间" name="time" defaultValue={this.state.defaultDate} />
			</AdvancedSearchForm>
		)
	}
	renderChart() {
		const{reduce:{reasonReport}}=this.props
		return (
			<Row gutter={24}>
				<Col span={12}>
					<h2>offer拒绝原因统计</h2>
					<Pie title="offer拒绝" sum={reasonReport.total["offer拒绝总量"]} data={reasonReport.offer}/>
				</Col>
				<Col span={12}>
					<h2>人才归档原因统计</h2>
					<Pie title="人才归档" sum={reasonReport.total["加入人才库总量"]} data={reasonReport.talent}/>
				</Col>
			</Row>
		)
	}
	render() {
		const { params, items } = this.props
		const { data } = this.state
		return (
			<Card title={this.renderToolbar()}
			// extra={<Button onClick={this.exportExcel.bind(this)}>导出</Button>}
			>
				{this.renderChart()}
			</Card>
		)
	}
}

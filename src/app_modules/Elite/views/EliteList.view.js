import React, { Component, PropTypes } from 'react'
import {
	Divider,
	Button,
	Cascader,
	Input,
	Table,
	DatePicker,
	Select,
	Radio,
	Modal,
	Menu,
	Card,
	Dropdown,
	Icon,
} from 'antd'
import { Link } from 'react-router'
import PageView from 'components/Page'
import NestedComponent from 'app/decorators/NestedComponent'
import SmartLink from 'app/components/SmartLink'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import AdvancedSearchPanel from 'app/components/AdvancedSearchPanel'
import ButtonGroups from 'app/components/ButtonGroups'
import CalendarPicker from 'app/components/CalendarPicker'
import BaseForm, { FormItem } from 'components/BaseForm'
import LinkagePullDown from 'app/components/LinkagePullDown'
import DataTable, { SelectDataTable } from 'app/components/DataTable'
import TableRow from 'app/components/TableRow/Resume'
import TagSelect from 'app/components/TagSelect'
import Permission from 'app/components/Permission'
import DictUtils from 'app/utils/DictUtils'
import moment from 'moment'
const Option = Select.Option

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@NestedComponent()
export default class EliteListView extends PageView {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		// this.super.componentWillReceiveProps(nextProps)

		if (nextProps.reduce.params != this.props.reduce.params ) {
			this.setState({
				selectedRows: [],
				selectedRowKeys: []
			}, () => {
				console.log("clear state select")
				console.log(this.state)
			})
		}

		if(nextProps.routeParams.type!=this.props.routeParams.type){

			let { actions, reduce:{params},routeParams:{type},router } = nextProps

			actions.listAction({...params,libType:type,type:0})
			actions.talentCountAction({libType:type})
			//表格行选中状态不刷新   暂时重载页面处理
			// window.location.reload();
		}
	}

	componentDidMount() {
		let { actions, reduce:{params},routeParams:{type} } = this.props;
		actions.listAction({...params,libType:type,type:0})
		actions.talentCountAction({libType:type})

	}
	handleClick(v) {
		// console.log(v)
	}
	renderEliteSelectOption(data, idx) {
		return (<Select.Option value={data.optionId} key={idx}>{data.optionName}</Select.Option>)
	}

	handleMenu(actionType) {
		let { actions, router ,reduce:{params},routeParams:{type} } = this.props
		const { selectedRowKeys } = this.state
		console.log(this, selectedRowKeys,type)
		actions[actionType].call(this,selectedRowKeys,router)
		actions.listAction({...params,libType:type})
	}

	renderToolbar() {
		let { actions ,reduce:{params:{libType}}} = this.props;
		if(libType==3){
			return this.selectRowShow(
				<ButtonGroups handleClick={this.handleMenu.bind(this)} showSize={5}>
					<Button icon="delete" actionkey="deleteAction" confirm={[<p>确认删除？</p>,<p>只删除候选人此条记录，候选人在候选人管理和人才库的其他职位下的记录不会被删除。</p>]}>删除</Button>
					<Button icon="export" actionkey="recommondRoute">推荐给面试官</Button>
					<Button icon="paper-clip" actionkey="relateRoute">关联职位</Button>
				</ButtonGroups>
			)
		}else{
			return this.selectRowShow(
				<ButtonGroups handleClick={this.handleMenu.bind(this)} showSize={5}>
					<Button icon="usergroup-add"  actionkey="move2EliteRoute">移入人才库</Button>
				</ButtonGroups>
			)
		}
	}
	renderTableList() {
		let that = this;
		let { reduce, items ,routeParams:{type}} = this.props

		let { spins: { tableSpin }, key, page } = reduce
		const rowSelection = {
			onChange: this.onSelectChange.bind(this),
      selectedRowKeys:this.state.selectedRowKeys
		};

		let tableConf = {
			loading: tableSpin,
			rowKey: 'id',
			onChange:this.onChange.bind(this),
			rowSelection: rowSelection,
			title: () => this.renderToolbar(),
			columns: [
				{
					title: "基本资料",
					key: "info",
					width: 600,
					dataIndex: "info",
					render: (name, row) => {

						return (<TableRow item={row}></TableRow>)
					},
				}, {
					title: "最近归档时间",
					key: "lastInputTime",
					dataIndex: "lastInputTime",
					width: 180,
					// sorter: true,
					render: (val) => {
						return val?moment(val).format("YYYY-MM-DD"):void 0;
					}
				}, {
					title: "最近应聘职位",
					key: "jobTitle",
					dataIndex: "jobTitle",
					width: 180,

				},{
					title: "最近入库详情",
					key: "filingReasonName",
					dataIndex: "filingReasonName",
					width: 200,
					render:(val,record)=>{
						let obj={
							//0-筛选 1-待邀约 2-面试 3-offer 4-待入职
							0:'筛选',
							1:'待邀约',
							2:'面试',
							3:'offer',
							4:'待入职'
						}
						let typeMatch={
							3:'归档原因：',
							4:'不良事件：'
						}
						return (
							<dl style={{marginBottom:'0'}}>
								{record.filingReasonName?(<dt>{typeMatch[type]}{record.filingReasonName}</dt>):null}
								<dt>归档前阶段：{obj[record.status]}</dt>
							</dl>
						)
					}
				},{
					title: "人才库分类",
					key: "libType",
					dataIndex: "libType",
					width: 180,
					render: (val) => {
						return val==3?'公共人才库':'诚信库'
					}
				},
			]
		}

		return (<DataTable  {...tableConf} dataSource={items} page={page} />)
	}
	handleFilter(values){
    console.log(values,'asdasdsada')
    let {actions,reduce:{params}} = this.props
		actions.listAction({...params,...values})
	}
	changes(values){
		let {actions,reduce:{params}} = this.props
		let {target:{value}} = values

		actions.listAction({...params,type:value})
	}
	renderOptions(it){
    return (
      <RadioButton value={it.type}>
        <span>{it.title}</span>
        <span className="count">{it.count}</span>
      </RadioButton>
    )
  }
	renderTitle() {
		const { reduce: { talentCount } } = this.props

		return (
			<AdvancedSearchForm classNames="radioGroupResetFormItem" autoSubmitForm={false} filterSubmitHandler={this.handleFilter.bind(this)} isSearchBtnHide={true}>
				<RadioGroup className="eliteRadio radioGroupReset" onChange={this.changes.bind(this)} name="type" fetch={talentCount} renderItem={this.renderOptions.bind(this)} />
      </AdvancedSearchForm>
		)
	}
	render() {
		let { children } = this.props
		return (
			<Card title={this.renderTitle()} type="inner">
				{this.renderTableList()}
			</Card>
		)
	}
}

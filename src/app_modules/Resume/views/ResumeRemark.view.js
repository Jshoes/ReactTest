import React, {Component, PropTypes} from 'react'
import PageView from 'components/Page'
import {
  Button,
  Input,
  Table,
  DatePicker,
  Select,
  Modal,
  Menu,
    Card,
  message,
  Dropdown,
  Icon,
	Divider,
	Popover
} from 'antd'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import moment from 'moment'
import DataTable from 'app/components/DataTable'
import Ellipsis from 'app/components/Ellipsis'
import CalendarPicker from 'app/components/CalendarPicker'

export default class ResumeRemarkView extends PageView{
	constructor(props) {
    super(props);
	}


	componentWillMount() {
		let {actions} = this.props
		actions.remarkListAction({time:[moment().subtract(7,"days"),moment()]})
	}
	handleFilter(value) {
		let {actions} = this.props;
		actions.remarkListAction(value);
  }
	renderJobOption(data,idx){
    return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
	}
	renderOption(data,idx){
    return (<Select.Option value={data.account} key={idx}>{data.name}</Select.Option>)
	}
	renderRemarkOption(data,idx){
		return (<Select.Option value={data.optionId} key={idx}>{data.optionName}</Select.Option>)
	}
	renderSearchBar() {
		// let keysOption = []
		return(
			<AdvancedSearchForm showExpand={4} filterSubmitHandler={this.handleFilter.bind(this)} >
				<Select name="jobId" label="职位名称" placeholder="请选择"   fetch={`${APP_SERVER}/jobNew/listJson`} renderItem={this.renderJobOption} />
				<Select name="inputAcc" label="备注人"  placeholder="请选择" fetch={`${APP_SERVER}/accountOperate/getHrList`} renderItem={this.renderOption} />
				<Select name="labelList" label="备注标签" mode="multiple" maxTagCount={5}  placeholder="请选择" fetch={`${APP_SERVER}/option/optionListJson?optionCode=remarks_code`} renderItem={this.renderRemarkOption} />
        <CalendarPicker label="备注时间" name="time"   defaultValue={[moment().subtract(7,"days"),moment()]}/>
      </AdvancedSearchForm>
		)
	}
	renderTableList() {
    let {reduce} = this.props
		let {spins:{tableSpin},key,page} = reduce
    let list = [...reduce.remarkList.values()]
    console.log(list)
    let tableConf = {
      loading: tableSpin,
        title:function(){
            return null
        },
      onChange:this.onChange.bind(this),
      rowKey: key,
      columns: [
        {
          title: "姓名",
          key: "name",
          width: 120,
          dataIndex: "name",
          // sorter: true,
          // render:(name,row)=>{
          //     let path = {
          //         pathname:`/interview/list/${row['resumeId']}/detail`,
          //         state:{item:row,name:name}
          //     }
          //     return (<Link to={path} >{name}</Link>)
          // },
        }, {
          title: "职位名称",
          key: "jobTitle",
          width: 120,
          dataIndex: "jobTitle",
          // sorter: true
        }, {
          title: "备注人",
          key: "inputName",
          width: 120,
          dataIndex: "inputName",
          render:(val,row)=>{
            return val?val:row['inputAcc']
          }
        }, {
          title: "备注时间",
          key: "inputTime",
          width: 120,
          dataIndex: "inputTime",
          // sorter: true
        }, {
          title: "备注",
          key: "context",
          dataIndex: "context",
          width: 120,
          render:(val) => {
              return (
                <Ellipsis tooltip={true} length={24}>{String(val)}</Ellipsis>
              )
            }
        },{
          title: "备注标签",
          key: "labelNames",
          dataIndex: "labelNames",
          width: 120,
          render:(val) => {
              return (
                <Ellipsis tooltip={true} length={16}>{String(val)}</Ellipsis>
              )
            }
        },
      ]
    }
    return (<DataTable style={{
      width: '100%'
    }} {...tableConf} dataSource={list}  page={page}/>)
  }



	render() {
		let {children} = this.props
		return (
			<Card type="inner">
				{children}
				{this.renderSearchBar()}
				{this.renderTableList()}
			</Card>
		);
	}
}

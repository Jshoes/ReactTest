import React, {Component, PropTypes} from 'react'
//import {reduxForm,Field} from 'redux-form'
import {Button, Input, Table, Form, DatePicker,Card,Switch,Row,Col,Select,Checkbox,Radio  } from 'antd'
import {Layout,Fixed,Pane} from 'components/Layout'
import PageView,{FormPage} from 'components/Page'
import CalendarPicker from 'components/CalendarPicker'
import DataTable from 'components/DataTable'
import moment from 'moment'
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;



export default class ReportFormView extends PageView {
    componentWillMount() {
        let {actions} = this.props;
        actions.recruitmentStatusAction()
		}

		exportExcel(){
			const{actions}=this.props
			actions.exportAction('/jobNew/export',this.state.exportParams)

		}
		handleFilter(value){
			const{reduce:{page},actions}=this.props
			actions.recruitmentStatusAction(value)

		}
    renderTableList(){
        let that=this;
        let {reduce} = this.props
        let {spins:{tableSpin},key,page} = reduce
        let list = reduce.recruitmentStatusList
        let tableConf = {
            loading: tableSpin,
            onChange:this.onChange.bind(this),
            rowKey: 'jobId',
            // title:()=>{
            //     return this.renderSearchBar()
            // },
            columns: [
                {
                    title: "职位名称",
                    key: "jobTitle",
                    width: 120,
                    dataIndex: "jobTitle",
                }, {
                    title: "预计招聘数量",
                    key: "hiringNumber",
                    width: 120,
                    dataIndex: "hiringNumber",
                }, {
                    title: "已入职人数",
                    key: "yrzNum",
                    dataIndex: "yrzNum",
                    width: 120,
                }, {
                    title: "待入职人数",
                    key: "drzNum",
                    dataIndex: "drzNum",
                    width: 120,
                }, {
                    title: "offer阶段人数",
                    key: "offerNum",
                    dataIndex: "offerNum",
                    width: 120,
                },{
                    title: "面试阶段人数",
                    key: "msNum",
                    dataIndex: "msNum",
                    width: 120,
                },{
                    title: "邀约阶段人数",
                    key: "yyNum",
                    dataIndex: "yyNum",
                    width: 120,
                },{
                    title: "筛选阶段人数",
                    key: "sxNum",
                    dataIndex: "sxNum",
                    width: 120,
                },
            ]
        }
        return (<DataTable {...tableConf} dataSource={list} page={page} />)
    }

  render() {
    return (
        <Card extra={<Button onClick={this.exportExcel.bind(this)}>导出</Button>}>
            {this.renderTableList()}
        </Card>
    )
  }
}

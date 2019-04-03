import React, {Component, PropTypes} from 'react'
//import {reduxForm,Field} from 'redux-form'
import {Button, Input, Table, Form, DatePicker,Card,Switch,Row,Col,Select,Checkbox,Radio  } from 'antd'
import moment from 'moment'
import groupArray from 'group-array'
import {Layout,Fixed,Pane} from 'components/Layout'
import PageView,{FormPage} from 'components/Page'
import CalendarPicker from 'components/CalendarPicker'
import DataTable from 'components/DataTable'
import SwitchCard from 'components/SwitchCard'
import WrapperComponent from '../../decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'components/BaseForm'
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;


export default class ReportComView extends PageView {
    componentWillMount() {
        let {params, data, actions} = this.props;
        actions.callRecordListAction()
    }
    onRadioChange(){

    }
    handleChange(dates,dateStrings){

    }
    saveFormRef = (form) => {
        this.form = form;
    }
    handleSubmit(){
        let {actions} = this.props
        let formats = 'YYYY-MM-DD'
        this.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            actions.callRecordListAction(values)
        });
    }
    exportSubmit(value){
      let {actions} = this.props
      this.form.validateFieldsAndScroll((err, values) => {
          if (err) {
              return;
          }
          actions.exportAction(`/reportCallRecord/export`,values)
      });
    }
    renderSearchBar(){
        const formFullItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        };
        return ( <BaseForm onSubmit={this.handleSubmit.bind(this)} ref={this.saveFormRef}>
            <Row gutter={4}>
                <Col span={6}>
                <FormItem {...formFullItemLayout}>
                    <CalendarPicker label="选择日期" name="inputDateStr" maxDate={moment().endOf("day")} onChange={this.handleChange.bind(this)} defaultValue={[moment().subtract(30,'days'),moment()]} rules={[{validator:customRules.dateRangePicked,days:30}]}/>
                </FormItem>
                </Col>
                <Col span={6} style={{textAlign:'left',paddingLeft:'10px',paddingTop:'2.55px'}}>
                    <Button type="default" onClick={this.handleSubmit.bind(this)}>统计</Button>
                    <Button type="default" onClick={this.exportSubmit.bind(this)}>导出</Button>
                </Col>

            </Row>
        </BaseForm>)
    }
    renderTableList() {
        let that=this;
        let {reduce} = this.props
        let {spins:{tableSpin},key,page} = reduce
        let list = [...reduce.reportCallrecordList.values()]

        let tableConf = {
            loading: tableSpin,
            onChange:this.onChange.bind(this),
            rowKey: key,
            title:()=>{
                return this.renderSearchBar()
            },
            columns: [
                {
                    title: "日期",
                    key: "inputDate",
                    width: 120,
                    dataIndex: "inputDate",
                }, {
                    title: "HR帐户",
                    key: "hrAcc",
                    width: 200,
                    dataIndex: "hrAcc"
                }, {
                    title: "通话时长（分钟）",
                    key: "timeLength",
                    width: 200,
                    dataIndex: "timeLength",
                }, {
                    title: "通话次数（呼出/总数）",
                    key: "callNum",
                    dataIndex: "callNum",
                    width: 120,
                    render: function(value,row,index){
                      let returnValue = []
                      returnValue.push(row.calloutNum)
                      returnValue.push(row.callNum)
                      return returnValue.join("/")
                    }
                }, {
                    title: "短信数",
                    key: "smsNum",
                    dataIndex: "smsNum",
                    width: 120,
                },{
                    title: "邮件数",
                    key: "emailNum",
                    dataIndex: "emailNum",
                    width: 120,
                },
            ]
        }
        return (<DataTable {...tableConf} dataSource={list} pagination={false} />)
    }

    render() {
        return (
            <Card type="inner">
                {this.renderTableList()}
            </Card>
        )
    }
}

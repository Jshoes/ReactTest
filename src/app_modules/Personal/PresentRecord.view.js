import React, {Component, PropTypes} from 'react'
//import {reduxForm,Field} from 'redux-form'
import {Button,Col, Input, Table, Form, DatePicker,Card,Switch,Row,Select,Checkbox,Radio  } from 'antd'
import {Layout,Fixed,Pane} from 'components/Layout'
import PageView,{FormPage} from 'components/Page'
import BaseForm,{FormItem} from 'components/BaseForm'
import DataTable from 'components/DataTable'
import moment from 'moment'
import CalendarPicker from 'components/CalendarPicker'
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;

export default class RecordView extends PageView {
    saveFormRef = (form) => {
        this.form = form;
    }
    componentWillMount() {
        let {actions} = this.props
        let initialTime = [moment().subtract(30,'days'),moment()]
        actions.recordListAction({dateArr:initialTime})
    }
    handleChange(dates,dateStrings){

    }
    handleSubmit(values){
        let {actions} = this.props
        let formats = 'YYYY-MM-DD'
        this.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            actions.recordListAction(values)
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
        return (<BaseForm onSubmit={this.handleSubmit.bind(this)} ref={this.saveFormRef}>
            <Row gutter={4}>
                <Col span={6}>
                  <FormItem {...formFullItemLayout}>
                      <CalendarPicker label="提现日期" name="dateArr" onChange={this.handleChange.bind(this)} defaultValue={[moment().subtract(30,'days'),moment()]}/>
                  </FormItem>
                </Col>
                <Col span={6} style={{textAlign:'left',paddingLeft:'10px',paddingTop:'3.55px'}}>
                    <Button type="default" onClick={this.handleSubmit.bind(this)}>查询</Button>
                </Col>
            </Row>
        </BaseForm>)
    }
    renderTableList() {
        let that=this
        let {reduce} = this.props
        let {spins:{tableSpin},key} = reduce
        let list = [...reduce.list.values()]
        let tableConf = {
            loading: tableSpin,
            onChange:this.onChange.bind(this),
            rowKey: key,
            title:()=>{
                return this.renderSearchBar()
            },
            columns: [
                {
                    title: "提现时间",
                    key: "date",
                    width: 120,
                    dataIndex: "date",
                }, {
                    title: "金额",
                    key: "money",
                    width: 200,
                    dataIndex: "money",
                    render:(val)=>{
                        return "￥"+val
                    }
                }, {
                    title: "到款账户",
                    key: "alipayAcct",
                    dataIndex: "alipayAcct",
                    width: 120,
                }, {
                    title: "提现结果",
                    key: "arrangeInterviewOne",
                    dataIndex: "arrangeInterviewOne",
                    width: 120,
                }
            ]
        }
        return (<DataTable  {...tableConf} dataSource={list}  />)
    }

    render() {
        return (
          <Card type="inner" title="提现记录">
              {this.renderTableList()}
          </Card>
        )
    }
}

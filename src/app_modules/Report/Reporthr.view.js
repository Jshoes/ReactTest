import React, {Component, PropTypes} from 'react'
//import {reduxForm,Field} from 'redux-form'
import {Button,Col, Input, Table, Form, DatePicker,Card,Switch,Row,Select,Checkbox,Radio  } from 'antd'
import {Layout,Fixed,Pane} from 'components/Layout'
import PageView,{FormPage} from 'components/Page'
import BaseForm,{FormItem,customRules} from 'components/BaseForm'
import DataTable from 'components/DataTable'
import moment from 'moment'
import CalendarPicker from 'components/CalendarPicker'
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;

export default class ReportHrView extends PageView {
    saveFormRef = (form) => {
        this.form = form;
    }
    componentWillMount() {
        let {actions} = this.props
        let initialTime = [moment().subtract(30,'days'),moment()]
        actions.hrListAction({time:initialTime})
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
            actions.hrListAction(values)
        });
    }
    exportSubmit(value){
      let {actions} = this.props
      this.form.validateFieldsAndScroll((err, values) => {
          if (err) {
              return;
          }
          actions.exportAction(`/report/recruit/export`,values)
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
                      <CalendarPicker label="选择日期" name="time" maxDate={moment().endOf("day")} onChange={this.handleChange.bind(this)} defaultValue={[moment().subtract(30,'days'),moment()]} rules={[{validator:customRules.dateRangePicked,days:30}]} />
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem {...formFullItemLayout}>
                    <Select label='简历范围' name='type' defaultValue="">
                      <Option value="">全部简历</Option>
                      <Option value="1">投递简历</Option>
                      <Option value="2">推荐简历</Option>
                      <Option value="3">插件简历</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6} style={{textAlign:'left',paddingLeft:'10px',paddingTop:'3.55px'}}>
                    <Button type="default" onClick={this.handleSubmit.bind(this)}>统计</Button>
                    <Button type="default" onClick={this.exportSubmit.bind(this)}>导出</Button>
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
                    title: "招聘HR",
                    key: "hrName",
                    width: 120,
                    dataIndex: "hrName",
                    render:(val,row)=>{
                        let {userAcc} = row
                        if(val){
                            return val
                        }else{
                            return userAcc
                        }
                    }
                }, {
                    title: "筛选简历数",
                    key: "filtrateResume",
                    width: 200,
                    dataIndex: "filtrateResume",
                }, {
                    title: "邀请1面人数",
                    key: "inviteInterviewOne",
                    dataIndex: "inviteInterviewOne",
                    width: 120,
                }, {
                    title: "安排1面人数",
                    key: "arrangeInterviewOne",
                    dataIndex: "arrangeInterviewOne",
                    width: 120,
                },{
                    title: "参加1面人数",
                    key: "participationInterviewOne",
                    dataIndex: "participationInterviewOne",
                    width: 120,
                },{
                    title: "发送offer数",
                    key: "offerNum",
                    dataIndex: "offerNum",
                    width: 120,
                },{
                    title: "入职人数",
                    key: "entryNum",
                    dataIndex: "entryNum",
                    width: 120,
                },
            ]
        }
        return (<DataTable  {...tableConf} dataSource={list}  />)
    }

    render() {
        return (
          <Card type="inner">
              {this.renderTableList()}
          </Card>
        )
    }
}

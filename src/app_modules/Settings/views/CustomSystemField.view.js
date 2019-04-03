import React, {Component, PropTypes} from 'react'
import {
  Button,
  Input,
  Table,
  Form,
  Dialog,
  Col,
  Row,
  DatePicker,
  Tooltip,
  Select,
  Checkbox,
  Card,
} from 'antd'
import moment from 'moment';
import {Layout,Fixed,Pane} from 'app/components/Layout'
import WrapperComponent from 'app/decorators/WrapperComponent'
import ErrorBoundary from 'app/components/ErrorBoundary'
import NestedComponent from 'app/decorators/NestedComponent'
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import ButtonGroupExt from 'app/components/ButtonGroupExt'


const Option = Select.Option
const {RangePicker} = DatePicker;

@NestedComponent()
@WrapperComponent(ErrorBoundary)
export default class CustomSystemFieldView extends PageView {
  constructor(props) {
    super(props)
  }
  state = {

  }
  componentWillMount() {
    let {actions} = this.props;
    actions.listAction()
    //  actions.menuAction()
  }
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  renderDataType(value){
    switch (value) {
      case 1:
        return '文本'
        break;
      case 2:
        return '日期'
        break;
      case 3:
        return '单选'
        break;
      case 4:
        return '多选'
        break;
      default:
        return ''
    }
  }
  judgeIfChecked(value){
    if(value == '1'){
      return true;
    }else{
      return false;
    }
  }
  handlerIfChecked(row,type,e){
    let {reduce,actions} = this.props
    let checked = e.target.checked
    // console.log(row,checked)
    row.set(type,checked ? 1 : 0)
    // console.log(row.toJSON())
    // console.log(row,checked)
    actions.changePropAction(row)
  }
  renderTableList() {
    let self = this;
    let {reduce,items} = this.props
    // console.log("reduce:",reduce)
    let {spins:{tableSpin},key} = reduce
    let page = reduce.page
    // let list = [...reduce.list.values()]

    let tableConf = {
      rowKey: key,
      // title:()=>{
      //     return this.renderToolbar()
      // },
      dataSource: items,
      loading: tableSpin,
      columns: [
        {
          title: "序号",
          key: "sort",
          dataIndex: "sort",
          width: 80,
          render: (value, row, index) => {
            return index+1;
          },
        },{
          title: "字段名称",
          key: "fieldName",
          width: 100,
          dataIndex: "fieldName",
        }, {
          title: "字段类型",
          key: "dataType",
          width: 100,
          dataIndex: "dataType",
          render: (value, row, index) => {
            return this.renderDataType(value)
          },
        }, {
          title: "必填",
          key: "isRequired",
          dataIndex: "isRequired",
          width: 100,
          render: (value, row, index) => {
            // console.log(value)
            return (<Checkbox defaultChecked={this.judgeIfChecked(value)}   onChange={this.handlerIfChecked.bind(this,row,'isRequired')} disabled={row.isRead==1?true:false}></Checkbox>)
          },
        }, {
          title: "启用",
          key: "enable",
          dataIndex: "enable",
          width: 100,
          render: (value, row, index) => {
            return (<Checkbox defaultChecked={this.judgeIfChecked(value)}  onChange={this.handlerIfChecked.bind(this,row.fieldId,'enable')} disabled={row.isRead==1?true:false}></Checkbox>)
          },
        }, {
          title: "操作",
          key: key,
          dataIndex: key,
          width: 100,
          render: (value, row, index) => {
            // console.log(data)
            return (
              <Button icon="edit" actionkey="edit" disabled={row.isRead==1} onClick={this.handlerEditRoute.bind(this,value)}></Button>
            )
          }
        }
      ]
    }
    return (<DataTable {...tableConf} {...this.mergeTableConfig({pagination:false})} style={{display: 'flex',flexDirection: 'column'}} />)
  }
  handlerEditRoute(id){
    let {actions,router} = this.props;
    actions.editRoute(router,id);
  }
  handlerAddRoute(){
    let {actions,router} = this.props;
    actions.addRoute(router)
  }
  handlerSubmit(){
    let {actions,router,reduce,items} = this.props;
    actions.saveListAction({list:items})
  }
  renderToolbar() {
    let {actions} = this.props;
    return (
      <div className='button-group'>
        <Button.Group>
          <Button onClick={this.handlerAddRoute.bind(this)}>新增自定义</Button>
          <Button type="primary" onClick={this.handlerSubmit.bind(this)}>保存</Button>
        </Button.Group>
      </div>
    )
  }
  render() {
    let props = this.props
    return (
      <Card title={<div><h3 className="card-title">系统字段</h3><small className="card-subtitle">员工信息字段适用于员工管理模块</small></div>} className='system-field-view' extra={this.renderToolbar()} >
        {this.renderTableList()}
      </Card>
    )
  }
}

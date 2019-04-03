import React, {Component, PropTypes} from 'react'
import { Button, Input, Table, Form, Dialog, Col, Row, DatePicker, Tooltip, Select, Modal, Popconfirm, Card } from 'antd'
import NestedComponent from 'app/decorators/NestedComponent'
import moment from 'moment';
import {Layout,Fixed,Pane} from 'app/components/Layout'
import PageView from 'app/components/Page'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import AdvancedSearchPanel from 'app/components/AdvancedSearchPanel'
import ButtonGroups from 'app/components/ButtonGroups'
import LinkagePullDown from 'app/components/LinkagePullDown'
import CalendarPicker from 'app/components/CalendarPicker'
import PopoverShow from 'app/components/PopoverShow'
import Remote from 'app/components/Remote'
import InputStrGroup from 'app/components/InputStrGroup'
import DataTable from 'app/components/DataTable'
import DictUtils from 'app-utils/DictUtils'
import styles from './styles.less'

import SmartLink from 'app/components/SmartLink'

const Option = Select.Option
const {RangePicker} = DatePicker;
const confirm = Modal.confirm;

export class MemberSide extends Component{

  handleFilter(values){
		let {actions} = this.props
    actions.listAction(values)
  }
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  render(){
    return (
      <AdvancedSearchPanel filterSubmitHandler={this.handleFilter.bind(this)}>
        <Input name="name" label="姓名" placeholder="请输入姓名"/>
        <Input name="mobilephone" label="移动电话" placeholder="请输入移动电话"/>
        <CalendarPicker name="joinTimeArr" label="入职日期" />
        <LinkagePullDown name="degreeArr" label="学历" options={DictUtils.getDictByType("education")} />
        <LinkagePullDown name="workyearArr" label="工龄" options={DictUtils.getDictByType("workyears")} />
        <Select name="sex" label="性别" placeholder="请选择" fetch={DictUtils.getDictByType("sex")} renderItem={this.renderSelectOption} />
        <Select mode="multiple" name="statusArr" label="员工状态" placeholder="请选择" fetch={DictUtils.getDictByType("memberstatus")} renderItem={this.renderSelectOption} />
        <Select name="birthMonth" label="生日" placeholder="请选择" fetch={DictUtils.getDictByType("birth") && DictUtils.getDictByType("birth").sort((a,b)=>{return a.keySort - b.keySort})} renderItem={this.renderSelectOption} />
				<InputStrGroup name="ages" label="年龄" defaultValue={[]} />
      </AdvancedSearchPanel>
    )
  }
}


@NestedComponent()
export default class MemberListView extends PageView {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let {actions} = this.props
    actions.listAction()
    actions.sysFieldListAction()
  }
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  handleFilter(value) {
    let {actions} = this.props;
    actions.listAction(value)
    actions.sysFieldListAction()
  }
  handlerDetailRoute(id){
    let {actions} = this.props
    actions.detailRoute(id)
  }
  fieldsOption(options,value){
    let optionName = []
    let valueArr = []
    if(value instanceof Array){
      valueArr = value
    }else {
      valueArr.push(value)
    }
    valueArr.map((item)=>{
      options.map((it)=>{
        if(it.optionValue == item){
          optionName.push(it.optionName)
        }
      })
    })
    return optionName.join(',')
  }
  renderTableList() {
    let self = this;
    let {reduce,items} = this.props
    let {spins:{tableSpin},sysFieldList,key} = reduce
    let page = reduce.page

    let tableConf = {
      rowKey:key,
      // title:()=>{ return this.renderToolbar() },
      showConfig:true,
      dataSource: items,
      onChange:this.onChange.bind(this),
			loading: tableSpin,
			// onRow:(record) => {
			// 	return {
			// 		onClick: () => {
			// 			const{router}=this.props
			// 		},
			// 	}
			// },
      columns: [
        {
          title: "操作",
          key: "config",
          dataIndex: "config",
          width: 50,
          fixed: 'right',
          visible:true,
          render: (text,record,index) => {
            // console.log(data)
            return (
              <ButtonGroups handleClick={this.handlerMenu.bind(this,record.id)}>
                  <Button icon="user-add" title="转正" actionkey="add" confirm={"是否确认"+record.name+"于今日转正"} disabled={record.status>1?true:false}/>
              </ButtonGroups>
            )
          }
        }
      ]
    }
    let dynamicColumns=[]
    sysFieldList.map((it)=>{
      return dynamicColumns.push({
        title: it.fieldName,
         key: it.fieldCode,
         isRead:it.isRead,
         visible:it.isShow,
         dataIndex: it.fieldCode,
         width: it.width,
         sorter: it.isSort,
         render:(val,row,index)=>{
           if(it.dataType==2){
              return !val?"":moment(val).format("YYYY-MM-DD");
           }else if(it.dataType==3 || it.dataType==4){
              return this.fieldsOption(it.options,val)
           }else if(it.fieldCode == 'department'){
						return row.deptName
				 	}else{
             if(it.fieldCode == 'name'){
               return (
								 <SmartLink to={`detail/${row.id}`}>
									 {val}
									 {/* <PopoverShow titles={sysFieldList} values={row} popTitle={val} placement={"right"} /> */}
								 </SmartLink>

               )
             }else {
               return val
             }
           }
         }
      })
    })
    tableConf.columns=dynamicColumns.concat(tableConf.columns)
    return (<DataTable {...tableConf} scroll={{ x: (sysFieldList.length*100+120+50) ,y:500}}  page={page} />)
  }

  handlerMenu(id,actionType){
    let {actions,router} = this.props
    switch (actionType) {
      case "add":
          actions.deleteAction({ id:id, status:2 })
        break;
      case "edit":
          actions.editRoute(router, id)
        break;
      case "delete":
          actions.deleteAction({ id:id, isDel:1 })
        break;
      default:
    }
  }

  handleExportRoute(){
    let {actions} = this.props
    actions.exportRoute()
  }
  handleImportRoute(){
    let {actions} = this.props
    actions.importRoute()
  }
  handleImportResultRoute(){
    let {actions} = this.props
    actions.importResultRoute()
  }
  handlerButtonGroups(actionType){
    let { actions,router } = this.props
    actions[actionType].call(this,router)
  }
  renderToolbar() {
    let {actions} = this.props;
    return (
      <ButtonGroups handleClick={this.handlerButtonGroups.bind(this)}>
        <Button type="primary" icon="plus"  actionkey="addRoute">添加</Button>
        <Button type="ghost" icon="download" permission="importMembers"  actionkey="importRoute">导入</Button>
        <Button type="ghost" icon="upload"  actionkey="importResultRoute">导入结果</Button>
        <Button type="ghost" icon="file-excel" permission="exportMembers"  actionkey="exportRoute">导出Excel</Button>
      </ButtonGroups>
    )
  }
  render() {
    let props = this.props
    return (
        <Card type="inner" title={<div><h3 className="card-title">员工列表</h3></div>}  extra={this.renderToolbar()}>
          {/* this.renderSearchBar() */}
          {this.renderTableList()}
        </Card>
    )
  }
}

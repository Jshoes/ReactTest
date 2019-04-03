import React, {Component, PropTypes} from 'react'
import {
  Button,
  Input,
  Table,
  Select,
  DatePicker,
  Modal,
  Menu,
  Checkbox,
  Radio,
  Tag,
  Card,
  Popover,
  Dropdown,
  Icon,
} from 'antd'
import {Link} from 'react-router'
import moment from 'moment'
import PageView from 'app/components/Page'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import DataTable from 'app/components/DataTable'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import ButtonGroups from 'app/components/ButtonGroups'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
import LinkagePullDown from 'app/components/LinkagePullDown'
import CalendarPicker from 'app/components/CalendarPicker'
import TagSelect from 'app/components/TagSelect'
import Permission from 'app/components/Permission'
import PersonInfoShow from 'app/components/TableRow/Resume'
import DictUtils from 'app/utils/DictUtils'
import NestedComponent from 'app/decorators/NestedComponent'

import ResumeFolderListView from './ResumeFolderList.view'
import API from '../api'
import styles from './styles.less'

const Option = Select.Option
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;


@NestedComponent()
export default class ResumeListView extends PageView {

  constructor(props) {
    super(props);
    this.state = Object.assign({},this.state,{columnNumber:0})
  }
  componentWillMount() {
    let {actions,router,children,params} = this.props;
    console.log(params)
    // console.log(params)
    if(JSON.stringify(params)=="{}" || params.resumeId!=undefined){
      actions.listAction({status:0})
      actions.listRealAction({status:0})
      actions.listReportAction({status:0})
      actions.getCheckAction({status:0})
    }else{
      actions.listAction({status:0})
      actions.listRealAction(params)
      actions.listReportAction(params)
      actions.getCheckAction(params)
    }
  }
  componentWillReceiveProps(nextProps){
    if(JSON.stringify(this.props.reduce.params) !== JSON.stringify(nextProps.reduce.params)){
      let {actions,router,children} = this.props;
      this.setState({
        selectedRows: [],
        selectedRowKeys: []
      })
      console.log(nextProps.reduce.params)
      actions.listRealAction(nextProps.reduce.params)
      actions.listReportAction(nextProps.reduce.params)
      actions.getCheckAction(nextProps.reduce.params)
    }
  }
  handleMenu(actionkey){
    let {actions,router} = this.props
    const {selectedRowKeys,selectedRows}=this.state
    actions[actionkey](router,selectedRowKeys,selectedRows,1)
  }
  renderToolbar() {
    return this.selectRowShow(
      <ButtonGroups handleClick={this.handleMenu.bind(this)} showSize={10}>
        <Button actionkey="send2InterviewerAction">发送给面试官</Button>
        <Button actionkey="addEliteAction">放入人才库</Button>
        <Button actionkey="recommend2OtherAction">推荐到其他职位</Button>
        <Button actionkey="eliminateAction" confirm="是否批量淘汰">淘汰</Button>
        <Button actionkey="deleteAction">删除</Button>
        <Button actionkey="followAction">跟进提醒</Button>
      </ButtonGroups>
    )
  }
  handleRadioChange(values){
    let {actions,reduce:{params}} = this.props
    let {target:{value}} = values
    actions.listAction({status:value,notes:[]})

    /*清空复选框*/
     this.form.form.setFieldsValue({notes:""})
     // console.log(this.form.form.setFieldsValue)

    this.setState({
      columnNumber:value
    })
  }
  formRef(form){
    this.form = form
  }
  handleCheckChange(e){
    let {actions} = this.props
    actions.listAction({notes:e})
  }
  renderSearchBar(){
    let {reduce:{count,checks},params} = this.props
    return (
      <AdvancedSearchForm classNames="radioGroupResetFormItem" autoSubmitForm={false} filterSubmitHandler={this.handleFilter.bind(this)} isSearchBtnHide={true} ref={this.formRef.bind(this)}>
        <RadioGroup className="resumeStatus radioGroupReset" name="status" onChange={this.handleRadioChange.bind(this)} defaultValue={params && params.status || 0}>
          <RadioButton value="0">筛选<span className="count">{count.sxNum}</span></RadioButton>
          <RadioButton value="1">邀约<span className="count">{count.yyNum}</span></RadioButton>
          <RadioButton value="2">面试<span className="count">{count.msNum}</span></RadioButton>
          <RadioButton value="3">offer<span className="count">{count.offerNum}</span></RadioButton>
          <RadioButton value="4">待入职<span className="count">{count.drzNum}</span></RadioButton>
        </RadioGroup>
        <CheckboxGroup className="resumeType" name="notes" onChange={this.handleCheckChange.bind(this)}>
          {checks.map((it,idx)=>{
            return <Checkbox value={it.noteValue}>{it.noteName}<span className="reportNumber">({it.noteNum})</span></Checkbox>
          })}
        </CheckboxGroup>
      </AdvancedSearchForm>
    )
  }

  renderTableList() {
    let that=this;
    let {reduce,actions,items} = this.props
    let {spins:{tableSpin},key} = reduce
    let page= reduce.page
    let {columnNumber} = this.state
    /*筛选和邀约*/
    let columns =  [
       {
        title: "基础资料",
        key: "name",
        dataIndex: "name",
        sorter:true,
        render:(name,row) => <PersonInfoShow item={row} />
      }, {
        title: "招聘负责人",
        key: "ownerName",
        width: 150,
        dataIndex: "ownerName",
      },{
        title: "申请时间",
        key: "deliveryTime",
        width: 150,
        dataIndex: "deliveryTime"
      }, {
        title: "应聘职位",
        key: "jobTitle",
        dataIndex: "jobTitle",
        width: 150,
      }, {
          title: "渠道",
          key: "channelIcon",
          dataIndex: "channelIcon",
          width: 150,
          render:(val)=>{
            return <Icon type={val} />
          }
      },{
          title: "来源",
          key: "originalWay",
          dataIndex: "originalWay",
          width: 150,
      }
    ]
/*面试*/
    let columnsFeed = [
       {
        title: "基础资料",
        key: "name",
        dataIndex: "name",
        sorter:true,
        render:(name,row)=> <PersonInfoShow item={row} />
      }, {
        title: "招聘负责人",
        key: "ownerName",
        width: 100,
        dataIndex: "ownerName",
      },{
        title: "面试时间",
        key: "interviewTime",
        width: 150,
        dataIndex: "interviewTime"
      }, {
        title: "应聘职位",
        key: "jobTitle",
        dataIndex: "jobTitle",
        width: 100,
      }, {
          title: "面试官",
          key: "interviewer",
          dataIndex: "interviewer",
          width: 80,
      },{
          title: "候选人状态",
          key: "originalWay",
          dataIndex: "originalWay",
          width: 200,
          render:(val,row)=>{
            let {isChangeDate,interviewLevel,interviewStatus} = row

            return (<div>
                { isChangeDate ? <div>时间调整</div> : null}
                <div>
                  <Tag>{DictUtils.getDictLabelByValue("interviewstage",interviewLevel)}</Tag>
                  <Tag>{DictUtils.getDictLabelByValue("interviewstate",interviewStatus)}</Tag>
                </div>
              </div>)
          }
      }
    ]
/*offer*/
    let columnsOffer = [
       {
        title: "基础资料",
        key: "name",
        dataIndex: "name",
        sorter:true,
        render:(name,row)=> <PersonInfoShow item={row}/>
      }, {
        title: "招聘负责人",
        key: "ownerName",
        width: 150,
        dataIndex: "ownerName",
      },{
        title: "offer发送时间",
        key: "offerSendTime",
        width: 150,
        dataIndex: "offerSendTime"
      }, {
        title: "应聘职位",
        key: "jobTitle",
        dataIndex: "jobTitle",
        width: 150,
      }, {
          title: "部门",
          key: "dept",
          dataIndex: "dept",
          width: 150,
      },{
          title: "候选人状态",
          key: "offerStatus",
          dataIndex: "offerStatus",
          width: 150,
      }
    ]
/*入职*/
    let columnsEntry = [
       {
        title: "基础资料",
        key: "name",
        dataIndex: "name",
        sorter:true,
        render:(name,row)=> <PersonInfoShow item={row}/>
      }, {
        title: "招聘负责人",
        key: "ownerName",
        width: 150,
        dataIndex: "ownerName",
      },{
        title: "offer发送时间",
        key: "offerSendTime",
        width: 150,
        dataIndex: "offerSendTime"
      }, {
        title: "预计入职时间",
        key: "expectedEntryTime",
        width: 150,
        dataIndex: "expectedEntryTime"
      }, {
        title: "应聘职位",
        key: "jobTitle",
        dataIndex: "jobTitle",
        width: 150,
      }, {
          title: "部门",
          key: "dept",
          dataIndex: "dept",
          width: 150,
      }
    ]


    let colObj = {
      0:columns,
      1:columns,
      2:columnsFeed,
      3:columnsOffer,
      4:columnsEntry
    }

    const rowSelection = {
      onChange: this.onSelectChange.bind(this),
      selectedRowKeys:this.state.selectedRowKeys,
    };

    let tableConf = {
      loading: tableSpin,
      rowKey: "id",
      dataSource:items,
      rowSelection: rowSelection,
      title:()=>this.renderToolbar(),
      columns:colObj[columnNumber],
      onChange:this.onChange.bind(this),
    }

    return (<DataTable  {...tableConf} page={page} />)
  }

  render() {
    let {children} = this.props
    //模版没有好的解决方案，暂时这样处理
    //console.log(children)

    // if(children && children.type && children.type.WrappedComponent==ResumeFolderListView){
    //     return React.cloneElement(children)
    // }else{
      return (
        <Card className="resumeCard" type="inner" title={this.renderSearchBar()}>
            {this.renderTableList()}
        </Card>
      )
    // }
  }
}

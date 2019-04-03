import React, {Component, PropTypes} from 'react'
import {
  Button,
  Input,
  Table,
  DatePicker,
  Select,
  Modal,
  Menu,
  Radio,
  Card,
  message,
  Dropdown,
  Icon,
} from 'antd'
import {Link} from 'react-router'
import PageView from 'app/components/Page'
import CalendarView from './Calendar.view'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import DataTable from 'app/components/DataTable'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
import CalendarPicker from 'app/components/CalendarPicker'
import Permission from 'app/components/Permission'
import InterviewType from 'app/components/TableRow/Interview'
import NestedComponent from 'app/decorators/NestedComponent'
import DictUtils from 'app/utils/DictUtils'
import moment from 'moment'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option
const {RangePicker} = DatePicker;

@NestedComponent()
export default class InterviewListView extends PageView {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let {actions,router,children} = this.props;
    let params = {timeType:1}
    //console.log("componentDidMount")
    actions.listAction(params)
     actions.listRealAction(params)
     actions.listCountAction(params)
  }
  componentWillReceiveProps(nextProps){
    let {actions} = this.props
    if(this.props.reduce.params !== nextProps.reduce.params){
      let {actions,router,children} = this.props;
      actions.listRealAction(nextProps.reduce.params)
      actions.listCountAction(nextProps.reduce.params)
    }
    if(JSON.stringify(nextProps.location.state) !== JSON.stringify(this.props.location.state)){
      if(nextProps.location.state && nextProps.location.state.key=="reload"){
        actions.listAction(nextProps.reduce.params)
        actions.listCountAction(nextProps.reduce.params)
      }
    }
  }
  handlerMenu(resumeId,id,name,item,actionType){
    let { actions,router } = this.props
    actions[actionType.key].call(this,router,resumeId,id,name,item)
  }
  handleCallPhone(number,resumeId,name,type){
      if(!number){
          message.info("号码为空！")
          return false
      }
      /*type  == define1
       * define1  1 员工
       * define1  2 简历
       * define1  3 人才
       *
       * */
      let  callOutJson ={
          phone:number,
          busId:resumeId,
          candName:name,
          inputAcc:"",
          define1:type,
          define3:"",
          IsContact:"0"
      };
      let  callOutJsonStr = JSON.stringify({callOutJson});
      console.log(callOutJsonStr)
      global.invokeMethod('OnCallJson',callOutJsonStr)
  }
  renderToolbar() {
    return null
  }
  handleFilter(values){
    // console.log(values)
    // let {target:{value}} = e
    let {actions} = this.props
    // console.log(values)
    actions.listAction(values)
  }
  changes(values){
    let {actions} = this.props
    let {target:{value}} = values
    let reset = {
      notes:undefined,
      current:undefined,
      pageSize:undefined,
      pageSizeOptions:undefined,
      showSizeChanger:undefined,
      showTotal:undefined,
      total:undefined
    }
    actions.listAction({timeType:value,...reset})
  }
  renderOptions(it){
    return (
      <RadioButton value={it.timeType}>
        <span>{it.describe}</span>
        <span className="count">{it.amount}</span>
      </RadioButton>
    )
  }
  renderTypeFilter(){
    let {reduce:{listCount}} = this.props

    return (
      <AdvancedSearchForm classNames="radioGroupResetFormItem" autoSubmitForm={false} isSearchBtnHide={true}>
        <RadioGroup className="interviewRadio radioGroupReset" onChange={this.changes.bind(this)} name="timeType" fetch={listCount} renderItem={this.renderOptions.bind(this)} />
      </AdvancedSearchForm>
    )
  }

  renderTableList() {
    let that=this;
    let {reduce,items} = this.props
    let {spins:{tableSpin},key,page} = reduce
    let list = [...reduce.list.values()]
    let tableConf = {
      loading: tableSpin,
        title:function(){
            return null
        },
      onChange:this.onChange.bind(this),
      rowKey: key,
      dataSource:items,
      columns: [
        {
          title: "面试时间",
          key: "interviewTime",
          width: 150,
          dataIndex: "interviewTime",
        }, {
          title: "候选人信息",
          key: "name",
          width: 200,
          dataIndex: "name",
          render:(val,row)=>{
            return (
              <div>
                <span style={{marginRight:10}}>{val}</span>
                {row.mobilephone ? <span><Icon type="phone"/><span>{row.mobilephone}</span></span> : null}
              </div>
            )
          }
        }, {
          title: "面试状态",
          key: "type",
          dataIndex: "type",
          width: 170,
          render:(val,row)=>{
            return <InterviewType item={row}/>
          }
        }, {
          title: "应聘职位",
          key: "jobTitle",
          dataIndex: "jobTitle",
          width: 150,
        }, {
          title: "面试官",
          key: "interviewerList",
          dataIndex: "interviewerList",
          width: 80,
          render:(val)=>{
            return val.map(it=>it.interviewer).join(",")
          }
        },{
            title: "招聘负责人",
            key: "hrName",
            dataIndex: "hrName",
            width: 120,
        },{
            title: "面试反馈",
            key: "statusStr",
            dataIndex: "statusStr",
            width: 150,
            render:(val,row)=>{
                return this.renderRowOption(row)
            }
        }
      ]
    }
    return (<DataTable style={{
      width: '100%'
    }} {...tableConf}  page={page}/>)
  }

  handleFeedBack(resumeId,id){
    let {actions,router} = this.props
    actions.feedbackAction(router,id,resumeId)
  }

  handleDelay(id,resumeId,type,time){
    let {actions,router} = this.props
    actions.delayAction(router,id,type,time,resumeId)
  }

  handleUrge(id){
    let {actions} = this.props
    actions.urgeFeedbackAction({id:id})
  }

  /*
  Integer statusStr候选人状态：1--待面试  2--未反馈 3--已反馈4--未通过 5--已通过 6--已取消
  Integer isFeedback是否填写面试反馈 0未填写 1 已开始填写 2以完成
  Integer isUrge是否催促 0未催促  1 已催促
  */
  renderRowOption(row){
    let {statusStr,isFeedback,isUrge,resumeId,lastInterviewPlanId,id,type,interviewTime} = row
    /*已取消*/
    if(statusStr == 6){
      return null
    }
    /*待面试*/
    if(statusStr == 1){
      return (
        <Button.Group style={{whiteSpace:"inherit"}}>
          <Button onClick={this.handleDelay.bind(this,id,resumeId,type,interviewTime)}>调整时间</Button>
          <Button onClick={this.handleFeedBack.bind(this,resumeId,id)}>填写反馈</Button>
        </Button.Group>
      )
    }
    /*已经反馈*/
    if(isFeedback == 2){
      return <Button onClick={this.handleFeedBack.bind(this,resumeId,id)}>查看反馈</Button>
    }


    /*未反馈*/
    if(isFeedback != 2){
      return (
        <Button.Group style={{whiteSpace:"inherit"}}>
          <Button onClick={this.handleFeedBack.bind(this,resumeId,id)}>填写反馈</Button>
          {isUrge ? null : <Button onClick={this.handleUrge.bind(this,id)}>催促反馈</Button> }
        </Button.Group>
      )
    }
  }

  render() {
    let {children} = this.props
    //模版没有好的解决方案，暂时这样处理

      return (
          <Card type="inner" title={this.renderTypeFilter()}>
                {this.renderTableList()}
          </Card>
      )

  }
}

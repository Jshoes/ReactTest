import React, {Component, PropTypes} from 'react'
import {
  Button,
  Col,
  Row,
  Input,
  Table,
  Select,
  Modal,
  List,
  Menu,
  Tag,
  Calendar,
  Dropdown,
  Icon,
  Avatar,
} from 'antd'
import {Link} from 'react-router'
import PageView from 'components/Page'
import {Layout,Fixed,Pane} from 'components/Layout'
import Permission from 'components/Permission'
import moment from 'moment'
import NestedComponent from 'app/decorators/NestedComponent'
import DictUtils from 'app-utils/DictUtils'
import styles from './interviewCalendar.less'
import Ellipsis from 'app/components/Ellipsis'
const Option = Select.Option


@NestedComponent()
export default class CalendarView extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let {actions,router} = this.props;
      let params = {dateStr:moment().format("YYYY-MM-DD")}
      let dateParams = {dateStr:moment().format("YYYY-MM")}
      actions.loadTodos(dateParams)
      actions.loadCounts(params)
      actions.loadDates(params)
  }
  handleSelectDateChange(value) {
    let {actions} = this.props
    let params = {dateStr:value.format("YYYY-MM-DD")}
    let dateParams = {dateStr:value.format("YYYY-MM")}
    actions.loadTodos(dateParams)
    actions.loadCounts(params)
    actions.loadDates(params)
  }
  dateCellRenderFn(date){
    let {reduce:{dates}} = this.props
    return dates.map((it,idx)=>{
      //console.log(date.format("YYYY-MM-DD"),moment(date.format("YYYY-MM-DD")).isSame(it),it)
      return moment(date.format("YYYY-MM-DD")).isSame(it)?<span className="hasInterview"></span>:null
    })
    //console.log(date)
  }

  renderCounts(counts){
      return counts && (<Row className="calendar-bottomLine" gutter={12} style={{fontSize:12}}><Col span={6}><span>面试总数<span className="calendar-fontColor">{counts.total}</span>人</span></Col><Col span={6}><span>已面试<span className="calendar-fontColor">{counts.already}</span>人</span></Col><Col span={6}><span>待面试<span className="calendar-fontColor">{counts.waite}</span>人</span></Col><Col span={6}><span>拒绝面试<span className="calendar-fontColor">{counts.refuse}</span>人</span></Col></Row>)
  }
  handleFeedBack(id,resumeId){
    let {actions,router} = this.props
    actions.feedbackAction(router,id,resumeId)
  }
  handleDelay(id,resumeId,type,time){
    let {actions,router} =this.props
    actions.delayAction(router,id,type,time,resumeId)
  }
  handleUrge(id){
    let {actions} = this.props
    actions.urgeFeedbackAction({id:id})
  }

  handleTodoList(){
      let {reduce:{todos},location,items} = this.props;
      let that = this
      var loading=false
      let translateColor ={
          2:"#ef6392",
          3:"#ff8252",
          4:"#14c6ae",
      }


      function linkFunction(item){
        //console.log(item)
        let {statusStr,isFeedback,isUrge,resumeId,id,type,interviewTime} = item

        // return [
        //     <Button onClick={that.handleDelay.bind(that,resumeId)}>调整时间</Button>,
        //     <Button onClick={that.handleFeedBack.bind(that,resumeId)}>填写反馈</Button>
        // ]
        /*已取消*/
        if(statusStr == 6){
          return null
        }
        /*待面试*/
        if(statusStr == 1){
          return [
              <Button icon="clock-circle-o" onClick={that.handleDelay.bind(that,id,resumeId,type,interviewTime)}>调整时间</Button>,
              <Button icon="edit" onClick={that.handleFeedBack.bind(that,id,resumeId)}>填写反馈</Button>
          ]
        }

        /*已经反馈*/
        if(isFeedback == 2){
          return [
            <Button icon="eye-o" onClick={that.handleFeedBack.bind(that,id,resumeId)}>查看反馈</Button>
          ]
        }
        /*未反馈*/
        if(isFeedback != 2){
          return isUrge ?
          [<Button icon="edit" onClick={that.handleFeedBack.bind(that,id,resumeId)}>填写反馈</Button>]
          :
          [<Button icon="edit" onClick={that.handleFeedBack.bind(that,id,resumeId)}>填写反馈</Button>,<Button icon="sound" onClick={that.handleUrge.bind(that,id)}>催促反馈</Button>]
        }

      }

      return  (<List
          loading={loading}
          itemLayout="horizontal"
          locale={{
              emptyText:(<div className='list-no-data'>暂无面试</div>)
          }}
          dataSource={items}
          renderItem={item =>{
            let intervwer = item.interviewerList.map(it=>it.interviewer).join("、")
            return(
                <List.Item actions={linkFunction(item)}
                           extra={
  													<Tag color="#62b5fb">{DictUtils.getDictLabelByValue("interviewstate",item.statusStr)}</Tag>
  														 }>
                    <List.Item.Meta
                        avatar={<Avatar shape="square" size="large"  icon="user" src={item.photoUrl}/>}
                        title={<div className="interviewerInfo"><span className="name">{item.name}</span><span className="jobtitle">{item.jobTitle}</span></div>}
                        description={
                            <div className="mainInfoBox">
  														{item.interviewerList?(<span className="interviewrlist"><Icon type="user" style={{fontSize:14}}/><Ellipsis tooltip={intervwer} length={15}>{intervwer}</Ellipsis></span>):null}
  															<Tag color={translateColor[item.type]}>{DictUtils.getDictLabelByValue("interviewstage",item.type)}</Tag>({moment( item.interviewTime && item.interviewTime).format("HH:mm")})
                            </div>}
                    />

                </List.Item>
            )
          }}
      />)
  }
  render(){
    let {children,reduce:{counts}} = this.props

    return (
      <Layout direction="rows">
        <Fixed style={{width:'400px',backgroundColor:"#fff"}}>
          <Calendar fullscreen={false} dateCellRender={this.dateCellRenderFn.bind(this)} onSelect={this.handleSelectDateChange.bind(this)} onPanelChange={this.handleSelectDateChange.bind(this)} className="interview-calendarBox"/>
            {this.renderCounts(counts)}
        </Fixed>
        <Pane span="20" style={{flexDirection: 'column'}}>
            <div className="interview-calendar-rightbox">
                {this.handleTodoList()}
            </div>
        </Pane>
      </Layout>
    )
  }
}

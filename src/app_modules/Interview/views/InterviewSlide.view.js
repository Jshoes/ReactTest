import React, {Component, PropTypes} from 'react'
import {
  Button,
  Cascader,
  Input,
  Table,
  DatePicker,
  Select,
  Modal,
  Menu,
  Card,
  Dropdown,
  Icon,
} from 'antd'
import AdvancedSearchPanel from 'app/components/AdvancedSearchPanel'
import DictUtils from 'app/utils/DictUtils'
import CalendarPicker from 'app/components/CalendarPicker'
import LinkagePullDown from 'app/components/LinkagePullDown'


export default class IntverviewSide extends Component{
  handleFilter(values){
    const {actions} = this.props
    actions.listAction(values)
  }
  renderSelectOption(data,idx){
      return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  navgation(val){
    let {router}= this.props
    router.push(val)
  }
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  renderJobOption(data,idx){
    return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
  }
  renderHrOption(data,idx){
      return (<Select.Option value={data.account} key={idx}>{data.name}</Select.Option>)
  }
  renderInterOption(data,idx){
return (<Select.Option value={data.account} key={idx}>{data.name}</Select.Option>)
  }
  // 入参：Integer timeType 展示数据类型：1-今日面试，2-明天及之后的面试，3-昨天及以前的面试
  //                            String name 姓名
  //                            String jobId 职位（职位id）
  //                            String hrAcc 招聘HR（hr账号）
  //                            String interviewerId  面试官（面试官账号）
  //                            Integer type 面试阶段（1--面试1面、2--面试2面、3--面试3面）
  //                            String[] time 面试时间
  render(){
    return (<AdvancedSearchPanel filterSubmitHandler={this.handleFilter.bind(this)} >
      <Input name="name" label="姓名" placeholder="请输入姓名"/>
      <Select name="jobId" label="职位" placeholder="请选择"  fetch={`${APP_SERVER}/jobNew/getJobList`} renderItem={this.renderJobOption}/>
      <Select name="hrAcc" label="招聘负责人" placeholder="请选择"  fetch={`${APP_SERVER}/accountOperate/getHrList`} renderItem={this.renderHrOption}/>
      <Select name="interviewerId" label="面试官" placeholder="请选择"  fetch={`${APP_SERVER}/user/getInterviewerListJson`} renderItem={this.renderInterOption} />
      <Select name="type" label="面试阶段" placeholder="请选择"  fetch={DictUtils.getDictByType("interviewstage")} renderItem={this.renderSelectOption} />
      <CalendarPicker label="面试时间" name="time"  />
    </AdvancedSearchPanel>)
  }

}

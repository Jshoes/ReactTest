/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-14T14:37:05+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row,
  Col,
  Modal,
  Checkbox,
  Button,
  Radio,
  Input,
  Form,
  DatePicker,
  Layout,
  Spin,
  Rate,
  Select
} from 'antd'
import moment from 'moment'
import {FormPage} from 'app/components/Page'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import EmailTemplateLinkage,{SmsTemplateLinkage,SmsTemplateInterView} from 'app/components/sendTemplate'
import DateTimePicker from 'app/components/DateTimePicker'
import DictUtils from 'app/utils/DictUtils'
const Option = Select.Option
const {TextArea} = Input
const RadioGroup = Radio.Group;

class FeedForm extends Component{

  state={
    which:'0',
    interviewFlag:true,
  }

    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={"select"+idx}>{data.keyName}</Select.Option>)
    }
    renderJobOption(data,idx){
        return (<Select.Option value={data.jobId} key={"Job"+idx}>{data.jobTitle}</Select.Option>)
    }
    renderInterviewerOption(data,idx){
        return (<Select.Option value={data.account} key={"Interviewer"+idx}>{data.name}</Select.Option>)
    }
    renderSmsOrEmail(){
        const { updateFieldValue,item } = this.props
        let {which} = this.state

        if(which == "1"){
          return (<SmsTemplateLinkage updateFieldValue={updateFieldValue} receiver={item.mobilephone}/>)
        }else if(which == "2"){
          return (<EmailTemplateLinkage  mailSubject="面试通知函"  updateFieldValue={updateFieldValue} templateUse="1" mailTo={item.email}/>)
        }else{
          return null
        }
    }
    handleChange(e){
      this.setState({
        which:e.target.value
      })
    }

  render() {
    let  {
      form,
      handleSubmit,
      children,
      saveFormRef,
      resumeId,
      info:{type,createble}
    } = this.props
    const {location,updateFieldValue} = this.props;
    const options = [
        { label: '不通知', value: '0' },
        { label: '短信通知', value: '1'},
        { label: '邮件通知', value: '2'},
    ];

    // console.log(this.state.interviewFlag)
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
          <FormItem>
            <Input type="hidden" name="resumeId" defaultValue={resumeId}/>
          </FormItem>
          <FormItem>
            <Input type="hidden" name="type" defaultValue={type}/>
          </FormItem>
          <Row>
          <Col span={12}>
            <FormItem>
              <Input label="面试阶段" name="feed"  readOnly defaultValue={DictUtils.getDictLabelByValue("interviewstage",type)}/>
            </FormItem>
            {createble?null:<span className="feed-disabled">当前候选人已安排完全部面试</span>}
          </Col>
          <Col span={12}>
            <FormItem>
              <DateTimePicker name="interviewTime" defaultDate={moment().add(1,"days")} defaultTime={moment().set({hour:9,minute:0,second:0})} label="面试时间" rules={[{required: true, message: "面试时间不可为空"}]}/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem>
              <Select label="面试官" name="interviewerIds" mode="multiple"  fetch={`${APP_SERVER}/user/getInterviewerListJson`} renderItem={this.renderInterviewerOption} rules={[{required: true, message: "面试官不可为空"},{validator:customRules.maxLength,value:3,message:"面试官最多选择3个"}]}></Select>
            </FormItem>
          </Col>
          </Row>
        <Row>
            <FormItem>
              <RadioGroup name="noticeType" label="通知候选人" options={options}  onChange={this.handleChange.bind(this)} defaultValue={this.state.which}/>
            </FormItem>
            {this.renderSmsOrEmail()}
            <FormItem>
              <Checkbox label="通知面试官" name="interviewerNoticeType">短信通知</Checkbox>
            </FormItem>
          </Row>
      </BaseForm>
    )
  }
}

export default class FeedFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params:{resumeId}} = this.props;
    actions.getFeedStageAction({resumeId:resumeId})
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,reduce:{interviewInfo:{createble}}} = this.props;
      if(createble){
        actions.feedArrange(values)
        actions.backRoute(router)
      }
  }
  updateFieldValue(fieldName,value){
      let {location:{state:{item}},reduce:{interviewInfo}} = this.props
        var object={}
        let interviewTime
        let {name,jobTitle} = interviewInfo
        if(this.form.getFieldValue("interviewTime")){
          interviewTime =this.form.getFieldValue("interviewTime").format("YYYY-MM-DD HH:mm")
        }
        let translate = [
              {'面试时间':interviewTime},
              {'职位名称':jobTitle},
              {'姓名':name}
            ]

        if(value.length){
            value = value.replace("{面试时间}",interviewTime)
            value = value.replace("{职位名称}",jobTitle)
            value = value.replace("{姓名}",name)
        }

        object[fieldName]=value
        this.form.setFieldsValue(object)
    }
  render() {
    let {params:{resumeId}, reduce:{interviewInfo},location:{state:{item}}} = this.props;
    return (
      <Spin tip="Loading..." spinning={false}>
        <FeedForm onSubmit={this.onSubmit} updateFieldValue={this.updateFieldValue.bind(this)}  saveFormRef={this.saveFormRef} resumeId={resumeId} info={interviewInfo} item={item}>
            <Button type="primary" htmlType="submit"  onClick={this.onSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </FeedForm>
      </Spin>
    )
  }
}


/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-13T18:48:26+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row,
  Col,
  Modal,
  Button,
  Input,
  Form,
  DatePicker,
  Layout,
  Spin,
  Radio,
  Rate,
  Select
} from 'antd'
import {FormPage} from 'app/components/Page'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import DictUtils from 'app/utils/DictUtils'
import moment from 'moment'

const Option = Select.Option
const RadioGroup = Radio.Group
const {TextArea} = Input

class FeedbackForm extends Component{
    constructor(props){
      super(props)
      this.state = {
        obj:{},
        interviewer:props.interviewer
      }
    }
    componentDidMount(){
      let {interviewer,info} = this.props
      if(interviewer){
        this.setObjFn(info,interviewer)
      }
    }
    componentWillReceiveProps(nextProps){
      if(JSON.stringify(nextProps.info) !== JSON.stringify(this.props.info)){
        let {interviewer,info} = nextProps
        console.log(info)
        this.setObjFn(info,interviewer)
      }
    }
    renderInterviewerOption(data,idx){
        return (<Select.Option value={data.interviewerId} key={idx}>{data.interviewer}</Select.Option>)
    }
    handleChange(value){
      let {info} = this.props
      this.setObjFn(info,value)
    }
    setObjFn(array,value){
      let {interviewer} = this.state
      let json = array.filter((it,idx)=>{
        return it.interviewerId == value
      })[0]
      this.setState({
        obj:json||{},
        interviewer: interviewer || array[0].interviewerId
      })

    }

    renderRadioData(){
      let arr = DictUtils.getDictByType("feedbackState")
      return arr && arr.map((it,idx)=>{
        return  {
          label : it.keyName,
          value : it.keyValue,
          disabled : false
        }
      })
    }


  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
      info,
      planId,
    } = this.props
    let {obj,interviewer} = this.state
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
        <FormItem>
          <Select label="面试官" name="interviewerId" defaultValue={interviewer} fetch={info} renderItem={this.renderInterviewerOption} onChange={this.handleChange.bind(this)} rules={[{required: true, message: "面试官不可为空"},{validator:customRules.required}]}></Select>
        </FormItem>
        <FormItem>
          <Input type="hidden" name="interviewPlanId" defaultValue={planId}/>
        </FormItem>
        <FormItem>
          <Input type="hidden"  name="id" defaultValue={obj.id}/>
        </FormItem>
        <FormItem>
          <TextArea label="综合评价" name="feedback" readOnly={obj.isFeedback == 1 } defaultValue={obj.feedback} rules={[{required: true, message: "反馈信息不可为空"},{validator:customRules.required},{max:200,message:"反馈信息最多200个字符"}]}  help="请及时提交面试反馈信息，且务必做到准确评价"/>
        </FormItem>
        <FormItem>
          <RadioGroup label="为候选人打分" name="feedbackState" defaultValue={obj.feedbackStateStr} disabled={obj.isFeedback == 1 } help="请为候选人打分，您的分数将与其他面试官的评分一起进行评估" options={this.renderRadioData()} rules={[{required: true, message: "为候选人打分不可为空"}]}/>
        </FormItem>
      </BaseForm>
    )
  }
}


export default class FeedbackFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params:{resumeId},location:{state:{planId}}} = this.props;
    actions.getFeedBackAction({interviewPlanId:planId})
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,location} = this.props;
    actions.feedBackSaveAction(values).then(()=>{
      actions.backRouteReload(router,location)
    })
  }
  render() {
    let {params, reduce:{feedBack},location:{state:{interviewer,planId}}} = this.props;
    return (
      <Spin tip="Loading..." spinning={false}>
        <FeedbackForm onSubmit={this.handleSubmit} saveFormRef={this.saveFormRef} info={feedBack} interviewer={interviewer} planId={planId}>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </FeedbackForm>
      </Spin>
    )
  }
}

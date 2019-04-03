/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-31T09:53:15+08:00
 */

import React, {Component,PureComponent} from 'react'
import {
  Row,
  Col,
  Modal,
  Button,
  Input,
  Form,
  DatePicker,
  TimePicker,
  Layout,
  Spin,
  Select,
  Checkbox,
} from 'antd'
import moment from 'moment';
import {FormPage} from 'components/Page'
import ModalView from 'components/Modal.view'
import WrapperComponent from '../../decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'components/BaseForm'
import DictUtils from 'app-utils/DictUtils'
import ErrorBoundary from 'components/ErrorBoundary'
const FormCreate = Form.create
const Option = Select.Option
const {TextArea} = Input


@WrapperComponent(ModalView)
export default class DashboardForm extends PureComponent{
  state = {
    remindSmsDisabled: true,
    startValue : null,
    endValue : null
  }

  componentDidMount() {
    let {actions,params} = this.props;
    // console.log(params)
    if(params.id){
      actions.itemAction(params.id)
    }
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  saveFormRef = (form) => {
    this.form = form;
  }
  onSubmit(){
    let {form,actions,router} = this.props
    this.form.validateFieldsAndScroll({force:true},(err,values) => {
       if (err) {
         return;
       }
      actions.saveAction(values)
      actions.backRoute(router)
     });
  }
  /*
  componentWillReceiveProps(nextProps){
    let { item:{scheduleStartTime,scheduleEndTime,remindType} } = nextProps
    this.setState({
      startValue:!scheduleStartTime?null:moment(scheduleStartTime),
      endValue:!scheduleEndTime?null:moment(scheduleEndTime),
      remindSmsDisabled:remindType&&remindType!=1?false:true
    });
    // console.log(this.state)
  }
  */
  handlerSelectType(value){
    if(value == 1){
      this.setState({remindSmsDisabled: true})
    }else{
      this.setState({remindSmsDisabled: false})
    }
  }
  renderFieldOptions(data,idx){
    return (<Option value={data.keyValue} key={idx}>{data.keyName}</Option>)
  }
  disabledTime(scheduleStartTime){

  }
  render() {
    const {
      form,
      children,
			// saveFormRef
			params,
      item
    } = this.props
		let {startValue,endValue} = this.state
    return (
      <BaseForm ref={this.saveFormRef}>
        <FormItem>
          <Input name="id" type="hidden" defaultValue={params.id?item.id:''} />
        </FormItem>
				<FormItem>
					<Input name="title" label="待办标题" defaultValue={item.title} rules= {[{required: true, message: '标题不可为空',},{max: 10, message: '最多输入10个字' }]}/>
        </FormItem>
        <FormItem>
          <DatePicker label="选择日期" name="chooseDate" defaultValue={item.scheduleStartTime} rules= {[{required: true, message: '日期不可为空',}]} />
        </FormItem>
        <FormItem>
          <TimePicker label="开始时间" name="scheduleStartTime" style={{width:"100%"}} defaultValue={item.scheduleStartTime} rules= {[{required: true, message: '开始时间不可为空',},{validator:customRules.dateCompare,date:endValue,type:"smaller"}]} format={"HH:mm:ss"} onChange={this.onStartChange} />
        </FormItem>
        <FormItem>
          <TimePicker label="结束时间" name="scheduleEndTime" style={{width:"100%"}} format={"HH:mm:ss"} defaultValue={item.scheduleEndTime} onChange={this.onEndChange} />
        </FormItem>
        <FormItem>
          <Select label="提醒" name="remindType" defaultValue={!item.remindType?"1":item.remindType+""} fetch={DictUtils.getDictByType("remindschedule")} renderItem={this.renderFieldOptions} onChange={this.handlerSelectType.bind(this)}>
          </Select>
        </FormItem>
        <FormItem>
          <TextArea label="事件内容" name="content" defaultValue={item.content} rules= {[{required: true, message: '事件内容不可为空',},{validator:customRules.required},{max:100,message:'事件内容不能超过100个字'}]} row={4} />
        </FormItem>
        <FormItem>
          <Checkbox label="" name="remindSms" defaultValue={item.remindSms} disabled={item.remindType?!(item.remindType):this.state.remindSmsDisabled} valuePropName="checked">是否短信提醒</Checkbox>
        </FormItem>
      </BaseForm>
    )
  }
}

// export default connect(mapStateToProps,mapDispatchToProps)(DashboardForm)
/*
@WrapperComponent(ModalView)
@WrapperComponent(ErrorBoundary)
class DashboardFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props;
    if(params.id){
      actions.itemAction(params.id)
    }else {
      actions.newItemAction()
    }
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,reduce,router} = this.props;
    let {params} = reduce
    actions.saveAction(values)
    actions.backRoute(router)
  }
  render() {
    let {params, reduce:{spins:{formSpin},item}} = this.props;
    return (
        <DashboardForm onSubmit={this.onSubmit} initialValues={item} saveFormRef={this.saveFormRef} />
    )
  }
}

export default DashboardFormView
*/

/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-16T15:32:13+08:00
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
  Radio,
  Layout,
  Spin,
  Rate,
  Select
} from 'antd'
import {FormPage} from 'app/components/Page'
import EmailTemplateLinkage,{SmsTemplateLinkage,SmsTemplateInterView} from 'app/components/sendTemplate'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import DictUtils from 'app/utils/DictUtils'

const RadioGroup = Radio.Group;
const Option = Select.Option
const {TextArea} = Input

class RejectForm extends Component{
  state={
      which:'0',
  }
  renderSelectOption(data,idx){
      return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  handleChange(e){
    this.setState({
      which:e.target.value
    })
  }
  renderSmsOrEmail(){
      const { updateFieldValue,row } = this.props
      let {mobilephone} = row
      let {formFullItemLayout} = this.props
      let {which} = this.state

      if(which == "1"){
        return (<SmsTemplateLinkage formFullItemLayout={formFullItemLayout} updateFieldValue={updateFieldValue} receiver={mobilephone}/>)
      }else if(which == "2"){
        return (<EmailTemplateLinkage formFullItemLayout={formFullItemLayout} mailSubject="拒绝通知函" mailTo={row.email} updateFieldValue={updateFieldValue}/>)
      }else{
        return null
      }
  }
  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
        updateFieldValue,
        formFullItemLayout,
        formFullItemLayoutSpec,
        params:{id,resumeId},
        item:{statusStr}
    } = this.props

    /** 翻译拒绝状态 translateStatus
     * candidatestatus =>  refusetype
    * 2 面试一面
    * 3 面试二面
    * 5 offer
    * 6 入职
    * 4 面试三面
    * 1 待邀约
     *
     * 若statusStr为空则默认为待邀约 83行的原因
    * */
    let translateStatus = {
        2:"8",
        3:"9",
        5:"11",
        6:"12",
        4:"10",
        1:"7",
    }
    const options = [
        { label: '不通知', value: '0' },
        { label: '短信通知', value: '1' },
        { label: '邮件通知', value: '2' },
    ];

    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
          <FormItem style={{marginBottom:0}}>
              <Input type="hidden" name="resumeId" defaultValue={resumeId}/>
          </FormItem>
          <FormItem style={{marginBottom:0}}>
              <Input type="hidden" name="refuseType" defaultValue={statusStr?translateStatus[statusStr]:7}/>
          </FormItem>
          <Row>
              <Col span={12}>
                <FormItem {...formFullItemLayout}>
                  <Input label="拒绝类型" name="refuseText" defaultValue={DictUtils.getDictLabelByValue("refusetype",statusStr?translateStatus[statusStr]:"7")}  readOnly/>
                </FormItem>
              </Col>
              <Col span={24}>
                  <FormItem {...formFullItemLayoutSpec}>
                      <TextArea label="拒绝原因" name="feedback" rules={[{required: true, message: "拒绝原因不可为空"},{validator:customRules.required},{max:100,message:"拒绝原因最多100个汉字"}]}/>
                  </FormItem>
              </Col>
          </Row>
        <Row>
          <Col span={3} className="tellItemLabel" style={{textAlign:"right",lineHeight:"39px"}}>
              通知方式
          </Col>
          <Col span={18} style={{marginLeft:20}}>
            <FormItem {...formFullItemLayout}>
              <RadioGroup name="noticeType" options={options}  onChange={this.handleChange.bind(this)} defaultValue={this.state.which}/>
            </FormItem>
          </Col>
        </Row>
        {this.renderSmsOrEmail()}
      </BaseForm>
    )
  }
}

class RejectFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props;
  }

    updateFieldValue(name,value){
        let {location:{state}} = this.props
        var object={}
        console.log(state)

        if(value.length){
            value = value.replace("{候选人姓名}",state && state.name)
            value = value.replace("{面试职位}",state && state.item.jobTitle)
        }

        object[name]=value
        this.form.setFieldsValue(object)
    }

  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,location} = this.props;

    actions.rejectForm(values).then(()=>{

      setTimeout(function(){
        actions.backRouteReload(router,location)
      },2000)
    })
  }
  render() {
    let {params, reduce:{spins:{formSpin}},location:{state:{item}}} = this.props;
    console.log(item)
    //	let model=preduce.list[0]
      const formFullItemLayout = {
          labelCol: {
              span: 6
          },
          wrapperCol: {
              span: 18
          }
      };
      const formFullItemLayoutSpec = {
          labelCol: {
              span: 3
          },
          wrapperCol: {
              span: 21
          }
      }
    return (
      <Spin tip="Loading..." spinning={false}>
        <RejectForm onSubmit={this.onSubmit} updateFieldValue={this.updateFieldValue.bind(this)} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} params={params} item={item} row={item} saveFormRef={this.saveFormRef}>
            <Button type="primary" htmlType="submit" onClick={this.onSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </RejectForm>
      </Spin>
    )
  }
}

export default RejectFormView

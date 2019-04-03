import React, {Component, PropTypes} from 'react'
//import {reduxForm,Field} from 'redux-form'
import {Button, Input, Table, Form, DatePicker,Card,Switch,Row,Select,Checkbox,Collapse} from 'antd'

import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import {FormPage} from 'app/components/Page'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import ModalView from 'app/components/Modal.view'
import SwitchCard from 'app/components/SwitchCard'
import DictUtils from 'app/utils/DictUtils'

import styles from './styles.less'
// const FormCreate = Form.create
// const FormItem = Form.Item
const Option = Select.Option
const CheckboxGroup = Checkbox.Group
const msgDay = [
  {keyName:'当天提醒',keyValue:0},
  {keyName:'提前1天',keyValue:24},
  {keyName:'提前2天',keyValue:48},
  {keyName:'提前3天',keyValue:72},
  {keyName:'提前4天',keyValue:96},
  {keyName:'提前5天',keyValue:120},
  {keyName:'提前6天',keyValue:144},
  {keyName:'提前7天',keyValue:168},
  {keyName:'提前8天',keyValue:192},
  {keyName:'提前9天',keyValue:216},
  {keyName:'提前10天',keyValue:240}
]
const msgHour = [
  {keyName:'提前2小时',keyValue:2},
  {keyName:'提前4小时',keyValue:4},
  {keyName:'提前1天',keyValue:24},
  {keyName:'提前2天',keyValue:48},
  {keyName:'提前3天',keyValue:72},
  {keyName:'提前4天',keyValue:96},
  {keyName:'提前5天',keyValue:120}
]
const msgFeed = [
  {keyName:'提前30分钟',keyValue:30},
  {keyName:'提前1小时',keyValue:1},
  {keyName:'提前2小时',keyValue:2},
  {keyName:'提前4小时',keyValue:4},
  {keyName:'提前1天',keyValue:24},
]

const msgBack = [
  {keyName:'提前5分钟',keyValue:5},
  {keyName:'提前10分钟',keyValue:10},
  {keyName:'提前20分钟',keyValue:20},
  {keyName:'提前30分钟',keyValue:30},
]

// @FormCreate()
class RemindFormView extends FormPage {
  state = {
  }
  constructor(props) {
    super(props);
    // this.state = {
    //   form: props.initialValues
    // };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.item['msg_1001']!=this.props.item['msg_1001']){
			this.setState({
				msg_1001:nextProps.item['msg_1001'],
			})
		}
  }


  renderSelectOption(data,idx){
    // console.log(keyValue,keyName)
    return (<Option value={data.keyValue.toString()} key={idx}>{data.keyName}</Option>)
  }
  initDefaultValue(value){
    if(parseInt(value) === 1){
      return true
    }else{
      return false
    }
  }
  initDayOrMonthValue(type){
		let value = this.state.msg_1001
    if(type == "day" && value == 1){
      return true
    }else if(type == "month" && value == 2){
      return true
    }else{
      return false
    }
  }

  componentDidMount() {
    let {params, data, actions} = this.props;
      actions.fetchRemindAction(params.id)
  }
  handleSubmit(values) {
    let {actions} = this.props;
    // console.log(333,values)
    actions.saveRemindAction(values)
  }
  handlerCheckDayOrMonth(e){
    let name = e.target.name
    let checked = e.target.checked
    if(name=="msg_1001_1" && checked){
      this.setState({msg_1001:1})
    }else if(name=="msg_1001_2" && checked){
      this.setState({msg_1001:2})
    }
  }
  initSelectDefautValue(array,value){
    for(var i=0;i<array.length;i++){
      if(array[i].keyValue == value){
        return array[i].keyName
      }
    }
  }
  renderType1(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="员工生日提醒" bordered={false} name="msg_1000" defaultValue={this.initDefaultValue(item['msg_1000'])}>
            <Row className="row-hidden">
              <FormItem>
                <Input type="hidden" name="msg_1001" defaultValue={this.state.msg_1001} />
              </FormItem>
            </Row>
            <Row>
            <FormItem>
              <Checkbox name="msg_1001_1" checked={this.initDayOrMonthValue("day")} onChange={this.handlerCheckDayOrMonth.bind(this)} />
            </FormItem>
							<span>
							按日提醒：
							</span>
              <FormItem containerTo={false}>
                <Select
                  name="msg_1002"
                  style={{width:'120px'}}
                  defaultValue={item['msg_1002']}
                  fetch={msgDay}
                  renderItem={this.renderSelectOption}
                ></Select>
              </FormItem>
               <span>告知HR员工的生日。</span>
            </Row>
            <Row>
            <FormItem>
              <Checkbox name="msg_1001_2" checked={this.initDayOrMonthValue("month")} onChange={this.handlerCheckDayOrMonth.bind(this)} />
            </FormItem>
							<span>按月提醒：每月1日，提醒本月生日的员工。</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1003" defaultValue={this.initDefaultValue(item['msg_1003'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }

  renderType2(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="员工入职提醒" bordered={false} name="msg_1004"  defaultValue={this.initDefaultValue(item['msg_1004'])}>

            <Row>
              <span>根据员工入职时间，</span>
              <FormItem containerTo={false}>
                <Select
                  name="msg_1005"
                  style={{width:'120px'}}
                  defaultValue={item['msg_1005']}
                  fetch={msgDay}
                  renderItem={this.renderSelectOption}
                ></Select>
              </FormItem>
               <span>告知HR员工的入职时间。</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1006" defaultValue={this.initDefaultValue(item['msg_1006'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }

  renderType3(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="员工转正提醒" bordered={false} name="msg_1007" defaultValue={this.initDefaultValue(item['msg_1007'])}>
            <Row>
              <span>根据员工转正时间，</span>
              <FormItem containerTo={false}>
                <Select
                  name="msg_1008"
                  style={{width:'120px'}}
                  defaultValue={item['msg_1008']}
                  fetch={msgDay}
                  renderItem={this.renderSelectOption}
                ></Select>
              </FormItem>
               <span>告知HR员工的转正时间。</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1009" defaultValue={this.initDefaultValue(item['msg_1009'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }
  renderType4(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="合同到期提醒" bordered={false} name="msg_1010" defaultValue={this.initDefaultValue(item['msg_1010'])}>
            <Row>
              <span>根据员工的合同到期日期，</span>
              <FormItem containerTo={false}>
                <Select
                  name="msg_1011"
                  style={{width:'120px'}}
                  defaultValue={item['msg_1011']}
                  fetch={msgDay}
                  renderItem={this.renderSelectOption}
                ></Select>
              </FormItem>
               <span>告知HR员工合同到期日期。</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1012" defaultValue={this.initDefaultValue(item['msg_1012'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }
  renderType5(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="员工周年提醒" bordered={false} name="msg_1013" defaultValue={this.initDefaultValue(item['msg_1013'])}>
            <Row>
              <span>根据员工的已入职时间，员工入职满周年</span>
              <FormItem containerTo={false}>
                <Select
                  name="msg_1014"
                  style={{width:'120px'}}
                  defaultValue={item['msg_1014']}
                  fetch={msgDay}
                  renderItem={this.renderSelectOption}
                  notFoundContent="当天提醒"
                ></Select>
              </FormItem>
               <span>告知HR员工入职满周年。</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1015" defaultValue={this.initDefaultValue(item['msg_1015'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }
  // renderType6(){
  //   let {item} = this.props
  //   return(<SwitchCard className="remind-inner-card" title="预约面试提醒" bordered={false} name="msg_1016" defaultValue={this.initDefaultValue(item['msg_1016'])}>
  //           <Row>
  //             根据与候选人的预约面试时间，
  //             <FormItem containerTo={false}>
  //               <Select
  //                 name="msg_1017"
  //                 style={{width:'120px'}}
  //                 defaultValue={item['msg_1017']}
  //                 fetch={msgHour}
  //                 renderItem={this.renderSelectOption}
  //                 notFoundContent="提前2小时"
  //               ></Select>
  //             </FormItem>
  //              告知HR与候选人的预约面试时间；
  //           </Row>
  //           <Row>
  //             <FormItem>
  //               <Checkbox name="msg_1018" defaultValue={this.initDefaultValue(item['msg_1018'])} valuePropName="checked" />
  //             </FormItem>
  //             是否开通短信提醒
  //           </Row>
  //        </SwitchCard>)
  // }
	renderOfferType(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="Offer反馈提醒" bordered={false} name="msg_1028" defaultValue={this.initDefaultValue(item['msg_1028'])}>
						<Row>
              <span>候选人对offer进行反馈，发送提醒信息告知HR。</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1029" defaultValue={this.initDefaultValue(item['msg_1029'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }
  renderType11(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="面试安排提醒" bordered={false} name="msg_1016" defaultValue={this.initDefaultValue(item['msg_1016'])}>
            <Row>
              <span>根据与候选人的预约面试时间，</span>
              <FormItem containerTo={false}>
                <Select
                  name="msg_1017"
                  style={{width:'120px'}}
                  defaultValue={item['msg_1017']}
                  fetch={msgFeed}
                  renderItem={this.renderSelectOption}
                  notFoundContent="提前1天"
                ></Select>
              </FormItem>
               <span>告知HR与候选人的预约面试时间；</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1018" defaultValue={this.initDefaultValue(item['msg_1018'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }
  renderType12(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="面试官反馈提醒" bordered={false} name="msg_1019" defaultValue={this.initDefaultValue(item['msg_1019'])}>
            <Row>
              <span>面试官提交面试反馈、处理简历、添加简历备注等相关操作，发送提醒消息告知HR。</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1020" defaultValue={this.initDefaultValue(item['msg_1020'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }
  renderType13(){
		let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="跟进提醒" bordered={false} name="msg_1021" defaultValue={this.initDefaultValue(item['msg_1021'])}>
            <Row>
              <span>根据设置的跟进时间</span>
              <FormItem containerTo={false}>
                <Select
                  name="msg_1022"
                  style={{width:'120px'}}
									defaultValue={item['msg_1022']}
									fetch={msgBack}
                  renderItem={this.renderSelectOption}
                  notFoundContent="提前10分钟"
                ></Select>
              </FormItem>
               <span>发送提醒消息告知HR。</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1023" defaultValue={this.initDefaultValue(item['msg_1023'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }
  renderType14(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="解锁提醒" bordered={false} name="msg_1024" defaultValue={this.initDefaultValue(item['msg_1024'])}>
            <Row>
              <span>开启解锁提醒的候选人有了锁定状态变化，发送提醒消息告知HR。</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1025" defaultValue={this.initDefaultValue(item['msg_1025'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }
  renderType15(){
    let {item} = this.props
    return(<SwitchCard className="remind-inner-card" title="诚信库提醒" bordered={false} name="msg_1026" defaultValue={this.initDefaultValue(item['msg_1026'])}>
            <Row>
            <span>候选人被其他HR加入诚信库时，发送提醒消息</span>
            </Row>
            <Row>
              <FormItem>
                <Checkbox name="msg_1027" defaultValue={this.initDefaultValue(item['msg_1027'])} valuePropName="checked" />
              </FormItem>
              <span>是否开通短信提醒</span>
            </Row>
         </SwitchCard>)
  }
  onSubmit(e){
    this.form.validateFieldsAndScroll({force:true},(err,values) => {
      if (err) {
        return;
      }
      this.handleSubmit(values)
    })
  }
  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef
    } = this.props

    // const {getFieldDecorator, validateFieldsAndScroll} = form
    return (

      <Card
        type="inner"
        className="remind-form-view"
        title={<div><h3 className="card-title">重要事项提醒设置</h3></div>}
        extra={<Button type="primary" onClick={this.onSubmit.bind(this)}>保存</Button>} >
        <BaseForm layout="inline" onSubmit={handleSubmit} ref={this.saveFormRef}>
						<h3 className="collapse-form-title">候选人相关</h3>
              <Collapse>
                {this.renderType11()}
                {this.renderType12()}
                {this.renderType13()}
                {this.renderType14()}
								{this.renderType15()}
								{this.renderOfferType()}
              </Collapse>
						<h3 className="collapse-form-title">员工相关</h3>
              <Collapse>
                {this.renderType2()}
                {this.renderType3()}
                {this.renderType1()}
                {this.renderType5()}
                {this.renderType4()}
              </Collapse>
        </BaseForm>
      </Card>
    )
  }
}

/*
class RemindFormView extends FormPage {
  render() {
    let {params, reduce:{remind}} = this.props;
    //	let model=preduce.list[0]
    return (
      <Card
        type="inner"
        className="remind-form-view"
        title="提醒设置"
        extra={<Button type="primary" onClick={this.onSubmit.bind(this)}>保存</Button>}
      >
          <RemindForm onSubmit={this.onSubmit} initialValues={remind} saveFormRef={this.saveFormRef}>

          </RemindForm>
      </Card>
    )
  }
}
*/

export default RemindFormView

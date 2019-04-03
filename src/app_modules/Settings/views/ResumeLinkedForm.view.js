/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-16T14:53:26+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
     Input, Select, Checkbox,
 } from 'antd'
import moment from 'moment';
import {FormPage} from 'components/Page'
import ModalView from 'components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'components/BaseForm'
import InputStrGroup from 'components/InputStrGroup'
import HierarchySelection from 'components/HierarchySelection'
import SelectRange from 'components/SelectRange'
import LinkagePullDown from 'components/LinkagePullDown'
import DictUtils from 'app-utils/DictUtils'
import styles from './styles.less'

const Option = Select.Option
const InputGroup = Input.Group;
const {TextArea} = Input



class ResumeLinkedForm extends Component{
  renderQcForm(){

  }
  renderZlForm(){

  }
  renderTcForm(){

  }
  initDefaultValue(value){
    if(value === 1){
      return true
    }else{
      return false
    }
  }
  convsetData(data,parent){
    if(data == "" || data==undefined){
      return []
    }else{
      // console.log("data",data,data.map,parent)
      return data.map && data.map((d)=>{
        d.label=d.keyName
        // d.value=d.keyValue
        if(parent!==undefined){
          d.value=[parent,d.keyValue].join("-")
        }else{
          d.value=d.keyValue
        }
        if(d.children && d.children.length>0){
          // console.log("children",d,d.children)
          d.children=this.convsetData(d.children,d.value)
        }
        // d.children=d.children.length>0?this.convsetData(d.children):""
        return d
      })
    }
  }


  stringToArray(data){
    if(data == ""){
      return []
    }else {
      return data
    }
  }

  concatArray(arr1,arr2) {
    return arr1.map((it)=>{
      it.type = 'min'
      return it
    }).concat(arr2.map((it)=>{
      it.type = 'max'
      return it
    }))
  }

  renderSelectOption(data,idx) {
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  render() {
    const {
      form,
      initialValues:{id},
      handleSubmit,
      children,
      saveFormRef,
    } = this.props

    const formFullItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    };
    const timeConversion = (time)=>{
      if(time && time!=""){
        return moment(time)
      }else{
        return null
      }
    }
    let {actions,params,state,setChannelRule} = this.props;
    if(Object.getOwnPropertyNames(setChannelRule).length == 0){
      return null
    }else{
      const self = this
      let options = setChannelRule.options
      let values = setChannelRule.values
      if(state.channel == "qc"){
        console.log(this.initDefaultValue(values.keyWordRule))
        return (
        <BaseForm onSubmit={handleSubmit} ref={saveFormRef} className="resume-linked-form">
          <FormItem {...formFullItemLayout} className="row-hidden">
            <Input name="id" type="hidden" defaultValue={values.id} />
          </FormItem>
          <FormItem {...formFullItemLayout} className="row-hidden">
            <Input name="jobId" type="hidden" defaultValue={values.jobId} />
          </FormItem>
          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="keyWordRule" defaultValue={this.initDefaultValue(values.keyWordRule)} valuePropName="checked">含任一关键字</Checkbox>
            </FormItem>
          }>
            <Input name="keyWord" label="关键字/ID" type="text" defaultValue={values.keyWord}  />
          </FormItem>
          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="latelyJob" defaultValue={this.initDefaultValue(values.latelyJob)} valuePropName="checked">只搜最近职能</Checkbox>
            </FormItem>
          }>
            <HierarchySelection sliderSelect={true} name="job" label="职能" options={this.convsetData(options.job)} defaultValue={this.stringToArray(values.job)} />
          </FormItem>
          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="expectPlaceRule" defaultValue={this.initDefaultValue(values.expectPlaceRule)} valuePropName="checked">含期望工作地</Checkbox>
            </FormItem>
          }>
            <HierarchySelection sliderSelect={true} name="place" label="居住地" options={this.convsetData(options.place)} defaultValue={this.stringToArray(values.place)} />
          </FormItem>
          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="latelyIndustry" defaultValue={this.initDefaultValue(values.latelyIndustry)} valuePropName="checked">只搜最近行业</Checkbox>
            </FormItem>
          }>
            <Select name="industry" label="行业" mode="multiple" placeholder="请选择" fetch={this.convsetData(options.industry)} renderItem={this.renderSelectOption} defaultValue={this.stringToArray(values.industry)} rules={[{validator:customRules.maxLength,value:3}]} />
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <HierarchySelection maxChosen={1} sliderSelect={true} name="expectPlace" label="期望工作地" options={this.convsetData(options.place)} defaultValue={this.stringToArray(values.expectPlace)} />
          </FormItem>
          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="overseas" defaultValue={this.initDefaultValue(values.overseas)} valuePropName="checked">海外经验</Checkbox>
            </FormItem>
          }>
            <SelectRange name="workLimit" label="工作年限" options={this.concatArray(options.workLimit,options.workLimitright)} defaultValue={values.workLimit} />
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <LinkagePullDown name="expectPay" label="期望月薪" options={options.expectPay} defaultValue={this.stringToArray(values.expectPay)} />
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="language" label="语言能力" placeholder="请选择" fetch={options.language} renderItem={this.renderSelectOption} defaultValue={values.language}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="proficiency" label="熟练度" placeholder="请选择" fetch={options.proficiency} renderItem={this.renderSelectOption} defaultValue={values.proficiency}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="applyStatus" label="求职状态" placeholder="请选择" fetch={options.applyStatus} renderItem={this.renderSelectOption} defaultValue={values.applyStatus}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="dateUpdated" label="简历更新" placeholder="请选择" fetch={options.dateUpdated} renderItem={this.renderSelectOption} defaultValue={values.dateUpdated}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout} extra={
            <div className="multi-extra-box">
            <FormItem className="multi-extra">
            <Checkbox name="jbw" defaultValue={this.initDefaultValue(values.jbw)} valuePropName="checked">985</Checkbox>
            </FormItem>
            <FormItem className="multi-extra">
            <Checkbox name="fullTime" defaultValue={this.initDefaultValue(values.fullTime)} valuePropName="checked">全日制</Checkbox>
            </FormItem>
            <FormItem className="multi-extra">
            <Checkbox name="eyy" defaultValue={this.initDefaultValue(values.eyy)} valuePropName="checked">211</Checkbox>
            </FormItem>
            <FormItem className="multi-extra">
            <Checkbox name="overseasStudy" defaultValue={this.initDefaultValue(values.overseasStudy)} valuePropName="checked">海外留学</Checkbox>
            </FormItem>
            </div>
          }>
            <SelectRange name="education" label="学历" options={this.concatArray(options.education,options.educationright)} defaultValue={values.education} />
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="sex" label="性别" placeholder="请选择" fetch={options.sex} renderItem={this.renderSelectOption} defaultValue={values.sex}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <InputStrGroup name="age" label="年龄" defaultValue={values.age} rules= {[{validator:customRules.integer}]}/>
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Input name="nearCompany" label="最近公司" type="text" defaultValue={values.nearCompany} />
          </FormItem>
        </BaseForm>
        )
      }else if(state.channel == "tc"){
        return (
        <BaseForm onSubmit={handleSubmit} ref={saveFormRef} className="resume-linked-form">
          <FormItem {...formFullItemLayout} className="row-hidden">
            <Input name="id" type="hidden" defaultValue={values.id} />
          </FormItem>
          <FormItem {...formFullItemLayout} className="row-hidden">
            <Input name="jobId" type="hidden" defaultValue={values.jobId} />
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Input name="keyWord" label="关键字" type="text" defaultValue={values.keyWord}  />
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="sex" label="性别" placeholder="请选择" fetch={options.sex} renderItem={this.renderSelectOption} defaultValue={values.sex}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="education" label="学历" placeholder="请选择" fetch={options.education} renderItem={this.renderSelectOption} defaultValue={values.education} />
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <HierarchySelection maxChosen={1} sliderSelect={true} name="job" label="职位类别" options={this.convsetData(options.job)} defaultValue={values.job} />
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="age" label="年龄" placeholder="请选择" fetch={options.age} renderItem={this.renderSelectOption} defaultValue={values.age}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="workLimit" label="工作经验" placeholder="请选择" fetch={options.workLimit} renderItem={this.renderSelectOption} defaultValue={values.workLimit}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Select name="expectPay" label="期望薪资" placeholder="请选择" fetch={options.expectPay} renderItem={this.renderSelectOption} defaultValue={values.expectPay}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="dateUpdatedRule" defaultValue={this.initDefaultValue(values.dateUpdatedRule)} valuePropName="checked">含24小时内更新</Checkbox>
            </FormItem>
          }>
            <Select name="dateUpdated" label="更新时间" placeholder="请选择" fetch={options.dateUpdated} renderItem={this.renderSelectOption} defaultValue={values.dateUpdated}>
            </Select>
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <HierarchySelection maxChosen={1} sliderSelect={true} name="place" label="居住地" options={this.convsetData(options.place)} sort={true} defaultValue={values.place} />
          </FormItem>
        </BaseForm>
        )
      }else if(state.channel == "zl"){
        return (
        <BaseForm onSubmit={handleSubmit} ref={saveFormRef} className="resume-linked-form">
          <FormItem {...formFullItemLayout} className="row-hidden">
            <Input name="id" type="hidden" defaultValue={values.id} />
          </FormItem>
          <FormItem {...formFullItemLayout} className="row-hidden">
            <Input name="jobId" type="hidden" defaultValue={values.jobId} />
          </FormItem>
          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="keyWordRule" defaultValue={this.initDefaultValue(values.keyWordRule)} valuePropName="checked">含任一关键字</Checkbox>
            </FormItem>
          }>
            <Input name="keyWord" label="关键字/ID" type="text" defaultValue={values.keyWord}  />
          </FormItem>
          <FormItem {...formFullItemLayout}>
            <Input name="nearCompany" label="最近公司" type="text" defaultValue={values.nearCompany}  />
          </FormItem>

          <FormItem {...formFullItemLayout}>
            <HierarchySelection maxChosen={10} sliderSelect={true} name="place" label="居住地" options={this.convsetData(options.place)} defaultValue={values.place} />
          </FormItem>

          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="latelyJob" defaultValue={this.initDefaultValue(values.latelyJob)} valuePropName="checked">只搜最近职能</Checkbox>
            </FormItem>
          }>
            <HierarchySelection sliderSelect={true} name="job" label="职能" options={this.convsetData(options.job)} defaultValue={values.job} />
          </FormItem>

          <FormItem {...formFullItemLayout}>
            <HierarchySelection maxChosen={10} sliderSelect={true} name="expectPlace" label="期望工作地" options={this.convsetData(options.place)} defaultValue={values.expectPlace} />
          </FormItem>

          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="overseas" defaultValue={this.initDefaultValue(values.overseas)} valuePropName="checked">海外经验</Checkbox>
            </FormItem>
          }>
            <LinkagePullDown name="workLimit" label="工作年限" options={options.workLimit} defaultValue={values.workLimit} />
          </FormItem>

          <FormItem {...formFullItemLayout}>
            <Select name="expectPay" label="期望薪资" placeholder="请选择" fetch={options.expectPay} renderItem={this.renderSelectOption} defaultValue={values.expectPay}>
            </Select>
          </FormItem>

          <FormItem {...formFullItemLayout} extra={
            <FormItem className="multi-extra">
            <Checkbox name="latelyIndustry" defaultValue={this.initDefaultValue(values.latelyIndustry)} valuePropName="checked">只搜最近行业</Checkbox>
            </FormItem>
          }>
            <Select name="industry" label="行业" mode="multiple" placeholder="请选择" fetch={this.convsetData(options.industry)} renderItem={this.renderSelectOption} defaultValue={this.stringToArray(values.industry)} rules={[{validator:customRules.maxLength,value:3}]} />
          </FormItem>

          <FormItem {...formFullItemLayout}>
            <Select name="language" label="语言能力" placeholder="请选择" fetch={options.language} renderItem={this.renderSelectOption} defaultValue={values.language}>
            </Select>
          </FormItem>

          <FormItem {...formFullItemLayout}>
            <Select name="workStatus" label="目前工作状态" placeholder="请选择" fetch={options.workStatus} renderItem={this.renderSelectOption} defaultValue={values.workStatus}>
            </Select>
          </FormItem>

          <FormItem {...formFullItemLayout}>
            <Select name="dateUpdated" label="更新日期" placeholder="请选择" fetch={options.dateUpdated} renderItem={this.renderSelectOption} defaultValue={values.dateUpdated}>
            </Select>
          </FormItem>

          <FormItem {...formFullItemLayout}>
            <LinkagePullDown name="education" label="学历" options={options.education} defaultValue={values.education} />
          </FormItem>

          <FormItem {...formFullItemLayout}>
            <Select name="sex" label="性别" placeholder="请选择" fetch={options.sex} renderItem={this.renderSelectOption} defaultValue={values.sex}>
            </Select>
          </FormItem>

          <FormItem {...formFullItemLayout}>
            <InputStrGroup name="age" label="年龄" defaultValue={values.age} />
          </FormItem>
        </BaseForm>
        )
      }
    }
  }
}

@WrapperComponent(ModalView)
class ResumeLinkedFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    //:id params.id
    let {actions,params,location:{state}} = this.props;
      console.log(state)
      actions.fetchSysSetChannelRuleAction(state)
    // }
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,location:{state},router} = this.props
    actions.saveSysChannelRuleAction(values,state)
    actions.backRoute(router)
  }
  render() {
    let {params, reduce:{spins:{formSpin},item,setChannelRule},reduce} = this.props;
    let {actions,location:{state}} = this.props;
    //	let model=preduce.list[0]
    return (
        <ResumeLinkedForm onSubmit={this.onSubmit} initialValues={item} state={state} setChannelRule={reduce.setChannelRule} saveFormRef={this.saveFormRef}>

        </ResumeLinkedForm>
    )
  }
}

export default ResumeLinkedFormView


/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-14T13:26:32+08:00
 */

import React, {Component} from 'react'
import {
   Button, Input, Spin,  Select
} from 'antd'
import WrapperComponent from 'app/decorators/WrapperComponent'
import NestedComponent from 'app/decorators/NestedComponent'
import ButtonGroups from 'app/components/ButtonGroups'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import PageView,{FormPage} from 'app/components/Page'
import ModalView,{ModalWidthView} from 'app/components/Modal.view'
import DictUtils from 'app/utils/DictUtils'
import RichEditor,{CustomButton,EditableRichEditor} from 'app/components/RichEditor'

const Option = Select.Option

@WrapperComponent(ModalWidthView)
export default class TemplateForm extends FormPage{
  componentDidMount(){
    let {actions,params}=this.props
    actions.fetchTemplateItemAction({id:params.id})
  }
  handleSubmit(value){
    let {actions} = this.props
    actions.saveTemplateAction(value)
    actions.backRoute()
  }
  renderSelectOption(data,idx){
    let {
      item,
      params
    } = this.props
    console.log(params.smsType,item.type)
    return (<Select.Option value={data.keyValue} key={idx} disabled={(params.smsType==1 ||item.type==1) && data.keyValue=="2"}>{data.keyName}</Select.Option>)
  }
  render() {
    let {
      item,
      params
    } = this.props
    // this.props.form.setFieldsValue
    console.log(item)
    return (
        <BaseForm onSubmit={this.handleSubmit.bind(this)} ref={this.saveFormRef}>
          <FormItem>
            <Input name="type" type="hidden" defaultValue={params.smsType|| item.type} />
          </FormItem>
          <FormItem>
            <Input name="id" type="hidden" defaultValue={item.id} />
          </FormItem>
          <FormItem>
            <Select label="模板用途" name="templateUse" defaultValue={item.templateUse} fetch={DictUtils.getDictByType("templateuse")} defaultValue={item.templateUse} renderItem={this.renderSelectOption.bind(this)} rules={[{required: true, message: '模板用途不可为空',whitespace:true}]} ></Select>
          </FormItem>
          <FormItem>
            <Input label="请输入模板名称" name="name"  defaultValue={item.name} rules={[{required: true, message: '模板用途不可为空',whitespace:true}]}/>
          </FormItem>
          <FormItem>
            <EditableRichEditor name="content" rows={4} defaultValue={item.content} extBar={true} type={(params.smsType=="2" || item.type=="2")?"html":"markdown"}/>
          </FormItem>
        </BaseForm>
    )
  }
}

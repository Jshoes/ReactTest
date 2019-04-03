/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-16T17:04:48+08:00
 */

import React, {Component, PropTypes} from 'react'
import { Row, Col, Modal, Button, Input, Form, DatePicker, Layout, Spin, Select,TreeSelect } from 'antd'
import moment from 'moment'
import {FormPage} from 'app/components/Page'
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import {TreeSelectPicker} from 'app/components/TreeView'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import ErrorBoundary from 'app/components/ErrorBoundary'
const TreeNode = TreeSelect.TreeNode;

const Option = Select.Option
const {TextArea} = Input
function disabledDate(current) {
  return current && current > moment().endOf('day');
}
class MemberForm extends Component{
  state = {
    showAll: false,
  }
	renderTreeData(item){
		return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id},this.loopTreeData(item.children))
	}
	loopTreeData(data){
		let that = this
		return data.map((item) => {
			if (item.children && item.children.length) {
				return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id},this.loopTreeData(item.children))
			}else{
				return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id})
			}
		})
	}
  renderFormItems(){
    let {sysFieldList} = this.props
    //修正非必填字段不采用渲染方式解决，使用隐藏方式
    return sysFieldList.filter(it=>it.enable==1).filter(it=>it.isSave).map((it,idx)=>{
        return(
          <FormItem key={idx} style={ (it.isRequired==0 && !this.state.showAll)?{display:'none'}:{}}>
            {this.renderField(it)}
          </FormItem>
        )
    })
  }
  renderFieldOptions(data,idx){
    return (<Option value={data.optionValue} key={idx}>{data.optionName}</Option>)
  }
  renderField(it){
    let {item,params} = this.props
    let rules = []
    if(it.isRequired == 1){
      rules.push({required: true, message: `${it.fieldName}不可为空`,})
    }

    switch (it.dataType) {
      case 1:
				rules.push({max:40,message:`${it.fieldName}不可超过40字`})
				if(it.fieldCode && it.fieldCode=='name'){
          return (
              <Input label={it.fieldName} name={it.fieldCode} defaultValue={item && item[it.fieldCode]} rules={it.isRequired==1?[{required: true, message: `${it.fieldName}不可为空`,},{max:10,message:`${it.fieldName}不可超过10字`}]:null} />
          )
				}else if(it.fieldCode && it.fieldCode=='familyAddress'){
          return (
              <Input label={it.fieldName} name={it.fieldCode} defaultValue={item && item[it.fieldCode]} rules={it.isRequired==1?[{required: true, message: `${it.fieldName}不可为空`,},{max:200,message:`${it.fieldName}不可超过10字`}]:null} />
          )
				}else if(it.rule && it.rule=='mobilephone'){
          return (
              <Input label={it.fieldName} name={it.fieldCode} defaultValue={item && item[it.fieldCode]} rules={it.isRequired==1?[{required: true, message: `${it.fieldName}不可为空`,},{validator:customRules.required},{validator:customRules.checkMobile},{validator:customRules.remote,value:'/member/phoneIsExist',name:'mobilephone',defaultValue:item[it.fieldCode]}]:null} />
          )
        }else if(it.rule && it.rule=='identityCard'){
          return (
              <Input label={it.fieldName} name={it.fieldCode} defaultValue={item && item[it.fieldCode]} rules={it.isRequired==1?[{required: true, message: `${it.fieldName}不可为空`,},{validator:customRules.required},{validator:customRules.checkIDCard},{validator:customRules.remote,value:'/member/cardIsExist',name:'identityCard',defaultValue:item[it.fieldCode]}]:null} />
          )
				}else if(it.fieldCode && it.fieldCode=='department'){
					return(
            <TreeSelectPicker
              label={it.fieldName}
              name={it.fieldCode}
              fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              // renderItem={this.renderTreeData.bind(this)}
              // renderItem={this.renderTreeData.bind(this)}
              placeholder="选择部门"
							treeDefaultExpandAll
							defaultValue={item && item[it.fieldCode]}
							rules={it.isRequired==1?[{required: true, message: `${it.fieldName}不可为空`,}]:null}
            />
					)
				}
				else{
          return (
              <Input label={it.fieldName} name={it.fieldCode} defaultValue={item && item[it.fieldCode]} rules={rules} />
          )
        }
        break;
      case 2:
        var defaultProp={}
        if(item && item[it.fieldCode] && item[it.fieldCode].length!=0){
          defaultProp={
             defaultValue:moment(item[it.fieldCode])
          }
        }
        return (
            <DatePicker label={it.fieldName} disabledDate={it.fieldCode=='birth'?disabledDate:null} name={it.fieldCode} {...defaultProp} format='YYYY-MM-DD' rules={it.isRequired==1?[{required: true, message: `${it.fieldName}不可为空`,}]:null} />
        )
        break;
      case 3:
        var emptyDefault=it.options.filter(v=>v.isDefault==1).map(v=>v.optionValue)
        if((!item[it.fieldCode] || item[it.fieldCode].length==0) && emptyDefault.length>0 && !params.id){
          item[it.fieldCode]=emptyDefault[0]
        }
        return (
            <Select label={it.fieldName} name={it.fieldCode} defaultValue={ item && item[it.fieldCode] && item[it.fieldCode]+"" }  fetch={it.options} renderItem={this.renderFieldOptions} allowClear={it.isRequired==1?false:true} rules={it.isRequired==1?[{required: true, message: `${it.fieldName}不可为空`,}]:null} />
        )
        break;
      case 4:
        var emptyDefault=it.options.filter(v=>v.isDefault==1 && v.optionValue!=="").map(v=>v.optionValue)
        if((!item[it.fieldCode] || item[it.fieldCode].length==0) && emptyDefault.length>0 && !params.id){
          item[it.fieldCode]=emptyDefault
        }
        return (
            <Select label={it.fieldName} name={it.fieldCode} defaultValue={ item && item[it.fieldCode] } mode="multiple" fetch={it.options} renderItem={this.renderFieldOptions} rules={it.isRequired==1?[{required: true, message: `${it.fieldName}不可为空`,}]:null} />
        )
        break;
      default:

    }
  }
  targetAllItems(){
    var curState = this.state.showAll
    this.setState({
      showAll: !curState,
    })
  }
  render() {
    const formFullItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
    const {
      form,
      initialValues,
      handleSubmit,
      children,
      saveFormRef,
      sysFieldList,
      item
    } = this.props

    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
        <FormItem >
          <Input name="id" type="hidden" defaultValue={item.id?item.id:''} />
        </FormItem>
        {this.renderFormItems()}
        <div style={{textAlign:"right"}}>
          <Button onClick={this.targetAllItems.bind(this)}>{this.state.showAll?'收缩':'展开'}</Button>
        </div>
      </BaseForm>
    )
  }
}

@WrapperComponent(ErrorBoundary)
@WrapperComponent(ModalView)
class MemberFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props
    if(params.id){
      actions.itemAction(params.id)
    }else{
      actions.newItemAction()
    }
  }
  //处理表格提交后动作
  handleSubmit(values){
		let {actions,router,reduce:{page}} = this.props
    actions.saveAction(values,page)
    actions.backRoute(router)
  }
  render() {
		let {params,item, reduce:{spins:{formSpin},sysFieldList},actions} = this.props
    let {reduce} = this.props
    return (
      <Spin tip="Loading..." spinning={formSpin}>
        <MemberForm  saveFormRef={this.saveFormRef} sysFieldList={sysFieldList} item={item} actions={actions} params={params} />
      </Spin>
    )
  }
}

export default MemberFormView

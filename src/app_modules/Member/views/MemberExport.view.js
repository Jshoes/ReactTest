/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-02-02T14:31:53+08:00
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
  Select,
  Checkbox,
  Radio,
  message
} from 'antd'
import {FormPage} from 'app/components/Page'
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import ErrorBoundary from 'app/components/ErrorBoundary'

const Option = Select.Option
const {TextArea} = Input
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

class MemberExport extends Component{
  state= {
    defaultValue: []
  }
  componentWillMount() {
    let {actions,params,sysFieldList} = this.props
    this.state.defaultValue = sysFieldList.filter((it)=>it.isRequired==1).map((it)=>it.fieldCode)
    // console.log(this.state.defaultValue)
  }
  onRadioChange(e) {
    let {sysFieldList,updateFieldValue} = this.props

    if(e.target.value){
      this.setState({
        defaultValue: sysFieldList.map((it)=>it.fieldCode)
      })
      updateFieldValue(sysFieldList.map((it)=>it.fieldCode))
    }else{
      this.setState({
        defaultValue: []
      })
      updateFieldValue([])
    }
    // console.log(this.state.defaultValue)
  }
  render() {
    const {
      sysFieldList,
      form,
      handleSubmit,
      children,
      saveFormRef
    } = this.props

    let {defaultValue} = this.state
    // console.log(defaultValue)

    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef} layout="inline" >
				<FormItem>
					<RadioGroup name="Selectable" onChange={this.onRadioChange.bind(this)} >
						<Radio value={true}>全选</Radio>
						<Radio value={false}>全不选</Radio>
					</RadioGroup>
				</FormItem>

        <FormItem>
          <CheckboxGroup name='isShowArr' defaultValue={defaultValue} value={defaultValue}>
          <Row>
            {
              sysFieldList.map(
                (it,idx)=>{
                  return (<Col span={6}  key={idx}><Checkbox value={it.fieldCode}>{it.fieldName}</Checkbox></Col>)
                }
              )
            }
          </Row>
          </CheckboxGroup>
        </FormItem>
      </BaseForm>
    )
  }
}

@WrapperComponent(ErrorBoundary)
@WrapperComponent(ModalView)
class MemberExportView extends FormPage{
  //处理表格提交后动作
  handleSubmit(values){
    let {reduce:{searchParams,params},actions} = this.props;
    if(!searchParams){
      searchParams = {}
    }
    // console.log(Object.assign(searchParams,values))
    if(Object.assign(searchParams,params,values).isShowArr.length == 0) {
      message.error('导出字段不能为空！')
      return null
    }else {
      actions.exportAction(`${APP_SERVER}/fileUpload/member/exportData`,Object.assign(searchParams,params,values))
    }
  }
  updateFieldValue(value){
     this.form.setFieldsValue({isShowArr:value})
  }
  render() {
    let {params, reduce:{spins:{formSpin},sysFieldList,page,searchParams}, actions, reduce} = this.props;
    return (
      <Spin tip="Loading..." spinning={formSpin}>
        <div style={{textAlign:'center',marginBottom:'10px'}}>本次将导出{page.total}条数据</div>
        <MemberExport onSubmit={this.onSubmit} sysFieldList={sysFieldList} actions={actions} updateFieldValue={this.updateFieldValue.bind(this)} saveFormRef={this.saveFormRef} />
      </Spin>
    )
  }
}

export default MemberExportView

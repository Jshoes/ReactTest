/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-16T14:06:55+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row, Col, Button, Input, Form, Spin, Select, Radio, Checkbox, Table, Icon, Popconfirm
} from 'antd'
import moment from 'moment'

import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import {FormPage} from 'app/components/Page'
import ModalView from 'app/components/Modal.view'
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option
const {TextArea} = Input
const data = [];

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                onBlur={this.check}
                maxLength={8}
                addonAfter={
                  <Icon
                    type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check}
                  />
                }
              />

            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}
class EditableFeild extends Component {
  state={
    data:[],
    initialValue:[]
  }
  constructor(props) {
    super(props);
    this.state.initialValue = props.value||[]

    // this.cacheData = props.value.map(item => ({ ...item }))
  }

  componentWillReceiveProps(nextProps){
      this.setState({
        initialValue:nextProps.value||[]
      });
  }
  onCellChange (key, dataIndex) {
    const onChange = this.props.onChange;
     return (value) => {
       let {initialValue} = this.state
      // const dataSource = [...this.state.initialValue]
         let newInitial=initialValue.map((item)=>{
           if(item.optionName==key){
             item.optionName=value
             return item
           }else{
             return item
           }
         })
         this.setState({ initialValue:newInitial })
         onChange(newInitial)
      }
   }

  cancel(key) {
    const onChange = this.props.onChange;
    const newData = [...this.state.initialValue]
    const target = newData.filter(item => key !== item.optionName)
    this.setState({ initialValue: target })
    onChange(target)
  }
  handlerAddRow(){
    const onChange = this.props.onChange;
    let {initialValue} = this.state
    let rowData = {
      "optionName": "",
      "isDefault": 0,
    }
    if(JSON.stringify(initialValue) && JSON.stringify(initialValue).indexOf(JSON.stringify(rowData))<0){
        this.setState({ initialValue:initialValue.concat([rowData]) });
      //  onChange(initialValue.concat([rowData]))
    }
  }
  handlerRadioChange(record){
    const onChange = this.props.onChange;
    let {initialValue} = this.state
    let newInitial=initialValue.map((item)=>{
      if(item.optionName==record.optionName){
        item.isDefault=1
        return item
      }else{
        item.isDefault=0
        return item
      }
    })
    this.setState({
      initialValue:newInitial
    })
    onChange(newInitial)
  }
  render() {
    var columns = [{
      title: 'optionName',
      dataIndex: 'optionName',
      render: (value, record) => (
        <EditableCell
          value={value}
          onChange={this.onCellChange(value, 'optionName')}
        />
      )
    }, {
      title: 'isDefault',
      dataIndex: 'isDefault',
      width: '20%',
      render:(value,record) =>{
        return (<Radio checked={value==1?true:false} name="isDefault" onClick={this.handlerRadioChange.bind(this,record)}>默认</Radio>)
      }
    }, {
      title: 'operation',
      width: '20%',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
                <span>
                  <Popconfirm title="删除此项将导致原数据丢失" onConfirm={() => this.cancel(record.optionName)}>
                    <Icon type='delete'/>
                  </Popconfirm>
                </span>
            }
          </div>
        );
      },
    }];

    return (
      <div className="EditableFeild">
        <Row>
          <Col span={12}>
            选项信息：
          </Col>
          <Col span={12} style={{textAlign:'right'}}>
            <Button onClick={this.handlerAddRow.bind(this)}><Icon type='plus'/>添加选项</Button>
          </Col>
        </Row>
        <Table bordered dataSource={this.state.initialValue} scroll={{ y: 140 }}  rowKey='optionName'  showHeader={false} columns={columns} pagination={false} />
      </div>
    );
  }
}

@WrapperComponent(ModalView)
export default class SystemFieldForm extends FormPage{
  state = {
    editable: false,
  }
  handlerSelectType(value){
    if(value == 3 || value == 4){
      this.setState({editable: true})
    }else{
      this.setState({editable: false})
    }
  }

  componentWillMount() {
    //:id params.id
    let {actions,params} = this.props;
    if(params.fieldId){
      actions.itemAction(params.fieldId)
    }
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router} = this.props;
    actions.saveAction(values)
    actions.backRoute(router)
  }

  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    let {editable} = this.state
    const {
      form,
      item,
      handleSubmit,
      children,
      // saveFormRef,
      params,
    } = this.props
    let initialValues=item
    const formOffset1 = {
      wrapperCol: {
        offset:1,
        span: 6
      }
    };
    const formOffset2 = {
      wrapperCol: {
        offset:10,
        span: 6
      }
    };
    const timeConversion = (time)=>{
      if(time && time!=""){
        return moment(time)
      }else{
        return null
      }
    }
    return (
      <BaseForm onSubmit={handleSubmit} ref={this.saveFormRef}>
        <FormItem  className="row-hidden">
          <Input  name="oldSort" type="hidden" defaultValue={item.sort} />
        </FormItem>
        <FormItem  className="row-hidden">
          <Input  name="fieldCode" type="hidden" defaultValue={item.fieldCode} />
        </FormItem>
        <FormItem>
          <Input  name="fieldId" type="hidden" defaultValue={item.fieldId} />
        </FormItem>
        <FormItem>
          <Input label="字段名称" name="fieldName" rules= {[{required: true, message: '字段名称不可为空',},{validator:customRules.required},{max:10,message:'字段名称不能超过10个字'},{validator:customRules.remote,value:'/field/nameIsExistsJson',name:"fieldName",defaultValue:item.fieldName}]} defaultValue={item.fieldName} />
        </FormItem>
        <FormItem>
          <Input label="排序值" name="sort" rules= {[{required: true, message: '排序值不可为空'},{validator:customRules.integer}]} defaultValue={item.sort} />
        </FormItem>
        <FormItem>
          <Select label="字段类型" name="dataType" defaultValue={!item.dataType?1:item.dataType} onChange={this.handlerSelectType.bind(this)} disabled={params.fieldId?true:false}>
            <Option value={1}>文本</Option>
            <Option value={2}>日期</Option>
            <Option value={3}>单选</Option>
            <Option value={4}>多选</Option>
          </Select>
        </FormItem>
        <div style={{position:'relative'}}>
          <FormItem {...formOffset1}>
              <Checkbox label="" name="isRequired" defaultValue={item.isRequired=="1"?true:false} valuePropName="checked">必填</Checkbox>
          </FormItem>
          <FormItem style={{position:'absolute',top:0,left:'42%'}}>
              <Checkbox label="" name="enable" defaultValue={item.enable=="1"?true:false} valuePropName="checked">启用</Checkbox>
          </FormItem>
        </div>
        {(editable||item.dataType==3||item.dataType==4) && (
          <FormItem className="no-padding-left">
            <EditableFeild label="" name="options" defaultValue={item.options==""?[]:item.options} />
          </FormItem>
        )}

      </BaseForm>
    )
  }
}

/*
@WrapperComponent(ModalView)
class SystemFieldFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    //:id params.id
    let {actions,params} = this.props;
    if(params.fieldId){
      actions.itemAction(params.fieldId)
    }else {
      actions.newItemAction()
    }
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router} = this.props;
    actions.saveAction(values)
    actions.backRoute(router)
  }

  render() {
    let {params, reduce:{spins:{formSpin}},item} = this.props;
    //	let model=preduce.list[0]
    return (
        <SystemFieldForm onSubmit={this.onSubmit} params={params} initialValues={item} saveFormRef={this.saveFormRef}>

        </SystemFieldForm>
    )
  }
}
*/

// export default SystemFieldFormView

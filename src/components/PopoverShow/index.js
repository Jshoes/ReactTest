/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-13T10:12:15+08:00
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
  Popover
} from 'antd'
import moment from 'moment';
import {FormPage} from 'components/Page'
import WrapperComponent from '../../decorators/WrapperComponent'
import DictUtils from 'app-utils/DictUtils'
import PropsList from '../PropsList.component'

const Option = Select.Option
const InputGroup = Input.Group;
const {TextArea} = Input

export default class PopoverShow extends Component {
  fieldsOption(options,value){
    let optionName = []
    let valueArr = []
    if(value instanceof Array){
      valueArr = value
    }else {
      valueArr.push(value)
    }
    valueArr.map((item)=>{
      options.map((it)=>{
        if(it.optionValue == item){
          optionName.push(it.optionName)
        }
      })
    })
    return optionName.join(',')
  }

  renderFieldValue(it,val) {
    if(it.dataType==2){
       return !val?"":moment(val).format("YYYY-MM-DD");
    }else if(it.dataType==3 || it.dataType==4){
       return this.fieldsOption(it.options,val)
    }else{
      return val
    }
  }

  renderItem(titles,values) {
    return (
      titles.map((it,index)=>{
        let fieldName = it.fieldName
        let fieldCode = it.fieldCode
        let fieldValue = this.renderFieldValue(it,values[fieldCode])
        if(fieldValue != ""){
          return(<PropsList.Item label={fieldName}>{fieldValue}</PropsList.Item>)
        }else {
          return null
        }
      })
    )
  }

  renderContent(titles,values) {
    return (
      <PropsList labelPosition={"left"} labelWidth="120" labelSuffix={"："} inline={true}>
        {this.renderItem(titles,values)}
      </PropsList>
    )
  }

  render() {
    let {titles,values,popTitle,placement} = this.props
    return (
      <Popover placement={placement} title={popTitle} content={this.renderContent(titles,values)} trigger="hover">{popTitle}</Popover>
    )
  }
}

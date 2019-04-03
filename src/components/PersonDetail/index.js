import React,{Component} from 'react'
import {
  Button,
  Input,
  Table,
  Select,
  DatePicker,
  Modal,
  Menu,
  message,
  Card,
  Dropdown,
  Row,
  Col,
  Icon,
} from 'antd'
import DictUtils from 'app-utils/DictUtils'

function translateDic(type,value){
  return DictUtils.getDictLabelByValue(type,value)
}

export default class PersonDetail extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let {item} = this.props
    console.log(item)
    return (
      <div className="person-detail">
        <Row gutter={12}>
          <Col span={24}>{`${item.name}·${translateDic('sex',item.sex)}·${item.age}`}</Col>
          <Col span={24}>{item.id}</Col>
          <Col span={24}>123123</Col>
        </Row>
      </div>
    )
  }
}

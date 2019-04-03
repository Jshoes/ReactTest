import React,{Component} from 'react';
import {
  Row,
  Col,
  Icon,
  Tag
} from 'antd'
import Ellipsis from 'app/components/Ellipsis'
import moment from 'moment'
import DictUtils from 'app/utils/DictUtils'

/*
* status 简历阶段
* type 面试阶段
DictUtils.getDictLabelByValue("interviewstage",val)
*/

var statusTrans = {
  1:"待面试",
  2:"未反馈（未催促）",
  3:"未反馈（已催促）",
  4:"已反馈",
  5:"不通过已反馈（已催促）",
  6:"不通过未反馈（已催促）",
  7:"不通过未反馈（未催促）",
  8:"已通过已反馈",
  9:"已通过未反馈（已催促）",
  10:"已通过未反馈(未催促)",
  11:"已取消",
}

export default class InterviewType extends Component{
  render(){
    let obj = {
      2:"#ef6392",
      3:"#f8744e",
      4:"#13c7ac"
    }
    let {item} = this.props
    return(
      <div>
        <Tag color={obj[item.type]}>{DictUtils.getDictLabelByValue("interviewstage",item.type)}</Tag>
        <Tag style={{borderColor:"#65b2f8",backgroundColor:"#fff",color:"#65b2f8"}}>
          <Icon type="warning" />
          <span>{DictUtils.getDictLabelByValue("interviewstate",item.statusStr)}</span>
        </Tag>
      </div>
    )
  }
}

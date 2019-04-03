// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import {attr} from './Attr'
import DictUtils from 'app-utils/DictUtils'

export default class Interview extends BaseModel {

  constructor(opts) {
      super(opts)
  }




  static fields={}
  static modelName = 'Interview'
}


//Integer statusStr候选人状态：1--待面试 2--未反馈 (未催促) 3--未反馈 (已催促) 4--已反馈  5-不通过已反馈     6--不通过未反馈(已催促) 7--不通过未反馈(未催促)  8--已通过已反馈 9--已通过未反馈(已催促) 10--已通过未反馈(未催促)  11--已取消


Object.assign(Interview.fields,BaseModel.fields,{
  id: attr(),
  name:attr(),
  mobilephone:attr(),
  jobTitle:attr(),
  resumeType:attr(),
  degree:attr(),
  sex:attr(),
  hrName:attr(),
  interviewerList:attr(),
  age:attr(),
  interviewer:attr(),
  type:attr(),
  statusStr:attr(),
  isFeedback:attr(),
  isUrge:attr(),
  interviewerList:attr(),
  interviewTime:attr({
    get:(val)=>{
      return moment(val).format("YYYY-MM-DD HH:mm")
    }
  }),
  lastContactTime:attr(),
})

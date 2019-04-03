// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import Intro from './IntroModel'
import moment from 'moment'
import DictUtils from 'app/utils/DictUtils'
import {attr} from './Attr'

export default class Resume extends Intro {

  constructor(opts) {
      super(opts)
  }

  getIntroInfo(){
    return
  }

  static fields={}
  static modelName = 'Resume'
}

Object.assign(Resume.fields,Intro.fields,{
  id: attr(),
  name:attr(),
  haveRemark:attr(),
  inputTime:attr({
    get:(val)=>{
      // return moment(val).format("YYYY-MM-DD HH:mm:ss")
    }
  }),
  jobTitle:attr(),
  resumeType:attr(),
  degree:attr(),
  sex:attr(),
  age:attr(),
  workStatus:attr({
    get:(val)=>{
      // return DictUtils.getDictLabelByValue("jobstatus",val)
    }
  }),
  statusStr:attr({
    get:(val)=>{
       return DictUtils.getDictLabelByValue("resumestage",val)
    }
  }),
  currentAddress:attr(),
  interviewTime:attr({
    get:(val)=>{
      return moment(val).format("YYYY-MM-DD HH:mm")
    }
  }),
  expectedAddress:attr(),
  channel:attr({
    get:(val)=>{
      return DictUtils.getDictLabelByValue("channel",val)
    }
  }),
  expectedEntryTime:attr({
    get:(val)=>{
      return val ? moment(val).format("YYYY-MM-DD") : ""
    }
  }),
  channelIcon:attr({
    fieldName:'channel',
    get:(val)=>{
      return `icon-channel${val}`
    }
  }),
  originalWay:attr({
    get:(val)=>DictUtils.getDictLabelByValue("sourcemethod",val)
  }),
  offerStatus:attr({
    get:(val)=>{
      return DictUtils.getDictLabelByValue("offersendstatus",val)
    }
  }),
  offerSendTime:attr(),
  interviewer:attr(),
  dept:attr()
})

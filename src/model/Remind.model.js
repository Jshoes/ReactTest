// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import {attr} from './Attr'

export default class Remind extends BaseModel {

  constructor(opts) {
      super(opts)
  }

  static fields={}
  static modelName = 'Remind'
}

Object.assign(Remind.fields,BaseModel.fields,{
  msg_1001:attr(),
  msg_1002:attr(),
  msg_1003:attr(),
  msg_1004:attr(),
  msg_1005:attr(),
  msg_1006:attr(),
  msg_1007:attr(),
  msg_1008:attr(),
  msg_1009:attr(),
  msg_1010:attr(),
  msg_1011:attr(),
  msg_1012:attr(),
  msg_1013:attr(),
  msg_1014:attr(),
  msg_1015:attr(),
  msg_1016:attr(),
  msg_1017:attr(),
  msg_1018:attr(),
  msg_1019:attr(),
  msg_1020:attr(),
  msg_1021:attr(),
  msg_1022:attr(),
  msg_1023:attr(),
  msg_1024:attr(),
  msg_1025:attr(),
  msg_1026:attr(),
  msg_1027:attr(),
  msg_1028:attr(),
  msg_1029:attr(),
})

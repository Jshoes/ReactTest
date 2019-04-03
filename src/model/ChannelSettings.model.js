// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import {attr} from './Attr'

export default class ChannelSettings  extends BaseModel {

  constructor(opts) {
      super(opts)
  }

  static fields={}
  static modelName = 'ChannelSettings'
}

Object.assign(ChannelSettings.fields,BaseModel.fields,{
  channel_1000:attr(),
  channel_1001:attr()
})

// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import {attr} from './Attr'

export default class Tag extends BaseModel {

  constructor(opts) {
      super(opts)
  }

  static fields={}
  static options = {
    idAttribute: 'optionId',
  }
  static modelName = 'Tag'
}

Object.assign(Tag.fields,BaseModel.fields,{
  optionId:attr(),
  optionName:attr()
})

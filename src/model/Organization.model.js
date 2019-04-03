// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import moment from 'moment'
import {Model} from 'redux-orm'
import BaseModel from './BaseModel'
import {attr} from './Attr'

class Organization extends BaseModel {
  constructor(opts) {
      super(opts)
  }
  static fields={}
  static modelName='Organization'
  toString() {
      return "Organization Module:"+JSON.stringify(this._fields)
  }
}

Object.assign(Organization.fields,BaseModel.fields,{
  id:attr(),
  text:attr(),
})

export default Organization

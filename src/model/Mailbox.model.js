// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import moment from 'moment'
import {Model} from 'redux-orm'
import BaseModel from './BaseModel'
import {attr} from './Attr'

class Mailbox extends BaseModel {
  constructor(opts) {
      super(opts)
  }
  static fields={}
  static modelName='Mailbox'
  toString() {
      return "Mailbox Module:"+JSON.stringify(this._fields)
  }
}

 Object.assign(Mailbox.fields,BaseModel.fields,{
    email:attr(),
    password:attr(),
    host:attr(),
    emailType:attr(),
 })

export default Mailbox

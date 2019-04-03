// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import moment from 'moment'
import {Model} from 'redux-orm'
import BaseModel from './BaseModel'
import {attr} from './Attr'

class Template extends BaseModel {
  constructor(opts) {
      super(opts)
  }
  static fields={}
  static modelName='Template'
  toString() {
      return "Template Module:"+JSON.stringify(this._fields)
  }
}

 Object.assign(Template.fields,BaseModel.fields,{
    id:attr(),
    name:attr(),
    content:attr(),
    templateUse:attr(),
    smsType:attr(),
 })

export default Template

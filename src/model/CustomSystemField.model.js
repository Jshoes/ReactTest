// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import moment from 'moment'
import {Model} from 'redux-orm'
import BaseModel from './BaseModel'
import {attr} from './Attr'

class CustomSystemField extends BaseModel {
  constructor(opts) {
      super(opts)
  }
  static modelName='CustomSystemField'
  static fields={}
  static options = {
    idAttribute: 'fieldId',
  }
  toString() {
      return "CustomSystemField Module:"+JSON.stringify(this._fields)
  }
}

 Object.assign(CustomSystemField.fields,BaseModel.fields,{
    fieldId:attr(),
    fieldCode:attr(),
    fieldName:attr(),
    sort:attr(),
    dataType:attr(),
    isRequired:attr(),
    enable:attr(),
    options:attr(),
 })

export default CustomSystemField

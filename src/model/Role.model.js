// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import {attr} from './Attr'

export default class Role extends BaseModel {

  constructor(opts) {
      super(opts)
  }

  static fields={}
  static modelName = 'Role'
}
Role.options = {
	idAttribute: 'roleId',
}
Object.assign(Role.fields,BaseModel.fields,{
	roleId:attr(),
	roleName:attr(),
})

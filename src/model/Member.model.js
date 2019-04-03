// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import {attr} from './Attr'

export default class Member extends BaseModel {

  constructor(opts) {
      super(opts)
  }

  static fields={}
  static modelName = 'Member'
}

Object.assign(Member.fields,BaseModel.fields,{
	id:attr(),
	name:attr(),
	birth:attr(),
	workyears:attr(),
	age:attr(),
	status:attr(),
	identityCard:attr(),
	joinTime:attr(),
	degreeArr:attr(),
	department:attr(),
	mobilephone:attr(),
	major:attr(),
})

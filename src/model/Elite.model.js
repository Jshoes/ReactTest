// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import Resume from './Resume.model'
import moment from 'moment'
import {attr} from './Attr'

export default class Elite extends Resume {

  constructor(opts) {
      super(opts)
  }

  static fields={}
  static modelName = 'Elite'
}

Object.assign(Elite.fields,Resume.fields,{
	id:attr(),
	age:attr(),
	filingAccName:attr(),
	filingReasonName:attr(),
	jobTitle:attr(),
	lastInputTime:attr(),
})

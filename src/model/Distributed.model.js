// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import DictUtils from 'app/utils/DictUtils'
import { attr } from './Attr'

export default class Distributed extends BaseModel {

	constructor(opts) {
		super(opts)
	}

	static fields = {}

	static modelName = 'Distributed'
}



Object.assign(Distributed.fields, BaseModel.fields, {

	id:attr(),
	resumeNum: attr(),
	jobTitleEmail: attr({
		get:(val)=>{
			return val ? val : "其他"
		}
	}),
	currentAddress: attr(),
	channel: attr({
		get:(val)=>{
			return DictUtils.getDictLabelByValue("channel",val)
		}
	}),
	originalEmail: attr(),
	deliveryTime: attr(),
})

// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import { attr } from './Attr'

export default class SystemOption extends BaseModel {

	constructor(opts) {
		super(opts)
	}

	static fields = {}

	static modelName = 'SystemOption'
}

SystemOption.options = {
	idAttribute: 'optionId',
}

Object.assign(SystemOption.fields, BaseModel.fields, {

	optionId:attr(),
	optionCode: attr(),
	optionName: attr(),
	sort: attr(),
	optionValue: attr(),
	isSystem: attr(),
})

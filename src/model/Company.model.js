// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import { attr } from './Attr'

export default class Company extends BaseModel {

	constructor(opts) {
		super(opts)
	}

	static fields = {}
	static modelName = 'Company'
}

Object.assign(Company.fields, BaseModel.fields, {
	company: attr(),
	companyArea: attr(),
	province: attr(),
	city: attr(),
	county: attr(),
	address: attr(),
	longitude: attr(),
	latitude: attr(),
	isLocation: attr(),
	longLaStr: attr()
})

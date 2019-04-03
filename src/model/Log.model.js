// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import { attr } from './Attr'

export default class Log extends BaseModel {

	constructor(opts) {
		super(opts)
	}

	static fields = {}
	static modelName = 'Log'
}
Log.options = {
	idAttribute: 'messageId',
}
Object.assign(Log.fields, BaseModel.fields, {
	messageId: attr(),
	msgType: attr(),
	updateDate: attr(),
	sendDate: attr(),
	sendFrom: attr(),
	sendTo: attr(),
	messageContent: attr(),
	msgCenterContent: attr(),
	content: attr(),
})

// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import { attr } from './Attr'

export default class Channel extends BaseModel {

	constructor(opts) {
		super(opts)
	}

	static fields = {}

	static modelName = 'Channel'
}



Object.assign(Channel.fields, BaseModel.fields, {

	id:attr(),
	isJobImport: attr(),
	isJobRefresh: attr(),
	isMailResumeImport: attr(),
	isPlug: attr(),
	isResumeDownload: attr(),
	isResumeRecommend: attr(),
})

// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import {attr} from './Attr'

export default class Job extends BaseModel {

  constructor(opts) {
      super(opts)
  }

  static fields={}
  static modelName = 'Job'
  // getCandidatesTotal(){
  //   // return ( Number(deliveryRms) + Number(comendRms) + Number(pluginRms) )
  // }

}
Job.options = {
	idAttribute: 'jobId',
}
Object.assign(Job.fields,BaseModel.fields,{
  jobId:attr(),
  jobTitle:attr(),
  jobCode:attr(),
  address:attr(),
  hrName:attr(),
  channelList:attr({
    // get:(val)=> val.map((it)=>it.channel).join(",")
  }),
  totalNum:attr(),
  channelListIcon:attr({
    fieldName:"channelList",
    get:(val)=> val==""?[]:val.map((it)=>`icon-channel${it.channel}`)
  }),
  hiringNumber:attr(),
  yrzNum:attr(),
  pendingPost:attr(),
  deliveryRms:attr(),
  comendRms:attr(),
  pluginRms:attr()
})

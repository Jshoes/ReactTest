// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import BaseModel from './BaseModel'
import moment from 'moment'
import {attr} from './Attr'

export default class Notication extends BaseModel {

  constructor(opts) {
      super(opts)
  }

  static fields={}
  static modelName = 'Notication'
  // getCandidatesTotal(){
  //   // return ( Number(deliveryRms) + Number(comendRms) + Number(pluginRms) )
  // }

}
Notication.options = {
	idAttribute: 'jobId',
}
Object.assign(Notication.fields,BaseModel.fields,{
  jobId:attr(),
  jobTitle:attr(),
  jobCode:attr(),
  address:attr(),
  hrName:attr(),
  channelList:attr({
    // get:(val)=> val.map((it)=>it.channel).join(",")
  }),
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

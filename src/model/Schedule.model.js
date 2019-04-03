// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

import moment from 'moment'
import {Model} from 'redux-orm'
import BaseModel from './BaseModel'
import {attr} from './Attr'

class Schedule extends BaseModel {
  constructor(opts) {
      super(opts)
  }
  static modelName='Schedule'
  static fields={}
  getScheduleStr(){
    if(this._fields['scheduleEndTime']){
      return [new moment(this._fields['scheduleStartTime']).format('HH:mm'),new moment(this._fields['scheduleEndTime']).format('HH:mm')].join("-")
    }else{
      return [new moment(this._fields['scheduleStartTime']).format('HH:mm')].join("-")
    }
  }
  toString() {
      return "Schedule Module:"+JSON.stringify(this._fields)
  }
}

  // console.log(Schedule.fields)
  Object.assign(Schedule.fields,BaseModel.fields,{
		id: attr(),
    title:attr(),
    content:attr(),
    orgId:attr(),
    scheduleStartTime:attr({
      get:(val)=>{
        return val!=undefined?new moment(val):null
      },
    }),
    scheduleEndTime:attr({
      get:(val)=>{
        return (val!=undefined && val!="")?new moment(val):null
        // return  moment(val)
      }
    }),
    remindType:attr(),
    remindSms:attr(),
    status:attr(),
    inputAcc:attr(),
    inputTime:attr(),
    updateTime:attr(),
    isDel:attr(),
  })

export default Schedule

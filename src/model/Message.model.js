// id,orgId,title,content,scheduleStartTime,scheduleEndTime,
// remindType,remindSms,status,inputAcc,inputTime,updateTime,isDel

// import {Model} from 'redux-orm'
import moment from 'moment'
import BaseModel from './BaseModel'
import {attr} from './Attr'


export default class Message extends BaseModel {

  constructor(opts) {
      super(opts)
  }

  // static options={
  //   idAttribute:'messageId'
  // }
  static fields={}
  static modelName = 'Message'


  getNameStr(){
    return this._fields['name']
  }
}

Object.assign(Message.fields,BaseModel.fields,{
  id:attr(),
  messageId: attr(),
  title:attr(),
  messageContent:attr('messageContent'),
  sendDate:attr(),
})

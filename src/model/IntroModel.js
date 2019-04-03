import moment from 'moment'
import BaseModel from './BaseModel'
import {attr} from './Attr'
import DictUtils from 'app/utils/DictUtils'

export default class Intro extends BaseModel {
  constructor(opts) {
      super(opts)
  }
  static modelName='Intro'
  static fields={}
}
Object.assign(Intro.fields,BaseModel.fields,{
  education:attr({
    fieldName:"degree",
    get:(val)=>{
      return DictUtils.getDictLabelByValue("education",val)
    }
  }),
  ageStr:attr({
    fieldName:"age",
    get:(val)=>{
      return val + "岁"
    },
  }),
  sexStr:attr({
    fieldName:"sex",
    get:(val)=>{
      return DictUtils.getDictLabelByValue("sex",val)
    }
  }),
  workYear:attr({
    get:(val)=>{

      return val ? val + "年工作经验" : ''
    }
  }),
})

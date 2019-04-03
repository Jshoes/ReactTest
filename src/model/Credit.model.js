


import Elite from './Elite.model'
import moment from 'moment'
import {attr} from './Attr'

export default class Credit extends Elite {

  constructor(opts) {
      super(opts)
  }

  static fields={}
  static modelName = 'Credit'
}

Object.assign(Credit.fields,Elite.fields,{
})

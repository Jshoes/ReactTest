import {fk, many, Model,Attribute} from 'redux-orm'
import {attr} from './Attr'

export default class Book extends Model {

  constructor(opts) {
      super(opts)
  }
  static modelName = 'Book'
  static get fields() {
      return {
          id: attr(),
          name:attr({ get: (val,data) =>{ return val+"abcname"}}),
      };
  }
  getNameStr(){
    return this._fields['name']+"abcname"
  }
  toString() {
      return JSON.stringify(this._fields)
  }
    // Declare any static or instance methods you need.
}

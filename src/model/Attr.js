import {Attribute} from 'redux-orm'

export default class Attr extends Attribute{
  constructor(opts) {
      super(opts)

      if(opts && typeof(opts)=='string'){
        this.fieldName=opts
      }

      if (this.opts.hasOwnProperty('fieldName')) {
          this.fieldName = this.opts.fieldName;
      }
      if (this.opts.hasOwnProperty('get')) {
           this.getMethod = this.opts.get;
      }
      if (this.opts.hasOwnProperty('set')) {
           this.setMethod = this.opts.set;
      }
  }

  createForwardsDescriptor(fieldName,model) {
      const getMethod=this.getMethod
      const setMethod=this.setMethod
      const mapperFieldName=this.fieldName
      // const fieldName=this.fieldName

      /*
      console.log(model.prototype,fieldName)
      Object.defineProperty(
          model.prototype,
          fieldName,
          {
              get() {
                  console.log(getMethod,this._fields[fieldName])
                  return getMethod ? getMethod.call(this,this._fields[this.fieldName || fieldName],this._fields):this._fields[this.fieldsName || fieldName]
              },
              set(value) {
                  return setMethod ? setMethod.call(this,this.set(this.fieldName || fieldName, value)): this.set(this.fieldName || fieldName, value)
              },
              enumerable: true,
              configurable: true,
          }
      )
      */
      return {

          get() {
              // console.log(this.fieldName)
              return getMethod ? getMethod.call(this,this._fields[mapperFieldName || fieldName],this._fields):this._fields[mapperFieldName || fieldName]
          },
          set(value) {
              return setMethod ? setMethod.call(this,this.set(this.fieldName || fieldName, value)): this.set(this.fieldName || fieldName, value)
          },
          enumerable: true,
          configurable: true,
      }
  }
}

function attr(opt){
  return new Attr(opt)
}

export {attr}

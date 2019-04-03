import {Model} from 'redux-orm'
import {attr} from './Attr'
import PropTypes from 'prop-types'
// import propTypesMixin from 'redux-orm-proptypes'

// const ValidatingModel = propTypesMixin(Model)

export default class BaseModel extends Model {
  constructor(opts) {
      super(opts)
  }
  toJSON(){
    return this._fields
  }
}
BaseModel.reducer=function(action, modelClass, session) {
    const modelName=modelClass.modelName.toUpperCase()
     switch (action.type) {
     case `CREATE_${modelName}`:
        modelClass.create(action.payload);
        break;
     case `STORE_${modelName}`:
        modelClass.all().toModelArray().forEach((model)=>model.delete())
        action.payload.list.map((m)=>modelClass.create(m))
        // console.dir(modelClass)
        break;
     case `UPDATE_${modelName}`:
        modelClass.withId(action.payload.id).update(action.payload);
        break;
     case `UPSERT_${modelName}`:
        modelClass.upsert(action.payload);
        break;
     case `REMOVE_${modelName}`:
        const model = modelClass.withId(action.payload);
        model.delete();
        break;
     }
     // Return value is ignored.
     return session.state;
 }
BaseModel.modelName='BaseModel'
BaseModel.fields={
  id: attr(),
}

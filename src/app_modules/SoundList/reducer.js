/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-03-13T13:09:43+08:00
*/
// import {newList,newItem,saveList,saveItem,fetchRequest,fetchSuccess,fetchFailure,saveParams} from 'app-utils/reducerUtils'
import {handleActions} from 'redux-actions'
import {saveList,saveParams} from './action'

export const initialState = {
	params:{
  },
  page:{},
  spins:{
    tableSpin:false,
    formSpin:false
  }
}

const actions = {}

actions[saveList]= (state,action)=>{
  let {list,item,page,pageSize,totalRecord}=action.payload
  return {
    ...state,
    page:{
      current:page,
      pageSize:pageSize,
      total:totalRecord
    }
  }
}

actions[saveParams] = (state, action) => {
  return Object.assign({},state,{params:action.payload})
}
const reducer = handleActions(actions, initialState)
export default reducer

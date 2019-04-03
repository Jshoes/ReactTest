/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-03-13T11:51:14+08:00
*/


import {saveParams,saveListCount,saveCounts,saveDates,saveFeedStage,saveFeedBack,saveList} from './action'
import CONSTANTS from './action'

import {handleActions} from 'redux-actions'

// TODO: 调整本地数据结构
let initialState = {
  params:{
    // query params
  },
  page: {
    current: 1,
    pageSize: 10,
    total:0
  },
  spins:{
    tableSpin:false
  },

  listCount:new Array,
	list: new Map(),
  // for Item detail
  item: new Object(),
  todos:new Map(),
  counts:new Object(),
  dates:new Array(),
  msg: new Object(),
  status: new Map(),
  feedStage:new Object(),
  feedBack:new Array(),
  key: 'id'
}
//
// function saveTodos(state,payload){
//     state.todos.clear()
//     payload.list.forEach((it)=>state.todos.set(it['planId'],it))
//     return state
// }
// function saveCounts(state,payload){
//     state.counts = payload
//     return state
// }
// function fetchDates(state,payload){
//   if(payload.status){
//       state.dates = payload.data
//   }
//   return state
// }
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

actions[saveParams] = ( state , action)=>{
  return {
    ...state,
    params:Object.assign({},state.params,action.payload)
  }
}

actions[saveListCount] = ( state , action )=>{
  return {
    ...state,
    listCount:action.payload
  }
}

actions[saveCounts] = ( state , action )=>{
  return {
    ...state,
    counts:action.payload.count
  }
}

actions[saveDates] = ( state , action )=>{
  return {
    ...state,
    dates:action.payload
  }
}

actions[saveFeedStage] = ( state , action )=>{
  return {
    ...state,
    feedStage:action.payload
  }
}

actions[saveFeedBack] = ( state , action )=>{
  return {
    ...state,
    feedBack:action.payload
  }
}

const reducer = handleActions(actions, initialState)

export {initialState,CONSTANTS}

export default reducer;

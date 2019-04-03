/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-03-13T11:36:53+08:00
*/



import {fetchRequest,fetchSuccess,fetchFailure} from 'app-utils/reducerUtils'
import CONSTANTS,{saveCompanySearchList,toggleLoc,togglePub,saveJobCount,saveRules,saveList,saveParams} from './action'
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
    tableSpin:false,
    formSpin:false,
    buttonSpin:false
  },
  list: new Map(),
  // for Item detail
  item: new Object(),
  msg: new Object(),
  status: new Map(),
  key: 'jobId',
  listData:new Object(),
  companys:[],
  count:0,
  rules:new Array(),
  loc_list:new Array(),
  pub_list:new Array()
}



// function toggleDecs(state,payload){
//   state.listData.pub_list[payload].isShow = !state.listData.pub_list[payload].isShow
//   return state
// }
// function toggleLoc(state,payload){
//   state.listData.loc_list[payload].isShow = !state.listData.loc_list[payload].isShow
// }



function companySearchResult(state,payload){
  state.listData = payload
  return state
}

function saveCompany(state,payload){
  state.companys = payload
  return state
}

function fetchButtonSpin(state,payload){
  state.spins[payload.name] = payload.loading
  return state
}

function clearItem(state,payload){
  return Object.assign({},state,{
    item:{}
  })
}


function reduce(state = initialState, {type, payload}) {
  switch (type) {
    // case CONSTANTS.SAVE_LIST:
    //   return saveList(state, payload)
    // case CONSTANTS.NEW_ITEM:
    //   return newItem(state, payload)
    // case CONSTANTS.SAVE_ITEM:
    //   return saveItem(state, payload)
    // case CONSTANTS.SAVE_PARAMS:
    //   return saveParams(state,payload)
    case CONSTANTS.FETCH_REQUEST:
      return fetchRequest(state, payload)
    case CONSTANTS.FETCH_SUCCESS:
      return fetchSuccess(state, payload)
    case CONSTANTS.FETCH_FAILURE:
      return fetchFailure(state, payload)
    // case CONSTANTS.TOGGLE_DEC:
    //   return toggleDecs(state,payload)
    // case CONSTANTS.TOGGLE_LOC:
    //   return toggleLoc(state,payload)
    // case CONSTANTS.COMPANY_SEARCH:
    //   return companySearchResult(state,payload)
    // case CONSTANTS.SAVE_COMPANY:
    //   return saveCompany(state,payload)
    // case CONSTANTS.BUTTON_SPIN:
    //   return fetchButtonSpin(state,payload)
    // case CONSTANTS.CLEAR_ITEM:
    //   return clearItem(state,payload)
    default:
      return state;
  }
}

const actions = {}

/**
  *  page
  *
  */
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
 actions[saveParams]= (state,action)=>{
  return {
    ...state,
    params:Object.assign({},state.params,action.payload)
  }
}


actions[saveCompanySearchList] = (state,action)=>{
  return {
    ...state,
    loc_list:action.payload.loc_list,
    pub_list:action.payload.pub_list
  }
}
actions[togglePub] = (state,action)=>{
  state.pub_list[action.payload].isShow = !state.pub_list[action.payload].isShow
  return {
    ...state
  }
}
actions[toggleLoc] = (state,action)=>{
  state.loc_list[action.payload].isShow = !state.loc_list[action.payload].isShow
  return {
    ...state
  }
}

actions[saveJobCount] = (state,action)=>{
  return {
    ...state,
    count:action.payload.count
  }
}

actions[saveRules] = (state,action)=>{
  return {
    ...state,
    rules:action.payload
  }
}

const reducer = handleActions(actions, initialState)

export { initialState, CONSTANTS }

export default reducer;

/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-03-13T13:05:33+08:00
*/



import {newList,saveItem,fetchRequest,fetchSuccess,fetchFailure,} from 'app-utils/reducerUtils'
import CONSTANTS,{saveTalentCount,saveLibType,saveSearchType,saveParams,saveList} from './action'
import {handleActions} from 'redux-actions'

// TODO: 调整本地数据结构
let initialState = {
  params:{
		// query params
		libType:3
  },
  page: {
    current: 1,
    pageSize: 10,
    total:0
  },
  spins:{
    tableSpin:false
  },
  list: new Map(),
  // for Item detail
  item: {
    info: new Object(),
    jobs:new Array(),
    languages:new Array(),
    credentials:new Array(),
    projects:new Array(),
      follows:new Array(),
    trainings:new Array(),
    educations:new Array(),
  },
  msg: new Object(),
  status: new Map(),
  talentInfo:new Object(),
  tagList:new Array(),
	key: 'talentId',
	/**new */
	talentCount:new Object(),
}

function saveTagList(state,payload) {
    state.tagList = payload.list
    return state
}

function newItem(state,payload){
    state.item = payload
    return state
}

function saveBasic(state,payload) {
    Object.assign(state.item.info,payload)
    console.log(state,payload)
    return state
}
function saveItemTag(state,payload) {
    state.item.info["labelCode"] = payload.labelCode
    state.item.info["labelName"] = payload.labelName
        return state
}
function saveFollow(state,payload) {
    let flag = true
    state.item.follows.map((it,idx)=>{
        if(it.id == payload.id){
            Object.assign(it,payload)
            flag = false
        }
    })
    if(flag){state.item.follows.push(payload)}
    return state
}
function saveBasicOther(state,payload) {
    Object.assign(state.item.info,payload)
    /*三项特殊处理 期望薪资  行业 工作类型*/
    if(payload.expectedSalary){
        state.item.info.expectedSalaryLower = payload.expectedSalary[0]
        state.item.info.expectedSalaryUpper = payload.expectedSalary[1]
    }
    if(payload.jobNatureArr){
        state.item.jobNatureArr = payload.jobNatureArr
    }
    if(payload.tradeArr){
        state.item.tradeArr = payload.tradeArr
    }
    return state
}

function saveWork(state,payload){
  let flag = true
  state.item.jobs.map((it,idx)=>{
    if(it.id == payload.id){
        Object.assign(it,payload)
        flag = false
    }
  })
    if(flag){state.item.jobs.push(payload)}
    return state
}
function savePro(state,payload){
    let flag = true
    state.item.projects.map((it,idx)=>{
        if(it.id == payload.id){
            Object.assign(it,payload)
            flag = false
        }
    })
    if(flag){state.item.projects.push(payload)}
    return state
}
function saveEdu(state,payload) {
    let flag = true
    state.item.educations.map((it,idx)=>{
        if(it.id == payload.id){
            Object.assign(it,payload)
            flag = false
        }
    })
    if(flag){state.item.educations.push(payload)}
    return state
}

function saveSkill(state,payload) {
    let flag = true
    state.item.languages.map((it,idx)=>{
        if(it.id == payload.id){
            Object.assign(it,payload)
            flag = false
        }
    })
    if(flag){state.item.languages.push(payload)}
    return state
}

function saveCert(state,payload) {
    let flag = true
    state.item.credentials.map((it,idx)=>{
        if(it.id == payload.id){
            Object.assign(it,payload)
            flag = false
        }
    })
    if(flag){state.item.credentials.push(payload)}
    return state
}

function saveTrain(state,payload) {
    let flag = true
    state.item.trainings.map((it,idx)=>{
        if(it.id == payload.id){
            Object.assign(it,payload)
            flag = false
        }
    })
    if(flag){state.item.trainings.push(payload)}
    return state
}


const actions = {}

actions[saveTalentCount] = (state, action) => {
  return {
		...state,
		talentCount:action.payload
	}
}

actions[saveParams] = (state, action) => {
  return {
		...state,
		params:{
			...state.params,
			...action.payload
		}
	}
}

actions[saveList]= (state,action)=>{
  let {list,item,page,pageSize,totalRecord}=action.payload
  return {
    ...state,
    page:{
      current:page,
      pageSize,
      total:totalRecord
    }
  }
}

let changeFetchStatus=(state, action) => {
  let {spins} = state;
    spins[action.payload.label]=action.payload.spin
  return Object.assign({},state,{
    // status: state.status.set(payload.label,payload.code),
    spins:spins
  })
}

actions[CONSTANTS.FETCH_REQUEST] = changeFetchStatus
actions[CONSTANTS.FETCH_SUCCESS] = changeFetchStatus
actions[CONSTANTS.FETCH_FAILURE] = changeFetchStatus
const reducer = handleActions(actions, initialState)


// function reducer(state = initialState, {type, payload}) {
//   switch (type) {
//     case CONSTANTS.SAVE_LIST:
//       return saveList(state, payload)
//   case CONSTANTS.SAVE_TAGLIST:
//       return saveTagList(state, payload)
//   case CONSTANTS.SAVE_ITEM_TAGS:
//       return saveItemTag(state, payload)
//     case CONSTANTS.SAVE_PARAMS:
//       return saveParams(state, payload)
//      case CONSTANTS.NEW_ITEM:
//        return newItem(state, payload)
//      case CONSTANTS.GET_ITEM:
//        return getItem(state, payload)
//      case CONSTANTS.SAVE_ITEM:
//        return saveItem(state, payload)
//     case CONSTANTS.FETCH_REQUEST:
//       return fetchRequest(state, payload)
//     case CONSTANTS.FETCH_SUCCESS:
//       return fetchSuccess(state, payload)
//     case CONSTANTS.FETCH_FAILURE:
//       return fetchFailure(state, payload)
//     case CONSTANTS.SAVE_ITEM_BASIC:
//       return saveBasic(state,payload)
//     case CONSTANTS.SAVE_ITEM_FOLLOW:
//       return saveFollow(state,payload)
//     case CONSTANTS.SAVE_ITEM_BASICOTHER:
//           return saveBasicOther(state,payload)
//     case CONSTANTS.SAVE_ITEM_WORK:
//         return saveWork(state,payload)
//     case CONSTANTS.SAVE_ITEM_PRO:
//         return savePro(state,payload)
//     case CONSTANTS.SAVE_ITEM_EDU:
//         return saveEdu(state,payload)
//     case CONSTANTS.SAVE_ITEM_SKILL:
//         return saveSkill(state,payload)
//     case CONSTANTS.SAVE_ITEM_CERT:
//         return saveCert(state,payload)
//     case CONSTANTS.SAVE_ITEM_TRAIN:
//         return saveTrain(state,payload)
//     default:
//       return state;
//   }
// }

export {initialState,CONSTANTS}

export default reducer;

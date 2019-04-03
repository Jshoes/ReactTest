/**

* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-03-13T13:07:46+08:00
*/



import {newList,newItem,saveList,saveItem,removeItem,fetchRequest,fetchSuccess,fetchFailure,saveParams} from 'app-utils/reducerUtils'
import CONSTANTS,{memberItemSave,saveBaseInfo,saveFeedData,memberListSave} from './action'
import {handleActions} from 'redux-actions'
// TODO: 调整本地数据结构
let initialState = {
  params:{
    // query params
  },
  page: {
    current: 1,
    pageSize: 20,
    total:0
  },
  spins:{
    tableSpin:false,
    formSpin:false
  },
  list: new Map(),
  sysFieldList: new Array(),
  importResultList: new Array(),
  searchParams: new Object(),
  item: new Object(),
  msg: new Object(),
  status: new Map(),
	key: 'id',
	feedInfo:new Object(),
  baseInfo:{
    resumeInfo:{},
    objectives:{},
    jobs:[],

    projects:[],
    educations:[],
    trainings:[],
    credentials:[],
    languages:[]
  },
  information:{
    links:[],
    files:[]
  }
}

function saveSysFieldList(state,payload){
    var sortArray=payload.filter(it=>it.enable==1)
    sortArray=sortArray.sort((a,b)=>{return a.sort - b.sort})
    return Object.assign({},state,{
      sysFieldList:sortArray
    })
}

function saveImportResultList(state,payload){
    return Object.assign({},state,{
      importResultList:payload
    })
}

function saveSearchParams(state,payload) {
  return Object.assign({},state,{
    searchParams:payload
  })
}

// function reducer(state = initialState, {type, payload}) {
//   switch (type) {
//     case CONSTANTS.NEW_ITEM:
//       return newItem(state, payload)
//     case CONSTANTS.SAVE_LIST:
//       return saveList(state, payload)
//     case CONSTANTS.SAVE_SYS_FIELD_LIST:
//       return saveSysFieldList(state, payload)
//     case CONSTANTS.SAVE_IMPORT_RESULT_LIST:
//       return saveImportResultList(state, payload)
//     case CONSTANTS.SAVE_PARAMS:
//       return saveParams(state, payload)
//     case CONSTANTS.SAVE_ITEM:
//       return saveItem(state, payload)
//     case CONSTANTS.REMOVE_ITEM:
//       return removeItem(state, payload)
//     case CONSTANTS.FETCH_REQUEST:
//       return fetchRequest(state, payload)
//     case CONSTANTS.FETCH_SUCCESS:
//       return fetchSuccess(state, payload)
//     case CONSTANTS.FETCH_FAILURE:
//       return fetchFailure(state, payload)
//     default:
//       return state;
//   }
// }

let actions = {}


actions[CONSTANTS.SAVE_PARAMS]=(state, action)=>{
	return Object.assign({},state,{
		params:action.payload.params
	})
}
actions[memberListSave]= (state,action)=>{
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
actions[CONSTANTS.SAVE_SYS_FIELD_LIST]=(state, action)=>{
	var sortArray=action.payload.filter(it=>it.enable==1)
	sortArray=sortArray.sort((a,b)=>{return a.sort - b.sort})
	return Object.assign({},state,{
		sysFieldList:sortArray
	})
}

actions[CONSTANTS.SAVE_IMPORT_RESULT_LIST]=(state, action)=>{
	return Object.assign({},state,{
		importResultList:action.payload
	})
}

actions[saveBaseInfo] = ( state,action ) =>{
	return {
		...state,
		baseInfo:action.payload
	}
}

actions[saveFeedData] = ( state,action ) =>{
	return {
		...state,
		feedInfo:action.payload
	}
}


actions[memberItemSave]=(state, action)=>{
	return Object.assign({},state,{
		item:action.payload
	})
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

export {initialState,CONSTANTS}

export default reducer;

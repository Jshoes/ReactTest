/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-17T17:42:28+08:00
*/


import {newList,newItem,saveList,saveItem,saveParams,fetchRequest,fetchSuccess,fetchFailure} from 'app-utils/reducerUtils'
import groupArray from 'group-array'
import CONSTANTS from './action'

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
    formSpin:false
  },
  list: new Map(),
  reportResumeList: new Map(),
  reportCallrecordList: new Map(),
  item: new Object(),
  msg: new Object(),
  status: new Map(),
  remind:new Object(),
  key: 'id',
  // recruitmentStatusList:new Map()
	recruitmentStatusList:new Array(),
	reasonReport:{
		offer:{},
		talent:{},
		total:{
			offer:0,
			talent:0
		}
	}
}

// function saveRemind(state,payload){
//     return Object.assign({},state,{
//       remind:payload.item
//     })
// }
function groupData(list){
  let dateListObj = groupArray(list,'inputDate')
  let newArray=[]
  for(var it in dateListObj){
    let tempItem = {
      id:new Date().getTime()+Math.random(1,100),
      hrAcc:"全部",
      callNum:0,
      inputDate:"",
      calloutNum:0,
      emailNum:0,
      smsNum:0,
      timeLength:0
    }
    dateListObj[it].forEach((it)=>{
      tempItem.inputDate = it.inputDate
      tempItem.callNum=tempItem.callNum+it.callNum
      tempItem.calloutNum=tempItem.calloutNum+it.calloutNum
      tempItem.emailNum=tempItem.emailNum+it.emailNum
      tempItem.smsNum=tempItem.smsNum+it.smsNum
      tempItem.timeLength=tempItem.timeLength+it.timeLength
    })
    tempItem.children = dateListObj[it]
    newArray.push(tempItem)
  }
  return newArray
}
//
function saveRecruitmentStatusList(state,payload){
  // state.recruitmentStatusList.clear()

	// payload.list.forEach((it)=>state.recruitmentStatusList.set(it['jobId'],it))
	state.recruitmentStatusList = payload.list
	let {intPosition,page,pageSize,totalPage,totalRecord} = payload
	state.page = {
		current:page,
		pageSize,
		total:totalRecord
	}
  return state
}
function saveReasonReport(state,payload){
	state.reasonReport = payload.reasonReport
  return state
}

function saveReportResumeList(state,payload){
  state.reportResumeList.clear()

  payload.list.forEach((it)=>state.reportResumeList.set(it['jobId'],it))
  return state
}
function saveReportCallrecordList(state,payload){
  state.reportCallrecordList.clear()

  groupData(payload.list).forEach((it)=>state.reportCallrecordList.set(it['id'],it))
  return state
}

//TODO： 拆分reduce。update\get
function reduce(state = initialState, {type, payload}) {
  switch (type) {
    case CONSTANTS.SAVE_LIST:
      return saveList(state, payload)
    case CONSTANTS.SAVE_REPORT_RESUME_LIST:
      return saveReportResumeList(state, payload)
    case CONSTANTS.SAVE_REPORT_CALLRECORD_LIST:
      return saveReportCallrecordList(state, payload)
      //
    case CONSTANTS.SAVE_RECRUITMENT_STATUSLIST:
			return saveRecruitmentStatusList(state,payload)
		case CONSTANTS.SAVE_REASON_REPORT:
      return saveReasonReport(state,payload)
    // case CONSTANTS.NEW_ITEM:
    //   return newItem(state, payload)
    // case CONSTANTS.GET_ITEM:
    //   return getItem(state, payload)
    // case CONSTANTS.SAVE_REMIND:
    //   return saveRemind(state,payload)
    case CONSTANTS.SAVE_ITEM:
      return saveItem(state, payload)
    case CONSTANTS.SAVE_PARAMS:
      return saveParams(state,payload)
    case CONSTANTS.FETCH_REQUEST:
      return fetchRequest(state, payload)
    case CONSTANTS.FETCH_SUCCESS:
      return fetchSuccess(state, payload)
    case CONSTANTS.FETCH_FAILURE:
      return fetchFailure(state, payload)
    default:
      return state;
  }
}

//reducer







export {initialState,CONSTANTS}

export default reduce;

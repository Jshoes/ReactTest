
import {createAction} from 'redux-actions'
import createConstants,{dispatchHandler,createTypes,createActionRoute} from 'app/utils/CreateConstants'

import moment from 'moment'
import API from './api'


export const saveSchedule = createAction("UPSERT_SCHEDULE")
export const storeSchedule = createAction("STORE_SCHEDULE")
export const removeSchedule = createAction("REMOVE_SCHEDULE")
export const createSchedule = createAction("CREATE_SCHEDULE")

export const saveUnreadList = createAction("STORE_UNREAD")
export const saveHireData = createAction("STORE_HIREDATA")
export const saveRecentData = createAction("STORE_RECENTDATA")



const CONSTANTS = createConstants('dashboard', [
	'fetch_request',
	'fetch_success',
	'fetch_failure',
])
export default CONSTANTS
let {
	fetchFailure, fetchRequest, fetchSuccess
} = createTypes(CONSTANTS)
let  {backRoute,addRoute,editRoute} = createActionRoute()
export  {backRoute,addRoute,editRoute}

export function loadTodos(params) {
  return (dispatch, getState) => {
      // dispatch(fetchRequest('todoSpin'))
    return new API().fetchTodo(params).then(json => {
      // dispatch(saveParams(params))
      // dispatch(fetchSuccess('todoSpin'))
      dispatch(storeSchedule(json))
      // dispatch({type:'STORE_SCHEDULE',payload:json.list})
    }).catch(ex => {
      return dispatch(fetchFailure('todoSpin',ex))
    })
  }
}
export function unreadMsgListAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchUnreadMsgList().then(json => {
			dispatch(fetchSuccess('tableSpin'))
			// console.log('json.list',json.list)
			dispatch(saveUnreadList(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}
export function hireDataListAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchHireData().then(json => {
			dispatch(fetchSuccess('tableSpin'))
			// console.log('json.list',json.list)
			dispatch(saveHireData(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}
export function recentDataAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchRecentData(params).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			dispatch(saveRecentData(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}
export function saveAction(params){
  return (dispatch, getState) => {
    dispatch(fetchRequest('formSpin'))
    if(params.scheduleEndTime && params.scheduleEndTime!="" && params.scheduleEndTime!=undefined){
      params.scheduleEndTime = `${moment(params.chooseDate).format("YYYY-MM-DD")} ${moment(params.scheduleEndTime).format("HH:mm:ss")}`
    }
    params.scheduleStartTime = `${moment(params.chooseDate).format("YYYY-MM-DD")} ${moment(params.scheduleStartTime).format("HH:mm:ss")}`
    if(params.remindSms && params.remindSms==true){
      params.remindSms = 1
    }else{
      params.remindSms = 0
    }

    return new API().fetchSave(params).then(json => {
      dispatch(fetchSuccess('formSpin',true,"保存成功！"))
      //console.log(json.list)
      dispatch(saveSchedule(json))
      // dispatch(removeItem(json))
      dispatch(loadTodos({dateStr:moment(params.chooseDate).format("YYYY-MM-DD")}))
      // console.log(json)
    }).catch(ex => {
      return dispatch(fetchFailure('formSpin',ex))
    })
  }
}

export function deleteAction(params){
  return (dispatch, getState) => {
    dispatch(fetchRequest('formSpin'))
    return new API().fetchSave(params).then(json => {

      dispatch(fetchSuccess('formSpin',true,"删除成功！"))
      console.log(json,'jjjjjjjjjjj')
    //  dispatch(saveItem(json))
      dispatch(removeSchedule(json.id))
    //  console.log(json)
    }).catch(ex => {
      return dispatch(fetchFailure('formSpin',ex))
    })
  }
}

export function itemAction(value){
  return (dispatch, getState) => {
    // dispatch(fetchRequest('formSpin'))
    return new API().fetchItem({id:value}).then(json => {
      // dispatch(fetchSuccess('formSpin'))
      //console.log(json.list)
      // dispatch(saveItem(json))
      dispatch(saveSchedule(json))
    }).catch(ex => {
      return dispatch(fetchFailure('formSpin',ex))
    })
  }
}

export function jumpToDetailAction(id,item,name) {
    let path = {
      pathname:`/dashboard/${id}/detail`,
        state:{item:item,name:name}
    }
    return dispatch => dispatch(routerActions.push(path))
}

export function newItemAction(value){
  return (dispatch, getState) => {
    dispatch(createSchedule({}))
  }
}

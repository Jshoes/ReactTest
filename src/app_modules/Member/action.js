
import API from './api'
import {routerActions, push, replace} from 'react-router-redux'
import {createAction} from 'redux-actions'
import InterviewAPI from '../Interview/api'


import createConstants,{dispatchHandler,createTypes,createActionRoute} from 'app-utils/CreateConstants'

const CONSTANTS = createConstants('member', [
  'get_list',
  // 'save_item',
  'remove_item',
  'new_item',
  'sync_list',
  'save_list',
  'save_sys_field_list',
  'save_import_result_list',
  'save_search_params',
  'save_params',
  'fetch_request',
  'fetch_success',
  'fetch_failure',
])


export default CONSTANTS
//TODO: 调整命名及常量定义
let {
  getItem,listItem,saveItem,removeItem,newItem,fetchFailure,fetchRequest,fetchSuccess,saveParams
} = createTypes(CONSTANTS)


export const memberListSave = createAction("STORE_MEMBER")
export const memberSave = createAction("UPSERT_MEMBER")

export const memberItemSave = createAction("SAVE_MEMBERITEM")

export const saveFeedData = createAction("SAVE_FEEDDATA")
export const saveBaseInfo = createAction("SAVE_BASEINFO")

let {backRoute,addRoute,editRoute} = createActionRoute()
export  {backRoute,addRoute,editRoute}

export function exportRoute(id) {
  return dispatch => dispatch(routerActions.push(`/member/list/export`))
}

export function importRoute(id) {
  return dispatch => dispatch(routerActions.push(`/member/list/import`))
}

export function importResultRoute(id) {
  return dispatch => dispatch(routerActions.push(`/member/list/importResult`))
}

export function detailRoute(id) {
  return dispatch => dispatch(routerActions.push(`/member/list/detail/${id}`))
}
export function editMemberRoute(id) {
  return dispatch => dispatch(routerActions.push(`/member/list/detail/${id}/edit`))
}

function saveSysFieldList(list) {
  return {type: CONSTANTS.SAVE_SYS_FIELD_LIST,payload:list}
}

function saveImportResultList(list) {
  return {type: CONSTANTS.SAVE_IMPORT_RESULT_LIST,payload:list}
}

function saveSearchParams(value) {
  return {type: CONSTANTS.SAVE_SEARCH_PARAMS,payload:value}
}

export function listAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchList(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      //console.log(json.list)
      let {list,...page} = json
      dispatch(saveParams(value))
      dispatch(memberListSave(json))

    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}
export function personBaseAction(value){
  return (dispatch, getState) => {
		dispatch(fetchRequest('itemSpin'))
		return new API().fetchPersonBase(value).then(json => {
				dispatch(fetchSuccess('itemSpin'))
				dispatch(saveBaseInfo(json))
		}).catch(ex => {
				return dispatch(fetchFailure('itemSpin',ex))
		})
  }
}

export function getFeedDataAction(value) {
	return (dispatch, getState) => {
			dispatch(fetchRequest('formSpin'))
			return new InterviewAPI().fetchFeedData(value).then(json => {
					dispatch(fetchSuccess('formSpin'))
					dispatch(saveFeedData(json))
			}).catch(ex => {
					return dispatch(fetchFailure('formSpin',ex))
			})
	}
}

export function resumeDataAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchResumeData(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
			//console.log(json.list)
      dispatch(memberItemSave(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}
export function saveAction(value,page){
  return (dispatch, getState) => {
    dispatch(fetchRequest('formSpin'))
    return new API().fetchSave(value).then(json => {
      dispatch(fetchSuccess('formSpin',true,"保存成功！"))
			// dispatch(memberItemSave(json))
      dispatch(memberSave(json))

      dispatch(listAction(page))
    }).catch(ex => {
      return dispatch(fetchFailure('formSpin',ex))
    })
  }
}
export function dissmissMemberAction(value){
  return (dispatch, getState) => {
    dispatch(fetchRequest('formSpin'))
    return new API().fetchDissmissMember(value).then(json => {
      dispatch(fetchSuccess('formSpin',true,"操作成功！"))
      dispatch(memberItemSave(json))
      // dispatch(listAction())
    }).catch(ex => {
      return dispatch(fetchFailure('formSpin',ex))
    })
  }
}

export function deleteAction(value,page){
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchChangeStatus(value).then(json => {
      if(value.status) {
        dispatch(fetchSuccess('tableSpin',true,"转正成功！"))
      }else {
				dispatch(fetchSuccess('tableSpin',true,"删除成功！"))
				dispatch(routerActions.goBack())
      }
      //console.log(json.list)
      // dispatch(removeItem(json))
      dispatch(listAction(page))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function itemAction(value){
  return (dispatch, getState) => {
    dispatch(fetchRequest('formSpin'))
    return new API().fetchItem({id:value}).then(json => {
      dispatch(fetchSuccess('formSpin'))
      //console.log(json.list)
      dispatch(memberSave(json))
    }).catch(ex => {
      return dispatch(fetchFailure('formSpin',ex))
    })
  }
}

export function newItemAction(value){
  return (dispatch, getState) => {
    dispatch(newItem())
  }
}

export function sysFieldListAction(value){
  return (dispatch, getState) => {
    return new API().fetchSysFieldList(value).then(json => {
      //console.log(json.list)
      dispatch(saveSysFieldList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function exportAction(url,value) {
    return (dispatch, getState) => {
        return new API().fetchExport(url,value).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function uploadCommitAction(value) {
  return (dispatch, getState) => {
    return new API().fetchUploadCommit(value).then(json => {
      //console.log(json.list)
      console.log(json)
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function importResultListAction(value){
  return (dispatch, getState) => {
    return new API().fetchImportResultList(value).then(json => {
      //console.log(json.list)
      dispatch(saveImportResultList(json.list))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

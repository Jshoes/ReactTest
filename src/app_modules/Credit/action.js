import API from './api'
import ResumeAPI from '../Resume/api'
import {routerActions, push, replace} from 'react-router-redux'
import createConstants,{dispatchHandler,createTypes,createActionRoute} from 'app-utils/CreateConstants'

import {createAction} from 'redux-actions'

export const saveList = createAction("STORE_CREDIT")
export const saveItem = createAction("UPSERT_CREDIT")
export const removeItem = createAction("REMOVE_CREDIT")

const CONSTANTS = createConstants('credit', [
  'get_list',
  'sync_list',
  'save_list',
  'save_item',
  'save_params',
  'fetch_request',
  'fetch_success',
  'fetch_failure',
])
export default CONSTANTS
//TODO: 调整命名及常量定义

let {
  getItem,listItem,fetchFailure,fetchRequest,fetchSuccess,saveParams
} = createTypes(CONSTANTS)


let {listRoute,backRoute} = createActionRoute()
export {listRoute,backRoute}

export function listAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchCreditList(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveParams(value))
      dispatch(saveList(json))
    }).catch(ex => {
      // console.dir(ex)
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function deleteAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('tableSpin'))
        return new API().fetchDelete({id:value}).then(json => {
            dispatch(fetchSuccess('tableSpin',true))
            dispatch(removeItem(json.id))
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function addCreditAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('tableSpin'))
        return new API().fetchAdd(value).then(json => {
            let msgContent = "操作成功"
            dispatch(fetchSuccess('tableSpin',true,msgContent))
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function itemAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('tableSpin'))
        return new ResumeAPI().fetchItem(value).then(json => {
            dispatch(fetchSuccess('tableSpin'))
            dispatch(saveItem(json))
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

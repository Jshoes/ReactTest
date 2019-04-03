

import API from './api'
import {routerActions, push, replace} from 'react-router-redux'
import createConstants,{dispatchHandler,createTypes,createActionRoute} from 'app-utils/CreateConstants'

const CONSTANTS = createConstants('member', [
    'get_list',
    'save_item',
    'save_list',
    'save_account',
    'save_promo',
    'save_authent',
    'fetch_request',
    'fetch_success',
    'fetch_failure',
])
export default CONSTANTS
//TODO: 调整命名及常量定义
let {
    getItem,listItem,saveItem,removeItem,saveList,fetchFailure,fetchRequest,fetchSuccess
} = createTypes(CONSTANTS)



let {backRoute,addRoute,editRoute} = createActionRoute()
export  {backRoute,addRoute,editRoute}

function save_account(json) {
    return {type:CONSTANTS.SAVE_ACCOUNT,payload:json}
}
function savePromo(json) {
    return {type:CONSTANTS.SAVE_PROMO,payload:json}
}
function saveAuthent(value) {
    return {type:CONSTANTS.SAVE_AUTHENT,payload:{status:true,...value}}
}

export function listAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('tableSpin'))
        return new API().fetchList(value).then(json => {
            dispatch(fetchSuccess('tableSpin'))
            let {list,...page} = json
            dispatch(saveList(list, page))
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function accountInfoAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('tableSpin'))
        return new API().fetchAccount(value).then(json => {
            dispatch(fetchSuccess('tableSpin'))
            dispatch(saveItem(json))
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function jumpToRecordAction() {
    return dispatch => dispatch(routerActions.push(`/personal/presentrecord`))
}

export function jumpToWithdrawAction() {
    return dispatch => dispatch(routerActions.push(`/personal/list/withdrawals`))
}

export function getAccActions(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchCurrAcc(value).then(json => {
            dispatch(fetchSuccess('itemSpin'))
            dispatch(save_account(json))
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}

export function withdrawalsAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchWithdrawals(value).then(json => {
            dispatch(fetchSuccess('itemSpin',true))
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}

export function recordListAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('tableSpin'))
        return new API().fetchRecordList(value).then(json => {
            dispatch(fetchSuccess('tableSpin'))
            let {list,...page} = json
            dispatch(saveList(list, page))
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function authentAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchAuthent(value).then(json => {
            dispatch(fetchSuccess('itemSpin',true))
            dispatch(saveAuthent(value))
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}

export function changePassAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchChange(value).then(json => {
            dispatch(fetchSuccess('itemSpin',true))
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}

export function getShareCodeAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchPromoCode(value).then(json => {
            dispatch(fetchSuccess('itemSpin'))
            dispatch(savePromo(json))
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}
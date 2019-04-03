
import API from './api'

import { createAction } from 'redux-actions'
import {routerActions, push, replace} from 'react-router-redux'

import createConstants, { dispatchHandler, createTypes, createActionRoute } from 'app-utils/CreateConstants'

const CONSTANTS = createConstants('log', [
	'fetch_request',
	'fetch_success',
	'fetch_failure',
])
export default CONSTANTS
let {
	fetchFailure, fetchRequest, fetchSuccess
} = createTypes(CONSTANTS)

let { backRoute, addRoute, editRoute, detailRoute } = createActionRoute()
export { backRoute, addRoute, editRoute, detailRoute }

export const saveUnreadList = createAction("STORE_UNREAD")

export const saveLogList = createAction("STORE_LOG")

export const saveLogDetail = createAction("STORE_LOGDETAIL")



export function logListAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchLogList(params).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			// console.log('json.list',json.list)
			dispatch(saveLogList(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function updateLogListAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchUpdateLogList(params).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			// console.log('json.list',json.list)
			dispatch(saveLogList(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function unreadMsgListAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchUnreadMsgList(params).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			// console.log('json.list',json.list)
			dispatch(saveUnreadList(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}
export function logDetailAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchLogDetail(params).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			// console.log('json.list',json.list)
			dispatch(saveLogDetail(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}
export function resumeDetailRoute(resumeId) {
  return dispatch => dispatch(routerActions.push(`log/1/${resumeId}/detail`))
}

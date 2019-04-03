/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-03-13T11:36:53+08:00
*/


import {handleActions} from 'redux-actions'
import {saveUnreadList,saveLogDetail} from './action'
export const initialState = {
	unreadMessage:{
		 hxrxgNum:0, ygxgNum:0, dbsjNum:0, xtxxNum:0, gxrzNum:0
	},
	logDetail:new Object()
}

const actions = {}


actions[saveUnreadList]=(state, action)=>{
	return {
		...state,
		unreadMessage:action.payload
	}
}
actions[saveLogDetail]=(state, action)=>{
	return {
		...state,
		logDetail:action.payload
	}
}

const reducer = handleActions(actions, initialState)
export default reducer

import {handleActions} from 'redux-actions'
import CONSTANTS,{saveUnreadList,saveLogDetail} from './action'
let initialState = {
	unreadMessage:{
		 hxrxgNum:0, ygxgNum:0, dbsjNum:0, xtxxNum:0, gxrzNum:0
	},

	logDetail:new Object()
}

let actions = {}


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

let reducer = handleActions(actions, initialState)
export { initialState, CONSTANTS }
export default reducer

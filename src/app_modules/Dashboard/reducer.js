/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-17T17:31:00+08:00
*/

import {handleActions} from 'redux-actions'
import CONSTANTS,{saveSchedule,storeSchedule,saveUnreadList,saveHireData,saveRecentData} from './action'

export const initialState = {
  params:{
    // query params
  },
  page: {
    current: 1,
    pageSize: 20,
    total:1000
  },
  spins:{
    noticeSpin:false,
    todoSpin:false,
    peopleSpin:false,
    tableSpin:false
  },
  // for Item detail
  msg: new Object(),
  status: new Map(),
	key: 'id',
	unreadMessage:{
		hxrxgNum:0, ygxgNum:0, dbsjNum:0, xtxxNum:0, gxrzNum:0
	},
	hireData:{
		recruitJobNum:0, dfpResumeNum:0, todayNewResumeNum:0, todayInterviewNum:0, sendOfferNum:0
	},
	recentData:{
		lastFilteredNum : 0,
		thisFilteredNum : 0,
		lastLeaveInviteNum : 0,
		thisLeaveInviteNum : 0,
		lastInterviewedNum : 0,
		thisInterviewedNum : 0,
		lastOfferedNum : 0,
		thisOfferedNum : 0,
		lastEntriedNum : 0,
		thisEntriedNum : 0,
	}
}

const actions = {}
actions[saveUnreadList]=(state, action)=>{
	return {
		...state,
		unreadMessage:action.payload
	}
}

actions[saveHireData]=(state, action)=>{
	return {
		...state,
		hireData:action.payload
	}
}

actions[saveRecentData]=(state, action)=>{
	return {
		...state,
		recentData:action.payload
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

export default reducer;

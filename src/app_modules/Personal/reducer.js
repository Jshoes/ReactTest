/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-08T09:22:49+08:00
*/

import {newList,newItem,saveList,saveItem,removeItem,fetchRequest,fetchSuccess,fetchFailure} from 'app-utils/reducerUtils'
import CONSTANTS from './action'

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
    accountInfo:new Object(),
    sysFieldList: new Array(),
    searchParams: new Object(),
    item: new Object(),
    msg: new Object(),
    status: new Map(),
    promo:"",
    key: 'id'
}

function saveAccount(state,payload) {
    state.accountInfo = payload
    return state
}
function savePromo(state,payload) {
    state.promo = payload.code
    return state
}
function fetchAuthentChange(state,payload) {
    console.log(payload)
    state.item.isRealName = payload.status
    state.item.name = payload.acctName
    return state
}

//TODO： 拆分reduce。update\get
function reducer(state = initialState, {type, payload}) {
    switch (type) {
        case CONSTANTS.SAVE_LIST:
            return saveList(state, payload)
        case CONSTANTS.SAVE_ACCOUNT:
            return saveAccount(state, payload)
        case CONSTANTS.SAVE_ITEM:
            return saveItem(state, payload)
        case CONSTANTS.SAVE_PROMO:
            return savePromo(state,payload)
        case CONSTANTS.FETCH_REQUEST:
            return fetchRequest(state, payload)
        case CONSTANTS.FETCH_SUCCESS:
            return fetchSuccess(state, payload)
        case CONSTANTS.FETCH_FAILURE:
            return fetchFailure(state, payload)
        case CONSTANTS.SAVE_AUTHENT:
            return fetchAuthentChange(state,payload)
        default:
            return state;
    }
}

export {initialState,CONSTANTS}

export default reducer;

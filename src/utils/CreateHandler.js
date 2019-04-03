import createRouter from  './CreateRouter'

/**
 * [dispatchHandler 通用分发一个方法]
 * @param  {[type]} name    [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */

export default function dispatchHandler(name,payload){
    return {
      type:name,
      payload
    }
}


export function getItem(CONSTANTS,key){
  return {type:CONSTANTS.GET_ITEM,payload:{key}}
}

export function saveItem(CONSTANTS,item){
  return {type:CONSTANTS.SAVE_ITEM,payload:{item}}
}

export function getList(CONSTANTS,query){
  return {type:CONSTANTS.GET_LIST,payload:{query}}
}

export function saveList(CONSTANTS,list){
  return {type:CONSTANTS.SAVE_LIST,payload:{list}}
}

export function clearItem(CONSTANTS,item){
  return {type:CONSTANTS.CLEAR_ITEM,payload:{item}}
}

export function fetchFailure(CONSTANTS,name,code) {
  return {type: CONSTANTS.FETCH_FAILURE, payload:{name,code}}
}

export function fetchRequest(CONSTANTS,name,code) {
  return {type: CONSTANTS.FETCH_REQUEST, payload:{name,code}}
}

export function fetchSuccess(CONSTANTS,name,code) {
  return {type: CONSTANTS.FETCH_SUCCESS, payload:{name,code}}
}

/**
 * [dispatchRouter 分发一个路径]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function dispatchRouter(path){
  return dispatch => dispatch(createRouter().replace(path))
}

/**
 * [dispatchBackRouter 分发一个回退]
 * @param  {[type]} number [为回退数值前几次]
 * @return {[type]}        [description]
 */

export function dispatchBackRouter(number){
  return dispatch => dispatch(createRouter().goBack(number))
}

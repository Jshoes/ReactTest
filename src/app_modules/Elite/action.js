
import API from './api'
import {routerActions, push, replace} from 'react-router-redux'
import createConstants,{dispatchHandler,createTypes,createActionRoute} from 'app-utils/CreateConstants'
import {createResumeRoute} from 'app-components/Resume/utils'

import {createAction} from 'redux-actions'

export const saveList = createAction("STORE_ELITE")

export const saveTalentCount = createAction("STORE_TALENT_COUNT")

export const saveParams = createAction("STORE_PARAMS")

const CONSTANTS = createConstants('elite', [
  'get_list',
  'save_item',
  'sync_list',
  'new_item',
  'save_item_basic',
  "save_item_tags",
  'save_item_follow',
  'save_item_basicother',
  'save_item_salary',
  'save_item_job',
  'save_item_work',
  'save_item_pro',
  'save_item_edu',
  'save_item_skill',
  'save_item_cert',
  'save_item_train',
  'save_taglist',
  'save_params',
  'fetch_request',
  'fetch_success',
  'fetch_failure',
])
export default CONSTANTS
//TODO: 调整命名及常量定义
let {
  getItem,listItem,saveItem,fetchFailure,fetchRequest,fetchSuccess,
} = createTypes(CONSTANTS)

let {listRoute,backRoute,backRouteReload,backListRoute} = createActionRoute()
export {listRoute,backRoute,backRouteReload,backListRoute}

let {connectEliteAction,openFollowWindow} =createResumeRoute()
export {connectEliteAction,openFollowWindow}

function new_item(){
    return {type:CONSTANTS.NEW_ITEM,payload:
        {
        info: new Object(),
        jobs:new Array(),
        languages:new Array(),
        credentials:new Array(),
        projects:new Array(),
        follows:new Array(),
        trainings:new Array(),
        educations:new Array(),
    }}
}
function saveTagsList(json) {
    return {type:CONSTANTS.SAVE_TAGLIST,payload:json}
}

/*区分存储信息*/
function saveItem_basic(json,value) {
    return {type: CONSTANTS.SAVE_ITEM_BASIC,payload:json}
}
function saveItem_tag(value) {
    return {type:CONSTANTS.SAVE_ITEM_TAGS,payload:value}
}
function saveItem_follow(json) {
    return {type: CONSTANTS.SAVE_ITEM_FOLLOW,payload:json}
}
function saveItem_salary(json,value) {
    return {type: CONSTANTS.SAVE_ITEM_BASICOTHER,payload:value}
}
function saveItem_job(json,value) {
    return {type: CONSTANTS.SAVE_ITEM_BASICOTHER,payload:value}
}
function saveItem_work(json) {
    return {type: CONSTANTS.SAVE_ITEM_WORK,payload:json}
}
function saveItem_pro(json) {
    return {type: CONSTANTS.SAVE_ITEM_PRO,payload:json}
}
function saveItem_edu(json) {
    return {type: CONSTANTS.SAVE_ITEM_EDU,payload:json}
}
function saveItem_skill(json) {
    return {type: CONSTANTS.SAVE_ITEM_SKILL,payload:json}
}
function saveItem_cert(json) {
    return {type: CONSTANTS.SAVE_ITEM_CERT,payload:json}
}
function saveItem_train(json) {
    return {type: CONSTANTS.SAVE_ITEM_TRAIN,payload:json}
}

export function listAction(value) {
  return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		dispatch(saveParams(value))
    return new API().fetchEliteList(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))

      let {list,...page} = json
      dispatch(saveList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}
export function talentCountAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchTalentCount(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveTalentCount(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function recommondRoute(data,router){
	// let pathname=location.state.pathname.replace(/\/$/,"")
	console.log(router,'routerrouter')
	let newLocation={
		pathname: `${router.location.pathname}/recommond`,
		state:data
	}
	// let hash=router.createLocation(newLocation)
	return (dispatch, getState) => {
		dispatch(routerActions.push(newLocation))
  }
}

export function move2EliteRoute(data,router){
	// let pathname=location.state.pathname.replace(/\/$/,"")
	console.log(router,'routerrouter')
	let newLocation={
		pathname: `${router.location.pathname}/move`,
		state:data
	}
	// let hash=router.createLocation(newLocation)
	return (dispatch, getState) => {
		dispatch(routerActions.push(newLocation))
  }
}

export function relateRoute(data,router){
	// let pathname=location.state.pathname.replace(/\/$/,"")
	console.log(router,'routerrouter')
	let newLocation={
		pathname: `${router.location.pathname}/relate`,
		state:data
	}
	// let hash=router.createLocation(newLocation)
	return (dispatch, getState) => {
		dispatch(routerActions.push(newLocation))
  }
}


export function newItemAction(){
    return (dispatch, getState) => {
        dispatch(new_item())
    }
}

export function recommondAction(value){
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchRecommond(value).then(json => {
          dispatch(fetchSuccess('formSpin',true))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}
export function relate2JobAction(data,router) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchRelate2Job(data).then(json => {
			dispatch(fetchSuccess('tableSpin'))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin',ex))
		})
	}
}
export function joinEliteAction(data,router) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchJoinElite(data).then(json => {
			dispatch(fetchSuccess('tableSpin'))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin',ex))
		})
	}
}

export function deleteAction(data,router) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchDelete({ids:data}).then(json => {
				dispatch(fetchSuccess('tableSpin'))
		}).catch(ex => {
				return dispatch(fetchFailure('tableSpin',ex))
		})
	}
}

export function tagsAction() {
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchTags().then(json => {
            dispatch(fetchSuccess('itemSpin'))
            dispatch(saveTagsList(json))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}

export function itemAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchItem(value).then(json => {
                dispatch(fetchSuccess('itemSpin'))
                dispatch(saveItem(json))
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}

export function relatedForm(value){
    return (dispatch, getState) => {
        return new API().fetchRejectForm(value).then(json => {
            let msgContent = "关联职位成功"
            dispatch(fetchSuccess('tableSpin',true,msgContent))
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}



export function tagEditAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddTag(value).then(json => {
            dispatch(fetchSuccess('formSpin',true))
            dispatch(saveItem_tag(value))
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}

/*saveItem需要区分*/

export function addBasicAction(value,toggleFn,cancelFn) {
    return (dispatch, getState) => {
        return new API().fetchAddBasic(value).then(json => {
            dispatch(fetchSuccess('formSpin',true))
            dispatch(saveItem_basic(json,value))
            dispatch(listAction())
            cancelFn && cancelFn()
            toggleFn && toggleFn()
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}


export function addFollowAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddFollow(value).then(json => {
            dispatch(fetchSuccess('formSpin',true))
            dispatch(saveItem_follow(json))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}

export function addSalaryAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddBasic(value).then(json => {
            dispatch(fetchSuccess('formSpin',true))
            dispatch(saveItem_salary(json,value))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}


export function addJobAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddBasic(value).then(json => {
            dispatch(fetchSuccess('formSpin',true))
            dispatch(saveItem_job(json,value))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}


export function addWorkAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddWork(value).then(json => {
            dispatch(fetchSuccess('tableSpin',true))
            dispatch(saveItem_work(json))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}


export function addProAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddPro(value).then(json => {
            dispatch(fetchSuccess('tableSpin',true))
            dispatch(saveItem_pro(json))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function addEduAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddEdu(value).then(json => {
            dispatch(fetchSuccess('tableSpin',true))
            dispatch(saveItem_edu(json))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function addSkiAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddSki(value).then(json => {
            dispatch(fetchSuccess('tableSpin',true))
            dispatch(saveItem_skill(json))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function addCertAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddCert(value).then(json => {
            dispatch(fetchSuccess('tableSpin',true))
            dispatch(saveItem_cert(json))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function addTrainAction(value) {
    return (dispatch, getState) => {
        return new API().fetchAddTrain(value).then(json => {
            dispatch(fetchSuccess('tableSpin',true))
            dispatch(saveItem_train(json))
            dispatch(listAction())
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

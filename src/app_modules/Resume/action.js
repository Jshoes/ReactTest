import API from './api'
import {message} from 'antd'
import MemberAPI from '../Member/api'
import EliteAPI from '../Elite/api'
import InterviewAPI from '../Interview/api'
import SettingAPI from '../Settings/api'
import {routerActions, push, replace} from 'react-router-redux'
import createConstants,{dispatchHandler,createTypes,createActionRoute} from 'app-utils/CreateConstants'
import {createResumeRoute} from 'app-components/Resume/utils'
import {urgeFeedbackAction} from '../Interview/action'

import {createAction} from 'redux-actions'

message.config({
    duration:5
})

export const saveList = createAction("STORE_RESUME")
export const saveItem = createAction("UPSERT_RESUME")

export const saveParams = createAction("SAVE_PARAMS")

export const saveCount = createAction("SAVE_COUNT")
export const saveChecks = createAction("SAVE_CHECKES")

export const saveDetail = createAction("SAVE_DETAIL")
export const saveBaseInfo = createAction("SAVE_BASEINFO")

export const saveResumeInfo = createAction("SAVE_RESUMEINFO")
export const saveResumeObj = createAction("SAVE_RESUMEOBJ")
export const saveResumeJob = createAction("SAVE_RESUMEJOB")
export const saveResumePro = createAction("SAVE_RESUMEPRO")
export const saveResumeEdu = createAction("SAVE_RESUMEEDU")
export const saveResumeLan = createAction("SAVE_RESUMELAN")
export const saveResumeCre = createAction("SAVE_RESUMECRE")
export const saveResumeTra = createAction("SAVE_RESUMETRA")

export const saveDistr = createAction("STORE_DISTRIBUTED")

export const saveFeedData = createAction("SAVE_FEEDDATA")
export const addFeedData = createAction("ADD_FEEDDATA")

export const saveRemark = createAction("SAVE_REMARK")
export const sendRemarkSave = createAction("SAVE_REMARKSAVE")

export const saveOffer =createAction("SAVE_OFFER")

export const saveCommiun = createAction("SAVE_COM")

export const saveOption = createAction("SAVE_OPTION")

export const saveInterviwPlan = createAction("SAVE_INTVERVIEW")


export const saveLink = createAction("SAVE_LINK")
export const removeLink = createAction("REMOVE_LINK")
export const saveListLink = createAction("SAVE_LISTLINK")

export const saveAdditionInfo = createAction("SAVE_LIST_ADDITIONINFO")


const CONSTANTS = createConstants('resume', [
  'fetch_request',
  'fetch_success',
  'fetch_failure',
])
export default CONSTANTS
//TODO: 调整命名及常量定义
let {
  fetchFailure,fetchRequest,fetchSuccess
} = createTypes(CONSTANTS)

let {listRoute,backRoute,backRouteReload,backListRoute} = createActionRoute()
export {listRoute,backRoute,backRouteReload,backListRoute}

 let {feedAction,delayAction,creditAction,entryAction,connectEliteAction,addLabelAction,feedbackAction,distributionAction,followActionction,talentAction,send2InterviewerAction,recommend2OtherAction,addEliteAction,followAction,deleteAction,joinAction} =createResumeRoute()
export {feedAction,delayAction,creditAction,entryAction,connectEliteAction,addLabelAction,feedbackAction,distributionAction,followActionction,talentAction,send2InterviewerAction,recommend2OtherAction,addEliteAction,followAction,deleteAction,joinAction}

export {urgeFeedbackAction}

export function listAction(value) {
  return (dispatch, getState) => {
    dispatch(saveParams(value))
  }
}
export function listRealAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchList(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function listReportAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchListCount(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveCount(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function getCheckAction(value) {
  let reset = {
    notes:undefined,
    current:undefined,
    pageSize:undefined,
    pageSizeOptions:undefined,
    showSizeChanger:undefined,
    showTotal:undefined,
    total:undefined
  }
  let resetPar = Object.assign({},value,reset)
  return (dispatch, getState) => {
    if(value.status == 4){
      dispatch(saveChecks({checks:[]}))
    }else{
      dispatch(fetchRequest('tableSpin'))
      return new API().fetchChecks(value).then(json => {
        dispatch(fetchSuccess('tableSpin'))
        dispatch(saveChecks({checks:json}))
      }).catch(ex => {
        return dispatch(fetchFailure('tableSpin',ex))
      })
    }

  }
}

export function distrAction(value){
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchDistr(value).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			/*数据加工*/
			dispatch(saveDistr(json))
      dispatch(saveParams(value))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function distrJobAction(value){
  return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchDistrJob(value).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			/*数据加工*/
			dispatch(saveList(json))
      dispatch(saveParams(value))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}


export function muliteDistAction(value){
  return (dispatch, getState) => {
		dispatch(fetchRequest('itemSpin'))
		return new API().fetchMulite(value).then(json => {
			dispatch(fetchSuccess('itemSpin',true))
		}).catch(ex => {
			return dispatch(fetchFailure('itemSpin', ex))
		})
	}
}
export function singleDistAction(value){
  return (dispatch, getState) => {
		dispatch(fetchRequest('itemSpin'))
		return new API().fetchSingle(value).then(json => {
			dispatch(fetchSuccess('itemSpin',true))
		}).catch(ex => {
			return dispatch(fetchFailure('itemSpin', ex))
		})
	}
}

export function muliteTalentAction(value){
  return (dispatch, getState) => {
		dispatch(fetchRequest('itemSpin'))
		return new API().fetchMuliteTalent(value).then(json => {
			dispatch(fetchSuccess('itemSpin',true))
		}).catch(ex => {
			return dispatch(fetchFailure('itemSpin', ex))
		})
	}
}
export function singleTalentAction(value){
  return (dispatch, getState) => {
		dispatch(fetchRequest('itemSpin'))
		return new API().fetchSingleTalent(value).then(json => {
			dispatch(fetchSuccess('itemSpin',true))
		}).catch(ex => {
			return dispatch(fetchFailure('itemSpin', ex))
		})
	}
}

export function listResumeJobAction(value){
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchResumeJobList(value).then(json => {
      dispatch(saveParams(value))
      dispatch(fetchSuccess('tableSpin'))
      let {list,...page} = json
      dispatch(saveResumeJobList(list, page))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function listSearchAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchList(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function listResumeJobReportAction(value){
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchResumeJobReport(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveResumeReport(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function itemAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchItem(value).then(json => {
            dispatch(fetchSuccess('itemSpin'))
            /*进入详情时候干掉面试官字段  两次字段不匹配 先挖个坑*/
            delete json.interviewer

            dispatch(saveItem(json))
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

export function getRemarkAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('formSpin'))
        return new API().fetchRemark(value).then(json => {
            dispatch(fetchSuccess('formSpin'))
            if(json.status){
              let data = json.data ? json.data : []
              dispatch(saveRemark(data))
            }
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}


export function sendRemarkAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('formSpin'))
        return new API().fetchSendRemark(value).then(json => {
            dispatch(fetchSuccess('formSpin'))
            dispatch(sendRemarkSave(json))
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}

export function getOfferAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('formSpin'))
        return new API().fetchOffer(value).then(json => {
            dispatch(fetchSuccess('formSpin'))
            dispatch(saveOffer(json))
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}

export function getCommiuncateAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('formSpin'))
        return new API().fetchCom(value).then(json => {
            dispatch(fetchSuccess('formSpin'))
            dispatch(saveCommiun(json.list))
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}

export function getOptionAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('formSpin'))
        return new API().fetchOption(value).then(json => {
            dispatch(fetchSuccess('formSpin'))
            dispatch(saveOption(json.list))
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
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

export function savePersonBaseAction(value){
  return (dispatch, getState) => {
      dispatch(fetchRequest('itemSpin'))
      return new API().fetchEditPersonBase(value).then(json => {
          dispatch(fetchSuccess('itemSpin'))
          dispatch(saveResumeInfo(value))
      }).catch(ex => {
          return dispatch(fetchFailure('itemSpin',ex))
      })
  }
}

export function savePersonObjAction(value){
  let channelResumeId = value.channelResumeId
  return (dispatch, getState) => {
      dispatch(fetchRequest('itemSpin'))
      return new API().fetchEditPersonObj(value,channelResumeId).then(json => {
          dispatch(fetchSuccess('itemSpin'))
          dispatch(saveResumeObj(value))
      }).catch(ex => {
          return dispatch(fetchFailure('itemSpin',ex))
      })
  }
}

export function savePersonJobAction(value){
  let channelResumeId = value.channelResumeId
  return (dispatch, getState) => {
      dispatch(fetchRequest('itemSpin'))
      return new API().fetchEditPersonJob(value,channelResumeId).then(json => {
          dispatch(fetchSuccess('itemSpin'))
          dispatch(saveResumeJob(value))
      }).catch(ex => {
          return dispatch(fetchFailure('itemSpin',ex))
      })
  }
}

export function savePersonProAction(value){
  let channelResumeId = value.channelResumeId
  return (dispatch, getState) => {
      dispatch(fetchRequest('itemSpin'))
      return new API().fetchEditPersonPro(value,channelResumeId).then(json => {
          dispatch(fetchSuccess('itemSpin'))
          dispatch(saveResumePro(value))
      }).catch(ex => {
          return dispatch(fetchFailure('itemSpin',ex))
      })
  }
}

export function savePersonEduAction(value){
  let channelResumeId = value.channelResumeId
  return (dispatch, getState) => {
      dispatch(fetchRequest('itemSpin'))
      return new API().fetchEditPersonEdu(value,channelResumeId).then(json => {
          dispatch(fetchSuccess('itemSpin'))
          dispatch(saveResumeEdu(value))
      }).catch(ex => {
          return dispatch(fetchFailure('itemSpin',ex))
      })
  }
}

export function savePersonLanAction(value){
  let channelResumeId = value.channelResumeId
  return (dispatch, getState) => {
      dispatch(fetchRequest('itemSpin'))
      return new API().fetchEditPersonLan(value,channelResumeId).then(json => {
          dispatch(fetchSuccess('itemSpin'))
          dispatch(saveResumeLan(value))
      }).catch(ex => {
          return dispatch(fetchFailure('itemSpin',ex))
      })
  }
}

export function savePersonCreAction(value){
  let channelResumeId = value.channelResumeId
  return (dispatch, getState) => {
      dispatch(fetchRequest('itemSpin'))
      return new API().fetchEditPersonCre(value,channelResumeId).then(json => {
          dispatch(fetchSuccess('itemSpin'))
          dispatch(saveResumeCre(value))
      }).catch(ex => {
          return dispatch(fetchFailure('itemSpin',ex))
      })
  }
}

export function savePersonTraAction(value){
  let channelResumeId = value.channelResumeId
  return (dispatch, getState) => {
      dispatch(fetchRequest('itemSpin'))
      return new API().fetchEditPersonTra(value,channelResumeId).then(json => {
          dispatch(fetchSuccess('itemSpin'))
          dispatch(saveResumeTra(value))
      }).catch(ex => {
          return dispatch(fetchFailure('itemSpin',ex))
      })
  }
}

export function channelAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('formSpin'))
        return new API().fetchChannel(value).then(json => {
            dispatch(saveChannel(json))
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}


export function remarksSaveAction(value) {
  return (dispatch,getState) =>{
      dispatch(fetchRequest('formSpin'))
      dispatch(fetchBtnLoading({name:"buttonSpin",loading:true}))
      return new API().fetchRemarksSave(value).then(json =>{
          dispatch(fetchSuccess('formSpin',true,"操作成功"))
      }).catch(ex =>{
          return dispatch(fetchFailure('formSpin',ex))
      })
  }
}


export function joinEliteAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('formSpin'))
        return new API().fetchJoinElite(value).then(json => {
            dispatch(fetchSuccess('formSpin'))
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}

export function joinCreditAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('formSpin'))
        return new API().fetchJoinCredit(value).then(json => {
            dispatch(fetchSuccess('formSpin'))
        }).catch(ex => {
            return dispatch(fetchFailure('formSpin',ex))
        })
    }
}

export function entryInvite(value) {
    let data = {
      ...value,
      status:1
    }
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchInvite(value).then(json => {
            dispatch(fetchSuccess('itemSpin'))
            dispatch(saveItem(data))
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}

export function entryOffer(value) {
    let data = {
      ...value,
      status:3
    }
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchEntryOffer(value).then(json => {
            dispatch(fetchSuccess('itemSpin'))
            dispatch(saveItem(data))
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}

export function entryWaiting(value) {
    let data = {
      ...value,
      status:4
    }
    return (dispatch, getState) => {
        dispatch(fetchRequest('itemSpin'))
        return new API().fetchWaiting(value).then(json => {
            dispatch(fetchSuccess('itemSpin'))
            dispatch(saveItem(data))
        }).catch(ex => {
            return dispatch(fetchFailure('itemSpin',ex))
        })
    }
}

export function getCurrentLabelAction(value){
  return (dispatch, getState) => {
    dispatch(fetchRequest('formSpin'))
    return new API().fetchCurrentLabel(value).then(json => {
      dispatch(fetchSuccess('formSpin'))
      let {data} = json
      dispatch(saveCurrLabel(data))
    }).catch(ex => {
      return dispatch(fetchFailure('formSpin',ex))
    })
  }
}

export function getAllLabelAction(value){
  return (dispatch, getState) => {
    dispatch(fetchRequest('formSpin'))
    return new SettingAPI().fetchTagList(value).then(json => {
      dispatch(fetchSuccess('formSpin'))
      let {list} = json
      dispatch(saveAllLabel(list))
    }).catch(ex => {
      return dispatch(fetchFailure('formSpin',ex))
    })
  }
}


export function listLinkAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetcListLink(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveListLink(json.list))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function saveLinkAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetcSaveLink(value).then(json => {
      dispatch(fetchSuccess('tableSpin',true))
      dispatch(saveLink(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function deleteLinkAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchDeleteLink(value).then(json => {
      dispatch(fetchSuccess('tableSpin',true))
      // dispatch(saveList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function deleteAdditionInfoAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchDeleteAdditionInfo(value).then(json => {
      dispatch(fetchSuccess('tableSpin',true))
      // dispatch(saveList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function fetchAdditionInfoAction(value){
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchAdditionInfo(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveAdditionInfo(json.list))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function getFeedStageAction(value){
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchInterviewPlan(value).then(json => {
          dispatch(fetchSuccess('formSpin'))
          dispatch(saveInterviwPlan(json))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
  }
}

export function feedArrange(value){
  let data = {
    id:value.resumeId,
    status:2
  }
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchArrange(value).then(json => {
          dispatch(fetchSuccess('formSpin',true))
          // dispatch(saveItem(data))
          dispatch(addFeedData(json))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}

export function entryJobAction(value){
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchEntryJob(value).then(json => {
          dispatch(fetchSuccess('formSpin',true))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}

export function forwardAction(value){
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchForward(value).then(json => {
          dispatch(fetchSuccess('formSpin',true))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}

export function recommendAction(value){
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchRecommend(value).then(json => {
          dispatch(fetchSuccess('formSpin',true))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}

export function eliminateAction(router,ids){
  let params = {
    ids:ids
  }
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchEliminate(params).then(json => {
          dispatch(fetchSuccess('formSpin',true))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}

export function deleteOptionAction(values){
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchDelete(values).then(json => {
          dispatch(fetchSuccess('formSpin',true))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}

export function followOptionAction(values){
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchFollow(values).then(json => {
          dispatch(fetchSuccess('formSpin',true))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}

export function offerOptionAction(values){
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchSendOffer(values).then(json => {
          dispatch(fetchSuccess('formSpin',true))
          dispatch(saveOffer(json))

      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}

export function setLabelAction(values){
  return (dispatch, getState) => {
      dispatch(fetchRequest('formSpin'))
      return new API().fetchSetLabel(values).then(json => {
          dispatch(fetchSuccess('formSpin',true))
      }).catch(ex => {
          return dispatch(fetchFailure('formSpin',ex))
      })
    }
}

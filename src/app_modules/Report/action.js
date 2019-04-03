
import API from './api'
import {routerActions, push, replace} from 'react-router-redux'
import createConstants,{dispatchHandler,createTypes} from 'app-utils/CreateConstants'

const CONSTANTS = createConstants('report', [
  'get_list',
  'save_item',
  'save_params',
  'save_report_resume_list',
  'save_report_callrecord_list',
  'sync_list',
  'save_list',
  'fetch_request',
  'fetch_success',
  'fetch_failure',
	'save_recruitment_statuslist',
	'save_reason_report'
])
export default CONSTANTS
let {
  getItem,listItem,saveItem,saveList,fetchFailure,fetchRequest,fetchSuccess,saveParams
} = createTypes(CONSTANTS)



export function addRoute() {
  return dispatch => dispatch(routerActions.push('/report/fields/add'))
}

export function backRoute() {
  return dispatch => dispatch(routerActions.goBack())
}

export function editRoute(id) {
  return dispatch => dispatch(routerActions.push(`/report/fields/${id}`))
}


function saveRemind(item){
  return {type:CONSTANTS.SAVE_REMIND,payload:{item}}
}

function saveReportResumeList(list){
  return {type:CONSTANTS.SAVE_REPORT_RESUME_LIST,payload:{list}}
}

function saveReportCallrecordList(list){
  return {type:CONSTANTS.SAVE_REPORT_CALLRECORD_LIST,payload:{list}}
}
//
function saveRecruitmentStatusList(json){
  return {type:CONSTANTS.SAVE_RECRUITMENT_STATUSLIST,payload:json}
}

function saveReasonReport(json){
  return {type:CONSTANTS.SAVE_REASON_REPORT,payload:json}
}

export function listAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchList(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveParams(value))
      let {list,...page} = json
      dispatch(saveReportResumeList(list, page))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

//招聘现状

export function recruitmentStatusAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchHireQuoReport(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveParams(value))
      let {list,...page} = json
      // ??????????
      dispatch(saveRecruitmentStatusList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function workloadReportAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchWorkloadReport(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveParams(value))
      let {list,...page} = json
      dispatch(saveRecruitmentStatusList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}
export function exportWorkloadReportAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchWorkloadReport(value).then(json => {
      // dispatch(fetchSuccess('tableSpin'))
      // dispatch(saveParams(value))
      // let {list,...page} = json
      // dispatch(saveRecruitmentStatusList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function feedbackReportAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchFeedbackReport(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveParams(value))
      let {list,...page} = json
      dispatch(saveRecruitmentStatusList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}
export function exportFeedbackReportAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchExportFeedbackReport(value).then(json => {
      // dispatch(fetchSuccess('tableSpin'))
      // dispatch(saveParams(value))
      // let {list,...page} = json
      // dispatch(saveRecruitmentStatusList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}
export function channelReportAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchChannelReport(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveParams(value))
      let {list,...page} = json
      dispatch(saveRecruitmentStatusList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}
export function remarkReportAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchRemarkReport(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveParams(value))
      let {list,...page} = json
      dispatch(saveRecruitmentStatusList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}
export function callReportAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchCallReport(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(saveParams(value))
      let {list,...page} = json
      dispatch(saveRecruitmentStatusList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function callRecordListAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchCallRecordList(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      let {list,...page} = json
      dispatch(saveReportCallrecordList(list, page))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

export function hrListAction(value) {
    return (dispatch, getState) => {
        dispatch(fetchRequest('tableSpin'))
        return new API().fetchHrList(value).then(json => {
            dispatch(fetchSuccess('tableSpin'))
            let {list,...page} = json
            dispatch(saveList(list, page))
        }).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function exportAction(url,value) {
    return (dispatch, getState) => {
        return new API().fetchExport(url,value).catch(ex => {
            return dispatch(fetchFailure('tableSpin',ex))
        })
    }
}

export function reasonReportAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchReasonReport(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      let {list,...page} = json
      dispatch(saveReasonReport(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin',ex))
    })
  }
}

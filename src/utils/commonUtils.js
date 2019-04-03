/**
 * Created by Administrator on 2018/2/8.
 */
import {routerActions, push, replace} from 'react-router-redux'




export function createCommonRouter(){
     function connectAction(router,value,resumeId) {
         let pathname = router.getCurrentLocation().pathname
         let hash=router.createLocation(`${pathname}/${value}/${resumeId}/related`)
         return dispatch => dispatch(routerActions.push(hash))
    }

     function feedbackAction(value,resumeId) {

        return dispatch => dispatch(routerActions.push('resume/'+resumeId+'/feedback'))
    }

     function interviewAction(value,resumeId) {
        return dispatch => dispatch(routerActions.push('resume/'+value+'/'+resumeId+'/feed'))
    }

     function entryAction(value,resumeId) {
        return dispatch => dispatch(routerActions.push('resume/'+value+'/'+resumeId+'/entry'))
    }
     function joinAction(value,resumeId) {
        return dispatch => dispatch(routerActions.push('resume/'+value+'/'+resumeId+'/join'))
    }

     function refuseAction(value,resumeId) {
        return dispatch => dispatch(routerActions.push('resume/'+value+'/'+resumeId+'/reject'))
    }

     function offerAction(value,resumeId) {
        return dispatch => dispatch(routerActions.push('resume/'+value+'/'+resumeId+'/offer'))
    }

    return {
        connectAction,feedbackAction,interviewAction,entryAction,joinAction,refuseAction,offerAction
    }
}

//  let {connectAction,..} =createCommonRouter()


export function createCommonAction(API){

     function relatedForm(value){
        return (dispatch, getState) => {
            dispatch(fetchRequest('tableSpin'))
            return new API().fetchRelatedJob(value).then(json => {
                dispatch(fetchSuccess('tableSpin'))
            }).catch(ex => {
                return dispatch(fetchFailure('tableSpin',ex))
            })
        }
    }

     function feedbackSaveAction(value) {
        return (dispatch, getState) => {
            dispatch(fetchRequest('tableSpin'))
            return new API().fetchFeedBackSave(value).then(json => {
                dispatch(fetchSuccess('tableSpin'))
            }).catch(ex => {
                return dispatch(fetchFailure('tableSpin',ex))
            })
        }
    }

     function entryApplyAction(value) {
        return (dispatch, getState) => {
            dispatch(fetchRequest('tableSpin'))
            return new API().fetchEntryApply(value).then(json => {
                dispatch(fetchSuccess('tableSpin'))
            }).catch(ex => {
                return dispatch(fetchFailure('tableSpin',ex))
            })
        }
    }

     function joinEliteAction(value) {
        return (dispatch, getState) => {
            dispatch(fetchRequest('tableSpin'))
            return new API().fetchJoinElite(value).then(json => {
                dispatch(fetchSuccess('tableSpin'))
            }).catch(ex => {
                return dispatch(fetchFailure('tableSpin',ex))
            })
        }
    }

    return {
        entryApplyAction,
        joinEliteAction,
        feedbackSaveAction,
        relatedForm
    }

}



//  let {relatedForm,..} =createCommonAction(API)


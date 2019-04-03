/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-03-13T14:10:39+08:00
*/



import {fetchRequest,fetchSuccess,fetchFailure} from 'app-utils/reducerUtils'
import CONSTANTS,{
  saveParams,
  saveCount,
  saveChecks,
  saveDetail,saveBaseInfo,
  saveResumeInfo,saveResumeObj,saveResumeJob,saveResumePro,saveResumeEdu,saveResumeLan,saveResumeCre,saveResumeTra,
  addFeedData,
  saveFeedData,
  saveRemark,
  saveOption,
  sendRemarkSave,
  saveOffer,
  saveCommiun,
  saveInterviwPlan,saveList,saveDistr,
  saveLink,removeLink,saveListLink,saveAdditionInfo
} from './action'

import {handleActions} from 'redux-actions'

// TODO: 调整本地数据结构
let initialState = {
  params:{
    // query params
  },
  page: {
    current: 1,
    pageSize: 10,
    total:0
  },
  spins:{
    tableSpin:false,
    formSpin:false,
  },
  interviewInfo:new Object(),
  count:new Object(),
  checks:new Array(),
  item:new Object(),
  feedInfo:{
    list:[]
  },
  remarks:new Array(),
  options:new Array(),
  commitcate:new Array(),
  offer:new Object(),
  baseInfo:{
    resumeInfo:{},
    objectives:{},
    jobs:[],

    projects:[],
    educations:[],
    trainings:[],
    credentials:[],
    languages:[]
  },
  information:{
    links:[],
    files:[]
  }
}


function reduce(state = initialState, {type, payload}) {
  switch (type) {
    case CONSTANTS.FETCH_REQUEST:
      return fetchRequest(state, payload)
    case CONSTANTS.FETCH_SUCCESS:
      return fetchSuccess(state, payload)
    case CONSTANTS.FETCH_FAILURE:
      return fetchFailure(state, payload)
    default:
      return state;
  }
}


const actions = {}

/**
  *  page
  *
  */
actions[saveDistr] = actions[saveList]= (state,action)=>{
  let {list,item,page,pageSize,totalRecord}=action.payload
  return {
    ...state,
    page:{
      current:page,
      pageSize:pageSize,
      total:totalRecord
    }
  }
}

actions[saveLink]= (state,action)=>{
  return {
    ...state,
    information:Object.assign({},state.information,{links:action.payload})
  }
}

actions[saveListLink] = (state,action)=>{
  return {
    ...state,
    information:Object.assign({},state.information,{links:action.payload})
  }
}

actions[saveAdditionInfo] = (state,action)=>{
  return {
    ...state,
    information:Object.assign({},state.information,{files:action.payload})
  }
}



actions[removeLink] = (state,action)=>{
  return {
    ...state,
    information:Object.assign({},state.information,{links:action.payload})
  }


}


actions[saveParams] = ( state , action)=>{
  return {
    ...state,
    params:Object.assign({},state.params,action.payload)
  }
}

actions[saveCount] = ( state , action)=>{
  return {
    ...state,
    count:Object.assign({},state.count,action.payload)
  }
}
/*每次重新加载复选框时 清空前一次的params notes参数*/
actions[saveChecks] = ( state , action)=>{
  return {
    ...state,
    checks:action.payload.checks
  }
}
actions[saveDetail] = ( state,action ) =>{
    return {
      ...state,
      item:action.payload
    }
}

actions[saveBaseInfo] = ( state,action ) =>{
    return {
      ...state,
      baseInfo:action.payload
    }
}

actions[saveResumeInfo] = ( state,action ) =>{
  return {
    ...state,
    baseInfo:Object.assign({},state.baseInfo,{resumeInfo:action.payload})
  }
}

actions[saveResumeObj] = ( state,action ) =>{
  return {
    ...state,
    baseInfo:Object.assign({},state.baseInfo,{objectives:action.payload})
  }
}

function judgeType(array,json){
  let newarr = array.filter(it=>{
    return it.id == json.id
  })
  return newarr.length > 0
}

actions[addFeedData]=(state,action) =>{
  console.log(action.payload)
  return Object.assign({},state,{feedInfo:{list:[action.payload].concat(state.feedInfo.list)}})
}

actions[saveResumeJob] = ( state,action ) =>{
  let jobs = state.baseInfo.jobs
  if(judgeType(jobs,action.payload)){
    jobs = jobs.map((it)=>{
      return it.id == action.payload.id ? Object.assign({},it,action.payload) : it
    })
  }else{
     jobs.push(action.payload)
  }

  state.baseInfo.jobs = jobs
  return {
    ...state
  }
}

actions[saveResumePro] = ( state,action ) =>{
  let projects = state.baseInfo.projects
  if(judgeType(projects,action.payload)){
    projects = projects.map((it)=>{
      return it.id == action.payload.id ? Object.assign({},it,action.payload) : it
    })
  }else{
    projects.push(action.payload)
  }
  state.baseInfo.projects = projects
  return {
    ...state
  }
}

actions[saveResumeEdu] = ( state,action ) =>{
  let educations = state.baseInfo.educations
  if(judgeType(educations,action.payload)){
    educations = educations.map((it)=>{
      return it.id == action.payload.id ? Object.assign({},it,action.payload) : it
    })
  }else{
     educations.push(action.payload)
  }
  state.baseInfo.educations = educations
  return {
    ...state
  }
}

actions[saveResumeLan] = ( state,action ) =>{
  let languages = state.baseInfo.languages
  if(judgeType(languages,action.payload)){
    languages = languages.map((it)=>{
      return it.id == action.payload.id ? Object.assign({},it,action.payload) : it
    })
  }else{
    languages.push(action.payload)
  }
  state.baseInfo.languages = languages
  return {
    ...state
  }
}

actions[saveResumeCre] = ( state,action ) =>{
  let credentials = state.baseInfo.credentials
  if(judgeType(credentials,action.payload)){
    credentials = credentials.map((it)=>{
      return it.id == action.payload.id ? Object.assign({},it,action.payload) : it
    })
  }else{
     credentials.push(action.payload)
  }
  state.baseInfo.credentials = credentials
  return {
    ...state
  }
}

actions[saveResumeTra] = ( state,action ) =>{
  let trainings = state.baseInfo.trainings
  if(judgeType(trainings,action.payload)){
    trainings = trainings.map((it)=>{
      return it.id == action.payload.id ? Object.assign({},it,action.payload) : it
    })
  }else{
    trainings.push(action.payload)
  }
  state.baseInfo.trainings = trainings
  return {
    ...state
  }
}

actions[saveFeedData] = ( state,action ) =>{
    return {
      ...state,
      feedInfo:action.payload
    }
}

actions[saveRemark] = ( state,action ) =>{
    return {
      ...state,
      remarks:action.payload
    }
}

actions[saveOption] = ( state,action ) =>{
    return {
      ...state,
      options:action.payload
    }
}

actions[sendRemarkSave] = ( state,action ) =>{
    return {
      ...state,
      remarks: [action.payload,...state.remarks]
    }
}

actions[saveOffer] = ( state,action ) =>{
    return {
      ...state,
      offer: action.payload
    }
}

actions[saveCommiun] = ( state,action ) =>{
    return {
      ...state,
      commitcate: action.payload
    }
}

actions[saveInterviwPlan] = ( state,action ) =>{
    return {
      ...state,
      interviewInfo: action.payload
    }
}



const reducer = handleActions(actions, initialState)

export {initialState,CONSTANTS}

export default reducer;

/**
 * @Date:   2017-09-07T08:39:52+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-26T09:29:32+08:00
 */

import FetchAPI from 'app-utils/FetchAPI'

export default class API extends FetchAPI {
  constructor(props) {
    super(props);
  }

  /* fetchJobList(params) {
  //     return this.fetchPostList(`${APP_SERVER}/job/listPageJson`, {body: params})
  } */
  fetchJobList(params) {
    return this.fetchPostList(`${APP_SERVER}/jobNew/listPageJson`, {body: params})
  }
  fetchItem(params){
    return this.fetchPost(`${APP_SERVER}/jobNew/infoJson`, {body: params})
  }
  fetchSaveComapny(params){
    return this.fetchPost(`${APP_SERVER}/company/insertCompany`, {body: params})
  }
  fetchComapnyList(params){
    return this.fetchPost(`${APP_SERVER}/company/selectCompanyNames`, {body: params})
  }
  fetchJobCount(params){
    return this.fetchPost(`${APP_SERVER}/jobNew/getJobCount`, {body: params})
  }
  fetchMergeJob(params){
    return this.fetchPost(`${APP_SERVER}/jobNew/mergeJob`,{body:params})
  }
  fetchChangeHr(params){
    return this.fetchPost(`${APP_SERVER}/jobNew/updateHr`,{body:params})
  }
  fetchJobStatus(params){
    return this.fetchPost(`${APP_SERVER}/jobDetailNew/upOrDel`,{body:params})
  }
  fetchSearchCompany(params){
    return this.fetchPostList(`${APP_SERVER}/jobDetailNew/selectList`,{body:params})
  }
  fetchChannelJobInit(params){
    return this.fetchPost(`${APP_SERVER}/jobDetailNew/saveLocalJob`,{body:params})
  }
  fetchUpdateJob(params){
    return this.fetchPost(`${APP_SERVER}/jobNew/updateJobJson`,{body:params})
  }
  fetchUpdateJobMuch(params){
    return this.fetchPost(`${APP_SERVER}/jobNew/updateJob`,{body:params})
  }
  fetchUpsertItem(params){
    return this.fetchPost(`${APP_SERVER}/jobNew/saveJson`,{body:params})
  }
  fetchDeleteComfrim(params){
    return this.fetchPost(`${APP_SERVER}/jobNew/deleteFindResume`,{body:params})
  }
  fetchDelete(params){
    return this.fetchPost(`${APP_SERVER}/jobNew/deleteJson`,{body:params})
  }
  fetchRules(params){
    return this.fetchPost(`${APP_SERVER}/resumeStoreRules/getStoreRules`,{body:params})
  }
  fetchCancle(params){
    return this.fetchPost(`${APP_SERVER}/resumeStoreRules/updateByType`,{body:params})
  }
  fetchSynchron(params){
    return this.fetchPost(`${APP_SERVER}/jobDetailNew/synchronizeJob`,{body:params})
  }

}

/**
 * @Date:   2017-09-07T08:39:52+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-02-26T09:01:25+08:00
 */

import FetchAPI from 'app-utils/FetchAPI'

export default class API extends FetchAPI {
  constructor(props) {
    super(props);
	}
	fetchRecommond(params){
		return this.fetchPost(`${APP_SERVER}/resume/opt/sendToInterviewer`, {body: params})
	}
	fetchTalentCount(params) {
    return this.fetchPost(`${APP_SERVER}/talentNew/getTalentCount`, {body: params})
  }
  fetchEliteList(params) {
    return this.fetchPostList(`${APP_SERVER}/talentNew/findTalentsList`, {body: params})
  }
    fetchTags(params){
        return this.fetchPost(`${APP_SERVER}/talentInfo/getTalentCodeList`, {body: params})
    }
    fetchAddTag(params){
        return this.fetchPost(`${APP_SERVER}/talentInfo/saveJson`, {body: params})
    }
  fetchItem(params) {
      return this.fetchPost(`${APP_SERVER}/talentInfo/allInfoJson`, {body: params})
	}

	fetchRelate2Job(params){
		return this.fetchPost(`${APP_SERVER}/talentNew/relationJob`, {body: params})
  }
  fetchDelete(params){
		return this.fetchPost(`${APP_SERVER}/talentNew/deleteBatch`, {body: params})
  }
  fetchRejectForm(params){
      return this.fetchPost(`${APP_SERVER}/talentInfo/relatedJob`, {body: params})
  }
	fetchJoinElite(params){
		return this.fetchPost(`${APP_SERVER}/talentNew/joinTalentLibrary`, {body: params})
	}
    fetchAddBasic(params){
        return this.fetchPost(`${APP_SERVER}/talentInfo/saveJson`, {body: params})
    }
    fetchAddFollow(params){
        return this.fetchPost(`${APP_SERVER}/talentFollow/saveJson`, {body: params})
    }
    fetchAddWork(params){
        return this.fetchPost(`${APP_SERVER}/talentJobs/saveJson`, {body: params})
    }
    fetchAddPro(params){
        return this.fetchPost(`${APP_SERVER}/talentProjects/saveJson`, {body: params})
    }
    fetchAddEdu(params){
        return this.fetchPost(`${APP_SERVER}/talentEducations/saveJson`, {body: params})
    }
    fetchAddSki(params){
        return this.fetchPost(`${APP_SERVER}/talentLanguages/saveJson`, {body: params})
    }
    fetchAddCert(params){
        return this.fetchPost(`${APP_SERVER}/talentCredentials/saveJson`, {body: params})
    }
    fetchAddTrain(params){
        return this.fetchPost(`${APP_SERVER}/talentTrainings/saveJson`, {body: params})
    }
}

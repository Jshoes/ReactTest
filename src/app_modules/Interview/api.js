/**
 * @Date:   2017-09-07T08:39:52+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-02-23T15:42:01+08:00
 */

import FetchAPI from 'app-utils/FetchAPI'

export default class API extends FetchAPI {
	constructor(props) {
		super(props);
	}

	fetchList(params) {
		return this.fetchPostList(`${APP_SERVER}/interviewPlan/listPageJson`, { body: params })
	}
	fetchListCount(params){
		return this.fetchPostList(`${APP_SERVER}/interviewPlan/getInterviewCount`, { body: params })
	}
	fetchTodo(params) {
		return this.fetchPost(`${APP_SERVER}/interviewPlan/getInterviewTimes`, { body: params })
	}
	fetchDate(params) {
		return this.fetchPost(`${APP_SERVER}/interviewPlan/list`, { body: params })
	}
	fetchRejectForm(params) {
		return this.fetchPost(`${APP_SERVER}/interview/refuse`, { body: params })
	}
	fetchCount(params) {
		return this.fetchPost(`${APP_SERVER}/interview/countJson`, { body: params })
	}
	fetchDelay(params) {
		return this.fetchPost(`${APP_SERVER}/interviewPlan/changeTime`, { body: params })
	}
	fetchFeedSaveForm(params) {
		return this.fetchPost(`${APP_SERVER}/interview/saveJson`, { body: params })
	}
	fetchOfferSave(params) {
		return this.fetchPost(`${APP_SERVER}/interview/offer`, { body: params })
	}
	fetchFeedData(params) {
		return this.fetchPostList(`${APP_SERVER}/interviewPlan/listJson`, { body: params })
	}
	fetchFeedBack(params) {
		return this.fetchPost(`${APP_SERVER}/interviewFeedback/getListJson`, { body: params })
	}
	fetchFeedBackSave(params) {
		return this.fetchPost(`${APP_SERVER}/interviewFeedback/saveJson`, { body: params })
	}
	fetchUrge(params) {
		return this.fetchPost(`${APP_SERVER}/interviewPlan/feedback`, { body: params })
	}
}

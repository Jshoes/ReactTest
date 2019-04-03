/**
 * @Date:   2017-09-07T08:39:52+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-02-23T13:16:34+08:00
 */

import FetchAPI from 'app-utils/FetchAPI'

export default class ScheduleAPI extends FetchAPI {
  constructor(props) {
    super(props);
  }

  fetchItem(params) {
    return this.fetchPost(`${APP_SERVER}/schedule/infoJson`, {
      body: params
    })
  }
	fetchUnreadMsgList(params) {
    return this.fetchPostList(`${APP_SERVER}/messageSend/findNoReadJson`, {
      body: params
    })
	}
  fetchSave(params) {
    return this.fetchPost(`${APP_SERVER}/schedule/saveJson`, {
      body: params
    })
  }

  fetchTodo(params) {
    return this.fetchPost(`${APP_SERVER}/schedule/listJson`, {
      body: params
    })
	}

	fetchHireData(params) {
    return this.fetchPostList(`${APP_SERVER}/report/reportWorkload/getRecruitData`, {
      body: params
    })
	}
	fetchRecentData(params) {
    return this.fetchPost(`${APP_SERVER}/report/reportWorkload/getRecentData`, {
      body: params
    })
	}

}

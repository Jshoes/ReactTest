/**
 * @Date:   2017-09-07T08:39:52+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-06T10:09:41+08:00
 */

import FetchAPI from 'app-utils/FetchAPI'

export default class API extends FetchAPI {
  constructor(props) {
    super(props);
  }

  fetchList(params) {
    return this.fetchPostList(`${APP_SERVER}/reportResume/listJson`, {body: params})
  }
  fetchHrList(params) {
      return this.fetchPostList(`${APP_SERVER}/report/recruit/listJson`, {body: params})
  }
  fetchCallRecordList(params) {
      return this.fetchPostList(`${APP_SERVER}/reportCallRecord/listDetailJson`, {body: params})
  }

  fetchExport(url,params){
      return this.fetchPostDownload(url, {body: params})
  }


	fetchRightList(params) {
		return this.fetchPostList(`${APP_SERVER}/accountOperate/listJson`, {
			body: params
		})
	}
  /*
  fetchMenu(params) {
    return this.fetchGet(`${APP_SERVER}/cust/custFollow/List/custFollowMenuJson`, {body: JSON.stringify(params)})
  }
  fetchItem(id) {
    return this.fetchGet(`${APP_SERVER}/follow/1`, {
      body: JSON.stringify({"id": id})
    })
  }


  fetchSave(obj) {
    return this.fetchPost(`${APP_SERVER}/follow/`, {body: JSON.stringify(obj)})
  }

  fetchRemove(id) {
    return this.fetchDelete(`${APP_SERVER}/follow/1`, {
      body: JSON.stringify({"id": id})
    })
  }
  */
	// 招聘现状
	fetchHireQuoReport(params) {
    return this.fetchPostList(`${APP_SERVER}/jobNew/recruitPageJson`, {body: params})
	}
	fetchExportHireQuoReport(params) {
    return this.fetchDownload(`${APP_SERVER}/jobNew/export`, {body: params})
	}
	// 工作量统计
	fetchWorkloadReport(params) {
    return this.fetchPostList(`${APP_SERVER}/report/reportWorkload/listJson`, {body: params})
	}
	// 原因统计
	fetchReasonReport(params) {
    return this.fetchPostList(`${APP_SERVER}/report/reportWorkload/getReasonReport`, {body: params})
	}
	// 反馈统计
	fetchFeedbackReport(params) {
    return this.fetchPostList(`${APP_SERVER}/reportFeedback/listPageJson`, {body: params})
	}
	fetchExportFeedbackReport(params) {
    return this.fetchDownload(`${APP_SERVER}/reportFeedback/export`, {body: params})
	}
	// 渠道统计
	fetchChannelReport(params) {
    return this.fetchPostList(`${APP_SERVER}/reportChannel/findChannelReportList`, {body: params})
	}
	fetchExportChannelReport(params) {
    return this.fetchDownload(`${APP_SERVER}/reportChannel/export`, {body: params})
	}
	// 通信统计
	fetchCallReport(params) {
    return this.fetchPostList(`${APP_SERVER}/reportCallRecord/listJson`, {body: params})
	}
	// 备注统计
	fetchRemarkReport(params) {
    return this.fetchPostList(`${APP_SERVER}/reportRemark/listPageJson`, {body: params})
	}
}

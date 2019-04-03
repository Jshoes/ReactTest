
import FetchAPI from 'app-utils/FetchAPI'

export default class FollowAPI extends FetchAPI {
  constructor(props) {
    super(props);
  }
  fetchLogList(params) {
    return this.fetchPostList(`${APP_SERVER}/messageSend/findMsgListJson`, {
      body: params
    })
	}
	fetchUpdateLogList(params) {
    return this.fetchPostList(`${APP_SERVER}/messageSend/findGxrzList`, {
      body: params
    })
	}
	fetchUnreadMsgList(params) {
    return this.fetchPostList(`${APP_SERVER}/messageSend/findNoReadJson`, {
      body: params
    })
	}
	fetchLogDetail(params) {
    return this.fetchPost(`${APP_SERVER}/messageSend/getInfoJson`, {
      body: params
    })
  }
}

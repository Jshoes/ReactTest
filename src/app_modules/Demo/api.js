/**
 * @Date:   2017-09-07T08:39:52+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-26T09:28:48+08:00
 */

import FetchAPI from 'app-utils/FetchAPI'

export default class API extends FetchAPI {
  constructor(props) {
    super(props);
  }

  fetchCreditList(params) {
    return this.fetchPostList(`${APP_SERVER}/sincerityLibrary/listPageJson`, {body: params})
  }
  fetchDelete(params){
    return this.fetchPost(`${APP_SERVER}/sincerityLibrary/saveJson`, {body: params})
  }
    fetchAdd(params){
        return this.fetchPost(`${APP_SERVER}/sincerityLibrary/saveJson`, {body: params})
    }
}

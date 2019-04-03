/**
 * @Date:   2017-09-07T08:39:52+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-02-09T09:05:22+08:00
 */

import FetchAPI from 'app-utils/FetchAPI'

export default class API extends FetchAPI {
  constructor(props) {
    super(props);
  }

  fetchConst(params) {
    return this.fetchGet(`${APP_SERVER}/code/codesJson`, {body: params})
  }
  fetchMenu(params){
    return this.fetchGet(`${APP_SERVER}/userResource/menuListJson`, {body: params})
  }
  fetchEmailConfig(params){
    return this.fetchGet(`${APP_SERVER}/email/config/getEmailConfig`, {body: params})
  }
  fetchSendUnBindKeyCode(params){
    return this.fetchPost(`${APP_SERVER}/email/config/sendUnBindKeyCode`, {body: params})
  }
  fetchSendBindCode(params){
    return this.fetchPost(`${APP_SERVER}/email/config/sendBindCode`, {body: params})
  }
  fetchBindEmail(params){
    return this.fetchPost(`${APP_SERVER}/email/config/bindEmail`, {body: params})
  }
  fetchCheckUnBindCode(params){
    return this.fetchPost(`${APP_SERVER}/email/config/checkUnBindCode`, {body: params})
  }
  fetchCheckEmailPaw(params){
    return this.fetchPost(`${APP_SERVER}/email/config/checkEmailPaw`, {body: params})
  }
}

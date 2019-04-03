
/**
 * @Date:   2017-09-07T08:39:52+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-26T09:30:49+08:00
 */



import FetchAPI from 'app-utils/FetchAPI'

export default class SoundAPI extends FetchAPI {
    constructor(props) {
      super(props);
    }

    fetchList(params){
      return this.fetchPostList(`${APP_SERVER}/callrecord/newListPage`,{
         body: params
      })
    }
    fetchDownloads(url,params){
        return this.fetchDownload(url, {body: params})
    }
}

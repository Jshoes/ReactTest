/**
 * Created by Administrator on 2018/3/12.
 */


import FetchAPI from 'app-utils/FetchAPI'

export default class API extends FetchAPI {
    constructor(props) {
        super(props);
    }
    fetchList(params) {
        return this.fetchPostList(`${APP_SERVER}/accountOperate/bountyRecord `, {body: params})
    }
    fetchWithdrawals(params){
        return this.fetchPost(`${APP_SERVER}/accountOperate/withdraw `, {body: params})
    }
    fetchCurrAcc(params){
        return this.fetchPost(`${APP_SERVER}/accountOperate/getPresentAccount`, {
            body: params
        })
    }
    fetchRecordList(params){
        return this.fetchPostList(`${APP_SERVER}/accountOperate/bountyWithdrawRecord `, {body: params})
    }
    fetchAuthent(params){
        return this.fetchPost(`${APP_SERVER}/accountOperate/realName`, {
            body: params
        })
    }
    fetchChange(params){
        return this.fetchPost(`${APP_SERVER}/accountOperate/editPassword`, {
            body: params
        })
    }
    fetchAccount(params){
        return this.fetchPost(`${APP_SERVER}/accountOperate/accountInfo`, {
            body: params
        })
    }
    fetchPromoCode(params){
        return this.fetchPost(`${APP_SERVER}/accountOperate/getPromoCode`, {
            body: params
        })
    }
}
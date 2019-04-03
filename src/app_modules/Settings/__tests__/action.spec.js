/**
 * @Date:   2017-09-04T15:34:26+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2017-09-07T15:16:47+08:00
 */

import fetch from 'jest-fetch-mock'
import mockStore from 'app-utils/MockStore'
import createStoreWithMiddleware from 'app-utils/CreateStore'
import global from 'app-utils/MockGlobal'
import moment from 'moment'
import reducer from '../reducer'
import * as actions from '../action'

const CONSTANTS = actions.default
const { mailboxSaveList } =actions

console.log(mailboxSaveList.toString())
describe('mailbox mailboxListAction  actions test', () => {
  //此处MOCK fetch  可以考虑与api  共用
  it('fetch mailbox list success' ,(done)=>{
    fetch.mockResponse(JSON.stringify({list:[]}))
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "tableSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "tableSpin", "spin": false}
      },{
        type :mailboxSaveList.toString(),
          "payload": []
      }
    ]
    const store = mockStore(reducer)
    store.dispatch(actions.mailboxListAction())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })

  it('fetch mailbox list failure' ,(done)=>{
    // fetch.mockResponse(JSON.stringify()
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "tableSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "tableSpin", "spin": false}
      },{
        type :mailboxSaveList.toString(),
          "payload": []
      }
    ]
    const store = mockStore(reducer)
    store.dispatch(actions.mailboxListAction())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })
})

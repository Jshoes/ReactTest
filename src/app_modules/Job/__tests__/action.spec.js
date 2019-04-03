/**
 * @Date:   2017-09-04T15:34:26+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2017-09-07T15:16:47+08:00
 */

import fetch from 'jest-fetch-mock'
import mockStore from 'app-utils/MockStore'
import createStoreWithMiddleware from 'app-utils/CreateStore'
import global from 'app-utils/MockGlobal'

import reducer from '../reducer'
import CONSTANTS,{itemAction,listAction,deleteAction} from '../action'

describe('credit actions test', () => {
  //此处MOCK fetch  可以考虑与api  共用
  it('should be listAction',(done)=>{
   fetch.mockResponse(JSON.stringify({list:[],pageSize:10,current:1,totalRecord:10}))
   const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "tableSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "tableSpin", "spin": false}
      },{
        type :CONSTANTS.SAVE_LIST,
          "payload": {list:[],page:{pageSize:10,current:1,totalRecord:10}}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(listAction())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })

  it('should be listAction response 500',(done)=>{
   fetch.mockResponse({},{status:500})
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "tableSpin", "spin": true}
      },{
        type :CONSTANTS.FETCH_FAILURE,
          "payload": {"spin": false,"label": "tableSpin",status:"Internal Server Error"}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(listAction())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })

  it('should be itemAction',(done)=>{
    fetch.mockResponse(JSON.stringify({}))
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "itemSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "itemSpin", "spin": false}
      },{
        type :CONSTANTS.SAVE_ITEM,
          "payload": {item:{}}
      }
    ]
    const store = mockStore(reducer)
    store.dispatch(itemAction())
     .then(() => { // return of async actions
       expect(store.getActions()).toEqual(expectedActions)
     }).then(done)
  })
})

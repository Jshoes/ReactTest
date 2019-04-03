/**
 * @Date:   2017-09-04T15:34:26+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-02-23T16:45:09+08:00
 */

import fetch from 'jest-fetch-mock'
import mockStore from 'app-utils/MockStore'
import createStoreWithMiddleware from 'app-utils/CreateStore'
import global from 'app-utils/MockGlobal'

import reducer from '../reducer'
import CONSTANTS,{itemAction,listAction} from '../action'

describe('Resume listAction test', () => {
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

})
describe('Resume itemAction actions test', () => {
  it('should be itemAction',(done)=>{
    fetch.mockResponse(JSON.stringify({id:[]}))
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "formSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "formSpin", "spin": false}
      },{
        type :CONSTANTS.SAVE_ITEM,
          "payload": {item:{id:[]}}
      }
    ]
    const store = mockStore(reducer)
    store.dispatch(itemAction())
     .then(() => { // return of async actions
       expect(store.getActions()).toEqual(expectedActions)
     }).then(done)
  })

  it('should be itemAction response 500',(done)=>{
   fetch.mockResponse({},{status:500})
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "formSpin", "spin": true}
      },{
        type :CONSTANTS.FETCH_FAILURE,
        "payload": {"spin": false,"label": "formSpin",status:"Internal Server Error"}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(itemAction())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })

})

describe('Resume folderAction actions test', () => {

})

describe('Resume waitingAction actions test', () => {

})

describe('Resume relatedForm actions test', () => {

})

describe('Resume feedbackSaveAction actions test', () => {

})

describe('Resume entryApplyAction actions test', () => {

})

describe('Resume joinEliteAction actions test', () => {

})

describe('Resume rejectForm actions test', () => {

})

describe('Resume idDataAction actions test', () => {

})

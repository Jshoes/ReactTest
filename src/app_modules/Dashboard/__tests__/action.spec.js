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
import CONSTANTS,{loadPeople,loadNoticesList,loadNotices,loadTodos,deleteAction,itemAction,saveAction} from '../action'

describe('Dashboard loadNoticesList actions test', () => {
  //此处MOCK fetch  可以考虑与api  共用
  it('should be listAction',(done)=>{
   fetch.mockResponse(JSON.stringify({list:[]}))
   const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "noticeSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "noticeSpin", "spin": false}
      },{
        type :CONSTANTS.SAVE_NOTICESLIST,
          "payload": {list:[]}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(loadNoticesList())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })
  it.skip('should be listAction response 500',(done)=>{
   fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "noticeSpin", "spin": true}
      },{
        type :CONSTANTS.FETCH_FAILURE,
          "payload": {"spin": false,"label": "noticeSpin",status:"Internal Server Error"}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(loadNoticesList())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })
})
describe('Dashboard loadPeople actions test', () => {
  it('should be loadPeople',(done)=>{
   fetch.mockResponse(JSON.stringify({list:[]}))
   const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "peopleSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "peopleSpin", "spin": false}
      },{
        type :CONSTANTS.SAVE_PEOPLE,
          "payload": {list:[]}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(loadPeople())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })
  it.skip('should be loadPeople response 500',(done)=>{
   fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "peopleSpin", "spin": true}
      },{
        type :CONSTANTS.FETCH_FAILURE,
          "payload": {"spin": false,"label": "peopleSpin",status:"Internal Server Error"}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(loadPeople())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })
})
describe('Dashboard loadTodos actions test', () => {
  it('should be loadTodos',(done)=>{
   fetch.mockResponse(JSON.stringify({list:[]}))
   const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "todoSpin", "spin": true}
      },{
        type :CONSTANTS.SAVE_PARAMS,
        "payload": {params:undefined}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "todoSpin", "spin": false}
      },{
        type :CONSTANTS.SAVE_TODOS,
          "payload": {list:[]}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(loadTodos())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })
  it('should be loadTodos with params',(done)=>{
   fetch.mockResponse(JSON.stringify({list:[]}))
   const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "todoSpin", "spin": true}
      },{
        type :CONSTANTS.SAVE_PARAMS,
        "payload": {params:{date:'2018-01-01'}}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "todoSpin", "spin": false}
      },{
        type :CONSTANTS.SAVE_TODOS,
          "payload": {list:[]}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(loadTodos({date:'2018-01-01'}))
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })
  it.skip('should be loadTodos response 500',(done)=>{
   fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "todoSpin", "spin": true}
      },{
        type :CONSTANTS.FETCH_FAILURE,
          "payload": {"spin": false,"label": "todoSpin",status:"Internal Server Error"}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(loadTodos())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })
})
describe('Dashboard loadNotices actions test', () => {
  it('should be loadNotices',(done)=>{
   fetch.mockResponse(JSON.stringify({zyxxList:[]}))
   const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "noticeSpin", "spin": true}
      },{
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "noticeSpin", "spin": false}
      },{
        type :CONSTANTS.SAVE_NOTICES,
          "payload": {list:[]}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(loadNotices())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })

  it.skip('should be loadNotices response 500',(done)=>{
   fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "noticeSpin", "spin": true}
      },{
        type :CONSTANTS.FETCH_FAILURE,
          "payload": {"spin": false,"label": "noticeSpin",status:"Internal Server Error"}
      }
    ]
   const store = mockStore(reducer)
   store.dispatch(loadNotices())
    .then(() => { // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    }).then(done)
  })
})
describe('Dashboard itemAction actions test', () => {
  it('should be itemAction',(done)=>{
    fetch.mockResponse(JSON.stringify({}))
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "formSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "formSpin", "spin": false}
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
describe('Dashboard deleteAction actions test', () => {
  it('should be deleteAction',(done)=>{
    fetch.mockResponse(JSON.stringify({id:1}))
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "formSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "formSpin", "spin": false}
      }, {
        type :CONSTANTS.REMOVE_ITEM,
        "payload": {id:1}
      }
    ]
    const store = mockStore(reducer)
    store.dispatch(deleteAction())
     .then(() => { // return of async actions
       expect(store.getActions()).toEqual(expectedActions)
     }).then(done)
  })
})
describe('Dashboard saveAction actions test', () => {
  it('should be saveAction',(done)=>{
    fetch.mockResponse(JSON.stringify({id:1}))
    const expectedActions = [
      {
        "type":CONSTANTS.FETCH_REQUEST,
        "payload": {"label": "formSpin", "spin": true}
      }, {
        type :CONSTANTS.FETCH_SUCCESS,
        "payload": {"label": "formSpin", "spin": false}
      }, {
        type :CONSTANTS.SAVE_ITEM,
        "payload": {item:{id:1}}
      }
    ]
    const store = mockStore(reducer)
    store.dispatch(saveAction({scheduleEndTime:moment(),scheduleStartTime:moment()}))
     .then(() => { // return of async actions
       expect(store.getActions()).toEqual(expectedActions)
     }).then(done)
  })
})

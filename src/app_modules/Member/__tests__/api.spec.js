
import MockFetch from 'mock-fetch-api'
import global from 'app-utils/MockGlobal'
import mockData from 'app-mock/mockData.template'
import mock from 'app-mock/member.mock'
import API from '../api'

jest.autoMockOff();


describe('aip test fetchPostList 200', () =>  {
//  MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(200, {list:[],item:{}});
  it('api fetchPostList',(done) =>{
    new API().fetchList().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })
  it('api fetch list 500',(done) =>{
    MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(500, {list:[],item:{}});
    new API().fetchList().then(json => {
    //  console.log(json)
    }).then(done)
  })
})

describe('aip test fetchItem', () =>  {
  it('api fetchItem',(done) =>{
    new API().fetchItem().then(json => {
      return expect(json).toHaveProperty("id")
    }).then(done)
  })
})

describe('aip test fetchSave', () =>  {
  it('api fetchSave',(done) =>{
    new API().fetchSave().then(json => {
      return expect(json).toHaveProperty("id")
    }).then(done)
  })
})

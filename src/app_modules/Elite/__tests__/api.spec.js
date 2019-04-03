
import MockFetch from 'mock-fetch-api'
import global from 'app-utils/MockGlobal'
import mockData from 'app-mock/mockData.template'
import mock from 'app-mock/elite.mock'
import API from '../api'

jest.autoMockOff();


describe('aip test fetchEliteList 200', () =>  {
  it('api fetchPostList 200',(done) =>{
    new API().fetchEliteList().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })

  it('api fetch list 500',(done) =>{
    MockFetch.when('POST', `${APP_SERVER}/talentInfo/listPageJson`).respondWith(500, {list:[],item:{}});
    new API().fetchEliteList().then(json => {
    //  console.log(json)
    }).then(done)
  })

})

describe('aip test fetchItem ', () =>  {
  it('api fetchItem 200',(done) =>{
    new API().fetchEliteList().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })

})

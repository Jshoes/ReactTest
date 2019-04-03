
import fetch from 'jest-fetch-mock'
import global from 'app-utils/MockGlobal'

import API from '../api'

jest.autoMockOff();


describe('aip test fetchCreditList', () =>  {
 // MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(200, {list:[],item:{}});
  it('api fetchPostList 200',(done) =>{
    fetch.mockResponse(JSON.stringify({list:[]}))
    new API().fetchCreditList().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })
  it('api fetchCreditList 500',(done) =>{
    fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    new API().fetchCreditList().catch(json => {
    }).then(done)
  })
})

describe('aip test fetchDelete ', () =>  {
  it('api fetchDelete 200',(done) =>{
    fetch.mockResponse(JSON.stringify({id:[]}))
    new API().fetchDelete().then(json => {
      return expect(json).toHaveProperty("id")
    }).then(done)
  })
  it('api fetchDelete 500',(done) =>{
    fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    new API().fetchDelete().catch(json => {
    //  console.log(json)
    }).then(done)
  })
})

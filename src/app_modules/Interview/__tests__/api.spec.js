
import global from 'app-utils/MockGlobal'
import fetch from 'jest-fetch-mock'
// import mockData from 'app-mock/mockData.template'
// import mock from 'app-mock/interview.mock'
import API from '../api'

jest.autoMockOff();


describe('aip test fetchPostList ', () =>  {
//  MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(200, {list:[],item:{}});

  it('api fetchPostList',(done) =>{
    fetch.mockResponse(JSON.stringify({list:[]}))
    new API().fetchList().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })

  it('api fetchPostList 500 ',(done) =>{
    // MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(500, {list:[],item:{}});
   fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    new API().fetchList().catch(err => {
      // err.response.status=='500'
      done()
    })
  })
})

describe('aip test fetchTodo', () =>  {
  it('api fetchTodo',(done) =>{
    fetch.mockResponse(JSON.stringify({list:[]}))
    new API().fetchTodo().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })

  it('api fetchTodo 500 ',(done) =>{
     fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    // MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(500, {list:[],item:{}});
    new API().fetchTodo().catch(err => {
      done()
    })
  })
})

describe('aip test fetchFeedBackSave', () =>  {
  it('api fetchFeedBackSave',(done) =>{
    fetch.mockResponse(JSON.stringify({id:[]}))
    new API().fetchFeedBackSave().then(json => {
      return expect(json).toHaveProperty("id")
    }).then(done)
  })

  it('api fetchFeedBackSave 500 ',(done) =>{
    fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    // MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(500, {list:[],item:{}});
    new API().fetchFeedBackSave().catch(err => {
    //  console.log(json)
      done()
    })
  })
})

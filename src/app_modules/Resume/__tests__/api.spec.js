
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
   fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    new API().fetchList().catch(err => {
      // err.response.status=='500'
      done()
    })
  })
})

describe('aip test fetchFolderList ', () =>  {
//  MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(200, {list:[],item:{}});

  it('api fetchFolderList',(done) =>{
    fetch.mockResponse(JSON.stringify({list:[]}))
    new API().fetchList().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })

  it('api fetchPostList 500 ',(done) =>{
   fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    new API().fetchFolderList().catch(err => {
      // err.response.status=='500'
      done()
    })
  })
})


describe('aip test fetchItem', () =>  {
  it('api fetchTodo',(done) =>{
    fetch.mockResponse(JSON.stringify({list:[]}))
    new API().fetchItem().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })

  it('api fetchTodo 500 ',(done) =>{
    fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    new API().fetchItem().catch(err => {
      done()
    })
  })
})

describe('aip test fetchItem', () =>  {
  it('api fetchItem',(done) =>{
    fetch.mockResponse(JSON.stringify({id:[]}))
    new API().fetchItem().then(json => {
      return expect(json).toHaveProperty("id")
    }).then(done)
  })

  it('api fetchItem 500 ',(done) =>{
    fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    // MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(500, {list:[],item:{}});
    new API().fetchItem().catch(err => {
    //  console.log(json)
      done()
    })
  })
})

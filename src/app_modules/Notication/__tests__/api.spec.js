
import fetch from 'jest-fetch-mock'
import global from 'app-utils/MockGlobal'

import API from '../api'

jest.autoMockOff();


describe('aip test fetchPostList 200', () =>  {
  it('api fetchPostList',(done) =>{
    fetch.mockResponse(JSON.stringify({list:[]}))
    new API().fetchJobList().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })

  it('aip test fetchPostList 500',(done) =>{
    fetch.mockResponse({},{status:500,responseText:"Internal Server Error"})
    new API().fetchJobList().catch(err=>{
      done()
    })
  })
})

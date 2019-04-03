import fetch from 'jest-fetch-mock'
import global from 'app-utils/MockGlobal'

import API from '../api'

jest.autoMockOff();

let response500 = {
  status:500,
  statusText:"Internal Server Error"
}

describe('aip test fetchTodo', () =>  {
  it('api fetchTodo response 200',(done) =>{
    fetch.mockResponse(JSON.stringify({list:[]}))
    new API().fetchTodo().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })
  it('api fetchTodo response 500',(done) =>{
    fetch.mockResponse({},response500)
    new API().fetchTodo().catch(json => {
      // console.log(json.response)
      expect(json.response.status).toEqual(response500.status)
      expect(json.response.statusText).toEqual(response500.statusText)
      // return expect(json).toHaveProperty("list")
    }).then(done)
  })
})


describe('aip test fetchNotices', () =>  {
  it('api fetchSave response 200',(done) =>{
    fetch.mockResponse(JSON.stringify({item:{}}))
    new API().fetchSave().then(json => {
      return expect(json).toHaveProperty("item")
    }).then(done)
  })
  it('api fetchSave response 500',(done) =>{
    fetch.mockResponse({},response500)
    new API().fetchSave().catch(json => {
      // return expect(json).toHaveProperty("item")
      expect(json.response.status).toEqual(response500.status)
      expect(json.response.statusText).toEqual(response500.statusText)
    }).then(done)
  })
})

describe('aip test fetchItem', () =>  {
  it('api fetchItem response 200',(done) =>{
    fetch.mockResponse(JSON.stringify({item:[]}))
    new API().fetchItem().then(json => {
      return expect(json).toHaveProperty("item")
    }).then(done)
  })

  it('api fetchItem response 500',(done) =>{
    fetch.mockResponse({},response500)
    new API().fetchItem().catch(json => {
      // return expect(json).toHaveProperty("item")
      expect(json.response.status).toEqual(response500.status)
      expect(json.response.statusText).toEqual(response500.statusText)
    }).then(done)
  })
})

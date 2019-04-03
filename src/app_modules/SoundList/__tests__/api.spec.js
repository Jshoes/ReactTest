
import API from '../api'
import MockFetch from 'mock-fetch-api'
import global from 'app-utils/MockGlobal'
import mock from 'app-mock/soundlist.mock'

jest.autoMockOff();


describe('aip test fetchItem', () =>  {
  it('api fetchItem',(done) =>{
    new API().fetchList().then(json => {
      return expect(json).toHaveProperty("list")
    }).then(done)
  })
})

import FetchAPI,{RequestAPI} from '../FetchAPI'
import fetch from 'jest-fetch-mock'
const {fetchGet,fetchPost,fetchPostList}=RequestAPI
jest.autoMockOff();


describe("Fetch api test", () => {
  it('api RequestAPI fetchGet',(done) =>{
    fetch.mockResponse(JSON.stringify({list:[]}))
    let request= new FetchAPI().fetchGet("/www",{
      body:{
        aa:1,
        b:2
      },
    })
    request.then(res=>console.log(res))
    // console.log(request)
    done()
  })
});


describe('Request API test ', () =>  {
 // MockFetch.when('POST', `${APP_SERVER}/sincerityLibrary/listPageJson`).respondWith(200, {list:[],item:{}});
  it('api RequestAPI fetchGet',(done) =>{

    let request= fetchGet("/www",{
      body:{
        aa:1,
        b:2
      },
      method:'GET',
    })
    // console.log(request)
    done()
  })

  it('api RequestAPI fetchPOST',(done) =>{
    let request= fetchPost("/www",{
      body:{
        aa:1,
        b:2
      }
    })
    // console.log(request)
    done()
  })

  it('api RequestAPI fetchPOSTList',(done) =>{
    let request= fetchPostList("/www",{
      body:{
        aa:1,
        b:2
      }
    })
    // console.log(request)
    done()
  })
})

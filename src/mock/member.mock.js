import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'
import MockData from 'app-mock/mockData.template'

let listResult=mockjs.mock(Object.assign({
  'list|10': [ MockData.member ]
},MockData.page))


let resultMenu=mockjs.mock({
   "data|10":[{
      "id":()=>{
        return Random.guid()
      },
      "name":()=>{
        return Random.cname()
      },
      "children|5":[{
        "id":()=>{
          return Random.guid()
        },
        "name":()=>{
          return Random.cname()
        },
        "isLeaf":()=>{
          return Random.boolean()
        }
      }]
   }]
})

let saveResult= mockjs.mock(MockData.member)


fetchMock.mock(`${APP_SERVER}/member/listPageJson`,listResult)
fetchMock.post(`${APP_SERVER}/member/infoJson`,saveResult)
fetchMock.mock(`${APP_SERVER}/member/saveJson`,saveResult)





// fetchMock.post(`${APP_SERVER}/passport/login`, {
//   msg:"身份认证失败",
//   data:{}
// });

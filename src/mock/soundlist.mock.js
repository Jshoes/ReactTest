import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'
import MockData from 'app-mock/mockData.template'

let result=mockjs.mock(Object.assign({
  'page':1,
  'total':1000,
  'pageSize':'20',
  'list|10': [ MockData.soundlist ]
},MockData.page))

fetchMock.mock(`${APP_SERVER}/callrecord/listPageJson`,result);

let hrList=mockjs.mock({
  'list|10': [
    () => {
      return Random.name();
    },
  ],
})

fetchMock.mock(`${APP_SERVER}/callrecord/hrListJson`,hrList);


// fetchMock.post(`${APP_SERVER}/passport/login`, {
//   msg:"身份认证失败",
//   data:{}
// });

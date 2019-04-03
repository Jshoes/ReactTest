import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'
import MockData from 'app-mock/mockData.template'
let result=mockjs.mock(Object.assign({
  'list|10': [ MockData.credit ]
},MockData.page))

fetchMock.mock(`${APP_SERVER}/sincerityLibrary/listPageJson`,result);




// fetchMock.post(`${APP_SERVER}/passport/login`, {
//   msg:"身份认证失败",
//   data:{}
// });

import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'

var hourTimestamp=60*60*100;
let result=mockjs.mock({
  page:1,
  pageSize:10,
  total:1000,
  'list|10': [{
      'jobId|+1': 1,
      'jobName': () => {
        return Random.name();
      },
      'name': () => {
          return Random.name();
      },
      'company': () => {
          return Random.name();
      },
      'interviewer': () => {
          return Random.name();
      },
      'sex|1-2':2,
      'age|18-65':65,
      'workyear|1-30':30,
      'education':'本科及以上',
      'status':"1面",
      'number':13526487894,
      'jobNum|1-20':20,
      'address': () => {
        return Random.city();
      },
      'channel':() => {
          return Random.region();
      },
      'marry':'已婚',
      'nowstatus|1-5':5,
      'interviewTime': () => {
        return Random.datetime('yyyy-MM-dd HH:mm');
      },
      'recentTime': () => {
          return Random.datetime('yyyy-MM-dd HH:mm');
      },
      'jobTotal|1-200': 200
    }]
})

fetchMock.mock(`${APP_SERVER}/interview/listJson`,result);
fetchMock.mock(`${APP_SERVER}/interview/listPageJson`,result);



// fetchMock.post(`${APP_SERVER}/passport/login`, {
//   msg:"身份认证失败",
//   data:{}
// });

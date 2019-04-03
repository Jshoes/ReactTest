import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'

var hourTimestamp=60*60*100;
let result=mockjs.mock({
  page: 2,
  pageSize: 10,
  total:1000,
  'list|10': [{
      'id|+1': 1,
      'jobTitle': () => {
        return Random.name();
      },
      'hrName': () => {
          return Random.name();
      },
      'resumeNum': () => {
        return '200(100/100)';
      },
      "callNum":()=>{
          return '(100/200)';
      },
      'searchRes|1-1000': 1000,
      'inviteFirstNum|1-500': 500,
      'arragneFirstNum|1-250': 250,
      'joinFirstNum|1-200': 200,
      'refuseNum|1-150': 150,
      'offerSendNum|1-10': 10,
      'initNum|1-5': 5,
      'timelength|1-60': 60,
      'date': () => {
          return Random.datetime('yyyy-MM-dd');
      },
      'peopleNum|1-150': 150,
      'smsNum|1-200': 200,
      'emailNum|1-150': 150,
    }]
})

fetchMock.mock(`${APP_SERVER}/report/listPageJson`,result);




// fetchMock.post(`${APP_SERVER}/passport/login`, {
//   msg:"身份认证失败",
//   data:{}
// });

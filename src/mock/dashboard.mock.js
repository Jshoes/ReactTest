import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'

var hourTimestamp=60*60*100;
let result=mockjs.mock({
  page:1,
  pageSize:10,
  total:1000,
  'list|7': [{
      'msgType|+1': 1,
      'name': () => {
        return Random.cname();
      },
      'icons': () => {
        return Random.image('125x125');
      },
      'zyxxList|7':[{
        zyxxNum:99,
        msgType:() =>{
          return Random.integer(1,7);
        }
      }],
      'zyxxNum|0-200': 200
    }]
})
fetchMock.mock(`${APP_SERVER}/messageSend/dtoinfoJson`,result);

let msgSendInfo = {
  "list" : [ {
    "keyType" : "",
    "keyWord" : "",
    "id" : "2018012916165964623603ca41f57f35",
    "messageId" : "2018012916165964623603ca41f57f35",
    "sendDate" : "2018-01-31",
    "updateDate" : "2018-02-08",
    "isDel" : 0,
    "orgId" : "111",
    "submitStatus" : "",
    "sendFrom" : "test1",
    "sendTo" : "test1",
    "title" : "员工转正",
    "messageContent" : "员工转正",
    "msgCenterContent" : "",
    "startTime" : "",
    "endTime" : "",
    "remark" : "",
    "msgType" : 4,
    "isRead" : 1,
    "contractType" : "",
    "bussinessId" : "",
    "content" : ""
  }, {
    "keyType" : "",
    "keyWord" : "",
    "id" : "201022916165964623603ca41f57f25",
    "messageId" : "201022916165964623603ca41f57f25",
    "sendDate" : "2018-01-31",
    "updateDate" : "2018-02-08",
    "isDel" : 0,
    "orgId" : "111",
    "submitStatus" : "",
    "sendFrom" : "test1",
    "sendTo" : "test1",
    "title" : "员工转正",
    "messageContent" : "员工转正",
    "msgCenterContent" : "",
    "startTime" : "",
    "endTime" : "",
    "remark" : "",
    "msgType" : 4,
    "isRead" : 1,
    "contractType" : "",
    "bussinessId" : "",
    "content" : ""
  } ],
}
fetchMock.mock(`${APP_SERVER}/messageSend/listJson`,msgSendInfo);

// 'list':[ {
//   "id" : "fc70623b0799436e96546f7402fa16e4",
//   "orgId" : "111",
//   "title" : "",
//   "content" : "",
//   "scheduleStartTime" : "",
//   "scheduleEndTime" : "",
//   "remindType" : "",
//   "remindSms" : "",
//   "status" : "",
//   "inputAcc" : "test1",
//   "inputTime" : "2018-01-25 14:47:07",
//   "updateTime" : "",
//   "isDel" : 0
// } ]

let todos=mockjs.mock({
  page:1,
  pageSize:10,
  total:1000,
  'list|15': [{
      'id': ()=>Random.guid(),
      'name': () => {
        return Random.cname();
      },
      'title': () => {
        return Random.ctitle();
      },
      'content': () => {
        return Random.cparagraph(1, 3);
      },
      'scheduleStartTime': () => {
        return Random.time('YYYY-MM-DD HH:mm');
      },
      'scheduleEndTime': () => {
        return Random.time('YYYY-MM-DD HH:mm');
      },
      'isDel': () => {
        return Random.pick(['0','1']);
      }
    }]
})

fetchMock.mock(`${APP_SERVER}/schedule/listJson`,todos);

let infoJson= {
  item:{
    "id" : "fc70623b0799436e96546f7402fa16e4",
    "orgId" : "111",
    "title" : "hello",
    "content" : "hi222",
    "scheduleStartTime" : "2018-01-25",
    "scheduleEndTime" : "2018-01-25",
    "remindType" : "",
    "remindSms" : "",
    "status" : "",
    "inputAcc" : "test1",
    "inputTime" : "2018-01-25 14:47:07",
    "updateTime" : "",
    "isDel" : 0
  }
}
fetchMock.mock(`${APP_SERVER}/schedule/infoJson`,infoJson);
fetchMock.mock(`${APP_SERVER}/schedule/saveJson`,infoJson);

let people=mockjs.mock({
  page:1,
  pageSize:10,
  total:1000,
  'list|9': [{
      'id|+1': 1,
      'name': () => {
        return Random.cname();
      },
      'headUrl': () => {
        return Random.image('125x125');
      },
      'currentAddress': () => {
        return Random.city(true);
      },
      'maritalStatus': () => {
        return Random.pick(['已婚','未婚']);
      },
      'sex': () => {
        return Random.pick(['男','女']);
      },
      'status': () => {
        return Random.pick(['1面','2面','3面']);
      },
      'interviewTime': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
      'interviewer': () => {
        return Random.cname();
      },
      'jobTitle': () => {
        return Random.pick(['工程师','教师','java','phthon','前端','测试']);
      },
      'age|1-100': 100,
    }],
    page: {
      current: 1,
      pageSize: 20,
      total:1000
    },
})

// fetchMock.mock(`${APP_SERVER}/interview/listJson`,people);




// fetchMock.post(`${APP_SERVER}/passport/login`, {
//   msg:"身份认证失败",
//   data:{}
// });

import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'

var hourTimestamp=60*60*100;
let list=mockjs.mock({
  'data|10': [{
      'userid|+1': 1,
      'username': () => {
        return Random.name();
      },
      'nickname': () => {
        return Random.name();
      },
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': () => {
        return Random.image('100x100');
      },
      'status|1-2': 1,
      'email': () => {
        return Random.email('qftx.com');
      },
      'isadmin|0-1': 1,
      'loginTime': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
      'expiresTime': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
    }],
    page: {
      current: 1,
      pageSize: 20,
      total:1000
    },
})

let payload = JSON.stringify({"username" : "test","password":"test"});
let headers = {"Accept": "application/json", "Content-Type":
"application/json"};
let options = {method: "POST"};
fetchMock.mock(`${APP_SERVER}/passport/login`,{
        msg:"ok",
        data:{
          authID:"ABa3r33422sxxx",
          loginTime: 1459227790173,
          expiresTime: 1459217790173,
          userid:"1234",
          username:'jaxchow',
          nickname:'jax'
        }
  },options);




// fetchMock.post(`${APP_SERVER}/passport/login`, {
//   msg:"身份认证失败",
//   data:{}
// });


fetchMock.get(`${APP_SERVER}/passport/logout`, {
  code:"true",
  msg:"ok",
  data:{
    authId:"ABa3r33422sxxx",
    loginTime: new Date().getTime(),
    expiresTime: new Date().getTime()+8*hourTimestamp,
    userid:"1234",
    username:'jaxchow',
    nickname:'jax'
  }
});

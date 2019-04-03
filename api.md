
职位功能点

- 批量刷新接口
request
  {
    type:'batch_job_sync',
    timestamp:22345,
    Jobids:[{channelId:1,ids:[1,2,3,4]},{}，{}]
  }
response
  {
    ok:true,
    timestamp:22345,
    type:'batch_job_sync',
  }

- 获取渠道点数
request
  {
    type:'job_channel_pointer',
    timestamp:22345,
    channels:[1,2]
  }
response
  {
    channels:[{
     id:"1",
     point:""
    },{
      id:"2",
      point:""
    }],
    timestamp:22345,
    ok:true,
  }
- 同步全部渠道职位
  request
  {
    type:'job_sync_all',
    timestamp:22345,
  }
  response
  {
    ok:true,
    type:'job_sync_all',
    timestamp:22345
  }

  - 是否登陆
    request
    {
      type:'isLogin',
      timestamp:22345,
      channel:[1]
    }
    response
    {
      channels:[{
       id:"1",
       point:""
      },{
        id:"2",
        point:""
      }],
      type:'isLogin',
      timestamp:22345,
      ok:true   //true 登陆 false 未登陆
    }
  - 简历url抓取
    request
    {
      type:'crawl_url',
      timestamp:22345,
      url:"",
      html:""
    }
    response:{
      type:'crawl_url',
      status:"",
      positions:[], // 关联职位列表
      timestamp:22345,
      userInfo:{

      } // 简历用户信息
      ok:true
    }
  - 简历保存
  request{
      pluginToPython:{
        type:'crawl_save',
        timestamp:22345,
        resumeId:""
        position:""
      }
    }

  response
  {
    PythonToPlugin:{
      ok:true,
      type:'crawl_save',
      timestamp:22345,
    }

  }


 - 下载简历
 request
 {
   type:'download_confrim',
   timestamp:22345,
   resumeId:"",
   channelId:""
 }

 response
 {
   ok:true,
   type:'crawl_save',
   timestamp:22345,
   resumeId:"",
   channelId:"",
   payType:[
      {
        type:1,
        typeName:"智联币下载",
        totalCoin:"253352币"
      },
      {
        type:2,
        typeName:"点数下载", //
        totalCoin:"253352币"
      }
   ]

 }

 request
 {
   type:'download_resume',
   timestamp:22345,
   resumeId:"",
   channelId:""
 }

 response
 {
   ok:true,
   type:'crawl_save',
   timestamp:22345,
    resumeId:"",
    phone:"15236562",
    email:"xxx@qq.com"
 }




-  渠道保存
-
 request
 {
   type:'channel_upgrade',
   timestamp:22345,
   json:{}
 }

 response
 {
   ok:true,
   type:'channel_upgrade',
   timestamp:22345,
 }

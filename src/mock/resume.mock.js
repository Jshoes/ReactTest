import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'

var hourTimestamp=60*60*100;
let result={"pageSize":10,"page":1,"intPosition":0,"item":{"id":"","resumeIdentityId":"","channelResumeId":"","name":"","namePinyin":"","company":"","degree":"","sex":"","birthYear":"","startWorkingYear":"","annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"","channel":"","channelUpdateTime":"","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"111","resumeType":"","readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"","refuseType":"","interviewLevel":"","orderKey":" o.channel_update_time desc","resumeId":"","jobId":"","jobTitle":"","orgStatus":"","workStatus":"","workYear":"","age":""},"list":[{"id":"987cb6157fd9426fafce14b21aa1f355","resumeIdentityId":"","channelResumeId":"","name":"廖金军","namePinyin":"","company":"湖南易通科技有限公司","degree":5,"sex":1,"birthYear":1997,"startWorkingYear":2016,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-下城区","channel":1,"channelUpdateTime":"2018-12-25 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"80884e55b0fd482e80074dee85874dc7","jobId":"","jobTitle":"java软件开发工程师","orgStatus":1,"workStatus":1,"workYear":2,"age":21},{"id":"d9a28176620a48e882a274376ecc9366","resumeIdentityId":"","channelResumeId":"","name":"廖金军","namePinyin":"","company":"湖南易通科技有限公司","degree":5,"sex":1,"birthYear":1997,"startWorkingYear":2016,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-下城区","channel":1,"channelUpdateTime":"2018-12-25 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"80884e55b0fd482e80074dee85874dc7","jobId":"","jobTitle":"出纳","orgStatus":1,"workStatus":1,"workYear":2,"age":21},{"id":"fa20560debf04df08db01fe927cd79fd","resumeIdentityId":"","channelResumeId":"","name":"廖金军","namePinyin":"","company":"湖南易通科技有限公司","degree":5,"sex":1,"birthYear":1997,"startWorkingYear":2016,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-下城区","channel":1,"channelUpdateTime":"2018-12-25 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"80884e55b0fd482e80074dee85874dc7","jobId":"","jobTitle":"销售专员","orgStatus":"","workStatus":1,"workYear":2,"age":21},{"id":"85555c3a6ec240afb4bf27182fd6802b","resumeIdentityId":"","channelResumeId":"","name":"胡淑娜","namePinyin":"","company":"浙江同方会计事务所","degree":5,"sex":2,"birthYear":1995,"startWorkingYear":2016,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-滨江区","channel":1,"channelUpdateTime":"2018-12-21 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"9c8572cdd6214c8a81dbb082d98e2633","jobId":"","jobTitle":"python工程师/爬虫","orgStatus":"","workStatus":1,"workYear":2,"age":23},{"id":"35992ce2678c4fde8bb869ae86875e23","resumeIdentityId":"","channelResumeId":"","name":"黎琳彬","namePinyin":"","company":"杭州黎希科技有限公司","degree":5,"sex":2,"birthYear":1995,"startWorkingYear":2015,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-江干区","channel":1,"channelUpdateTime":"2018-12-07 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"d40823357ccc413b9a9388115a4dc6c7","jobId":"","jobTitle":"java软件开发工程师","orgStatus":"","workStatus":1,"workYear":3,"age":23},{"id":"511a26199e184a87b43c948ed250078a","resumeIdentityId":"","channelResumeId":"","name":"刘艳丽","namePinyin":"","company":"海澜之家","degree":4,"sex":2,"birthYear":1987,"startWorkingYear":2007,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州","channel":1,"channelUpdateTime":"2018-11-27 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"d5c80a3bb07b40dca8e8eb619e1e6b78","jobId":"","jobTitle":"java软件开发工程师","orgStatus":"","workStatus":1,"workYear":11,"age":31},{"id":"e617a5be0f7d4fa5918258e2241ab2d4","resumeIdentityId":"","channelResumeId":"","name":"凌梦洁","namePinyin":"","company":"浙江昆仑建设集团股份有限公司","degree":4,"sex":2,"birthYear":1997,"startWorkingYear":2015,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州","channel":1,"channelUpdateTime":"2018-10-20 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"2894023ed62146deacc481be2c08762c","jobId":"","jobTitle":"python工程师/爬虫","orgStatus":"","workStatus":1,"workYear":3,"age":21},{"id":"73e462df6e5d462b92d6e1b5f05ea36b","resumeIdentityId":"","channelResumeId":"","name":"黄先生","namePinyin":"","company":"辽宁正安电力工程有限公司","degree":"","sex":1,"birthYear":1989,"startWorkingYear":2010,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"鞍山立山区深沟寺","channel":3,"channelUpdateTime":"2018-02-07 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":2,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"北京\",\"沈阳\",\"杭州\",\"鞍山\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"b775021194d74943ab39130d052fc9ff","jobId":"","jobTitle":"java软件开发工程师","orgStatus":"","workStatus":1,"workYear":8,"age":29},{"id":"a6f7e5aa937947c8b15e49867a5f5a9a","resumeIdentityId":"","channelResumeId":"","name":"胡伟民","namePinyin":"","company":"杭州一家机械制造企业","degree":"","sex":1,"birthYear":1974,"startWorkingYear":1997,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"杭州余杭区仓前","channel":3,"channelUpdateTime":"2018-02-07 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":2,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"753f7209a02f408aa1c9d2490d71fa65","jobId":"","jobTitle":"java软件开发工程师","orgStatus":"","workStatus":1,"workYear":21,"age":44},{"id":"b6da20d8ee244156b375934ac25e7dd1","resumeIdentityId":"","channelResumeId":"","name":"梁同","namePinyin":"","company":"杭州纳威高通新材料科技有限公司","degree":"","sex":1,"birthYear":1993,"startWorkingYear":2015,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"杭州西湖区转塘","channel":3,"channelUpdateTime":"2018-02-07 00:00:00","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":2,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州西湖区\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"ecd2f08657a84b12a13e857fee912ba3","jobId":"","jobTitle":"python工程师/爬虫","orgStatus":"","workStatus":1,"workYear":3,"age":25}],"totalRecord":31,"totalPage":4}
let resultDic={"pageSize":10,"page":1,"intPosition":0,"item":{"id":"","resumeIdentityId":"","channelResumeId":"","name":"","namePinyin":"","company":"","degree":"","sex":"","birthYear":"","startWorkingYear":"","annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"","channel":"","channelUpdateTime":"","inputTime":"","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"111","resumeType":"","readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"","refuseType":"","interviewLevel":"","orderKey":" o.input_time desc","resumeId":"","jobId":"","jobTitle":"","orgStatus":"","workStatus":"","workYear":"","age":""},"list":[{"id":"3f3ea5a4bae443dab395a1e964718093","resumeIdentityId":"","channelResumeId":"","name":"金颖磊","namePinyin":"","company":"贵阳同心软件科技有限公司","degree":7,"sex":1,"birthYear":1990,"startWorkingYear":2016,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"15522077105","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-西湖区","channel":1,"channelUpdateTime":"","inputTime":"2018-02-08 14:53:16","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"befebdff023843b9b2e3defdb063f750","jobId":"","jobTitle":"","orgStatus":"","workStatus":1,"workYear":2,"age":28},{"id":"cdc40dc3defb4f1ba20abeda5953e579","resumeIdentityId":"","channelResumeId":"","name":"吴志晓","namePinyin":"","company":"杭州掌优科技有限公司","degree":5,"sex":2,"birthYear":1993,"startWorkingYear":2015,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"13588088942","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州","channel":1,"channelUpdateTime":"","inputTime":"2018-02-08 14:53:16","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"e0e663310c6b49d982f0f4931c08309d","jobId":"","jobTitle":"","orgStatus":"","workStatus":1,"workYear":3,"age":25},{"id":"987cb6157fd9426fafce14b21aa1f355","resumeIdentityId":"","channelResumeId":"","name":"廖金军","namePinyin":"","company":"湖南易通科技有限公司","degree":5,"sex":1,"birthYear":1997,"startWorkingYear":2016,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"15575297036","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-下城区","channel":1,"channelUpdateTime":"","inputTime":"2018-02-08 14:53:16","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"80884e55b0fd482e80074dee85874dc7","jobId":"","jobTitle":"","orgStatus":"","workStatus":1,"workYear":2,"age":21},{"id":"511a26199e184a87b43c948ed250078a","resumeIdentityId":"","channelResumeId":"","name":"刘艳丽","namePinyin":"","company":"海澜之家","degree":4,"sex":2,"birthYear":1987,"startWorkingYear":2007,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"15857188167","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州","channel":1,"channelUpdateTime":"","inputTime":"2018-02-08 14:53:16","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"d5c80a3bb07b40dca8e8eb619e1e6b78","jobId":"","jobTitle":"","orgStatus":"","workStatus":1,"workYear":11,"age":31},{"id":"35992ce2678c4fde8bb869ae86875e23","resumeIdentityId":"","channelResumeId":"","name":"黎琳彬","namePinyin":"","company":"杭州黎希科技有限公司","degree":5,"sex":2,"birthYear":1995,"startWorkingYear":2015,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"13634133951","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-江干区","channel":1,"channelUpdateTime":"","inputTime":"2018-02-08 14:53:16","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"d40823357ccc413b9a9388115a4dc6c7","jobId":"","jobTitle":"","orgStatus":"","workStatus":1,"workYear":3,"age":23},{"id":"e617a5be0f7d4fa5918258e2241ab2d4","resumeIdentityId":"","channelResumeId":"","name":"凌梦洁","namePinyin":"","company":"浙江昆仑建设集团股份有限公司","degree":4,"sex":2,"birthYear":1997,"startWorkingYear":2015,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"13865597821","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州","channel":1,"channelUpdateTime":"","inputTime":"2018-02-08 14:53:16","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"2894023ed62146deacc481be2c08762c","jobId":"","jobTitle":"","orgStatus":"","workStatus":1,"workYear":3,"age":21},{"id":"9fb759f6b45a48d1b8c4ec38d6f5fbbf","resumeIdentityId":"","channelResumeId":"","name":"蒋攀","namePinyin":"","company":"杭州辉煌软件有限公司","degree":5,"sex":1,"birthYear":1989,"startWorkingYear":2012,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"18158446458","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-西湖区","channel":1,"channelUpdateTime":"","inputTime":"2018-02-08 14:53:16","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"7d46e01575a14f8681480a2ce5b39d58","jobId":"","jobTitle":"","orgStatus":"","workStatus":2,"workYear":6,"age":29},{"id":"85555c3a6ec240afb4bf27182fd6802b","resumeIdentityId":"","channelResumeId":"","name":"胡淑娜","namePinyin":"","company":"浙江同方会计事务所","degree":5,"sex":2,"birthYear":1995,"startWorkingYear":2016,"annualSalary":"","basicSalary":"","subsidy":"","bonus":"","stockRights":"","mobilephone":"17706440341","email":"","politicsStatus":"","maritalStatus":"","residenceAddress":"","currentAddress":"浙江-杭州-滨江区","channel":1,"channelUpdateTime":"","inputTime":"2018-02-08 14:53:16","updateTime":"","isDel":"","mainResume":"","photoUrl":"","orgId":"","resumeType":1,"readStatus":"","updateTimes":"","workYears":"","workStatusList":"","expectedJobs":"","educations":"","trade":"","expectedAddress":"[\"杭州\"]","refuseType":"","interviewLevel":"","orderKey":"","resumeId":"9c8572cdd6214c8a81dbb082d98e2633","jobId":"","jobTitle":"","orgStatus":"","workStatus":1,"workYear":2,"age":23}],"totalRecord":8,"totalPage":1}
fetchMock.mock(`${APP_SERVER}/resume/search/listPageJson`,result);
fetchMock.mock(`${APP_SERVER}/resume/dictionary/listPageJson`,resultDic);

var getSearchFieldSetJson= [ {
  "id" : 1,
  "code" : "sex",
  "name" : "性别",
  "type" : 1,
  "dicCode" : "sex",
  "module" : "",
  "isDefault" : "",
  "codes" : [ {
    "id" : "34045b1ceb05408f97f9069251fe41e6",
    "type" : "sex",
    "keyName" : "女",
    "keyValue" : "2",
    "keySort" : 2,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "be4d98515c6145baa85fffdffbbd4eeb",
    "type" : "sex",
    "keyName" : "男",
    "keyValue" : "1",
    "keySort" : 1,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  } ],
  "checked" : 1
}, {
  "id" : 2,
  "code" : "workYears",
  "name" : "工作年限",
  "type" : 4,
  "dicCode" : "",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 1
}, {
  "id" : 3,
  "code" : "workStatusList",
  "name" : "当前状态",
  "type" : 2,
  "dicCode" : "jobstatus",
  "module" : "",
  "isDefault" : "",
  "codes" : [ {
    "id" : "210922fdaccc4cc1a906e3df0024eb32",
    "type" : "jobstatus",
    "keyName" : "我目前不想换工作",
    "keyValue" : "3",
    "keySort" : 3,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "445223b93b9148059084b16300e150d0",
    "type" : "jobstatus",
    "keyName" : "目前正在找工作",
    "keyValue" : "1",
    "keySort" : 1,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "e74c273da75b457299c329f6c6689161",
    "type" : "jobstatus",
    "keyName" : "观望有好机会会考虑",
    "keyValue" : "2",
    "keySort" : 2,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  } ],
  "checked" : 1
}, {
  "id" : 4,
  "code" : "expectedJobs",
  "name" : "期望工作职位",
  "type" : 2,
  "dicCode" : "expectedjob",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 1
}, {
  "id" : 5,
  "code" : "currentAddress",
  "name" : "现居住地",
  "type" : 6,
  "dicCode" : "",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
}, {
  "id" : 6,
  "code" : "educations",
  "name" : "学历",
  "type" : 5,
  "dicCode" : "education",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
}, {
  "id" : 7,
  "code" : "maritalStatus",
  "name" : "婚姻状态",
  "type" : 1,
  "dicCode" : "maritalstatus",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
}, {
  "id" : 8,
  "code" : "trade",
  "name" : "行业",
  "type" : 1,
  "dicCode" : "industry",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
}, {
  "id" : 9,
  "code" : "expectedAddress",
  "name" : "期望工作地",
  "type" : 6,
  "dicCode" : "",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
}, {
  "id" : 10,
  "code" : "refuseType",
  "name" : "拒绝类型",
  "type" : 1,
  "dicCode" : "refusetype",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
}, {
  "id" : 11,
  "code" : "interviewLevel",
  "name" : "简历阶段",
  "type" : 1,
  "dicCode" : "interviewstage",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
} ]

fetchMock.mock(`${APP_SERVER}/search/getSearchFieldSetJson?module=1`,getSearchFieldSetJson);
var getSearchFieldSetJson2=[{
  "id" : 12,
  "code" : "workYears",
  "name" : "工作年限",
  "type" : 4,
  "dicCode" : "",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 1
}, {
  "id" : 13,
  "code" : "currentAddress",
  "name" : "现居住地",
  "type" : 6,
  "dicCode" : "",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 1
}, {
  "id" : 14,
  "code" : "educations",
  "name" : "学历",
  "type" : 5,
  "dicCode" : "education",
  "module" : "",
  "isDefault" : "",
  "codes" : [ {
    "id" : "0f6dcb2cb7e74d0ca1cf8b072178628f",
    "type" : "education",
    "keyName" : "MBA/EMBA",
    "keyValue" : "6",
    "keySort" : 6,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "1d9487b1510d41669736b6f7587ca6e1",
    "type" : "education",
    "keyName" : "初中及以下",
    "keyValue" : "1",
    "keySort" : 1,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "25a25b6b1fac485ca073a745f7c5c864",
    "type" : "education",
    "keyName" : "高中",
    "keyValue" : "3",
    "keySort" : 3,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "59ed73612d10419fb6f8f9d8f21befde",
    "type" : "education",
    "keyName" : "中专/技校",
    "keyValue" : "2",
    "keySort" : 2,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "813cf4ad757e4e57a260eba09530d7c7",
    "type" : "education",
    "keyName" : "硕士",
    "keyValue" : "7",
    "keySort" : 7,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "8cdecd358c3d43b2a2c3066ad54ae546",
    "type" : "education",
    "keyName" : "博士",
    "keyValue" : "8",
    "keySort" : 8,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "9fbf694df2de4a158a573d0556a560e7",
    "type" : "education",
    "keyName" : "大专",
    "keyValue" : "4",
    "keySort" : 4,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  }, {
    "id" : "c047415c47a74071a65bb4b17ff27c0d",
    "type" : "education",
    "keyName" : "本科",
    "keyValue" : "5",
    "keySort" : 5,
    "inputTime" : 1517381810000,
    "updateTime" : "",
    "isDel" : 0
  } ],
  "checked" : 1
}, {
  "id" : 15,
  "code" : "expectedJobs",
  "name" : "期望工作职位",
  "type" : 2,
  "dicCode" : "expectedjob",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 1
}, {
  "id" : 16,
  "code" : "sex",
  "name" : "性别",
  "type" : 1,
  "dicCode" : "sex",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
}, {
  "id" : 17,
  "code" : "maritalStatus",
  "name" : "婚姻状态",
  "type" : 1,
  "dicCode" : "maritalstatus",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
}, {
  "id" : 18,
  "code" : "trade",
  "name" : "行业",
  "type" : 1,
  "dicCode" : "industry",
  "module" : "",
  "isDefault" : "",
  "codes" : "",
  "checked" : 0
}]
fetchMock.mock(`${APP_SERVER}/search/getSearchFieldSetJson?module=2`,getSearchFieldSetJson2);

var resumeDetailJson={
    "resumeInfo" : {
        "id" : "123",
        "resumeIdentityId" : "123",
        "channelResumeId" : "123",
        "name" : "张三",
        "namePinyin" : "zhangsan",
        "company" : "企峰通信",
        "degree" : 5,
        "sex" : 1,
        "birthYear" : 1990,
        "startWorkingYear" : 2012,
        "annualSalary" : "",
        "basicSalary" : "",
        "subsidy" : "",
        "bonus" : "",
        "stockRights" : "",
        "mobilephone" : "18868536125",
        "email" : "12342@163.com",
        "politicsStatus" : 5,
        "maritalStatus" : 1,
        "residenceAddress" : "安徽省合肥市",
        "currentAddress" : "浙江省杭州市西湖区",
        "channel" : 1,
        "channelUpdateTime" : "2018-02-05 10:53:58",
        "inputTime" : "2018-02-04 10:54:01",
        "updateTime" : "2018-02-05 10:54:12",
        "isDel" : 0,
        "mainResume" : 1
    },
    "resumeOrgBean" : {
        "id" : "123",
        "orgId" : "111",
        "resumeId" : "123",
        "jobId" : "fc882281236d43248f92039774d19aa7",
        "channel" : "1",
        "readStatus" : 0,
        "downloadStatus" : 1,
        "inFolder" : 0,
        "status" : 2,
        "interviewLevel" : 1,
        "resumeLevel" : "",
        "refuseType" : "",
        "resumeType" : 1,
        "receiveTime" : "2018-02-04 10:57:27",
        "inputTime" : "2018-02-07 09:14:53",
        "updateTime" : "2018-02-07 09:16:07",
        "isDel" : 0
    },
    "credentials" : [ ],
    "educations" : [ ],
    "languages" : [ ],
    "objectives" : {
        "keyType" : "",
        "keyWord" : "",
        "id" : "123",
        "resumeId" : "123",
        "expectedSalaryLower" : "",
        "expectedSalaryUpper" : "",
        "expectedAddress" : "上海市浦东区",
        "expectedJobTitle" : "",
        "trade" : "2",
        "selfEvaluation" : "",
        "dutyTime" : "",
        "jobNature" : "",
        "workStatus" : 1,
        "inputTime" : "",
        "updateTime" : "",
        "isDel" : 0,
        "individualLabel" : ""
    },
    "projects" : [ ],
    "trainings" : [ ],
    "jobs" : [ ]
}
fetchMock.mock(`${APP_SERVER}/resumeInfo/infoJson`,resumeDetailJson);

let interviewerJson = {
    "list" : [ {
        "userId" : "36d9fa422663447abfb1077bfee0f18a",
        "orgId" : "111",
        "account" : "test6",
        "name" : "面试官(总裁)",
        "password" : "123456",
        "mobile" : "",
        "email" : "",
        "sex" : 1,
        "birthday" : 1517932800000,
        "issys" : 0,
        "serveTime" : "",
        "passwordMd5" : "",
        "inputTime" : "2018-01-26 14:39:27",
        "updateTime" : "2018-01-26 14:39:27",
        "imgUrl" : "",
        "balance" : 0.0,
        "roleType" : 3,
        "dept" : "",
        "isDel" : 0
    }, {
        "userId" : "9598c862fe3e45ba8f26141c1425d4e0",
        "orgId" : "111",
        "account" : "test4",
        "name" : "面试官(技术经理)",
        "password" : "123456",
        "mobile" : "",
        "email" : "",
        "sex" : 2,
        "birthday" : 1518227148000,
        "issys" : 0,
        "serveTime" : "",
        "passwordMd5" : "",
        "inputTime" : "2018-01-26 14:39:27",
        "updateTime" : "2018-01-26 14:39:27",
        "imgUrl" : "",
        "balance" : 0.0,
        "roleType" : 3,
        "dept" : "",
        "isDel" : 0
    }, {
        "userId" : "ba1b098a4ed54811abb5a8e555a7db11",
        "orgId" : "111",
        "account" : "test5",
        "name" : "面试官(总经理)",
        "password" : "123456",
        "mobile" : "",
        "email" : "",
        "sex" : 2,
        "birthday" : 1518227148000,
        "issys" : 0,
        "serveTime" : "",
        "passwordMd5" : "",
        "inputTime" : "2018-01-26 14:39:27",
        "updateTime" : "2018-01-26 14:39:27",
        "imgUrl" : "",
        "balance" : 0.0,
        "roleType" : 3,
        "dept" : "",
        "isDel" : 0
    } ]
}

fetchMock.mock(`${APP_SERVER}user/getInterviewerListJson`,interviewerJson);
/*邀约*/
fetchMock.mock(`${APP_SERVER}/resume/opt/invite`,true);
/*反馈*/

fetchMock.mock(`${APP_SERVER}/interview/result`,true);

/*关联*/

fetchMock.mock(`${APP_SERVER}/resume/opt/linkJob`,true);
// fetchMock.post(`${APP_SERVER}/passport/login`, {
//   msg:"身份认证失败",
//   data:{}
// });

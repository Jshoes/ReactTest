import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'

var hourTimestamp=60*60*100;
let result=mockjs.mock({
  msg_1000 : '1',
  msg_1001 : '1',
  msg_1002 : '24',
  msg_1003 : '1',
  msg_1004 : '1',
  msg_1005 : '1',
  msg_1006 : '1',
  msg_1007 : '2',
  msg_1008 : '1',
  msg_1009 : '1',
  msg_1010 : '1',
  msg_1011 : '1',
  msg_1012 : '1',
  msg_1013 : '1',
  msg_1014 : '1',
  msg_1015 : '1',
  msg_1016 : '1',
  msg_1017 : '',
  msg_1018 : '1'
})

fetchMock.mock(`${APP_SERVER}/dictionary/infoJson`,result);

let saveResult=mockjs.mock({
  msg_1000 : '1',
  msg_1001 : '1',
  msg_1002 : '24',
  msg_1003 : '1',
  msg_1004 : '1',
  msg_1005 : '48',
  msg_1006 : '1',
  msg_1007 : '2',
  msg_1008 : '96',
  msg_1009 : '1',
  msg_1010 : '1',
  msg_1011 : '1',
  msg_1012 : '1',
  msg_1013 : '1',
  msg_1014 : '1',
  msg_1015 : '1',
  msg_1016 : '1',
  msg_1017 : '',
  msg_1018 : '1'
})
fetchMock.mock(`${APP_SERVER}/dictionary/saveJson`,saveResult);


let resultFeild=mockjs.mock({
  page: 1,
  pageSize: 20,
  total:20,
  'list|10': [{
      'fieldId|+1': 1,
      'fieldName': () => {
        return Random.name();
      },
      'dataType': () => {
        return Random.pick(['1','2','3','4']);
      },
      'isRequired': () => {
        return Random.pick(['0','1']);
      },
      'enable': () => {
        return Random.pick(['0','1']);
      },
      'inputTime': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
    }],
})

fetchMock.mock(`${APP_SERVER}/field/listJson`,resultFeild);

let talentLabels=mockjs.mock({
  'list|10': [
    () => {
      return Random.name();
    },
  ],
})

fetchMock.mock(`${APP_SERVER}/option/listJson`,talentLabels);
fetchMock.mock(`${APP_SERVER}/option/batchSaveJson`,{});

let saveJson=mockjs.mock({
      'fieldId': () => {
        return Random.uuid()
      },
      'fieldName': () => {
        return Random.name();
      },
      'dataType': () => {
        return Random.pick(['1','2','3','4']);
      },
      'isRequired': () => {
        return Random.pick(['0','1']);
      },
      'enable': () => {
        return Random.pick(['0','1']);
      },
      'inputTime': () => {
        return Random.datetime('yyyy-MM-dd HH:mm:ss');
      },
})
fetchMock.mock(`${APP_SERVER}/field/saveJson`,saveJson);

let infoJson = {
  "fieldId" : "f96d40cae9434effb043710ae9c2f8d3",
  "orgId" : "111",
  "enable" : 1,
  "fieldName" : "员工姓名",
  "isQuery" : "",
  "sort" : 1,
  "fieldCode" : "name",
  "isRequired" : 1,
  "isRead" : 1,
  "dataType" : 1,
  "inputTime" : 1517385090000,
  "updateTime" : "",
  "isDel" : 0,
  "orderKey" : "",
  "options" : "",
  "oldSort" : 1,
  "jsonDate" : ""
}
fetchMock.mock(`${APP_SERVER}/field/infoJson`,infoJson);

fetchMock.mock(`${APP_SERVER}/field/batchSaveJson`,{});

var listTemplateJson=mockjs.mock({
  'list|10':[{
    "id":()=>{
      return Random.uuid();
    },
    "name":()=>{
      return Random.ctitle();
    },
    "content":()=>{
      return Random.cparagraph();
    },
    "smsType":()=>{
      return Random.pick(['1','2']);
    },
    "templateUse":()=>{
      return Random.pick(['0','1','2']);
    }
  }]
})

fetchMock.mock(`${APP_SERVER}/template/listJson`,listTemplateJson);

var templateJson=mockjs.mock({
    "id":()=>{
      return Random.uuid();
    },
    "name":()=>{
      return Random.name();
    },
    "content":()=>{
      return Random.cparagraph();
    },
    "type":()=>{
      return Random.pick(['1','2']);
    }
})

fetchMock.mock(`${APP_SERVER}/template/saveJson`,templateJson);

var reciveMailboxJson=mockjs.mock({
  'list|10':[{
    "id":()=>{
      return Random.uuid();
    },
  //  "mailboxTable":
    "email":()=>{
      return Random.email();
    },
    "password":()=>{
      return Random.name();
    },
    "host":()=>{
      return Random.pick(['1','2']);
    },
    "emailType":()=>{
      return Random.pick(['1','2','3','4']);
    }
  }]
})

fetchMock.mock(`${APP_SERVER}/reciveMailbox/listJson`,reciveMailboxJson);



var talentLableListJson=mockjs.mock({
  'remarksList':[],
  'talentsList|10':[{
    "optionId":()=>{
      return Random.uuid();
    },
  //  "mailboxTable":
    "optionName":()=>{
      return Random.name();
    }
  }]
})

fetchMock.mock(`${APP_SERVER}/option/optionListJson`,talentLableListJson);

fetchMock.mock(`${APP_SERVER}/option/saveOrDeleteJson`,{});


var accountOperateListJson = mockjs.mock({
  'list|10':[{
    "userId":()=>{
      return Random.uuid();
    },
  //  "mailboxTable":
    "account":()=>{
      return Random.name();
    },
    "name":()=>{
      return Random.cname();
    },
    "roleName":()=>{
      return Random.pick(['1','2']);
    },
    "dept":()=>{
      return Random.pick(['1','2','3','4']);
    },
    "resoureNameArr":()=>{
      return [Random.pick(['1','2','3','4','5']),Random.pick(['5','6','7','8'])]
    }
  }]
})

fetchMock.mock(`${APP_SERVER}/accountOperate/listPageJson`,accountOperateListJson);


var role = mockjs.mock([{
    "roleId":()=>{
      return Random.uuid();
    },
    "roleName":()=>{
      return Random.cname();
    },
    "resoureNameArr":()=>{
      return [Random.pick(['1','2','3','4','5']),Random.pick(['5','6','7','8'])]
    }
  },{
    "roleId":()=>{
      return Random.uuid();
    },
    "roleName":()=>{
      return Random.cname();
    },
    "resoureNameArr":()=>{
      return [Random.pick(['1','2','3','4','5']),Random.pick(['5','6','7','8'])]
    }
  }])

fetchMock.mock(`${APP_SERVER}/authRole/getroleInfo`,role);


const userResourceListJson=mockjs.mock({
  'list|10':[{
    "userId":()=>{
      return Random.uuid();
    },
  //  "mailboxTable":
    "account":()=>{
      return Random.name();
    },
    "name":()=>{
      return Random.cname();
    },
    "roleName":()=>{
      return Random.pick(['1','2']);
    },
    "dept":()=>{
      return Random.pick(['1','2','3','4']);
    },
    "resoureNameArr":()=>{
      return [Random.pick(['1','2','3','4','5']),Random.pick(['5','6','7','8'])]
    }
  }]
})

fetchMock.mock(`${APP_SERVER}/userResource/listJson`, userResourceListJson);


const orgTree={
	children : [ {
		children : [ {
			children : [ {
				value : "a0c637e48f8b49eeb66abe908254b522",
				title : "灵溪部"
			}, {
				value : "bfa1eb9f50c2499aa9ef147ca2d1aded",
				title : "龙岗部"
			} ],
			value : "50917d9bddeb45ca801a34ab4f549178",
			title : "仓南部"
		} ],
		value : "11ee8da517364acfb9a493acca14bb12",
		title : "温州部"
	}, {
		children : [ {
			value : "ef4d3167af9e4039abe93fe531e05cdf",
			title : "萧山组"
		} ],
		value : "1cdaddc6daeb4ed9908e62b9b81c698e",
		title : "杭州部"
	}, {
		children : [ {
			value : "55019fe1ca4541ceac84c981f9aa33fb",
			title : "龙岩部2",
		names:["18900000022","宋洁洁","18900000023"]

		}, {
			value : "583b6cda37c549058c4ce2ac1abb4098",
			title : "龙岩部2"
		}, {
			value : "5a07b4a32f2b46fdb9f922e9c11ee8b3",
			title : "龙岩部2"
		}, {
			value : "8cf7a15eb25c4a498ccbc861b3958f79",
			title : "龙岩部3"
		}, {
			value : "cd5cc443b56b4f7e9bd53b910f55add2",
			title : "龙岩部2"
		}, {
			value : "ef9f3ae68b3a408497b2175dd9cea198",
			title : "龙岩部"
		}, {
			value : "f9510e1fe7fe40729b83e68666036e2e",
			title : "龙岩部2"
		} ],
		value : "35f307aff0a6480cadeca43fbaed49f9",
		title : "福州部",
		names:["18900000022","宋洁洁","18900000023"]
	} ],
	value : "fghsfgs",
	title : "浙江省总公司",
	names:["18900000022","宋洁洁","18900000023"]

}
fetchMock.mock(`${APP_SERVER}/organizationGroup/getDepartmentTree`, orgTree);
let authTree = [ {
  children : [ {
    id : "55a32589174b45c993c8f1d537edc55d",
    title : "删除候选人",
    sort : 1.0,
    type : "2"
  }, {
    id : "a72b0a99c7e944f4b95f76ef9bcce0b7",
    title : "放入诚信库",
    sort : 2.0,
    type : "2"
  } ],
  id : "735e7e66da0e4de5aca3a21793d9113d",
  title : "候选人管理",
  sort : 1.0,
  type : "1"
}, {
  children : [ {
    id : "417c86b81e9c458fb6574576d5acb3be",
    title : "删除职位",
    sort : 1.0,
    type : "2"
  }, {
    id : "50c83a5fafe8456db0f07151428270ee",
    title : "导入职位",
    sort : 2.0,
    type : "2"
  }, {
    id : "c7ab64467b1c445cb96da9afe0c23a44",
    title : "发布职位",
    sort : 2.0,
    type : "2"
  } ],
  id : "8b5f185753274528a69b6e606bc56665",
  title : "职位管理",
  sort : 2.0,
  type : "1"
}, {
  id : "44b056720b5f49519c7cffbe488fa6bb",
  title : "面试管理",
  sort : 3.0,
  type : "1"
}, {
  children : [ {
    id : "58ffa46fdd4a47cda29f517f3e0f55af",
    title : "放入诚信库",
    sort : 1.0,
    type : "2"
  }, {
    id : "1ff25714d6b744aab0625138acae4c91",
    title : "移除诚信库",
    sort : 2.0,
    type : "2"
  } ],
  id : "f7997d00fb4b43b08276fbab73ddd2bb",
  title : "人才库",
  sort : 4.0,
  type : "1"
}, {
  children : [ {
    id : "4a96511eca264c43b9f047d6f244dd97",
    title : "导入员工",
    sort : 1.0,
    type : "2"
  }, {
    id : "6dfed431c5cd4082b59921f408be1d76",
    title : "导出员工",
    sort : 2.0,
    type : "2"
  }, {
    id : "574630bdce7d408bab8e753fd8800882",
    title : "删除员工",
    sort : 3.0,
    type : "2"
  }, {
    id : "3519faa9c0e74c71991ce997d037f598",
    title : "编辑员工资料",
    sort : 4.0,
    type : "2"
  } ],
  id : "c8ceb8e7e34c464e90c7c3c0163e0b00",
  title : "员工管理",
  sort : 5.0,
  type : "1"
}, {
  id : "a78ba93566b44aadb21a14344f12b7af",
  title : "通信记录",
  sort : 6.0,
  type : "1"
}, {
  id : "639b1f16a082487ca009a13e93f15366",
  title : "数据统计",
  sort : 7.0,
  type : "1"
}, {
  children : [ {
    id : "3b5348b4c68b4d3892fdbdcf2abed8da",
    title : "公司信息设置",
    sort : 1.0,
    type : "1"
  }, {
    id : "79201ba7482844d49b034d684b94c0a5",
    title : "组织结构设置",
    sort : 2.0,
    type : "1"
  }, {
    id : "b37cdaba96ac48c1aa427c871b6828ff",
    title : "角色权限设置",
    sort : 3.0,
    type : "1"
  }, {
    id : "5455cc7527e643739a76ed5eca1d1503",
    title : "成员设置",
    sort : 4.0,
    type : "1"
  }, {
    id : "d938be8641274f6f9ff38da44a3849f3",
    title : "接收简历邮箱设置",
    sort : 5.0,
    type : "1"
  }, {
    id : "9e6dc934a2c04a7a8b48ac5b461a55dc",
    title : "支持渠道列表",
    sort : 6.0,
    type : "1"
  }, {
    id : "cf2884b8593745ab861c39bd071207c0",
    title : "重要事项提醒设置",
    sort : 7.0,
    type : "1"
  }, {
    id : "000aab647c144bf2bf71b926e6c80f11",
    title : "模板设置",
    sort : 8.0,
    type : "1"
  }, {
    id : "691ac6feaa7d4daa88e7ce51d1ffd03e",
    title : "简历更新周期设置",
    sort : 9.0,
    type : "1"
  }, {
    id : "a28627a4a1cc4cafb8fa4b50c7363882",
    title : "信息登记表设置",
    sort : 10.0,
    type : "1"
  }, {
    id : "2410d0e668f14e7da95ba44fb45f146c",
    title : "归档原因设置",
    sort : 11.0,
    type : "1"
  }, {
    id : "9cab23371b2c442680325869e7dfe848",
    title : "不良事件设置",
    sort : 12.0,
    type : "1"
  }, {
    id : "5f0d17c47a724a37b28c09e242a0fe6f",
    title : "offer拒绝设置",
    sort : 13.0,
    type : "1"
  }, {
    id : "30d84b7d6a334b639b1852b9e04dd508",
    title : "标签设置",
    sort : 14.0,
    type : "1"
  }, {
    id : "99e8f9e0416843d28584ba505f525f4c",
    title : "系统字段设置",
    sort : 15.0,
    type : "1"
  } ],
  id : "1aa46ac44686488b9ef4e051146f169e",
  title : "系统设置",
  sort : 8.0,
  type : "1"
} ]

fetchMock.mock(`${APP_SERVER}/authRole//getResourceTree`, authTree);


let roleDetail=mockjs.mock({

    "userId":()=>{
      return Random.uuid();
    },
    "account":()=>{
      return Random.name();
    },
    "roleName":()=>{
      return Random.cname();
    },
    "dept":()=>{
      return Random.pick(['1','2','3','4']);
    },
    "authList":()=>{
      return ["55a32589174b45c993c8f1d537edc55d","8b5f185753274528a69b6e606bc56665","99e8f9e0416843d28584ba505f525f4c"]

  }
})
fetchMock.mock(`${APP_SERVER}/authRole/editRoleDetail`, roleDetail);

import '../utils/MockGlobal'
import fetchMock from 'fetch-mock'
import mockjs,{Random} from 'mockjs'

var hourTimestamp=60*60*100;
let result=mockjs.mock({
  'list|8': [{
      'id': ()=>Random.integer(1,1000),
      'label': () => {
        return Random.cname();
      },
      'value': () => Random.integer(1,1000)
  }],
})

let constAll=
  {
    "dutystatus" : [ {
      "id" : "38a48a5300b04def84dc4f4135161286",
      "type" : "dutystatus",
      "keyName" : "已停止",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8851574b499b449b8cf1fbb6dcd12bea",
      "type" : "dutystatus",
      "keyName" : "招聘中",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "dd9eda558b0d48df90496874b9a1cc1f",
      "type" : "dutystatus",
      "keyName" : "暂停中",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "foreignsuffer" : [ {
      "id" : "542a1b35c8d4491b8355ca598764600c",
      "type" : "foreignsuffer",
      "keyName" : "否",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a707dfa13eac4808ad62aa17753ed8cf",
      "type" : "foreignsuffer",
      "keyName" : "是",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "scale" : [ {
      "id" : "00e0928cdfd344abb067943577db0ebb",
      "type" : "scale",
      "keyName" : "50-150",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "0d948e3dd4674a19a0903df5a456dbe7",
      "type" : "scale",
      "keyName" : "1000-10000",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "4941bf5768b24b08a57596b0b9c0fd49",
      "type" : "scale",
      "keyName" : "10000人以上",
      "keyValue" : "6",
      "keySort" : 6,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b6474a1690904cebbfa53adfc8899209",
      "type" : "scale",
      "keyName" : "少于50人",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d5a2395f10ce4f938de65f03fe76a434",
      "type" : "scale",
      "keyName" : "500-1000",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "e2cbbbdc42264fc6a093308787f0e9fc",
      "type" : "scale",
      "keyName" : "150-500",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "sex" : [ {
      "id" : "c473ccf254414625a5e3bfe70b9d94b6",
      "type" : "sex",
      "keyName" : "男",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "cea3b372f5ee4689a4efbc4341ec7add",
      "type" : "sex",
      "keyName" : "女",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "education" : [ {
      "id" : "0f30a0852e9d4413a9c40ff57538481f",
      "type" : "education",
      "keyName" : "本科",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "25032e705554428880f02d9e2d05ac39",
      "type" : "education",
      "keyName" : "高中",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "2cc3884c5bf94d779821734a8eb53e4a",
      "type" : "education",
      "keyName" : "大专",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "47ad07f34c094f14963c093f7e0d8c08",
      "type" : "education",
      "keyName" : "博士",
      "keyValue" : "8",
      "keySort" : 8,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "506f6b449ec04b3b832fd4f674e0d49b",
      "type" : "education",
      "keyName" : "中专/技校",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "60641a96402142d997e1571edcbedb1c",
      "type" : "education",
      "keyName" : "硕士",
      "keyValue" : "7",
      "keySort" : 7,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a0be9cb18d67486d81595ae6ef53d551",
      "type" : "education",
      "keyName" : "MBA/EMBA",
      "keyValue" : "6",
      "keySort" : 6,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "ae5fd82bec554d748aa4960e1846691c",
      "type" : "education",
      "keyName" : "初中及以下",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "workproperty" : [ {
      "id" : "7881d117ecff42e0ad4a47e06ccaa2bb",
      "type" : "workproperty",
      "keyName" : "兼职",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "bcd91c85a2524f478a88f50c88a02da3",
      "type" : "workproperty",
      "keyName" : "全职",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "c7e85552143c4622914ac9dff2503be4",
      "type" : "workproperty",
      "keyName" : "实习",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "resumestage" : [ {
      "id" : "46c7a0de1d48419ca19d5273399b90b4",
      "type" : "resumestage",
      "keyName" : "offer",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "95209932404b4f4c9f141c20b93cdc21",
      "type" : "resumestage",
      "keyName" : "入职",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "e55b0676b31948f28ced399053da9b22",
      "type" : "resumestage",
      "keyName" : "面试",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "f39aa0a3f24a447facf7d84731820806",
      "type" : "resumestage",
      "keyName" : "拒绝",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "fbfcabe9afbd46e0bae68c5b9b362d69",
      "type" : "resumestage",
      "keyName" : "待邀约",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "comedate" : [ {
      "id" : "5ad9875252a14811949deab4a0aa3903",
      "type" : "comedate",
      "keyName" : "1周内",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "5f58333418ba44f78f2547daca6bedb5",
      "type" : "comedate",
      "keyName" : "随时",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "74bceb2c433c4c269b69b61df6e32146",
      "type" : "comedate",
      "keyName" : "1个月内",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "db0fdf39f2654670a99a04950babef6c",
      "type" : "comedate",
      "keyName" : "3个月内",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "f971ecddc1844151a309873d7ebddea5",
      "type" : "comedate",
      "keyName" : "待定",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "jobstatus" : [ {
      "id" : "3873b18529364e37867228fbad0f151b",
      "type" : "jobstatus",
      "keyName" : "我目前不想换工作",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "ca681c058bb542d5b79f132d645856ed",
      "type" : "jobstatus",
      "keyName" : "观望有好机会会考虑",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "f68c208926bf4b91a12106b0c8ff6af4",
      "type" : "jobstatus",
      "keyName" : "目前正在找工作",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "memberstatus" : [ {
      "id" : "381fb53ab8114844914176eb714fc8a6",
      "type" : "memberstatus",
      "keyName" : "离职",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a0cb4cce93c14b2e8f516ba10d2368e5",
      "type" : "memberstatus",
      "keyName" : "转正",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "f25f83c5531945ee99741a68b8dcc1b5",
      "type" : "memberstatus",
      "keyName" : "试用",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "maritalstatus" : [ {
      "id" : "08d7e508ba114b87bffa20f4b1ccf673",
      "type" : "maritalstatus",
      "keyName" : "已婚",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "54a79abbe6974bd491e73a8d5cf00ac5",
      "type" : "maritalstatus",
      "keyName" : "未婚",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "9b43a6771aca43e58b19a5905a129a92",
      "type" : "maritalstatus",
      "keyName" : "离异",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "interviewstage" : [ {
      "id" : "3ce87c0bbcf24b4b961ef5a9b2d9b542",
      "type" : "interviewstage",
      "keyName" : "面试3面",
      "keyValue" : "4",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a1b79fa7d6154069bacef19eed6e0664",
      "type" : "interviewstage",
      "keyName" : "面试1面",
      "keyValue" : "2",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d86843e2da7544059371e52623e7a319",
      "type" : "interviewstage",
      "keyName" : "面试2面",
      "keyValue" : "3",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "remindschedule" : [ {
      "id" : "03824d528633437b885c94303ccf1918",
      "type" : "remindschedule",
      "keyName" : "提前1小时提醒",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "12c0b6aecd7f420ab48a89fa85a847d8",
      "type" : "remindschedule",
      "keyName" : "提前10分钟提醒",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "1ca47761fbf443e3bce25730af9a5291",
      "type" : "remindschedule",
      "keyName" : "提前5分钟提醒",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "269c421abeda49ba93d76ea0fcf85607",
      "type" : "remindschedule",
      "keyName" : "提前30分钟提醒",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8e90052537b14ab585c3081555264569",
      "type" : "remindschedule",
      "keyName" : "不提醒",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "daf2aacbb37944cd92a1def3eb6f7aef",
      "type" : "remindschedule",
      "keyName" : "提前2小时提醒",
      "keyValue" : "6",
      "keySort" : 6,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "df3cbd085c43401f9f69cafb4814d931",
      "type" : "remindschedule",
      "keyName" : "提前4小时提醒",
      "keyValue" : "7",
      "keySort" : 7,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "workyears" : [ {
      "id" : "7b6deb20120f4c9c82029902ece6d60a",
      "type" : "workyears",
      "keyName" : "1-3",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "9eac529aa63840debff575140ed6abd7",
      "type" : "workyears",
      "keyName" : "5年以上",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "c931c8a5c22b44e081aea07a5b0ca6ff",
      "type" : "workyears",
      "keyName" : "3-5",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d917046a5ae14d45a6e17a7a818914b3",
      "type" : "workyears",
      "keyName" : "1年以内",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "industry" : [ {
      "id" : "0e84223e285e4d808d371c9643b1134e",
      "type" : "industry",
      "keyName" : "钢铁/机械/设备/重工",
      "keyValue" : "16",
      "keySort" : 16,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "104cbf106c09427db0b3c0785b009f75",
      "type" : "industry",
      "keyName" : "学术/科研",
      "keyValue" : "26",
      "keySort" : 26,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "1145054d45b94ae9bb5bdc93ff563f4a",
      "type" : "industry",
      "keyName" : "互联网/电子商务",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "1a0231c9a98749cc83ac56f4ddbd898f",
      "type" : "industry",
      "keyName" : "化工/能源/矿产/采掘/冶金",
      "keyValue" : "23",
      "keySort" : 23,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "1a9899c1031b40eab813eeb9655da5c9",
      "type" : "industry",
      "keyName" : "酒店/旅游/餐饮",
      "keyValue" : "22",
      "keySort" : 22,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "220fc779e814480c81cb627e903293bc",
      "type" : "industry",
      "keyName" : "电气/电力/水利",
      "keyValue" : "46",
      "keySort" : 46,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "2fc0a90e1a8a44baa062dc16682e4441",
      "type" : "industry",
      "keyName" : "服饰/纺织/皮革",
      "keyValue" : "37",
      "keySort" : 37,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "4538740b7d114f07b50a41ee3cb5b863",
      "type" : "industry",
      "keyName" : "其它行业",
      "keyValue" : "49",
      "keySort" : 49,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "4890759a14cf4496a095d5fc7c46cad4",
      "type" : "industry",
      "keyName" : "快速消费品（食品/饮料等）",
      "keyValue" : "11",
      "keySort" : 11,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "4ea619034d7643168d1933fd2b25eb48",
      "type" : "industry",
      "keyName" : "办公用品及设备",
      "keyValue" : "18",
      "keySort" : 18,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "5097fcffae4d438fb4ae857a6a2b5ba5",
      "type" : "industry",
      "keyName" : "交通/运输/物流/仓储",
      "keyValue" : "20",
      "keySort" : 20,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "53f0cfc21e0b4cfdbb8fe40beb14e274",
      "type" : "industry",
      "keyName" : "外包服务",
      "keyValue" : "36",
      "keySort" : 36,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "5c9cf9a6860442118924bef8512d827a",
      "type" : "industry",
      "keyName" : "信托/担保/拍卖/典当",
      "keyValue" : "32",
      "keySort" : 32,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "5cd624bd8f7a4688b1e585bd597f9ca8",
      "type" : "industry",
      "keyName" : "家具/家电/玩具/礼品",
      "keyValue" : "15",
      "keySort" : 15,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "5d311d52885b44dc8acbbdf401be9192",
      "type" : "industry",
      "keyName" : "物业管理/商业中心",
      "keyValue" : "8",
      "keySort" : 8,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "5eb09c67f95844549132804ffd4a9560",
      "type" : "industry",
      "keyName" : "制药/生物工程",
      "keyValue" : "43",
      "keySort" : 43,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "607d12f679b54029bde8a5373c62d28a",
      "type" : "industry",
      "keyName" : "通信/电信运营、增值服务",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "65c43ddbba034780aeee51f1e096b9d3",
      "type" : "industry",
      "keyName" : "航天/航空",
      "keyValue" : "44",
      "keySort" : 44,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "68617fe15dfa413089b8c9bd0665a09d",
      "type" : "industry",
      "keyName" : "通信/电信/网络设备",
      "keyValue" : "29",
      "keySort" : 29,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "7652740da98845d398c4d33930e011a0",
      "type" : "industry",
      "keyName" : "批发/零售",
      "keyValue" : "38",
      "keySort" : 38,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8205169480f344ecb7848bff4e63bf8a",
      "type" : "industry",
      "keyName" : "电子技术/半导体/集成电路",
      "keyValue" : "28",
      "keySort" : 28,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8819e36af3b44466b7f4c74558ab63bc",
      "type" : "industry",
      "keyName" : "原材料和加工",
      "keyValue" : "41",
      "keySort" : 41,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "89a059c4abe44b628f7fb363327f8655",
      "type" : "industry",
      "keyName" : "奢侈品/收藏品/工艺品/珠宝",
      "keyValue" : "14",
      "keySort" : 14,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "89eedf37c4ec4e3599163691504a7d84",
      "type" : "industry",
      "keyName" : "计算机服务（系统、数据服务、维修）",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8a2c739cda1546399ab627781520018e",
      "type" : "industry",
      "keyName" : "检测/认证",
      "keyValue" : "10",
      "keySort" : 10,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8bd0241c0b094c0983d86c3d966c3c2d",
      "type" : "industry",
      "keyName" : "中介服务",
      "keyValue" : "35",
      "keySort" : 35,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8d0975f05ff04e368f5eb022cb1bd1d3",
      "type" : "industry",
      "keyName" : "汽车及零配件",
      "keyValue" : "40",
      "keySort" : 40,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "90cd500ddc754bbf996c4a2b2a22a324",
      "type" : "industry",
      "keyName" : "房地产/建筑/建材/工程",
      "keyValue" : "7",
      "keySort" : 7,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "96a3cab72a0644229e7510d57f4d6485",
      "type" : "industry",
      "keyName" : "贸易/进出口",
      "keyValue" : "12",
      "keySort" : 12,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "96c84c945feb4155beb61b5390fdf2cb",
      "type" : "industry",
      "keyName" : "多元化集团",
      "keyValue" : "27",
      "keySort" : 27,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "9d414ae9e8bd4646b85aead0ac559c0e",
      "type" : "industry",
      "keyName" : "政府/公共事业/非盈利机构",
      "keyValue" : "47",
      "keySort" : 47,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a09ab31707c8425cb3ae73f0bcf7465f",
      "type" : "industry",
      "keyName" : "影视/媒体/艺术/文化传播",
      "keyValue" : "45",
      "keySort" : 45,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a5a19541317a461aa99b3c85ec5ee735",
      "type" : "industry",
      "keyName" : "医疗设备/器械",
      "keyValue" : "19",
      "keySort" : 19,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b0d23eefc5fa449aaecfa20b1243ff6e",
      "type" : "industry",
      "keyName" : "农/林/牧/渔",
      "keyValue" : "48",
      "keySort" : 48,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b42a8f4910ab4b58911bac747a1a9234",
      "type" : "industry",
      "keyName" : "医疗/护理/美容/保健/卫生服务",
      "keyValue" : "21",
      "keySort" : 21,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b5b401b97cf8488bbff11662d7f5f820",
      "type" : "industry",
      "keyName" : "专业服务/咨询(财会/法律/人力资源等)",
      "keyValue" : "34",
      "keySort" : 34,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b6ff4eefe73d48af83fd1fdd712d152c",
      "type" : "industry",
      "keyName" : "网络游戏",
      "keyValue" : "30",
      "keySort" : 30,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b8d66e080913417f83684e67febce452",
      "type" : "industry",
      "keyName" : "家居/室内设计/装潢",
      "keyValue" : "33",
      "keySort" : 33,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "c23a94a0d14d4b3b9d2ddbb95b3c05fa",
      "type" : "industry",
      "keyName" : "金融/银行/基金/证券/期货/投资",
      "keyValue" : "6",
      "keySort" : 6,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "c47db40a8104467f94b8b2f7ab1f4079",
      "type" : "industry",
      "keyName" : "租赁服务",
      "keyValue" : "13",
      "keySort" : 13,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "c8306cfbd74a4203b27c829d4d76894e",
      "type" : "industry",
      "keyName" : "计算机软件",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "ca151fda08084c58a0ed8b1a60ec6916",
      "type" : "industry",
      "keyName" : "保险",
      "keyValue" : "31",
      "keySort" : 31,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d0008b9d1cb14041a4db9db9ff5a6e4b",
      "type" : "industry",
      "keyName" : "计算机硬件",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d54bf57154b34f0f8cdc66194f92fe5d",
      "type" : "industry",
      "keyName" : "出版/印刷/造纸",
      "keyValue" : "42",
      "keySort" : 42,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d80050353b5545c7abc3c67a10d3fd8f",
      "type" : "industry",
      "keyName" : "教育/培训/院校",
      "keyValue" : "39",
      "keySort" : 39,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "e69204fa3db045cc8633e91c9a8a93da",
      "type" : "industry",
      "keyName" : "仪器仪表/工业自动化",
      "keyValue" : "17",
      "keySort" : 17,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "fafc3a3b4fea41fdb20dedb1c3ce70ad",
      "type" : "industry",
      "keyName" : "娱乐/休闲/服务",
      "keyValue" : "23",
      "keySort" : 23,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "fd51ccacbb21427b90359e495b350fe9",
      "type" : "industry",
      "keyName" : "广告/会展/公关/市场推广",
      "keyValue" : "9",
      "keySort" : 9,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "ff443201e6da480e84f6329062ea0913",
      "type" : "industry",
      "keyName" : "环保",
      "keyValue" : "25",
      "keySort" : 25,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "channelrule" : [ {
      "id" : "028cad9d8d584643aa10a51a73809aed",
      "type" : "channelrule",
      "keyName" : "8个月",
      "keyValue" : "6",
      "keySort" : 6,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "0d5b33a607044e3fa8405c5caeeaa56c",
      "type" : "channelrule",
      "keyName" : "7个月",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "10890a34aa6747e1a47465f878ea4e43",
      "type" : "channelrule",
      "keyName" : "9个月",
      "keyValue" : "7",
      "keySort" : 7,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "112595fb51cb451f8986f49847ff28bf",
      "type" : "channelrule",
      "keyName" : "5个月",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "180303089206441d83567784e2ee6da3",
      "type" : "channelrule",
      "keyName" : "11个月",
      "keyValue" : "9",
      "keySort" : 9,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "2799a114d9474f3c9f3a19a83fde0aeb",
      "type" : "channelrule",
      "keyName" : "3个月",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "3b7fa0e7d568474a873f352f592bbedb",
      "type" : "channelrule",
      "keyName" : "10个月",
      "keyValue" : "8",
      "keySort" : 8,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8b74f7129db748e898121f92dc73c58e",
      "type" : "channelrule",
      "keyName" : "12个月",
      "keyValue" : "10",
      "keySort" : 10,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "ab66ea54a532433f8af4199a55ad6702",
      "type" : "channelrule",
      "keyName" : "4个月",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d85ab263ce464023823d25bd19d167f3",
      "type" : "channelrule",
      "keyName" : "6个月",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "adversevent" : [ {
      "id" : "6a8b6e8933d44e0e9546044e23a29147",
      "type" : "adversevent",
      "keyName" : "入职后，盗取公司重要信息",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8694d568b2f442c1968da64f9db219f6",
      "type" : "adversevent",
      "keyName" : "简历描述与现实不相符",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b59c4e8f0eeb485b8ccb8eb8a590ee78",
      "type" : "adversevent",
      "keyName" : "态度恶劣、行为异常",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "dbbe784cca574354bd22a7a54875b8b2",
      "type" : "adversevent",
      "keyName" : "多次爽约、迟到不提前打招呼",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "readstatus" : [ {
      "id" : "31c1e755a71744879d0d2322d274e8f8",
      "type" : "readstatus",
      "keyName" : "待阅",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "5d447004ae114aae874b3c347287669b",
      "type" : "readstatus",
      "keyName" : "已阅已处理",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d3419c0cb70047cc9e0b2302f6339780",
      "type" : "readstatus",
      "keyName" : "已阅未处理",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "political" : [ {
      "id" : "032df99c31284c82a199d3a65052f372",
      "type" : "political",
      "keyName" : "无党派人士",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "2010dd3cd49d4cd0b63f3b7561c4f39e",
      "type" : "political",
      "keyName" : "共青团员",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "5d4783d96aa040e0acd47dd67f9e2d04",
      "type" : "political",
      "keyName" : "中共党员",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "935d2e4b1c0a49ddb4583faee5689ec8",
      "type" : "political",
      "keyName" : "群众",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "bbba8a2e805941a389dea0c75e1a07ae",
      "type" : "political",
      "keyName" : "民主党派人士",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "companyproperty" : [ {
      "id" : "056b55bcb4424316af7900b9de2dd2fb",
      "type" : "companyproperty",
      "keyName" : "国家机关",
      "keyValue" : "8",
      "keySort" : 8,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "05acbf49dcb345678d5c1fb099e46a3c",
      "type" : "companyproperty",
      "keyName" : "社会团体",
      "keyValue" : "14",
      "keySort" : 14,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "1eea5707c15c410797265be6d4a04d1d",
      "type" : "companyproperty",
      "keyName" : "上市公司",
      "keyValue" : "6",
      "keySort" : 6,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "37ae1a7b570f473894fe606969ee9667",
      "type" : "companyproperty",
      "keyName" : "国企",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "3e516864625a45f4949587b0405ea79e",
      "type" : "companyproperty",
      "keyName" : "学校/下级学院",
      "keyValue" : "12",
      "keySort" : 12,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "53f49d97a5da410d9b0d8aae717c8f48",
      "type" : "companyproperty",
      "keyName" : "创业公司",
      "keyValue" : "16",
      "keySort" : 16,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "5b8238e6a1ee4966a06274781ddb9e72",
      "type" : "companyproperty",
      "keyName" : "民营",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "686c2e843dec4459be9ab12fa606c840",
      "type" : "companyproperty",
      "keyName" : "医院",
      "keyValue" : "11",
      "keySort" : 11,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "6bd28f8d437847af950613800714e870",
      "type" : "companyproperty",
      "keyName" : "银行",
      "keyValue" : "10",
      "keySort" : 10,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "6de77cff8b614494bb1e592a215f0af9",
      "type" : "companyproperty",
      "keyName" : "事业单位",
      "keyValue" : "9",
      "keySort" : 9,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "7d7c226df82b41fd9469c19dcb35e3a3",
      "type" : "companyproperty",
      "keyName" : "合资",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "877e1d4a269c4001b50b299429e8a418",
      "type" : "companyproperty",
      "keyName" : "代表处",
      "keyValue" : "7",
      "keySort" : 7,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a0b32ddad4df45c18c05bed7116f271e",
      "type" : "companyproperty",
      "keyName" : "其他",
      "keyValue" : "18",
      "keySort" : 18,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b60dca7977cb4cabb99c6f641e5e7c0d",
      "type" : "companyproperty",
      "keyName" : "股份制企业",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "cc48739c2e8b48b79c4ff1f18dd7048a",
      "type" : "companyproperty",
      "keyName" : "律师事务所",
      "keyValue" : "13",
      "keySort" : 13,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d812a825759445d9b1925a9225ea5ef6",
      "type" : "companyproperty",
      "keyName" : "外商独资/办事处",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "da2e68e2e89b4de6a6fc7e5a2a660ae9",
      "type" : "companyproperty",
      "keyName" : "非盈利组织",
      "keyValue" : "17",
      "keySort" : 17,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "f750d5267bc042d7b6bb186b5dc610bc",
      "type" : "companyproperty",
      "keyName" : "港澳台公司",
      "keyValue" : "15",
      "keySort" : 15,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "remindbasic" : [ {
      "id" : "045297593cb1437e900a3fdc875fe890",
      "type" : "remindbasic",
      "keyName" : "提前9天",
      "keyValue" : "10",
      "keySort" : 10,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "3dc58db395864f83adfbf0dc2469d930",
      "type" : "remindbasic",
      "keyName" : "提前3天",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "4e0737507e55418d941fde151add2cc7",
      "type" : "remindbasic",
      "keyName" : "提前6天",
      "keyValue" : "7",
      "keySort" : 7,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "71e228a356f24557b3e397571667c345",
      "type" : "remindbasic",
      "keyName" : "提前8天",
      "keyValue" : "9",
      "keySort" : 9,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "894bd8102927444aabddfb23a1eadc86",
      "type" : "remindbasic",
      "keyName" : "提前4天",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "ae07a13de91d4aad98648f968e20f070",
      "type" : "remindbasic",
      "keyName" : "提前2天",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b3258f84437f44c58125f931743c09a0",
      "type" : "remindbasic",
      "keyName" : "提前5天",
      "keyValue" : "6",
      "keySort" : 6,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b3aec3cfae2644809240f98ac8156bd6",
      "type" : "remindbasic",
      "keyName" : "提前10天",
      "keyValue" : "11",
      "keySort" : 11,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "bcf697626d474218af34b70b2c86ea13",
      "type" : "remindbasic",
      "keyName" : "提前7天",
      "keyValue" : "8",
      "keySort" : 8,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "cb4ec24294cc416d8adf134b5a963d74",
      "type" : "remindbasic",
      "keyName" : "当天提醒",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "df7c4ac361b44876a18e00a9579b3d2a",
      "type" : "remindbasic",
      "keyName" : "提前1天",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "resume" : [ {
      "id" : "1f431fb3e70946c89f02bed766db88e1",
      "type" : "resume",
      "keyName" : "推荐简历",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "cf4cde3c935a4eb8aa093a3686646794",
      "type" : "resume",
      "keyName" : "投递简历",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "degree" : [ {
      "id" : "2a775813b6bf4807a861229aa56d85b6",
      "type" : "degree",
      "keyName" : "精通",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "2af474ee960d4b12adeabe61ae0e2ea4",
      "type" : "degree",
      "keyName" : "熟练",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "85aef54a74b34276adefccbb078ee108",
      "type" : "degree",
      "keyName" : "良好",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "dd3cb3ca10b2434485e1f8d6d4023008",
      "type" : "degree",
      "keyName" : "一般",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "refusetype" : [ {
      "id" : "0ab256029ad34239b094ec5f168a26fe",
      "type" : "refusetype",
      "keyName" : "拒绝：2面",
      "keyValue" : "9",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "40df29b8e0bd43dba8b99f9c474ab989",
      "type" : "refusetype",
      "keyName" : "拒绝：3面",
      "keyValue" : "10",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "62448a6fe18f4f4892b014c5255ee429",
      "type" : "refusetype",
      "keyName" : "拒绝：入职",
      "keyValue" : "12",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8a265adf5a28417eb7fc5a5b85530fd6",
      "type" : "refusetype",
      "keyName" : "拒绝：offer",
      "keyValue" : "11",
      "keySort" : 5,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a6d0454207b24f8a928e85d0e1358fac",
      "type" : "refusetype",
      "keyName" : "拒绝：邀约",
      "keyValue" : "7",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "ae0c3e8e82a249c79957706d596992e8",
      "type" : "refusetype",
      "keyName" : "拒绝：1面",
      "keyValue" : "8",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "channel" : [ {
      "id" : "86ed2d237a8f4468a62a5096d27be00f",
      "type" : "channel",
      "keyName" : "前程无忧",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "96ded837545d45dd99f3b38b6a498dbb",
      "type" : "channel",
      "keyName" : "58同城",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a013c6a038ae4c50a63e266672bd047c",
      "type" : "channel",
      "keyName" : "智联招聘",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "candidatestatus" : [ {
      "id" : "1ed2881c49fb47f39c64122aba0b8b47",
      "type" : "candidatestatus",
      "keyName" : "拒绝：3面",
      "keyValue" : "10",
      "keySort" : 10,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "3c7ca6b7d44e43a4976261de08c7c97c",
      "type" : "candidatestatus",
      "keyName" : "面试：面试1面",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "4e970b4107c84ec1ace9b1463cf80994",
      "type" : "candidatestatus",
      "keyName" : "面试：面试3面",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "66145cf28b7b48269e7edce77e5fe711",
      "type" : "candidatestatus",
      "keyName" : "拒绝：2面",
      "keyValue" : "9",
      "keySort" : 9,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "74fccb336fce41f5932c636ada79dd4f",
      "type" : "candidatestatus",
      "keyName" : "拒绝：offer",
      "keyValue" : "11",
      "keySort" : 11,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "956c8a9dd71f49d9992e51a9557a9754",
      "type" : "candidatestatus",
      "keyName" : "拒绝：邀约",
      "keyValue" : "7",
      "keySort" : 7,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a361e834abc84be9be088a4c8c8c6ab8",
      "type" : "candidatestatus",
      "keyName" : "拒绝：入职",
      "keyValue" : "12",
      "keySort" : 12,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "ac039ee9f01a4828ba63a130f4a152b6",
      "type" : "candidatestatus",
      "keyName" : "面试：面试2面",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b6ef26b736e14095ab503c868b79f361",
      "type" : "candidatestatus",
      "keyName" : "拒绝：1面",
      "keyValue" : "8",
      "keySort" : 8,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "d27a1449c2d24c67badbdd0b013af61b",
      "type" : "candidatestatus",
      "keyName" : "待邀约",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "e08b264162b94f97b7bdd9304750ec88",
      "type" : "candidatestatus",
      "keyName" : "入职",
      "keyValue" : "6",
      "keySort" : 6,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "eb01e30641144401a1bea70f3bf85049",
      "type" : "candidatestatus",
      "keyName" : "offer",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517576178000,
      "updateTime" : "",
      "isDel" : 0
    } ],
    "remindinterview" : [ {
      "id" : "213c784d69ca48aa9a899ae57430f22c",
      "type" : "remindinterview",
      "keyName" : "提前2天",
      "keyValue" : "4",
      "keySort" : 4,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "31c841d01132497a958dee4b26d4a123",
      "type" : "remindinterview",
      "keyName" : "提前1天",
      "keyValue" : "3",
      "keySort" : 3,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "395a4b386f4b491e993f7b734f3cb8eb",
      "type" : "remindinterview",
      "keyName" : "提前4天",
      "keyValue" : "6",
      "keySort" : 6,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "8abc5d0d1aab4ad2bd89788a105df303",
      "type" : "remindinterview",
      "keyName" : "提前3天",
      "keyValue" : "5",
      "keySort" : 5,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "9361f543ee5243e8a4bbb5a024e4b898",
      "type" : "remindinterview",
      "keyName" : "提前5天",
      "keyValue" : "7",
      "keySort" : 7,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "a9c5fec6475441cfbee9e5a0ab3bcc55",
      "type" : "remindinterview",
      "keyName" : "提前2小时",
      "keyValue" : "1",
      "keySort" : 1,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    }, {
      "id" : "b58b0add1ad249f8a12046c1d7106c73",
      "type" : "remindinterview",
      "keyName" : "提前4小时",
      "keyValue" : "2",
      "keySort" : 2,
      "inputTime" : 1517799195000,
      "updateTime" : "",
      "isDel" : 0
    } ]
  }


fetchMock.mock(`${APP_SERVER}/constants/select`,result);
fetchMock.mock(`${APP_SERVER}/constants/select2`,result);
fetchMock.get(`${APP_SERVER}/code/codesJson`,constAll);


var userResource={
  "resourceList" : [ {
    "note" : "settings",
    "resourceId" : "1aa46ac44686488b9ef4e051146f169e",
    "pid" : "",
    "resourceName" : "系统设置",
    "resourceType" : "1",
    "resourceUrl" : "",
    "enabled" : 1.0,
    "sort" : 8.0,
    "isLeaf" : 1.0,
    "levels" : 1.0,
    "icon" : "",
    "quickDefault" : 0,
    "inputTime" : 1516772709000,
    "domain" : "http://localhost:8080"
  }, {
    "note" : "interview",
    "resourceId" : "44b056720b5f49519c7cffbe488fa6bb",
    "pid" : "",
    "resourceName" : "面试管理",
    "resourceType" : "1",
    "resourceUrl" : "",
    "enabled" : 1.0,
    "sort" : 3.0,
    "isLeaf" : 1.0,
    "levels" : 1.0,
    "icon" : "",
    "quickDefault" : 0,
    "inputTime" : 1516772709000,
    "domain" : "http://localhost:8080"
  }, {
    "note" : "report",
    "resourceId" : "639b1f16a082487ca009a13e93f15366",
    "pid" : "",
    "resourceName" : "统计分析",
    "resourceType" : "1",
    "resourceUrl" : "",
    "enabled" : 1.0,
    "sort" : 7.0,
    "isLeaf" : 1.0,
    "levels" : 1.0,
    "icon" : "",
    "quickDefault" : 0,
    "inputTime" : 1516772709000,
    "domain" : "http://localhost:8080"
  }, {
    "note" : "resume",
    "resourceId" : "735e7e66da0e4de5aca3a21793d9113d",
    "pid" : "",
    "resourceName" : "简历管理",
    "resourceType" : "1",
    "resourceUrl" : "",
    "enabled" : 1.0,
    "sort" : 2.0,
    "isLeaf" : 1.0,
    "levels" : 1.0,
    "icon" : "",
    "quickDefault" : 0,
    "inputTime" : 1516772709000,
    "domain" : "http://localhost:8080"
  }, {
    "note" : "job",
    "resourceId" : "8b5f185753274528a69b6e606bc56665",
    "pid" : "",
    "resourceName" : "职位管理",
    "resourceType" : "1",
    "resourceUrl" : "",
    "enabled" : 1.0,
    "sort" : 1.0,
    "isLeaf" : 1.0,
    "levels" : 1.0,
    "icon" : "",
    "quickDefault" : 0,
    "inputTime" : 1516772709000,
    "domain" : "http://localhost:8080"
  }, {
    "note" : "soundlist",
    "resourceId" : "a78ba93566b44aadb21a14344f12b7af",
    "pid" : "",
    "resourceName" : "通话记录",
    "resourceType" : "1",
    "resourceUrl" : "",
    "enabled" : 1.0,
    "sort" : 9.0,
    "isLeaf" : 1.0,
    "levels" : 1.0,
    "icon" : "",
    "quickDefault" : 0,
    "inputTime" : 1516772709000,
    "domain" : "http://localhost:8080"
  }, {
    "note" : "member",
    "resourceId" : "c8ceb8e7e34c464e90c7c3c0163e0b00",
    "pid" : "",
    "resourceName" : "员工管理",
    "resourceType" : "1",
    "resourceUrl" : "",
    "enabled" : 1.0,
    "sort" : 4.0,
    "isLeaf" : 1.0,
    "levels" : 1.0,
    "icon" : "",
    "quickDefault" : 0,
    "inputTime" : 1516772709000,
    "domain" : "http://localhost:8080"
  }, {
    "note" : "credit",
    "resourceId" : "e1e8e4beab104cf4a85996786c76f230",
    "pid" : "",
    "resourceName" : "诚信库",
    "resourceType" : "1",
    "resourceUrl" : "",
    "enabled" : 1.0,
    "sort" : 6.0,
    "isLeaf" : 1.0,
    "levels" : 1.0,
    "icon" : "",
    "quickDefault" : 0,
    "inputTime" : 1516772709000,
    "domain" : "http://localhost:8080"
  }, {
    "note" : "elite",
    "resourceId" : "f7997d00fb4b43b08276fbab73ddd2bb",
    "pid" : "",
    "resourceName" : "人才库",
    "resourceType" : "1",
    "resourceUrl" : "",
    "enabled" : 1.0,
    "sort" : 5.0,
    "isLeaf" : 1.0,
    "levels" : 1.0,
    "icon" : "",
    "quickDefault" : 0,
    "inputTime" : 1516772709000,
    "domain" : "http://localhost:8080"
  } ],
  "account" : "test1"
}

fetchMock.get(`${APP_SERVER}/userResource/menuListJson`,userResource);





// fetchMock.post(`${APP_SERVER}/passport/login`, {
//   msg:"身份认证失败",
//   data:{}
// });

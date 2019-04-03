import {
	routerActions,
	push,
	replace
} from "react-router-redux"
import {
	message
} from "antd"
import {
	hashHistory
} from "react-router"
import EventEmitter from "eventemitter3"
import DictUtils from "app-utils/DictUtils"
import {
	history
} from "../store"
const emitter = new EventEmitter()
// emitter.setMaxListeners(1);
// emitter.on('event', function(a, b) {
//   console.log(a, b, this);
// });
// emitter.emit('event', 'a', 'b');

/*
{
  title: '职位详情',
  key: 'job/jobrelease' ,
  src:`/static/js/client/main.html#/job/jobrelease/${row.jobId}/4/1`
}
*/

function clientAddTab(pan) {
	parent.addTab && parent.addTab(pane)
}

export default class ClientAPI {

	OnCallJson(params) {
		invokeMethod("OnCallJson", params)
	}

	ShowPublicUrl(url) {
		// console.log(url)
		invokeMethod("ShowPublicUrl", url)
	}
	ShowRecordPlay(params) {
		invokeMethod("ShowRecordPlay", params)
	}
	onCopyToClipBoard(phone) {
		invokeMethod("OnCopyToClipBoard", phone)
	}
	onCall(phone, id) {
		invokeMethod("OnCall", [phone, id].join("_"))
	}
	openPageLink(type) {
		if (type == "1") {
			// history.push("/personal/list")
			//   invokeMethod('updateTitle',"个人中心");

			clientAddTab({
				title: "个人中心",
				key: "/personal/list",
				src: "/static/js/client/Settings.html#/settings/personal/list"
			})
		} else if (type == "2") {
			// history.push("/personal/share")
			//   invokeMethod('updateTitle',"推广返利");
			clientAddTab({
				title: "推广返利",
				key: "/personal/share",
				src: "/static/js/client/Settings.html#/settings/personal/share"
			})
		} else if (type == "3") {
			// history.push("/settings/userRights")
			// invokeMethod('updateTitle',"用户权限");
			clientAddTab({
				title: "用户权限",
				key: "/userRights",
				src: "/static/js/client/main.html#/settings/userRights"
			})
		} else if (type == "4") { //二维码页面
			clientAddTab({
				title: "二维码",
				key: "/ercode",
				src: "/static/js/client/main.html#/settings/ercode"
			})
		} else if (type == "5") { //添加职位
			clientAddTab({
				title: "添加职位",
				key: "job/jobrelease",
				src: "/static/js/client/main.html#/job/jobrelease/1/1"
			})
		} else if (type == "6") { //导入职位
			clientAddTab({
				title: "添加职位",
				key: "job/jobrelease",
				src: "/static/js/client/main.html#/job/search"
			})
		}
	}
	openSearchPage(type, content) {
		clientAddTab({
			title: "添加职位",
			key: "job/jobrelease",
			src: `/static/js/client/main.html#/resume/search/${type}/${content}`
		})
	}
	toResumeList() {
		history.push("/resume/list")
	}
	openChannelLink(type) {
		// console.log(DictUtils.getDictItemByValue("channel",type).pop())
		invokeMethod("ShowPublicUrl", DictUtils.getDictItemByValue("channel", type).pop().keyURl)
	}

	JsToPython(params) {
		params.timestamp = new Date().getTime()
		// console.info("JsToPython",params)
		invokeMethod("JsToPython", JSON.stringify({
			JsToPython: params
		}))
		// emitter.once(params.type, function(item) {
		//   console.log(item);
		// });
		// emitter.emit('event', 'a', 'b');

	}
	PythonToJs(params) {
		// console.info("PythonToJs",params)
		try {
			console.log()
			var object = JSON.parse(params).PythonToJs
		} catch (e) {
			console.log(e)
		}


		if (object.ok) {
			console.log(object)
			emitter.emit(object.type, object)
		} else {
			if (object.type == "download_resume") {
				emitter.emit(object.type, object)
			} else {
				message.error(object.msg)
			}
		}

		console.log("emit", object.type, object)
	}
	invokeMethod(methodName, params) {
		// console.dir(external)
		if (external[methodName]) {
			external[methodName].call(this, params)
			// console.log(methodName,params)
		} else {
			//external[methodName].call(params)
			// alert("请使用客户端打开")
		}
		// external.updateTitle(params)
	}
	showMsgCenterEx(strType) {
		if (strType == undefined) {
			strType = 1
		}
		invokeMethod("updateTitle", "消息中心")
		hashHistory.push(`/dashboard/message/${strType}`)
		// routerActions.push()
	}
	updateTitle(title) {
		invokeMethod("updateTitle", title)
	}
}
export {
	emitter
}
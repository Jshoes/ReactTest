/**
 * @Date:   2017-09-07T09:45:33+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-13T11:45:29+08:00
 */
import {
	stringify
} from "qs"
import Moment from "moment"
import {
	notification,
	message
} from "antd"



function processMoment2DateStr(object) {
	for (var key in object) {
		if (object[key] instanceof Array) {
			if (object[key].length != 0) {
				object[key] = processMoment2DateStr(object[key])
			} else {
				object[key] = undefined
			}
		}
		if (object[key] instanceof Moment) {
			//console.log(key)
			//key is fieldName
			if (key == "customDatetime") {
				// other format
				//
			} else if (key == "interviewTime" || key == "followRemindTime") {
				object[key] = object[key].format("YYYY-MM-DD HH:mm:ss")
			} else if (key == "startWorkingYear" || key == "birthYear") {
				object[key] = object[key].format("YYYY")
			} else {
				object[key] = object[key].format("YYYY-MM-DD")
			}
		}
	}
	return object
}

function processParams(object) {
	let {
		column,
		current,
		pageSize,
		total,
		field,
		order,
		pageSizeOptions,
		showSizeChanger,
		columnKey,
		...other
	} = object
	var body = {
		page: current,
		pageSize,
		totalRecord: total,
		item: processMoment2DateStr({
			...other,
			orderKey: field != undefined ? ([field, order].join(" ").replace(/end$/, "")) : undefined
		})
	}
	return body
}

export default class FetchAPI {
	constructor(props) {
		this.defaults = {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest"
			}
		}
	}

	fetch(url, options) {
		options = Object.assign({}, options, {
			body: JSON.stringify(processMoment2DateStr(options.body))
		})
		return fetch(url, Object.assign({}, this.defaults, options)).then(res => {
			if (res.status == 403) {
				global.invokeMethod("RefreshMainPage")
			}
			if (res.ok == true) {
				return res
			} else {
				var err = new Error(res.statusText)
				err.response = res
				//message.error(err.response.url+"|"+err.response.statusText+"|"+err.response.status,5,null,true)
				throw err
			}
		}).then(res => {
			//修正后台不返回或返回不是JSON时，为空处理
			if (res.headers.get("content-type") == "application/json;charset=UTF-8") {
				return res.json()
				/*
      }else if(res.headers.get('content-type')=='text/html;charset=UTF-8'){
        return {}
	  */
			} else {
				return res
			}
		})
	}

	fetchPatch(url, options) {
		return this.fetch(url, Object.assign({
			method: "PATCH"
		}, options))
	}
	fetchGet(url, options) {
		if (options && typeof(options.body) === "object") {
			options.body = stringify(options.body)
		}

		if (options && options.body && options.body != "") {
			url = [url, options.body].join("?")
		}
		options && delete options.body
		return this.fetch(url, Object.assign({
			method: "GET"
		}, options))
	}
	fetchPut(url, options) {
		return this.fetch(url, Object.assign({
			method: "PUT"
		}, options))
	}
	fetchPostList(url, options) {
		if (options.body == "" || options.body == undefined) {
			options.body = {}
		}
		options.body = processParams(options.body)
		return this.fetch(url, Object.assign({
			method: "POST",
		}, options))
	}
	fetchPost(url, options) {
		return this.fetch(url, Object.assign(options, {
			method: "POST"
		}))
	}
	fetchDelete(url, options) {
		return this.fetch(url, Object.assign({
			method: "DELETE"
		}, options))
	}
	fetchDownload(url, params) {
		return this.fetchGet(url, params).then(res => res.blob().then(blob => {
			var a = document.createElement("a")
			var url = window.URL.createObjectURL(blob) // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
			var filename = res.headers.get("Content-Disposition")
			a.href = url
			a.download = decodeURI(filename.replace("attachment;filename=", ""))
			a.click()
			window.URL.revokeObjectURL(url)
		}))
	}
	fetchPostDownload(url, params) {
		return this.fetchPost(url, params).then(res => res.blob().then(blob => {
			var a = document.createElement("a")
			var url = window.URL.createObjectURL(blob) // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
			var filename = res.headers.get("Content-Disposition")
			a.href = url
			a.download = decodeURI(filename.replace("attachment;filename=", ""))
			a.click()
			window.URL.revokeObjectURL(url)
		}))
	}
	fetchCatch(err) {
		//  message.error(err.response.url+"|"+err.response.statusText+"|"+err.response.status,5,null,true)
		console.warn("fetchCatch:" + JSON.stringify(err.response))
	}

	fetchRequest(url, options) {
		return new Request(url, options)
		// console.log(url)
		/*
    return {
      type:"@@fetch"+url,
      payload:{
        request:new Request(url,options),
        success,
        failure
      }
    }
    */
	}
}


export class RequestAPI {
	constructor(props) {
		this.defaults = {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"X-Requested-With": "XMLHttpRequest"
			}
		}
	}

	fetch(url, options) {
		options = Object.assign({}, options, {
			body: JSON.stringify(processMoment2DateStr(options.body))
		})
		return new Request(url, Object.assign({}, this.defaults, options))
	}

	fetchPatch(url, options) {
		return this.fetch(url, Object.assign({}, options, {
			method: "PATCH"
		}))
	}
	fetchGet(url, options) {
		if (options && typeof(options.body) === "object") {
			options.body = stringify(options.body)
		}

		if (options && options.body && options.body != "") {
			url = [url, options.body].join("?")
			options && delete options.body
		}
		return new RequestAPI().fetch(url, Object.assign({}, options, {
			method: "GET"
		}))
	}
	fetchPut(url, options) {
		return this.fetch(url, Object.assign({}, options, {
			method: "PUT"
		}))
	}
	fetchPostList(url, options) {
		if (options.body == "" || options.body == undefined) {
			options.body = {}
		}
		options.body = processParams(options.body)
		return this.fetch(url, Object.assign({}, options, {
			method: "POST",
		}))
	}
	fetchPost(url, options) {
		return this.fetch(url, Object.assign({}, options, {
			method: "POST"
		}))
	}
	fetchDelete(url, options) {
		return this.fetch(url, Object.assign({}, options, {
			method: "DELETE"
		}))
	}
	fetchDownload(url, params) {
		return this.fetchPost(url, params).then(res => res.blob().then(blob => {
			var a = document.createElement("a")
			var url = window.URL.createObjectURL(blob) // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
			var filename = res.headers.get("Content-Disposition")
			a.href = url
			a.download = decodeURI(filename.replace("attachment;filename=", ""))
			a.click()
			window.URL.revokeObjectURL(url)
		}))
	}
}
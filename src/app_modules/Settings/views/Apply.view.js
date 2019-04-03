import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import SettingTable from 'components/SystemSetting'
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import { Button, Card ,Switch } from "antd"

@NestedComponent()
export default class Adverse extends PageView {
	state={
		switchChecked:0
	}
	componentDidMount() {
		const{actions}=this.props
		actions.fetchRemindAction()
	}
	onChange(checked) {
		console.log(`switch to ${Number(checked)}`);
		const{actions}=this.props
		actions.saveRemindAction({msg_1030:Number(checked)})
	}
	renderToolbar(){
		const{item}=this.props
		return(
			<Switch defaultChecked={!!(item.msg_1030)} onChange={this.onChange.bind(this)} />
		)
	}
	render() {

		return (
			<Card title={<div><h3 className="card-title">信息登记表设置</h3><small className="card-subtitle">候选人第一次面试时可以在线填写的信息登记表</small></div>}
						extra={this.renderToolbar()}>
						<div style={{textAlign:'center'}}>
							<img src="https://s1.ax1x.com/2018/07/30/PdQBa6.md.jpg" alt=""/>
						</div>
			</Card>
		)
	}
}

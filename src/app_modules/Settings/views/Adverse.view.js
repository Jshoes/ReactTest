import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import SettingTable from 'components/SystemSetting'
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import { Button, Card ,List,Avatar} from "antd"

@NestedComponent()
export default class Adverse extends PageView {
	componentWillMount() {
		const {actions} = this.props
		actions.optionListAction({optionCode:"bad_events"})
	}
	render() {
		const tableConfig={
			thTitle:"不良事件",
			title:"不良事件设置",
			subTitle:"此处维护加入黑名单时的不良事件设置项。",
			routeName:'adverse'
		}
		return (
			<SettingTable {...this.props} {...tableConfig}/>
		)
	}
}

import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import SettingTable from 'components/SystemSetting'
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import { Button, Card, List, Avatar } from "antd"
@NestedComponent()
export default class Reject extends PageView {
	componentWillMount() {
		const { actions } = this.props
		actions.optionListAction({ optionCode: "offer_refuse_reasons" })
	}
	render() {
		const tableConfig = {
			thTitle: "拒绝原因",
			title: "offer拒绝原因",
			subTitle: "此处维护候选人拒绝offer是选择的原因。",
			routeName:'reject'
		}
		return (
			<SettingTable {...this.props} {...tableConfig} />
		)
	}
}

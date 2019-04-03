import React, { Component } from 'react'
import NestedComponent from 'app/decorators/NestedComponent'
import SettingTable from 'components/SystemSetting'
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import { Button, Card, } from "antd"
@NestedComponent()
export default class Archive extends PageView {

	componentWillMount() {
		const {actions} = this.props
		actions.optionListAction({optionCode:"file_reasons"})
	}

	render() {
		const tableConfig = {
			thTitle: "归档原因",
			title: "归档原因设置",
			subTitle: "此处维护加入人才库时的归档原因设置项。",
			routeName:'archive'
		}
		return (
			<SettingTable {...this.props} {...tableConfig} />
		)
	}
}

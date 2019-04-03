import React, { Component } from 'react'
import { Button, Card } from "antd"
import NestedComponent from 'app/decorators/NestedComponent'
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
import ButtonGroups from 'app/components/ButtonGroups'


@NestedComponent()
export default class Ercode extends PageView {
	render(){
		return <div>二维码页面</div>
	}
}

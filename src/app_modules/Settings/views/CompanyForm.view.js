import React, { Component } from 'react'
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import { Input, Modal, Select, Row, Col, Cascader } from 'antd'
import BaseForm, { FormItem, customRules } from 'components/BaseForm'
import { FormPage } from 'app/components/Page'
import BaiduMap from 'components/BaiduMap'
import area from '../../../../area.json'

const Option = Select.Option;
@WrapperComponent(ModalView)
export default class CompanyFormView extends FormPage {

	constructor(props) {
		super(props)
		this.state = {
			location: [116.331398, 39.897445],
			area: '',
			address:''
		}
	}
	handleSubmit(values) {
		let { actions, router } = this.props;
		actions.saveCompanyAction(values)
		actions.backRoute(router)

		console.log('handleSubmithandleSubmit',values)
	}
	onAreaChange(value) {
		console.log(value.join(""),'sssssss');
		this.setState({
			area:value.join("")
		})
	}
	onAddressChange(e){
		console.log('val',e.target.value)
		this.setState({
			address:e.target.value
		})
	}
	render() {
		//见FormPage.view.js
		const { onSubmit, saveFormRef, item } = this.props
		// console.log('onSubmit',onSubmit)
		return (
			<BaseForm onSubmit={onSubmit} ref={this.saveFormRef}>
				<FormItem className="row-hidden">
					<Input name="id" type="hidden" defaultValue={item.id} />
				</FormItem>
				<FormItem  >
					<Input label="公司名称" name="company" defaultValue={item.company} rules={[{required:true,message:"公司名称不可为空"}]}/>
				</FormItem>
				<FormItem  >
					<Cascader label="所在区域" name="areaStr"    placeholder="请选择区域" defaultValue={item.province&&item.city&&item.county?[item.province,item.city,item.county]:[]} options={area} onChange={this.onAreaChange.bind(this)} rules={[{required:true,message:"所在区域不可为空"}]}/>
				</FormItem>
				<FormItem  >
					<Input label="详细地址" name="address" onChange={this.onAddressChange.bind(this)} defaultValue={item.address}rules={[{required:true,message:"详细地址不可为空"}]}/>
				</FormItem>
				<FormItem>
					<BaiduMap label="定位" name="longLaStr"
						accurateAddress={this.state.area+this.state.address}
						// location={item.longitude&&item.latitude?[item.longitude,item.latitude]:this.state.location}
						area={this.state.area}
						defaultValue={item.longitude&&item.latitude?[item.longitude,item.latitude]:[]}
						// defaultValue={item.longitude&&item.latitude?[item.longitude,item.latitude]:this.state.location}//defaultVal==>islocation=1
					/>
				</FormItem>
			</BaseForm>
		);
	}
}

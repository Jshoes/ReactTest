import React, { Component } from 'react'
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import { Input, Modal, Select, Row, Col, Cascader } from 'antd'
import BaseForm, { FormItem, customRules } from 'components/BaseForm'
import { FormPage } from 'app/components/Page'

@WrapperComponent(ModalView)
export default class SysOptionForm extends FormPage {


	handleSubmit(values) {
		let { actions, router } = this.props;
		actions.saveOptionAction(values)
		actions.backRoute(router)
		console.log(values)
	}
	render() {
		//见FormPage.view.js
		const { onSubmit, saveFormRef, item,optionCode,optionLabel } = this.props
		console.log(this.props)
		console.log('item',item)
		return (
			<BaseForm onSubmit={onSubmit} ref={this.saveFormRef}>
				<FormItem  className="row-hidden">
					<Input name="optionId" type="hidden" defaultValue={item.optionId} />
				</FormItem>
				<FormItem  className="row-hidden">
					<Input name="optionCode" type="hidden" defaultValue={optionCode} />
				</FormItem>
				<FormItem  >
					<Input label={optionLabel} name="optionName" placeholder={"请输入"+optionLabel} defaultValue={item.optionName}  rules={[{max:10,message:"最多输入10个字！"}]}/>
				</FormItem>
			</BaseForm>
		);
	}
}

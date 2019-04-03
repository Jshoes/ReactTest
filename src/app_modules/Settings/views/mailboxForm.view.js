import React, { Component } from 'react'
import { Input, Modal, Select,Row,Col } from 'antd'

import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm, { FormItem, customRules } from 'components/BaseForm'
import { FormPage } from 'app/components/Page'
import ModalView from 'app/components/Modal.view'
import DictUtils from 'app/utils/DictUtils'

const Option = Select.Option;

@WrapperComponent(ModalView)
 export default class MailboxForm extends FormPage {

	handleSubmit(values) {
		let { actions, router } = this.props;
		actions.saveMailboxItemAction(values)
		actions.backRoute(router)
	}
	updateFieldValue(value) {
		this.form.setFieldsValue({ host: value })
	}

	handleSelectChange = (value) => {
		this.updateFieldValue(value)
	}
	renderSelectOption(data,idx){
		return (<Option value={data.keyValue} key={idx}>{data.keyName}</Option>)
	}
	render() {
		const formFullItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 18
			}
		};
		//见FormPage.view.js
		const { onSubmit, saveFormRef,item } = this.props
		// console.log('onSubmit',onSubmit)
		return (
			<BaseForm onSubmit={onSubmit} ref={this.saveFormRef}>
				<FormItem {...formFullItemLayout} className="row-hidden">
					<Input name="timeFrame" type="hidden" defaultValue={"一个月"} />
				</FormItem>
				<FormItem {...formFullItemLayout} >
				<Select onChange={this.handleSelectChange.bind(this)} label="选择邮箱" name="emailType" defaultValue="" fetch={DictUtils.getDictByType("mailhost") && DictUtils.getDictByType("mailhost").sort((a,b)=>a.keySort - b.keySort)} renderItem={this.renderSelectOption} />
				</FormItem>
				<FormItem {...formFullItemLayout} >
					<Input label="邮箱帐号" name="email" rules={[{ type: "email", message: "邮箱格式不正确" }, { required: true, message: '邮箱账号不可为空' }, { validator: customRules.required }]} />
				</FormItem>
				<FormItem {...formFullItemLayout} >
					<Input label="邮箱密码" name="password" type="password" rules={[{ required: true, message: '邮箱密码不可为空' }]} />
				</FormItem>
				<FormItem {...formFullItemLayout} >
					<Input label="邮箱收取服务器" name="host" rules={[{ required: true, message: '邮箱收取服务器' }]} />
				</FormItem>
				<Row>
					<Col span={18} offset={6}>
						<p>温馨提示：</p>
						<p>请选择对应邮箱。163、126、QQ密码输入框内输入邮箱授权码，具体授权码请到对应邮箱设置处获取</p>
					</Col>
				</Row>
			</BaseForm>
		);
	}
}

/*
@WrapperComponent(ModalView)
class MailboxFormView extends FormPage {
	handleSubmit(values) {
		let { actions, router } = this.props;
		actions.saveMailboxItemAction(values)
		actions.backRoute(router)
	}
	updateFieldValue(value) {
		this.form.setFieldsValue({ host: value })
	}

	render() {
		return (
			<MailboxForm onSubmit={this.onSubmit} saveFormRef={this.saveFormRef} updateFieldValue={this.updateFieldValue.bind(this)}/>
		)
	}
}
export default MailboxFormView
*/

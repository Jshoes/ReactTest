import React, { Component } from 'react'
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import { Input, Modal, Select, Row, Col, Cascader } from 'antd'
import BaseForm, { FormItem, customRules } from 'components/BaseForm'
import { FormPage } from 'app/components/Page'
import SysOptionForm from 'app/components/SystemSetting/SysOptionForm'

@WrapperComponent(ModalView)
export default class ArchiveFormView extends FormPage {

	render(){
		const formConfig={
			optionCode:'offer_refuse_reasons',
			optionLabel:'拒绝原因',

		}
		return(
			<SysOptionForm {...this.props} {...formConfig} />
		)
	}
}

import React, {Component, PropTypes} from 'react'
//import {reduxForm,Field} from 'redux-form'
import {Button, Input, Table, Form, DatePicker,Card,Switch,Row,Select,Checkbox } from 'antd'

import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import ModalView from 'app/components/Modal.view'
import SwitchCard from 'app/components/SwitchCard'
import {FormPage} from 'app/components/Page'
// const FormCreate = Form.create
// const FormItem = Form.Item

class SettingsFormView extends FormPage {
  componentWillMount() {
  }
  render() {
    let {params, reduce} = this.props;
    //	let model=preduce.list[0]
    let item = {}
    return (
      <div className="containerSettings" style={{height:'100%',overflow:'auto'}}>
      1112
      </div>
    )
  }
}

export default SettingsFormView

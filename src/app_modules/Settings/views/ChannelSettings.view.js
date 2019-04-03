import React, {Component, PropTypes} from 'react'
//import {reduxForm,Field} from 'redux-form'
import {Button, Input, Table, Form, DatePicker,Card,Switch,Row,Col,Select,Checkbox,Radio,Icon,Popconfirm } from 'antd'
import {Link} from 'react-router'

import {Layout,Fixed,Pane} from 'app/components/Layout'
import PageView from 'app/components/Page'
import DictUtils from 'app/utils/DictUtils'
import styles from './styles.less'

const Option = Select.Option
const CheckboxGroup = Checkbox.Group;

class ChannelSettingsView extends PageView {
  componentDidMount() {
    let {actions} = this.props
    actions.channelSettingsAction()
  }
  handleChange(value){
    let {actions,item} = this.props
    actions.saveChannelSettingsAction({channel_1001:value})
  }
  render() {
    let {actions,item} = this.props
    console.log(item.channel_1001)
    return(
      <Card title="简历更新周期设置" className="channel-interval">
        <Row>
          统一简历更新的周期为
          <Select defaultValue={item.channel_1001} value={item.channel_1001}  name="channel_1001" style={{ width: 140 }} onChange={this.handleChange.bind(this)}>
            <Option value="3">3个月</Option>
            <Option value="4">4个月</Option>
            <Option value="5">5个月</Option>
            <Option value="6">6个月</Option>
            <Option value="7">7个月</Option>
            <Option value="8">8个月</Option>
            <Option value="9">9个月</Option>
            <Option value="10">10个月</Option>
            <Option value="11">11个月</Option>
            <Option value="12">12个月</Option>
          </Select>
        </Row>
        <Row>
          <Row>温馨提示：</Row>
          <Row>设置后，对于同一份简历，在更新周期内发生的更新将不再进行推送</Row>
        </Row>
      </Card>
    )
  }
}

export default ChannelSettingsView

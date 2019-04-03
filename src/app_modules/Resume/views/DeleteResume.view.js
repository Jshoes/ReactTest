/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-14T15:51:16+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row,
  Col,
  Modal,
  Button,
  Radio,
  Input,
  Form,
  DatePicker,
  Layout,
  Tooltip,
  Spin,
  Select,
  TreeSelect
} from 'antd'
import moment from 'moment'
import {FormPage} from 'app/components/Page'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import CalendarPicker from 'app/components/CalendarPicker'
import {TreeSelectPicker} from 'app/components/TreeView'
import styles from './styles.less'

const Option = Select.Option
const {TextArea} = Input
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

export default class DeleteForm extends FormPage{

  renderSelectOption(data,idx){
    return (<Select.Option value={data.optionId} key={idx}>{data.optionName}</Select.Option>)
  }

  handleSubmit(values){
    let {actions,router,location} = this.props;
    actions.deleteOptionAction(values)
    actions.backRoute(router)
  }

  translateChannelIds(rows){
    return rows && rows.map((it,idx)=>{
      return it.resumeChannelId
    })
  }

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
      location:{state:{ids,rows}}
    } = this.props
//resumeChannelId
    return (
      <BaseForm onSubmit={this.handleSubmit} ref={this.saveFormRef}>
        <h3>确认删除？（删除后不可恢复）</h3>
        <h4>删除申请和删除候选人都会对报表和统计造成影响，请谨慎操作</h4>
        <FormItem>
          <Input type="hidden" name="ids" defaultValue={ids}/>
        </FormItem>
        <FormItem>
          <Input type="hidden" name="resumeChannelIds" defaultValue={this.translateChannelIds(rows)}/>
        </FormItem>
        <FormItem className="spacial-radio">
          <RadioGroup name="deleteType" defaultValue="1" rules={[{required:true,message:"删除类型不能为空"}]}>
            <Radio value="1">
              {/*<Tooltip title="只删除职位候选人对当前职位的申请，该候选人在人才库和其他职位的记录将不会被删除">删除申请</Tooltip>*/}
              <div className="radio-content"><span className="title">删除申请</span> <span>只删除职位候选人对当前职位的申请，该候选人在人才库和其他职位的记录将不会被删除</span></div>
            </Radio>
            <Radio value="2">
              {/*<Tooltip title="删除候选人在系统中所有记录">删除候选人</Tooltip>**/}
              <div className="radio-content"><span className="title">删除候选人</span> <span>删除候选人在系统中所有记录</span></div>
            </Radio>
          </RadioGroup>
        </FormItem>
      </BaseForm>
    )
  }
}

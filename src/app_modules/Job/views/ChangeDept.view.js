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
  Spin,
  Select,
  TreeSelect
} from 'antd'
import moment from 'moment'
import {FormPage} from 'app/components/Page'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import {TreeSelectPicker} from 'app/components/TreeView'

const Option = Select.Option
const {TextArea} = Input
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

export default class ChangeDeptForm extends FormPage{


  handleSubmit(values){
    let {actions,router,location} = this.props;
  //  console.log(values)
    actions.changeJobOption(values).then(()=>{
      // setTimeout(function(){
        actions.backRouteReload(router,location)
      // },2000)
    })
  }

  renderTreeData(item){
    return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id},this.loopTreeData(item.children))
  }
  loopTreeData(data){
    let that = this
    return data.map((item) => {
      if (item.children && item.children.length) {
        return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id},this.loopTreeData(item.children))
      }else{
        return React.cloneElement(TreeNode,{value:item.id,title:item.text,key:item.id})
      }
    })
  }

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
      formFullItemLayout,
    } = this.props
    let {location:{state:{keys}}} = this.props
    /*updateType 4 为修改部门*/
    return (
      <BaseForm onSubmit={this.handleSubmit} ref={this.saveFormRef}>
        <FormItem style={{marginBottom:0}}>
          <Input type="hidden" name="updateType" defaultValue={4}/>
        </FormItem>
        <FormItem style={{marginBottom:0}}>
          <Input type="hidden" name="jobIds" defaultValue={keys}/>
        </FormItem>
        <h4>已选择{keys.length}条职位</h4>
          <Row>
              <FormItem >
                <TreeSelectPicker
                  label="招聘部门"
                  name="groupId"
                  fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="选择部门"
                  rules={[{required:true,message:"招聘部门不可为空"}]}
                  treeDefaultExpandAll
                />
              </FormItem>
          </Row>
      </BaseForm>
    )
  }
}

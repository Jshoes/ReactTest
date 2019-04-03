/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-02-02T14:31:53+08:00
 */

import React, {Component, PropTypes} from 'react'
import { Row, Col, Modal, Button, Input, Form, DatePicker, Layout, Spin, Select, Checkbox, Steps, message, Icon, List } from 'antd'
import {FormPage} from 'app/components/Page'
import ModalView,{ModalStepsView} from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem} from 'app/components/BaseForm'

class MemberImportResult extends Component{
  downloadErrorReport(fileId) {
    let {actions} = this.props
    actions.exportAction(`${APP_SERVER}/memberImportResult/expErrorExcel`,{fileId:fileId})
  }

  render() {
    let {items} = this.props
    return (
      <List
        className="calendar-todo-list"
        itemLayout="horizontal"
        loadMore={false}
        dataSource={items}
        renderItem={item => {
          let content = "正在导入"
          if(item.status == "1"){
            content = (<div className='content'>共解析数据{item.totalNum}条，成功导入{item.successNum}条，导入失败{item.failNum}条</div>)
          }
          return(
            <List.Item className='import-result-item' actions={item.failNum!=0?[<a onClick={this.downloadErrorReport.bind(this,item.fileId)}><Icon type="download" />下载失败数据</a>]:[]}>
              <List.Item.Meta
                title={<div className='title'><span className='input-time'>{item.inputtime}</span><span className="operater">操作人：{item.inputAcc}</span></div>}
                description={content}
              />
            </List.Item>
          )
        }}
      />
    )
  }
}

@WrapperComponent(ModalStepsView)
class MemberImportResultView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props
    actions.importResultListAction()
  }

  render() {
    let {params, reduce:{spins:{formSpin},importResultList}, actions} = this.props;
    return (
      <Spin tip="Loading..." spinning={formSpin}>
        <MemberImportResult items={importResultList} actions={actions} />
      </Spin>
    )
  }
}

export default MemberImportResultView

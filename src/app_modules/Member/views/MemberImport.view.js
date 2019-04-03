/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-02-02T14:31:53+08:00
 */

import React, {Component, PropTypes} from 'react'
import { Row, Col, Modal, Button, Input, Form, DatePicker, Layout, Spin, Select, Checkbox, Steps, Upload, message, Icon, List } from 'antd'
import {FormPage} from 'app/components/Page'
import ModalView,{ModalStepsView} from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import styles from './styles.less'
import ErrorBoundary from 'app/components/ErrorBoundary'

const Option = Select.Option
const Step = Steps.Step

class MemberImport extends Component{
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      fileUpload: false,
      sameField: false,
      fileResponse: {
        list: [],
        id: "",
        headerAndFistRowData: {
          datas: [],
          header: [],
          headerFiled: [],
          rows: ""
        }
      },
      fileList: [],
      fileSize: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    if(current == 1){
      // console.log(this.state.fileSize)
      //this.firstStepSubmit()
      if(!this.state.fileUpload){
        message.error("未上传文件！")
        return false
      }
    }

    if(current == 2){
      this.onSubmit()
    }else{
      this.setState({ current });
    }
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  downloadTemplate() {
    let {actions} = this.props
    actions.exportAction(`${APP_SERVER}/fileUpload/expTempExcel`)
  }

  renderSelectOption(data,idx){
    return (<Option value={data.fieldCode} key={idx}>{data.fieldName}</Option>)
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  onSubmit(){
    const current = this.state.current + 1;
    this.form.validateFieldsAndScroll((err, values) => {
      if (err) {
       return;
      }
      let id = this.state.fileResponse["id"]
      let {actions} = this.props
      let fieldsStr = []
      Object.getOwnPropertyNames(values).map((it)=>{
        fieldsStr.push(values[it])
      })
      var sortFieldsStr = fieldsStr.join(",")+","
      var sameField = this.state.sameField
      for(var i=0;i<fieldsStr.length;i++) {
        if(fieldsStr[i]!="" && (sortFieldsStr.replace(fieldsStr[i]+",","").indexOf(fieldsStr[i]+",")>-1)) {
          message.error('匹配字段不能重复')
          return false
        }
      }
      let submitData = Object.assign({},{fieldsStr},{id})
      actions.uploadCommitAction(submitData)
      this.setState({ current });
     });
  }
  firstStepSubmit(){
    const current = this.state.current + 1;
    this.form.validateFieldsAndScroll((err, values) => {
      if (err) {
       return;
      }
      console.log(values)
      this.setState({ current });
     });
  }
  renderTableList(){
    let list = this.state.fileResponse["list"]
    let id = this.state.fileResponse["id"]
    let importFields = this.state.fileResponse["importFields"]

    const {
      sysFieldList,
      form,
      children,
    } = this.props
    return (
      <BaseForm onSubmit={this.onSubmit} ref={this.saveFormRef}>
       <List
         dataSource={list}
         renderItem={(item,idx) => (
           <List.Item className="table-row">
             <span className="col-content">{item.header}</span>
             <FormItem>
               <Select name={`name${idx}`} placeholder="请选择" fetch={importFields} renderItem={this.renderSelectOption} defaultValue={item.headerFiled}></Select>
             </FormItem>
             <span className="col-content">{item.datas}</span>
           </List.Item>
         )}
       />
      </BaseForm>
    )
  }

  uploadSuccess() {
    message.success('导入完成!')
    let {router,actions} = this.props
    actions.backRoute(router)
  }

  render() {
    const self = this
    const { current } = this.state;
    const formOffsetItemLayout = {
      wrapperCol: {
        offset:6,
        span: 18
      }
    };
    const props = {
      name: 'file',
      action: '/fileUpload/member/match',
      accept:'.xls,.xlsx',
      // showUploadList:false,
      // accept: "application/json",
      // onRemove:()=>{return false},
      onChange(info) {
        let fileList = info.fileList
        fileList = fileList.slice(-1)
        self.setState({ fileList })
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功！`);
          self.setState({
            fileUpload: true
          })
          // console.log("fileUpload",self.state.fileUpload)
          let response = info.file.response
          let headerAndFistRowData = response.headerAndFistRowData
          let {datas,header,headerFiled} = headerAndFistRowData
          let list = []
          header.map((it,idx)=>{
            list.push({
              "datas": datas[idx],
              "header": it,
              "headerFiled": headerFiled[idx]
            })
          })
          response.list = list
          response.importFields.splice(0,0,{
            "fieldCode": "",
      			"fieldName": "不导入该字段",
          })
          self.setState({
            fileResponse: response
          })
          // console.log(self.state)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败！`);
        }
      },
      beforeUpload: function(file){
        if(file.size/1024/1024>1){
          message.error("文件大小不能超过1MB")
          return false
        }else {
          return true
        }
      }
    };
    let {fileResponse:{headerAndFistRowData:{rows}}} = this.state

    const steps = [{
      title: '上传文档',
      content: (
        <div className="first-step-content">
          <div>
            <div>一、下载员工管理模板，批量填写员工信息</div>
            <div className="padding-left-2em"><a onClick={this.downloadTemplate.bind(this)}>下载数据模板</a></div>
          </div>
          <div className="padding-left-2em">
            注意事项：<br/>
            1、模板中的表头名称不可更改，表头行不能删除<br/>
            2、项目顺序可以调整，不需要的项目可以删减<br/>
            3、其中必填项必须保留<br/>
            4、导入文件请勿超过1MB。
          </div>
          <div>
            <div>二、上传填写好的信息表</div>
            <div className="padding-left-2em upload-area">
              <Upload {...props} fileList={this.state.fileList}>
                <Button>
                  <Icon type="upload" /> 选择文件
                </Button>
              </Upload>
              <BaseForm onSubmit={this.firstStepSubmit} ref={this.saveFormRef}>
                 <FormItem>
                   <Input name="fileSize" type="hidden" defaultValue={this.state.fileSize} value={this.state.fileSize} rules={[{validator:customRules.fileSize,max:1}]} />
                 </FormItem>
              </BaseForm>
            </div>
          </div>
        </div>
      ),
    }, {
      title: '匹配字段',
      content: (
        <div className="second-step-content">
          <div className="header">数据字段匹配（共{rows}条）</div>
          <div className="body">
            <div className="table-header">
              <span>导入字段</span>
              <span>匹配字段</span>
              <span>首条数据</span>
            </div>

            {this.renderTableList()}

          </div>
        </div>
      ),
    }, {
      title: '完成',
      content: (
        <div className="third-step-content">
          <Icon type="check-circle" className="icon-success" />
          <br />
          提交完成
        </div>
      ),
    }];

    return (
      <div className="member-import">
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {
            this.state.current > 0
            &&
            this.state.current !== steps.length - 1
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          }
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => this.uploadSuccess()}>完成</Button>
          }
        </div>
      </div>
    )
  }
}

@WrapperComponent(ModalStepsView)
@WrapperComponent(ErrorBoundary)
class MemberImportView extends FormPage{
  //处理表格提交后动作
  handleSubmit(values){
    let {reduce:{searchParams},actions} = this.props;
    console.log(searchParams,values)
  }

  render() {
    let {params, reduce:{spins:{formSpin},sysFieldList,page,searchParams}, actions, reduce,router} = this.props;
    return (
      <Spin tip="Loading..." spinning={formSpin}>
        <MemberImport onSubmit={this.onSubmit} sysFieldList={sysFieldList} actions={actions} router={router} />
      </Spin>
    )
  }
}

export default MemberImportView

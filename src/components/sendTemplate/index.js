import React, {Component} from 'react'
import API from '../../layout/api'
import {
    Row,
    Col,
    Icon,
    Modal,
    Button,
    Input,
    Form,
    DatePicker,
    Layout,
    Spin,
    Upload,
    Select
} from 'antd'
import {FormPage} from 'components/Page'
import ModalView from 'components/Modal.view'
import Remote from 'components/Remote'
import RichEditor,{EditableRichEditor} from 'components/RichEditor'
import WrapperComponent from '../../decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'components/BaseForm'
import FileUpload from 'components/FileUpload'
import EmailFormView from 'components/sendTemplate/BindEmailForm.view'
import UnbindEmailFormView from 'components/sendTemplate/UnbindEmailForm.view'
import style from './index.less'

const Option = Select.Option
const {TextArea} = Input

export default class EmailTemplateLinkage extends Component{
    state = {
        selectDefault:'',
        visible:false,
        unbindVisible: false,
        textVisible: false,
        email:''
    }
    componentWillMount() {
      this.getEmailConfig()
    }

    getEmailConfig() {
      new API().fetchEmailConfig().then(json => {
        if(json.status == 0){
          this.setState({
            textVisible: false,
            email: json.email
          })
        }else{
          // console.log("未绑定")
          this.setState({
            textVisible: true
          })
          this.showModal()
        }
      }).catch(ex => {
        return "error"
      })
    }

    renderEmailSelectOption(data,idx){/*data.type = 1 为短信 2为邮件*/
      // console.log(data.id)
        return data.type == 2? (<Select.Option value={data.content} key={data.id}>{data.name}</Select.Option>):""
    }
    templateChange(value){
        let {updateFieldValue} = this.props
        updateFieldValue("mailContent",value)
    }
    showModal(){
      this.setState({
          visible:true
      })
    }
    hideModal(){
      this.setState({
          visible:false
      })
    }
    showUnbindModal(){
      this.setState({
          unbindVisible:true
      })
    }
    hideUnbindModal(){
      this.setState({
          unbindVisible:false
      })
    }
    renderBindEmailForm(){
      let {visible}= this.state
      return (
        visible?<EmailFormView hideModal={this.hideModal.bind(this)} getEmailConfig={this.getEmailConfig.bind(this)} mailSubject="offer邮件通知"></EmailFormView>:null
      )
    }
    renderUnBindEmailForm(){
      let {unbindVisible,email}= this.state
      return (
        unbindVisible?<UnbindEmailFormView hideModal={this.hideUnbindModal.bind(this)} getEmailConfig={this.getEmailConfig.bind(this)} email={email} mailSubject="offer邮件通知"></UnbindEmailFormView>:null
      )
    }

    responseType(response){
        return response.id
    }

    render(){
        const {formFullItemLayout,mailSubject,mailTo,templateUse} =  this.props;
        const {selectDefault,textVisible} = this.state;
        // console.log(mailSubject)
        return(
            <div>
                {this.props.children}
                {this.renderBindEmailForm()}
                {this.renderUnBindEmailForm()}
                <Row>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="发件人" name="mailFrom" disabled={true} defaultValue={this.state.email}  rules={[{required:true,message:"发件人不能为空"},{type:'email',message:"邮箱格式不正确"}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        {
                        textVisible ? (
                            <Remote url="">
                                <div style={{paddingLeft:'25%',lineHeight:'39px'}}><span style={{color:'red'}}>未绑定邮箱</span>，<a onClick={this.showModal.bind(this)}>点击绑定</a>邮箱</div>
                            </Remote>
                        ):(
                            <Remote url="">
                                <div style={{paddingLeft:'25%',lineHeight:'39px'}}><span style={{color:'red'}}>已绑定邮箱</span>，<a onClick={this.showUnbindModal.bind(this)}>点击更改绑定</a>邮箱</div>
                            </Remote>
                        )
                    }
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                          <Input label="收件人" name="mailTo" defaultValue={mailTo} rules={[{required:true,message:"收件人不能为空"},{type:'email',message:"邮箱格式不正确"}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="邮件模版" name="groupName" onChange={this.templateChange.bind(this)}  renderItem={this.renderEmailSelectOption} fetch={`${APP_SERVER}/template/listJson`} params={{item:{type:"2",templateUse:templateUse}}}>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="邮件主题" name="mailSubject" defaultValue={mailSubject} rules={[{required:true,message:"邮件主题不能为空"},{validator:customRules.required},{max:20,message:"邮件主题不能超过20个字"}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <FileUpload name="file" uploadType="1"  onResponse={this.responseType} action="/fileUpload/file/upload?type="></FileUpload>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <EditableRichEditor name="mailContent" defaultValue={selectDefault} />
                </FormItem>
            </div>
        )
    }
}

export  class SmsTemplateLinkage extends Component{
    state = {
        selectDefault:''
    }
    renderSmsSelectOption(data,idx){/*data.type = 1 为短信 2为邮件*/
        return data.type == 1? (<Select.Option value={data.content} key={data.id}>{data.name}</Select.Option>):""
    }
    templateChange(value){
        let {updateFieldValue} = this.props
          updateFieldValue("smsContent",value)
    }
    render(){
        const {formFullItemLayout,receiver,templateUse} =  this.props;
        const {selectDefault} = this.state;
        return(
            <div>
                {this.props.children}
                <Row>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="短信模版" name="groupName1" onChange={this.templateChange.bind(this)}  renderItem={this.renderSmsSelectOption} fetch={`${APP_SERVER}/template/listJson`} params={{item:{type:"1",templateUse:templateUse}}}>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="收件人" name="mobilephone" defaultValue={receiver} rules={[{required:true,message:"收件人不能为空"},{validator:customRules.required},{validator:customRules.checkMobile}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <EditableRichEditor name="smsContent" defaultValue={selectDefault} type="markdown" />
                </FormItem>
            </div>
        )
    }
}


export class SmsTemplateInterView extends Component{
    state = {
        selectDefault:''
    }
    renderSmsSelectOption(data,idx){/*data.type = 1 为短信 2为邮件*/
        return data.type == 1? (<Select.Option value={data.content} key={data.id}>{data.name}</Select.Option>):""
    }
    templateChange(value){
        let {updateFieldValue} = this.props
          updateFieldValue("interviewerSmsContent",value)
    }
    render(){
        const {formFullItemLayout} =  this.props;
        const {selectDefault} = this.state;
        return(
            <div>
                {this.props.children}
                <Row>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="短信模版" name="groupNameInter" onChange={this.templateChange.bind(this)}  renderItem={this.renderSmsSelectOption} fetch={`${APP_SERVER}/template/listJson`} params={{item:{type:"2",templateUse:"1"}}}>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                  <EditableRichEditor name="interviewerSmsContent" defaultValue={selectDefault} type="markdown" />
                </FormItem>
            </div>
        )
    }
}

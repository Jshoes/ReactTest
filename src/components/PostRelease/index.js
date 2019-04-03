/*

  * 职位发布组件  tab  编辑查看


*/

import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {routerActions, push, replace} from 'react-router-redux'
import {
    Row,
    Card,
    List,
    Avatar,
    Col,
    Button,
    Input,
    Table,
    Tag,
    Spin,
    Dropdown,
    Icon,
    Switch,
    Select,
    Tabs,
    Modal,
    TreeSelect,
    Tree,
    Popconfirm
} from 'antd'
import WrapperComponent from "app/decorators/WrapperComponent"
import {FormPage} from 'app/components/Page'
import API from 'app-modules/Job/api'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import ButtonGroups from 'app/components/ButtonGroups'
import Tags from 'app/components/Tags'
import {ModalDetailView} from 'app/components/Modal.view'
import LinkagePullDown from 'app/components/LinkagePullDown'
import {TreeSelectPicker} from 'app/components/TreeView'
import ChannelList from 'app/components/ChannelList'
import InputStrGroup from 'app/components/InputStrGroup'
import DictUtils from 'app/utils/DictUtils'
import styles from './index.less'
import moment from 'moment'

const TreeNode=Tree.TreeNode
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class BaseInfoItem extends Component{
  render(){
    return(
      <div className="baseinfo-item">
        <label>{this.props.label}：</label>
        <span>{this.props.info}</span>
      </div>
    )
  }
}

class BaseInfoEdit extends FormPage{

  static contextTypes = {
    actions:PropTypes.object
  }
  static state={
    isAddress:false
  }
  /*新增和编辑操作保存动作一致
  * 区别在action中体现

  * 判断提交参数中有无jobId来区分新增编辑  新增完成后action中自动转入第二步
  */
  saveJob(){
    let {form,switchFn} = this.props
    let {actions} = this.context
    this.form.validateFieldsAndScroll((err,values) => {
       if (err) {
         return;
       }
       actions.itemUpsertAction(values).then(()=>{
         switchFn()
       })
     });
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

  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  renderAreaOption(data,idx){
    return (<Select.Option value={data.id} key={idx}>{data.addressAll}</Select.Option>)
  }
  onChangedValues(value,option){
    // console.log(value,option)
    // if(changedValues.companyId){
    //   // console.log(changedValues)
      this.form.setFieldsValue({companyAddress:option.props.children})
    // }
  }
  handleEditAddress(){
    this.setState({
      isAddress:true
    })
  }
  render(){
    let { item } = this.props
    let {isAddress} =this.state
    const itemLayout = {
      labelCol: 6,
      wrapperCol: 18
    };
    return(
      <BaseForm className="jobdetail-infoedit" onSubmit={this.saveJob} ref={this.saveFormRef} layout="horizontal" itemLayout={itemLayout}>
        { this.props.edit ?
            <Button className="editSaveBtn" type="primary"  htmlType="button" onClick={this.saveJob.bind(this)}>保存</Button>
          :
            <Button className="addSaveBtn" onClick={this.saveJob.bind(this)}>保存并进入下一步 <Icon type="double-right" /></Button>
         }
        <Row gutter={12}>
          <Col span={24}>
            { item.jobCode ? <BaseInfoItem label="职位编号" info={item.jobCode}/> : null}
            <FormItem>
              <Input type="hidden" name="jobCode" defaultValue={item.jobCode}/>
            </FormItem>
            <FormItem>
              <Input type="hidden" name="jobId" defaultValue={item.jobId}/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem>
              <Input label="职位名称" name="jobTitle" defaultValue={item.jobTitle}  rules={[{required: true, message: "职位名称不可为空"},{validator:customRules.required},{validator:customRules.spacialStr}]}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              <TreeSelectPicker
                label="招聘部门"
                name="groupId"
                fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                defaultValue={item.groupId}
                placeholder="选择部门"
                treeDefaultExpandAll
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem>
              <InputStrGroup name="salary" label="薪资范围" defaultValue={[item.salaryLower,item.salaryUpper]}  rules={[{required: true, message: "薪资范围不可为空"},{validator:customRules.required}]}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              <Select name="degree" label="最低学历要求" placeholder="请选择"  fetch={DictUtils.getDictByType("education")} renderItem={this.renderSelectOption} defaultValue={item.degree}  rules={[{required: true, message: "最低学历要求不可为空"},{validator:customRules.required}]}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              <LinkagePullDown label="工作年限" name="workExperience" options={DictUtils.getDictByType("workyears")}  defaultValue={[item.workExperienceLower,item.workExperienceUpper]}  rules={[{required: true, message: "工作年限不可为空"},{validator:customRules.required}]}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              <Input label="招聘人数" name="hiringNumber" defaultValue={item.hiringNumber}/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem>
               <Input label="工作地点" name="companyAddress" disabled defaultValue={item.addressAll} addonAfter={<Icon type="edit"  onClick={this.handleEditAddress.bind(this)} />} />
            </FormItem>
          </Col>
          {
            isAddress?(<Col span={24}>
            <FormItem>
               <Select label="" name="companyId" placeholder="请选择" onSelect={this.onChangedValues.bind(this)}  fetch={`${APP_SERVER}/company/listJson`} renderItem={this.renderAreaOption} defaultValue={item.companyId} />
            </FormItem>
          </Col>):null
          }
          <Col span={24}>
            <FormItem>
              <Tags label="其他福利" name="jobLabels" defaultValue={item.jobLabels}/>
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem>
              <TextArea label="职位描述" name="jobDescription" defaultValue={item.jobDescription} autosize={{minRows:4}}  rules={[{required: true, message: "职位描述不可为空"},{validator:customRules.required}]}/>
            </FormItem>
          </Col>
        </Row>
      </BaseForm>
    )
  }
}

class BaseInfoShow extends Component{
  render(){
    let { item } = this.props
    let salary = item.salaryLower || item.salaryUpper ? [item.salaryLower,item.salaryUpper].join("-") : "不限"
    let workExp = item.workExperienceLower || item.workExperienceUpper ? [DictUtils.getDictLabelByValue("workyears",item.workExperienceLower),DictUtils.getDictLabelByValue("workyears",item.workExperienceUpper)].join("-") : "不限"
    let degreeResult = DictUtils.getDictLabelByValue("education",item.degree)
    return(
      <div className="jobdetail-infoshow">
        <Row gutter={12}>
        {item.jobCode ?
          <Col span={8}>
            <BaseInfoItem label="职位编号" info={item.jobCode}/>
          </Col>
            :
          null
        }

          <Col span={8}>
            <BaseInfoItem label="职位名称" info={item.jobTitle}/>
          </Col>
          <Col span={8}>
            <BaseInfoItem label="招聘部门" info={item.groupName}/>
          </Col>
          <Col span={8}>
            <BaseInfoItem label="薪资范围" info={salary}/>
          </Col>
          <Col span={8}>
            <BaseInfoItem label="最低学历要求" info={degreeResult}/>
          </Col>
          <Col span={8}>
            <BaseInfoItem label="工作经验" info={workExp}/>
          </Col>
          <Col span={8}>
            <BaseInfoItem label="工作地点" info={item.addressAll}/>
          </Col>
          <Col span={8}>
            <BaseInfoItem label="招聘人数" info={item.hiringNumber}/>
          </Col>

          <Col span={24}>
            <BaseInfoItem label="其他福利" info={item.jobLabels&&item.jobLabels.map((it,idx)=><Tag key={idx}>{it}</Tag>)}/>
          </Col>
          <Col span={24}>
            <BaseInfoItem label="职位描述" info={item.jobDescription}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export class BaseInfo extends Component{
  state = {
    flag:this.props.edit,
  }
  /*展示状态*/
  renderInfo(){
    let {item} = this.props
    return item ? <BaseInfoShow item = {item} /> : null
  }
  /*编辑状态*/
  renderEdit(){
    let {item} = this.props
    return item ? <BaseInfoEdit {...this.props} handleSubmit={this.saveJob} switchFn={this.switchFlag.bind(this)}/> : null
  }
  renderWhich(){
    return this.state.flag ? this.renderInfo() : this.renderEdit()
  }

  endingFire(){
    let that = this
    let msg = '确认结束招聘后，简历将不再进入此职位，如果后续还有此类简历，简历直接进入人才库'
    /*复用endFireAction 形参三个 只需要传jobId数组*/
    return Modal.confirm({
      title: '确认',
      content: msg,
      okText: '确认',
      onOk:that.endingFireConfirm.bind(that),
      cancelText: '取消'
    })

  }
  endingFireConfirm(){
    let {actions,item:{jobId}} = this.props
    actions.endingFireAction(null,null,[jobId])
  }
  onConfirm(){
    let {actions,item:{jobId}} = this.props
    actions.deleteJobAction({jobId:jobId})
  }

  deleteJob(){
    let {actions,item:{jobId}} = this.props
    let that = this
    new API().fetchDeleteComfrim({jobId:jobId}).then((json)=>{
      let msg = '是否删除该职位？'
      if(json.isResume == 1){
        msg = '职位下有候选人简历，继续删除，职位下的候选人将进入人才库。是否继续删除职位？'
      }
      return Modal.confirm({
        title: '确认',
        content: msg,
        okText: '确认',
        onOk:that.onConfirm.bind(that),
        cancelText: '取消'
      })
    })
  }

  switchFlag(){
    this.setState({
      flag: !this.state.flag
    })
  }
  render(){
    return (
      <Row gutter={12} className="firstStep-box">
        <Col span={20}>{this.renderWhich()}</Col>
        {this.state.flag?
          <Col span={4}>
            <div className="optionBox">
                <Button type="primary" block htmlType="button" onClick={this.endingFire.bind(this)}>结束招聘</Button>
                <Button htmlType="button" permission="deleteJob" onClick={this.deleteJob.bind(this)}>删除职位</Button>
                <Button htmlType="button"  onClick={this.switchFlag.bind(this)} className="edit-button"><Icon type="edit" /></Button>
            </div>
          </Col>
          :
          null
        }
      </Row>
    )
  }
}

class JobResponsibility extends Component{

  translateInterviewers(arr){
    let trans = []
    if(arr instanceof Array){
      arr.map((it,idx)=>{
        trans.push(it.interviewerId)
      })
    }
    return trans
  }

  handleChangeCharge(){
    let {actions,router,item} = this.props
    let newInterviewers = this.translateInterviewers(item.interviewers)
    let newJobId = [item.jobId]
    actions.changeChargerPostAction(router,item.hrAcc,newInterviewers,newJobId)
  }
  handleChangeFeeder(){
    let {actions,router,item} = this.props
    let newInterviewers = this.translateInterviewers(item.interviewers)
    let newJobId = [item.jobId]
    actions.changeFeederPostAction(router,newInterviewers,newJobId)
  }
  render(){
    let {item} = this.props
    return(
      <div className="secondStep-box">

        <div className="responsiItem" >
          <h3 className="title">招聘负责人</h3>
          <span>负责该职位招聘，拥有对该职位的操作权限</span>
          <div className="content">
            { item.hrName ? <Tag className="tags">{item.hrName}</Tag> : null }
            <Button htmlType="button" onClick={this.handleChangeCharge.bind(this)}><Icon type="edit"/></Button>
          </div>
        </div>

        <div className="responsiItem" >
          <h3 className="title">面试官</h3>
          <span>添加面试时优先找到该用户为面试官</span>
          <div className="content">
            {item.interviewers instanceof Array?
              item.interviewers.map((it,idx)=>{
                return <Tag className="tags">{it.interviewer}</Tag>
              })
                :
                null
            }
            <Button htmlType="button" onClick={this.handleChangeFeeder.bind(this)}><Icon type="plus"/></Button>
          </div>
        </div>
      </div>
    )
  }
}

class ChannelAdJobRule extends Component{
  render(){
    return (
      <div className="thirdStep-box">
        <ChannelList dataSource={DictUtils.getDictByType("channel")}/>
        <JobRules {...this.props}/>
      </div>
    )
  }
}

class JobRules extends Component{
  componentDidMount(){
    let {actions,item:{jobId}} = this.props
    actions.getJobRulesAction({jobId:jobId})
  }
  handleClick(id,actionkey){
    console.log(actionkey,id)
    let {actions,router,item:{jobId}} = this.props
    actions[actionkey](router,id,jobId)
  }
  render(){
    let {rules} = this.props
    return (
      <Card title="简历接收规则设置" extra={<div className="content-left"></div>}>
        <List
          dataSource={rules}
          renderItem={(item,idx)=>{
            let number = idx + 1
            return (<List.Item key={idx}>
                <Card title={`分配规则${number}`}
                  extra={
                  <ButtonGroups handleClick={this.handleClick.bind(this,item.id)}>
                    <Button actionkey="jump2ResetAction">重新分配</Button>
                    <Button actionkey="cancleLinkAction" confirm="结束招聘该职位后，该职位下将不会接收新简历">取消关联</Button>
                  </ButtonGroups>
                }>
                  <div>简历邮箱：{item.originalEmail}</div>
                  <div>职位名称：{item.jobTitleEmail}</div>
                  <div>渠道：{DictUtils.getDictLabelByValue("channel",item.channel)}</div>
                </Card>
            </List.Item>)
          }}
        >
        </List>
      </Card>
    )
  }
}

export default class PostRelease extends Component{
  constructor(props){
    super(props)
    this.state = {
      actionkey:1,
    }
  }
  handleChangePanel(actionkey){
    let {router,params,dispatch} = this.props
    let currRoute = router.getCurrentLocation().pathname
    let newRoute = this.routeTrans(currRoute,actionkey)
    dispatch(routerActions.push(newRoute))
  }
  /*此处的next只做从第二步跳转到第三步 路径写死*/
  handleNext(){
    let {router,actions,dispatch,params} = this.props
    let currRoute = router.getCurrentLocation().pathname
    let newRoute = currRoute.replace("/2/2","/3/3")
    dispatch(routerActions.push(newRoute))
  }
  routeTrans(route,active){
    let data = route
    let arr = data.split("/")
    arr.pop()
    arr.push(active)
    return arr.join("/")
  }
  render(){
    /*
    * params中存储的max 和step
    *  max 为当前可点击最大的step  如 新增时开始为1  填写完第一步max 设置为2  编辑时 设为4  以此来判断是编辑还是新增
    * step 为当前步数
    */
    let {item,actions,router,params,reduce:{rules}} = this.props
    let {max,step} = params
    let addFlag =  max != 4 /*true为新增 false为编辑或查看*/
    return(
      <Tabs className="jobdetail-box" defaultActiveKey="1" activeKey={step} animated={false} tabPosition="left" onChange={this.handleChangePanel.bind(this)}>
        <TabPane tab={<span><Icon type="copy" />基本信息</span>} key="1">
          {/*baseinfo 通过max 判断是否为编辑状态*/}
          <BaseInfo item={item} edit={ !addFlag } actions={actions}/>
        </TabPane>
        <TabPane tab={<span><Icon type="user" />负责人</span>} key="2" disabled={ max < 2} className="secondStep-panel">
          <JobResponsibility item={item} actions={actions} router={router}/>
          { addFlag ?
              <Button onClick={this.handleNext.bind(this)} className="addSaveBtn">保存并进入下一步 <Icon type="double-right" /></Button>
            :
              null
          }
        </TabPane>
        <TabPane tab={<span><Icon type="setting" />渠道设置</span>} key="3" disabled={ max < 3} className="thirdStep-panel">
            <ChannelAdJobRule {...this.props} rules={rules}/>
            <Button  permission="releaseJob" type="primary" className="releaseJob">发布职位</Button>
        </TabPane>
      </Tabs>
    )
  }
}

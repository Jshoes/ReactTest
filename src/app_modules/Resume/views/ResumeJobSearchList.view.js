import React, {Component, PropTypes} from 'react'
import {routerActions, push, replace} from 'react-router-redux'
import {
  Button,
  Input,
  Table,
  Select,
  DatePicker,
  Modal,
  Menu,
  Radio,
  Card,
  Tag,
  Dropdown,
  Icon,
} from 'antd'
import {Link} from 'react-router'
import moment from 'moment'
import PageView from 'app/components/Page'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import DataTable from 'app/components/DataTable'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
import LinkagePullDown from 'app/components/LinkagePullDown'
import CalendarPicker from 'app/components/CalendarPicker'
import TagSelect from 'app/components/TagSelect'
import Permission from 'app/components/Permission'
import DictUtils from 'app/utils/DictUtils'
import ResumeListView from './ResumeList.view'
import styles from './styles.less'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option

class ShowJobChannelList extends Component{
  renderList(){
    let {data,jobId} = this.props
    if(data){
      let {jobDetailList} = data
      return jobDetailList&& jobDetailList.map((it,idx)=>{
        return (
          <Link to={`/job/list/${jobId}/searchResume/${it.jobDetailId}/jobDetail`} key={idx}>
            <Tag>{DictUtils.getDictLabelByValue("channel",it.channel.toString())}</Tag>
          </Link>
        )
      })
    }else{
      return null
    }
  }
  render(){

    return (
      <span>
        {
          this.renderList()
        }
      </span>
    )
  }
}

class RadioGroupBox extends Component{
  render(){
    let {data,defaultValue} = this.props
    if(data){
      return (
        <RadioGroup onChange={this.props.onChange} defaultValue={defaultValue}>
          <RadioButton value={11}>
            <span className="count">{data.unreadDeliveryRms}/{data.deliveryRms}</span>
            <span>投递简历</span>
          </RadioButton>
          <RadioButton value={12}>
            <span  className="count">{data.unreadcommendRms}/{data.commendRms}</span>
            <span>推荐简历</span>
          </RadioButton>
          <RadioButton value={13}>
            <span  className="count">{data.unreadPluginRms}/{data.pluginRms}</span>
            <span>插件简历</span>
          </RadioButton>
          <RadioButton value={21}>
            <span  className="count">{data.resumeInvitedCount}</span>
            <span>待邀约</span>
          </RadioButton>
          <RadioButton value={22}>
            <span  className="count">{data.interviewIng}</span>
            <span>面试中</span>
          </RadioButton>
          <RadioButton value={23}>
            <span  className="count">{data.pendingPost}</span>
            <span>offer</span>
          </RadioButton>
          <RadioButton value={25}>
            <span className="count">{data.refuse}</span>
            <span>拒绝</span>
          </RadioButton>
        </RadioGroup>
      )
    }else{
      return (
        <RadioGroup onChange={this.props.onChange}>
          <RadioButton value={11}>
            <span  className="count">0/0</span>
            <span>投递简历</span>
          </RadioButton>
          <RadioButton value={12}>
            <span  className="count">0/0</span>
            <span>推荐简历</span>
          </RadioButton>
          <RadioButton value={13}>
            <span  className="count">0/0</span>
            <span>插件简历</span>
          </RadioButton>
          <RadioButton value={21}>
            <span  className="count">0</span>
            <span>待邀约</span>
          </RadioButton>
          <RadioButton value={22}>
            <span  className="count">0</span>
            <span>面试中</span>
          </RadioButton>
          <RadioButton value={23}>
            <span  className="count">0</span>
            <span>offer</span>
          </RadioButton>
          <RadioButton value={25}>
            <span  className="count">0</span>
            <span>拒绝</span>
          </RadioButton>
        </RadioGroup>
      )
    }
  }
}

function dealWithParams(params,value){
  if(value < 20){ //123
    params.resumeType = value - 10
  }
  if(value > 20){//1235
    params.status = value - 20
  }
  return params
}

export default class NewResumeListView extends ResumeListView {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let {actions,router:{params:{jobId,type}}} = this.props
    this.setState({
      jobId:jobId
    })
    let params = {jobId:jobId}
    let dealResult = dealWithParams(params,type)
    actions.listResumeJobAction(dealResult)
    actions.listResumeJobReportAction(params)
  }

  componentWillReceiveProps(nextProps){
      let {actions,router:{params:{jobId}},reduce:{params}} = this.props
    // console.log(nextProps.location.pathname,this.props.location.pathname)
    if(JSON.stringify(nextProps.location.state) !== JSON.stringify(this.props.location.state)){
      if(nextProps.location.state && nextProps.location.state.key=="reload"){
        let newParams = Object.assign({},params,{jobId:jobId})
        actions.listResumeJobAction(newParams)
        actions.listResumeJobReportAction({jobId:jobId})
      }
    }
  }
  componentDidUpdate (prevProps) {
    // 上面步骤3，通过参数更新数据
    let {actions,router,reduce:{params}} = this.props;
    let oldId = prevProps.params.jobId
    let newId = this.props.params.jobId
    if (newId !== oldId){
      let newParams = Object.assign({},params,{jobId:newId})
      actions.listResumeJobAction(newParams)
      actions.listResumeJobReportAction({jobId:newId})
    }
  }


  onChangeSearch(e){
    let {actions,reduce:{params:{jobId}}} = this.props
    let {target:{value}} = e
    let params = {jobId:jobId}
    let parResult = dealWithParams(params,value)
    actions.listResumeJobAction(parResult)
  }
  handleFilter(value) {
      let {actions} = this.props;
      actions.listResumeJobAction(value);
  }
  renderToolbar() {
    let {reduce,router:{params},reduce:{report}} = this.props
    let {jobId,type } = params
    return (
      <div className="radio-group-box">
        <div className="jobChannelIconList">
          <span style={{marginRight:10}}>{report && report.jobTitle}</span>
          <ShowJobChannelList data={report} jobId={jobId}/>
        </div>
        <RadioGroupBox onChange={this.onChangeSearch.bind(this)} data={report} defaultValue={Number(type)}/>
      </div>
    )
  }
  saveFormRef(form){
    return this.form = form;
  }
  handleChange(value){
    let {actions,dispatch} = this.props
    dispatch(routerActions.push(`/job/list/${value}/searchResume`))
  }
  renderOption(it,idx){
    return (<Select.Option key={idx} value={it.jobId}>{it.jobTitle}</Select.Option>)
  }
  renderSelectOption(data,idx){
      return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  renderSearchBar() {
    let {reduce,router:{params:{jobId}},reduce:{report}} = this.props
    return (
      <BaseForm ref={this.saveFormRef.bind(this)}>
        <FormItem>
          <Select defaultValue={jobId} onChange={this.handleChange.bind(this)} name='jobname' style={{width:120}} fetch={`${APP_SERVER}/jobNew/listJson`} renderItem={this.renderOption} />
        </FormItem>
      </BaseForm>
    )
  }
  addHandler(){
    alert('addHandler')
  }

  backToJobList(){
    let {router,dispatch} =this.props
    let path = {
      pathname:'/job/list',
      state:{
        type:'back'
      }
    }
    dispatch(routerActions.push(path))
  }

  renderTableList() {
    let that=this;
    let {reduce} = this.props
    let {spins:{tableSpin},key} = reduce
    let page= reduce.jobPage
    let list = [...reduce.resumeJobList.values()]


    let tableConf = {
      loading: tableSpin,
      rowKey: key,
      onChange:this.onChange.bind(this),
      title:function(){
        return that.renderToolbar()
      },
      columns: [
         {
          title: "操作",
          dataIndex: "id",
          width: 80,
          render: (data,row) => {
              let {resumeOrgId,resumeIdentityId,name,status} = row
              /* status
              * 1 待邀约
              * 2 面试
              * 3 offer
              * 4 入职
              * 5 拒绝
              * */
              /*if(status != 1 && status != 4 && status != 5 )*/
            return (
              <ButtonGroupExt onClick={this.handlerMenu.bind(this,resumeOrgId,resumeIdentityId,name,row)}>
                  <Button icon="plus-circle-o" actionkey="waitingAction" disabled={status && status != 5 ?true:false}>待邀约</Button>
                  <Button icon="plus" actionkey="interviewAction" disabled={ status == 5?true:false}>面试</Button>
                  <Button icon="plus-circle-o" actionkey="offerAction" disabled={(status == 3 || status == 4 || status == 5)?true:false}>offer</Button>
                  <Button icon="plus-circle-o" actionkey="entryAction" disabled={(status == 4 || status == 5)?true:false}>入职</Button>
                  <Button icon="plus-circle-o" actionkey="refuseAction" disabled={(status == 4 || status == 5)?true:false}>拒绝</Button>
                  <Button icon="plus-circle-o" actionkey="connectAction">关联职位</Button>
                  <Button icon="plus-circle-o" actionkey="feedbackAction">面试反馈</Button>
                  <Button icon="plus-circle-o" actionkey="joinAction">加入人才</Button>
              </ButtonGroupExt>
            )
          }
        }, {
          title: "姓名",
          key: "name",
          width: 150,
          dataIndex: "name",

          render:(name,row)=>{
              let {readStatus} = row
              let {router:{params:{jobId}}} = this.props
              let type = "folder"
              if(readStatus == 1){
                  type = "noRead"
              }else{
                  type = "read"
              }
              let path = {
                  pathname:`/job/list/${jobId}/searchResume/${row[key]}/detail`,
                  state:{item:row,name:name}
              }
              return (<Link to={path} className={type}>{name}</Link>)
          },
        }, {
          title: "职位名称",
          key: "jobTitle",
          width: 150,
          dataIndex: "jobTitle"
        }, {
          title: "简历范围",
          key: "resumeType",
          dataIndex: "resumeType",
          width: 150,
          render:(val,row)=>{
              return DictUtils.getDictLabelByValue("resume",val)
          }
        }, {
            title: "学历",
            key: "degree",
            dataIndex: "degree",
            width: 150,
              render:(val,row)=>{
                  return DictUtils.getDictLabelByValue("education",val)
              }
        },{
            title: "性别",
            key: "sex",
            dataIndex: "sex",
            width: 80,
              render:(val,row) => {
                  return DictUtils.getDictLabelByValue("sex",val)
              }
        },{
            title: "年龄",
            key: "age",
            dataIndex: "age",
            width: 80
        },{
            title: "工作年限",
            key: "workYear",
            dataIndex: "workYear",
            width: 200,

        },{
            title: "候选人状态",
            key: "statusStr",
            dataIndex: "statusStr",
            width: 150,
            render:(val,row)=>{
                return DictUtils.getDictLabelByValue("candidatestatus",val)
            }
        },{
            title: "现居住地",
            key: "currentAddress",
            dataIndex: "currentAddress",
            width: 150
        },{
            title: "期望工作地",
            key: "expectedAddress",
            dataIndex: "expectedAddress",
            width: 150
        },{
            title: "渠道",
            key: "channel",
            dataIndex: "channel",
            width: 100,
            render:(val,row) => {
                return <Icon type={"icon-channel"+val} title={DictUtils.getDictLabelByValue("channel",val)}/>
            }
        },{
            title: "更新时间",
            key: "receiveTime",
            dataIndex: "receiveTime",
            width: 200,
            render:(val,row)=>{
              if(val){
                  return moment(val).format('YYYY-MM-DD')
              }else{
                  return ""
              }
            }
        },{
            title: "当前状态",
            key: "workStatus",
            dataIndex: "workStatus",
            width: 150,
              render:(val,row)=>{
                  return DictUtils.getDictLabelByValue("jobstatus",val)
              }
        },

      ]
    }

    return (<DataTable  {...tableConf} dataSource={list} page={page} />)
  }

  render() {
    let {children} = this.props
    //模版没有好的解决方案，暂时这样处理
    //console.log(children)

    // if(children && children.type && children.type.WrappedComponent==ResumeFolderListView){
    //     return React.cloneElement(children)
    // }else{
      return (
        <Card type="inner" className="resumeJobBox">
                {children}
            {this.renderSearchBar()}
            <Button className="backToJobList" onClick={this.backToJobList.bind(this)}>返回职位列表</Button>
            {this.renderTableList()}
        </Card>
      )
    // }
  }
}

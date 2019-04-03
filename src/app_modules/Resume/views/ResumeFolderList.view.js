import React, {Component, PropTypes} from 'react'
import {
  Button,
  Input,
  Table,
  Select,
  DatePicker,
  Modal,
  Menu,
  message,
  Card,
  Dropdown,
  Icon,
} from 'antd'
import {Link} from 'react-router'

import PageView from 'app/components/Page'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
import DataTable from 'app/components/DataTable'
import CalendarPicker from 'app/components/CalendarPicker'
import LinkagePullDown from 'app/components/LinkagePullDown'
import TagSelect from 'app/components/TagSelect'
import Permission from 'app/components/Permission'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import DictUtils from 'app/utils/DictUtils'
import moment from 'moment'
const Option = Select.Option

export default class ResumeFolderListView extends PageView {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let {actions,router} = this.props;
    actions.folderAction()
    //actions.menuAction()
  }

  componentWillReceiveProps(nextProps){
      let {actions,router,reduce} = this.props;
    // console.log(nextProps.location.pathname,this.props.location.pathname)
    if(JSON.stringify(nextProps.location.state) !== JSON.stringify(this.props.location.state)){
      if(nextProps.location.state && nextProps.location.state.key=="reload"){
        actions.folderAction(reduce.params)
      }
    }
  }
  handleFilter(value) {
    let {actions} = this.props;
    actions.folderAction(value);
  }

  handleMenuClick(){
    alert("sss")
  }
  renderToolbar() {
    return null
  }
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }

    handleCallPhone(number,resumeId,name,type){
        if(!number){
            message.info("号码为空！")
            return false
        }
        /*type  == define1
         * define1  1 员工
         * define1  2 简历
         * define1  3 人才
         *
         * */
        let  callOutJson ={
            phone:number,
            busId:resumeId,
            candName:name,
            inputAcc:"",
            define1:type,
            define3:"",
            IsContact:"0"
        };
        let  callOutJsonStr = JSON.stringify({callOutJson});
        global.invokeMethod('OnCallJson',callOutJsonStr)
    }

  renderSearchBar() {
    let {reduce} = this.props
    let keysOption = [
      {
        label: "姓名",
        value: "3"
      },
      {
        label: "就职公司",
        value: "2"
      },
      {
        label: "现居住地",
        value: "4"
      },
      {
        label: "期望工作地",
        value: "5"
      }
    ]
  //  let params = reduce.params || {}
    return (
      <AdvancedSearchForm keysOption={keysOption} filterSubmitHandler={this.handleFilter.bind(this)}  showConfig={true} module="2">
        <CalendarPicker label="入库时间" name="updateTimes"  />
        <Select name="workStatusList"  mode="multiple" label="当前状态" placeholder="请选择"  fetch={DictUtils.getDictByType("jobstatus")} renderItem={this.renderSelectOption} />
        <LinkagePullDown name="workYears" label="工作年限" options={DictUtils.getDictByType("workyears")} />
        <Input name="currentAddress" label="现居住地" placeholder="请选择输入" />
        <LinkagePullDown name="degrees" label="学历" options={DictUtils.getDictByType("education")} />
        <Select name="expectedJobs" label="期望工作职位" placeholder="请选择"  fetch={DictUtils.getDictByType("expectedJob")} renderItem={this.renderSelectOption} />
        <Select name="resumeType" label="简历范围" placeholder="请选择"  fetch={DictUtils.getDictByType("resume")} renderItem={this.renderSelectOption} />
        <Select name="channel" label="简历渠道" placeholder="请选择"  fetch={DictUtils.getDictByType("channel")} renderItem={this.renderSelectOption} />
        <Select name="sex" label="性别" placeholder="请选择"  fetch={DictUtils.getDictByType("sex")} renderItem={this.renderSelectOption} />
        <Select name="maritalStatus" label="婚姻状态" placeholder="请选择"  fetch={DictUtils.getDictByType("maritalstatus")} renderItem={this.renderSelectOption} />
        <Select name="trades" label="行业" rules={[{validator:customRules.maxLength,message:"最多只允许3项",value:3}]} placeholder="请选择" mode="multiple"  fetch={DictUtils.getDictByType("industry")} renderItem={this.renderSelectOption} />
      </AdvancedSearchForm>
    )
  }
  addHandler(){
    alert('addHandler')
  }
  renderTableList() {
    let that=this;
    let {reduce} = this.props
    let {spins:{tableSpin},key} = reduce
    let page= reduce.page
    let list = [...reduce.list.values()]
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
          dataIndex: key,
          width: 80,
          render: (data,row) => {
              let {resumeOrgId,resumeIdentityId,name} = row
            return (
              <ButtonGroupExt onClick={this.handlerMenu.bind(this,resumeOrgId,resumeIdentityId,name,row)}>
                  <Button icon="plus-circle-o" actionkey="connectAction">关联职位</Button>
              </ButtonGroupExt>
            )
          }
        }, {
          title: "姓名",
          key: "name",
          width: 120,
          dataIndex: "name",
          sorter:true,
          render:(name,row)=>{
              let {readStatus} = row
              let type = "noRead"
              if(readStatus == 1){
                  type = "noRead"
              }else{
                  type = "read"
              }
              let path = {
                  // pathname:`/resume/folder/detail/${row[key]}/${row['resumeOrgId']}`,
                  pathname:`/resume/folder/${row[key]}/detail/`,
                  state:{item:row,name:name}
              }
              return (<Link to={path} >{name}</Link>)
          },
        }, {
          title: "就职公司",
          key: "company",
          width: 150,
          dataIndex: "company",
          sorter:true,
        }, {
          title: "手机号码",
          key: "mobilephone",
          dataIndex: "mobilephone",
          width: 180,
          render:(val,row)=>{
              let {name,mobilephone,resumeId} = row
              let type = "2"
              if(mobilephone){
                  return (<span>{val}<Icon type='phone' style={{fontSize:16,color:"#32a0ee",cursor:"pointer"}} onClick={this.handleCallPhone.bind(this,mobilephone,resumeId,name,type)}/></span>)
              }else{
                  return ""
              }

          }
        }, {
            title: "学历",
            key: "degree",
            dataIndex: "degree",
            width: 100,
              render:(val)=>{
                  return DictUtils.getDictLabelByValue("education",val)
              }
        },{
            title: "性别",
            key: "sex",
            dataIndex: "sex",
            width: 150,
              render:(val)=>{
                  return DictUtils.getDictLabelByValue("sex",val)
              }
        },{
            title: "年龄",
            key: "age",
            dataIndex: "age",
            width: 150
        },{
            title: "工作年限",
            key: "workYear",
            dataIndex: "workYear",
            width: 150,
            sorter:true
        },{
            title: "现居住地",
            key: "currentAddress",
            dataIndex: "currentAddress",
            width: 150
        },{
            title: "婚姻状态",
            key: "maritalStatus",
            dataIndex: "maritalStatus",
            width: 150,
              render:(val)=>{
                    return DictUtils.getDictLabelByValue("maritalstatus",val)
              }
        },{
            title: "渠道",
            key: "channel",
            dataIndex: "channel",
            width: 100,
              render:(val)=>{
                  return <Icon type={"icon-channel"+val} title={DictUtils.getDictLabelByValue("channel",val)}/>
              }
        },{
            title: "入库时间",
            key: "receiveTime",
            dataIndex: "receiveTime",
            width: 150,
            sorter:true,
              render:(val)=>{
                if(val){
                    return moment(val).format("YYYY-MM-DD");
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

  handlerMenu(resumeOrgId,resumeIdentityId,name,row,actionType){
      let { actions,router } = this.props
      actions[actionType].call(this,router,resumeOrgId,resumeIdentityId,name,row);
  }
  render() {
    let {children} = this.props
    return (
        <Card type="inner">
            {children}
              {this.renderSearchBar()}
              {this.renderTableList()}
        </Card>
    )
  }
}

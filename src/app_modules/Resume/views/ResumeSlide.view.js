import React, {Component, PropTypes} from 'react'
import {
  Button,
  Cascader,
  Input,
  Table,
  DatePicker,
  Select,
  Modal,
  Menu,
  Card,
  Tree,
  Dropdown,
  Icon,
} from 'antd'
import AdvancedSearchPanel from 'app/components/AdvancedSearchPanel'
import ListField,{JobListField} from 'app/components/ListField'
import DictUtils from 'app/utils/DictUtils'
import moment from 'moment'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import TreeView,{TreeSelectPicker} from 'app/components/TreeView'
import CalendarPicker from 'app/components/CalendarPicker'
import LinkagePullDown from 'app/components/LinkagePullDown'

const {TreeNode} = Tree

export default class ResumeSide extends Component{
  state={
    val:"1",
    nav:[{keyValue:"1",keyName:"招聘中职位",authType:[1,3]},{keyValue:"2",keyName:"我负责的职位",authType:[1,2,3]},{keyValue:"3",keyName:"已关闭的职位",authType:[1,2,3]}]
  }
  componentDidMount(){
    let {nav} = this.state
    let json = this.authTypeFilter(nav).reverse().pop()?this.authTypeFilter(nav).reverse().pop():{}
    this.setState({
      val:json.keyValue
    })
  }
  handleFilter(values){
    let {actions} = this.props
    actions.listAction(values)
  }
  navgation(val){
    let {router}= this.props
    router.push(val)
  }
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  renderLabelOption(data,idx){
    return (<Select.Option value={data.optionId} key={idx}>{data.optionName}</Select.Option>)
  }
  renderHrOption(data,idx){
    return (<Select.Option value={data.account} key={idx}>{data.name}</Select.Option>)
  }
  handleChangeSelect(value){
    let {actions} = this.props
    this.setState({
      val:value
    },function(){
      actions.listAction({jobType:value})
    })
  }
  authTypeFilter(array){
    let {appReducer} = this.props
    return array.filter((it)=>it.authType.some(authType=>authType==appReducer.user.authType))
  }
  render(){
    let {nav} = this.state
    let {params} = this.props
    //console.log("val",this.state.val)
    return (<AdvancedSearchPanel titleSearch={
      <div>
        <FormItem>
          <Select name="jobType" onChange={this.handleChangeSelect.bind(this)} defaultValue={this.state.val}  fetch={this.authTypeFilter(nav)} renderItem={this.renderSelectOption} />
        </FormItem>
        <FormItem>
          <JobListField  name="jobId" label="招聘职位" fetch={`${APP_SERVER}/jobNew/getJobList?jobType=${this.state.val}`} defaultValue={params.jobId} renderItem={
            (it)=>(<Menu.Item key={it.jobId} jobId={it.jobId}>{it.jobTitle}</Menu.Item>)
          }/>
        </FormItem>
      </div>
    } filterSubmitHandler={this.handleFilter.bind(this)} showConfig={true} module="1">
      <Input name="name" label="姓名" placeholder="请输入姓名"/>
      <Input name="company" label="就职公司" placeholder="请输入就职公司"/>
      <Input name="currentAddress" label="现工作地" placeholder="请输入现工作地"/>
      <Input name="expectedAddress" label="期望工作地" placeholder="请输入期望工作地"/>
      <Select name="remarkLabel" label="标签" placeholder="请选择"  fetch={`${APP_SERVER}/option/optionListJson?optionCode=labels_code`} renderItem={this.renderLabelOption} showSearch optionFilterProp="optionName" filterOption={function(inputValue, option){
        return option.props.children.indexOf(inputValue)>-1
      }} />
      {/*<Select name="remarkLabel" label="标签">
        <Select.Option value="2a6a609a557944a798f17c923e9d522b">
          123
        </Select.Option>
      </Select>*/}
      <LinkagePullDown name="degrees" label="最后学历" options={DictUtils.getDictByType("education")} />
      <LinkagePullDown name="workYears" label="工作年限" options={DictUtils.getDictByType("workyears")} />
      <Select name="hrAcc" label="招聘负责人" placeholder="请选择" fetch={`${APP_SERVER}/accountOperate/getHrList`} renderItem={this.renderHrOption} />
      <Select name="channel" label="渠道" placeholder="请选择"  fetch={DictUtils.getDictByType("channel")} renderItem={this.renderSelectOption} />
      <Select name="sex" label="性别" placeholder="请选择"  fetch={DictUtils.getDictByType("sex")} renderItem={this.renderSelectOption} />
      <Select name="maritalStatus" label="婚姻状态" placeholder="请选择"  fetch={DictUtils.getDictByType("maritalstatus")} renderItem={this.renderSelectOption} />
      <Select name="trade" label="行业" placeholder="请选择"  fetch={DictUtils.getDictByType("industry")} renderItem={this.renderSelectOption} />
      <CalendarPicker label="入库时间" name="deliveryTimes"  minDate={moment().subtract(60,'days')}/>
      {/* <CalendarPicker label="入库时间" name="inputTimeArr"  />
      <Select name="sex" label="性别" placeholder="请选择"  fetch={DictUtils.getDictByType("sex")} renderItem={this.renderSelectOption} />*/}
        {/*<CalendarPicker label="最近联系" name="lastFollowTimeArr"  />*/}
    </AdvancedSearchPanel>)
  }

}

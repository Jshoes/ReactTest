import React, {Component, PropTypes} from 'react'
import {
  Input,
  Select,
} from 'antd'
import AdvancedSearchPanel from 'app/components/AdvancedSearchPanel'
import ButtonGroups from 'app/components/ButtonGroups'
import CalendarPicker from 'app/components/CalendarPicker'
import BaseForm,{FormItem} from 'components/BaseForm'
import LinkagePullDown from 'app/components/LinkagePullDown'
import DictUtils from 'app/utils/DictUtils'
import FetchAPI from 'app/utils/FetchAPI'
import moment from 'moment'
const Option = Select.Option


export default class EliteSide extends Component{
	constructor(props) {
		super(props);
		this.state = {
			listType:3,
			module:3,
			jobIdOption:[],
			adverseEventOption:[],
			filingReasonOption:[]
		}
	}
	componentDidMount(){
		let{routeParams:{type}}=this.props
    new FetchAPI().fetch(`${APP_SERVER}/talentNew/findLastRelationJobList?libType=${type}`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          jobIdOption:json.list||[]
        });
		});
		new FetchAPI().fetch(`${APP_SERVER}/option/optionListJson?optionCode=bad_events`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          adverseEventOption:json.list||[]
        });
		});
		new FetchAPI().fetch(`${APP_SERVER}/option/optionListJson?optionCode=file_reasons`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          filingReasonOption:json.list||[]
        });
    });
  }
  handleFilter(values){
    console.log(values)
		let {actions,reduce:{params},routeParams} = this.props
    actions.listAction({...params,...values})
		actions.talentCountAction({ libType: routeParams.type })
  }
  navgation(val){
    // let {actions}= this.props
		// console.log(val,'value')
		// actions.libTypeAction(val)
		const{router}=this.props
		let module = val
		this.setState({
			listType:val,
			module
		})
		new FetchAPI().fetch(`${APP_SERVER}/talentNew/findLastRelationJobList?libType=${val}`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          jobIdOption:json.list||[]
        });
		});
		router.push(`/elite/${val}`)
  }
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
	}
	renderSelectOptionInOptionField(data,idx){
    return (<Select.Option value={data.optionId} key={idx}>{data.optionName}</Select.Option>)
	}
	renderJobIdOptionField(data,idx){
    return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
  }
  render(){
		// const{reduce:{libType,searchType}}=this.props

		let{routeParams:{type}}=this.props
		type *= 1
		let{jobIdOption,adverseEventOption,filingReasonOption}=this.state
    return (
		<AdvancedSearchPanel titleSearch={
			<div>
				<FormItem>
					<Select name="libType" onChange={this.navgation.bind(this)} defaultValue={type} fetch={[{keyValue:3,keyName:"公共人才库"},{keyValue:4,keyName:"诚信库"}]} renderItem={this.renderSelectOption} />
				</FormItem>
				<FormItem>
					<Input name="type" type="hidden" defaultValue={0} />
				</FormItem>
			</div>


      } filterSubmitHandler={this.handleFilter.bind(this)} showConfig={true} module={type} >
				<Input label="姓名"  name="name" />
				<Select label="最近应聘职位" name="jobId"  fetch={jobIdOption}
				renderItem={this.renderJobIdOptionField.bind(this)}/>
				<CalendarPicker label={type==3?"加入人才库日期":"加入诚信库日期"} name="filingTimes" />
				<Select label="诚信记录" name="adverseEvent" fetch={adverseEventOption} renderItem={this.renderSelectOptionInOptionField.bind(this)}/>

        <LinkagePullDown name="degrees" label="学历" options={DictUtils.getDictByType("education")} />
				<Select label="归档前所处阶段" name="status" fetch={DictUtils.getDictByType("resumestage")} renderItem={this.renderSelectOption}/>
        <LinkagePullDown name="workYears" label="工作年限" options={DictUtils.getDictByType("workyears")} />
        <Select name="sex" label="性别" placeholder="请选择"  fetch={DictUtils.getDictByType("sex")} renderItem={this.renderSelectOption}/>
				<Input label="公司名称" name="company" />
				<Select name="workStatus" label="当前状态" placeholder="请选择"  fetch={DictUtils.getDictByType("jobstatus")} renderItem={this.renderSelectOption}/>
				<Select label="最近归档原因" name="filingReason" fetch={filingReasonOption} renderItem={this.renderSelectOptionInOptionField.bind(this)}/>
				<Select name="maritalStatus" label="婚姻状态" placeholder="请选择"  fetch={DictUtils.getDictByType("maritalstatus")} renderItem={this.renderSelectOption}/>
				<Select name="trade" label="行业" placeholder="请选择"  fetch={DictUtils.getDictByType("industry")} renderItem={this.renderSelectOption}/>
				<Input label="当前所在地" name="keyWord" />
				<Input label="年龄" name="keyWord" />
        <CalendarPicker label="最近联系" name="lastFollowTimeArr"  />
    </AdvancedSearchPanel>)
  }

}

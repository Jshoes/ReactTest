import React, { Component } from 'react'
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import { Input, Modal, Select, Row, Col, Cascader } from 'antd'
import BaseForm, { FormItem, customRules } from 'components/BaseForm'
import {TreeSelectPicker} from 'app/components/TreeView'
import FetchAPI from 'app/utils/FetchAPI'
import { FormPage } from 'app/components/Page'
const {TextArea} = Input
@WrapperComponent(ModalView)
export class RecommondEliteFormView extends FormPage {


	handleSubmit(values){
    let {actions,router,location} = this.props;
    actions.recommondAction(values)
    actions.backRoute(router)
  }


	componentDidMount(){
    new FetchAPI().fetch(`${APP_SERVER}/user/getInterviewerListJson`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          dept:json.list||[]
        });
    });
  }

  changeDept(value){
    new FetchAPI().fetch(`${APP_SERVER}/user/getInterviewerListJson?dept=${value}`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          dept:json.list||[]
        });
    });
  }

  renderHrOption(data,idx){
    return (<Select.Option value={data.account} key={idx}>{data.name}</Select.Option>)
  }
	render() {
		const{onSubmit,router:{location:{state:selectedKeys}}}=this.props
		console.log(selectedKeys,'selectedKeysselectedKeysselectedKeys')
		return (
			<BaseForm onSubmit={onSubmit} ref={this.saveFormRef}>
				<FormItem className="row-hidden">
					<Input name="ids" type="hidden" defaultValue={selectedKeys}  />
				</FormItem>
				{/* <FormItem>
					<Select name="account" label="推荐给面试官" mode="multiple" fetch={`${APP_SERVER}/user/getInterviewerListJson`} renderItem={this.renderHrOption} />
				</FormItem> */}
				<FormItem>
            <TreeSelectPicker
              label="用人部门"
              name="dept"
              fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              // renderItem={this.renderTreeData.bind(this)}
              placeholder="选择部门"
              treeDefaultExpandAll
              rules={[{required:true,message:"所属部门不可为空"}]}
              onChange={this.changeDept.bind(this)}
            />
        </FormItem>
        <FormItem>
          <Select name="interviewers" label="面试官" placeholder="请选择" fetch={this.state.dept} renderItem={this.renderHrOption} mode="multiple"/>
        </FormItem>
        <FormItem>
          <TextArea  name="words"  placeholder="请留言"/>
        </FormItem>
			</BaseForm>
		);
	}
}



@WrapperComponent(ModalView)
export class Move2EliteFormView extends FormPage {


	handleSubmit(values) {
		const{actions,router}=this.props
		actions.joinEliteAction(values)
		actions.backRoute(router)
		console.log(values,'values')
	}
	renderReasonOption(data,idx){
    return (<Select.Option value={data.optionId} key={idx}>{data.optionName}</Select.Option>)
  }
	render() {
		const{onSubmit,router:{location:{state:selectedKeys}}}=this.props
		console.log(selectedKeys,'selectedKeysselectedKeysselectedKeys')
		return (
			<BaseForm onSubmit={onSubmit} ref={this.saveFormRef}>
				<FormItem className="row-hidden">
					<Input name="ids" type="hidden" defaultValue={selectedKeys}  />
				</FormItem>
				<FormItem className="row-hidden">
					<Input name="libType" type="hidden" defaultValue={4}  />
				</FormItem>
				<FormItem>
					<Select name="filingReason" label="归档原因" fetch={`${APP_SERVER}/option/optionListJson?optionCode=file_reasons`} renderItem={this.renderReasonOption} />
				</FormItem>
				<FormItem>
					<TextArea name="filingRemark" label="归档描述"  />
				</FormItem>
			</BaseForm>
		);
	}
}



@WrapperComponent(ModalView)
export class Relate2JobFormView extends FormPage {
	state={
		groupId:'',
		jobOption:[]
	}
	componentDidMount(){
    new FetchAPI().fetch(`${APP_SERVER}/jobNew/getJobList`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          jobOption:json.list||[]
        });
    });
  }

  changeDept(value){
    new FetchAPI().fetch(`${APP_SERVER}/jobNew/getJobList?groupId=${value}`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          jobOption:json.list||[]
        });
		});
  }
	handleSubmit(values) {
		const{actions,router}=this.props
		actions.relate2JobAction(values)
		actions.backRoute(router)
		console.log(values,'values')
	}
	renderJobOption(data,idx){
    return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
  }
	render() {
		const{onSubmit,router:{location:{state:selectedKeys}}}=this.props
		const{jobOption}=this.state
		return (
			<BaseForm onSubmit={onSubmit} ref={this.saveFormRef}>
				<FormItem className="row-hidden">
					<Input name="ids" type="hidden" defaultValue={selectedKeys}  />
				</FormItem>
				<FormItem>
						<TreeSelectPicker
              label="部门"
              name="dept"
              fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              // renderItem={this.renderTreeData.bind(this)}
              placeholder="选择部门"
              treeDefaultExpandAll
							onChange={this.changeDept.bind(this)}
							rules={[{required: true, message: "部门不可为空"}]}
            />
				</FormItem>
				<FormItem>
					<Select name="jobId" label="职位" fetch={jobOption} renderItem={this.renderJobOption} rules={[{required: true, message: "关联职位不可为空"}]}/>
				</FormItem>
			</BaseForm>
		);
	}
}

/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-12T11:21:16+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
    Row,
    Col,
    Modal,
    Button,
    Input,
    Form,
    DatePicker,
    Layout,
    Spin,
    Select
} from 'antd'
import {FormPage} from 'components/Page'
import ModalView from 'components/Modal.view'
import WrapperComponent from '../../decorators/WrapperComponent'
import FetchAPI from 'app/utils/FetchAPI'
import {TreeSelectPicker} from 'app/components/TreeView'
import BaseForm,{FormItem} from 'components/BaseForm'
import RelatedFormView from '../Resume/views/RelatedForm.view'

const Option = Select.Option


class RelatedFormElite extends Component{
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

	renderJobOption(data,idx){
		return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
	}
	// handleSubmit(values){
  //   let {actions,router,location} = this.props;
	// 	console.log('wwwwwwww')
  //   actions.relatedForm(values,router).then(()=>{
  //     setTimeout(function(){
  //       actions.backRouteReload(router,location)
  //     },2000)
  //   })
  // }
	render() {
		const{onSubmit,params:{talentId},saveFormRef}=this.props
		const{jobOption}=this.state
		return (
			<BaseForm onSubmit={onSubmit} ref={saveFormRef}>
				<FormItem className="row-hidden">
					<Input name="talentId" type="hidden" defaultValue={talentId}  />
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


@WrapperComponent(ModalView)
export default class EliteConnectView extends FormPage{

  componentWillMount() {
      let {actions,params,location} = this.props;
     // actions.idDataAction(params)
      console.log(this.props)
  }
  //处理表格提交后动作
  handleSubmit(values){
		let {actions,router,location} = this.props;
    actions.relatedForm(values,router).then(()=>{
        actions.backRoute()
    })
  }

  render() {
    let {params, reduce:{spins:{formSpin},feed},onSubmit} = this.props;
    return (
      <Spin tip="Loading..." spinning={false}>
        <RelatedFormElite onSubmit={onSubmit} params={params}  saveFormRef={this.saveFormRef}>
            <Button type="primary" htmlType="submit" onClick={this.onSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </RelatedFormElite>
      </Spin>
    )
  }
}

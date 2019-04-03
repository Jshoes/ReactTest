import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import { Input, Modal, Select, Row, Col, Cascader,Table,Button,Icon,Radio,Popconfirm,DatePicker } from 'antd'
import BaseForm, { FormItem, customRules } from 'components/BaseForm'
import { FormPage } from 'app/components/Page'
import createContainer from 'app/utils/CreateContainer'
import area from '../../../../area.json'
import InputStrGroup from 'app/components/InputStrGroup'
import API from '../api'
import NestedComponent from 'app/decorators/NestedComponent'
import EditableCell from 'app/components/EditableCell'
import DictUtils from 'app/utils/DictUtils'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment'
import style from './ApplyForm.less'
const InputGroup = Input.Group;
const Option = Select.Option;
const { TextArea } = Input;


class EditableFeild extends Component {
  state={
    data:[],
    initialValue:[]
  }
  constructor(props) {
    super(props);
    this.state.initialValue = props.value||[]

    // this.cacheData = props.value.map(item => ({ ...item }))
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  componentWillReceiveProps(nextProps){
      this.setState({
        initialValue:nextProps.value||[]
      });
  }

  onCellChange (key,dataIndex) {
    const onChange = this.props.onChange;
     return (value) => {
       let {initialValue} = this.state
      // const dataSource = [...this.state.initialValue]
         let newInitial=initialValue.map((item)=>{
           if(JSON.stringify(item)==JSON.stringify(key)){
             item[dataIndex]=value
             return item
           }else{
             return item
           }
         })
         this.setState({ initialValue:newInitial })
         onChange(newInitial)
      }
   }

   onCellChangeArea (key,dataIndex) {
     const onChange = this.props.onChange;
      return (value) => {
        let {initialValue} = this.state
       // const dataSource = [...this.state.initialValue]
          let newInitial=initialValue.map((item)=>{
            if(JSON.stringify(item)==JSON.stringify(key)){
              item[dataIndex]=value
              return item
            }else{
              return item
            }
          })
          this.setState({ initialValue:newInitial })
          onChange(newInitial)
       }
    }

  cancel(key) {
    const onChange = this.props.onChange;
    const newData = [...this.state.initialValue]
    const target = newData.filter(item => JSON.stringify(key) !== JSON.stringify(item))
    this.setState({ initialValue: target },function(){
      onChange(target)
    })
  }
  handlerAddRow(){
    const onChange = this.props.onChange;
    let {initialValue} = this.state
    let rowData = { }
    if(JSON.stringify(initialValue) && JSON.stringify(initialValue).indexOf(JSON.stringify(rowData))<0){
        this.setState({ initialValue:initialValue.concat([rowData]) });
      //  onChange(initialValue.concat([rowData]))
    }
  }
  handlerRadioChange(record){
    const onChange = this.props.onChange;
    let {initialValue} = this.state
    let newInitial=initialValue.map((item)=>{
      if(item.company==record.company){
        item.isDefault=1
        return item
      }else{
        item.isDefault=0
        return item
      }
    })
    this.setState({
      initialValue:newInitial
    })
    onChange(newInitial)
  }
  render() {
		const {columns}=this.props
		/*
		*/
    return (
      <div className="EditableFeild">
        <Table bordered dataSource={this.state.initialValue} scroll={{ y: 300 }} style={{height:'300px'}} rowKey='company' columns={columns.map(it=>{
					return Object.assign(it,{
						width:"10%",
						render: (value, record) => (
			        <EditableCell
			          value={value}
			          onChange={this.onCellChangeArea(record, it.dataIndex)}
			        />
			      )
					})
				})} pagination={false} />
        <Row>
          <Col span={12} style={{textAlign:'right'}}>
            <Button onClick={this.handlerAddRow.bind(this)} disabled={this.state.initialValue.length>=5}><Icon type='plus'/>添加</Button>
          </Col>
        </Row>
      </div>
    );
  }
}





export default class ApplyFormView extends FormPage {
	renderSelectOption(data, idx) {
		return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
	}
	handleSubmit() {
		let { form, switchFn } = this.props
		let { actions } = this.context
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return;
			}
			new API().fetchSaveApplyForm(values)
			.then((res)=>{
				console.log(res)
			})
			.catch(err=>{
				console.log(err)
			})
			console.log(values, 'values')
		});
	}
	render() {
		const { onSubmit, saveFormRef } = this.props
		let applyerInfo = window.applyerInfo
		return (
			<div className="apply-form-wrap">
				<h2 className="form-title">面试信息登记</h2>
				<div className="form-subtitle">
					<div className="interview-info">
						<span>应聘职位：{applyerInfo&&applyerInfo.jobTitle}</span>
						<span className="interview-date">面试时间：{applyerInfo&&moment(applyerInfo.interviewTime).format("YYYY-MM-DD")}</span>
					</div>
				</div>
				<BaseForm onSubmit={this.handleSubmit} ref={this.saveFormRef} style={{ width: '980px', margin: '10px auto' }}>

					<h2>基本信息</h2>
					<Row gutter={24}>
						<FormItem  >
							<Input label="" type="hidden" name="resumeId" defaultValue={applyerInfo&&applyerInfo.resumeId}  />
						</FormItem>
						<FormItem  >
							<Input label="" type="hidden" name="interviewId" defaultValue={applyerInfo&&applyerInfo.interviewId}  />
						</FormItem>
						<FormItem  >
							<Input label="" type="hidden" name="orgId" defaultValue={applyerInfo&&applyerInfo.orgId}  />
						</FormItem>
						<Col span={12}>
							<FormItem  >
								<Input label="姓名" name="name" defaultValue={applyerInfo&&applyerInfo.name} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Select label="性别" fetch={DictUtils.getDictByType("sex")} renderItem={this.renderSelectOption} name="sex" defaultValue={applyerInfo&&applyerInfo.sex} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<DatePicker label="出生日期" name="birthTime" defaultValue={applyerInfo&&moment(applyerInfo.birthTime)}/>
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Select label="政治面貌" name="political" fetch={DictUtils.getDictByType("political")} renderItem={this.renderSelectOption} defaultValue={applyerInfo&&applyerInfo.political} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Select label="民族" name="national" fetch={DictUtils.getDictByType("national")&&DictUtils.getDictByType("national").sort((a,b)=>a.keySort-b.keySort)} renderItem={this.renderSelectOption} defaultValue={applyerInfo&&applyerInfo.national} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="籍贯" name="nativePlace" defaultValue={applyerInfo&&applyerInfo.nativePlace} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="身份证号" name="idCard" defaultValue={applyerInfo&&applyerInfo.idCard} />
							</FormItem>
						</Col>
						<Col span={24}>
							<Row gutter={24}>
								<Col span={12}>
									<FormItem  >
										<Input label="户籍所在地" name="residenceDdressDetail" defaultValue={applyerInfo&&applyerInfo.residenceDdressDetail} />
									</FormItem>
								</Col>
								<Col span={12}>
									<FormItem  >
										<Input label="" name="residenceAddress" placeholder="户籍所在地详细地" defaultValue={applyerInfo&&applyerInfo.residenceAddress} />
									</FormItem>
								</Col>
							</Row>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Select label="户籍性质" name="residenceStatus" fetch={DictUtils.getDictByType("residenceStatus")} renderItem={this.renderSelectOption} defaultValue={applyerInfo&&applyerInfo.residenceStatus} />
							</FormItem>
						</Col>
						<Col span={24}>
							<Row gutter={24}>
								<Col span={12}>
									<FormItem  >
										<Input label="现住地址" name="currentAddress" defaultValue={applyerInfo&&applyerInfo.currentAddress} />
									</FormItem>
								</Col>
								<Col span={12}>
									<FormItem  >
										<Input label="" name="currentAddressDetail" placeholder="现住详细地址" defaultValue={applyerInfo&&applyerInfo.currentAddressDetail} />
									</FormItem>
								</Col>
							</Row>
						</Col>
						<Col span={24}>
							<FormItem  >
								<Input label="杭州住房情况" name="houseStatus" defaultValue={applyerInfo&&applyerInfo.houseStatus} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Select label="婚姻状况" name="maritalStatus" fetch={DictUtils.getDictByType("maritalStatus")} renderItem={this.renderSelectOption} defaultValue={applyerInfo&&applyerInfo.maritalStatus} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="身体状况" name="physicalCondition" defaultValue={applyerInfo&&applyerInfo.physicalCondition} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Select label="学历" name="education" fetch={DictUtils.getDictByType("education")} renderItem={this.renderSelectOption} defaultValue={applyerInfo&&applyerInfo.education} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Select label="学位" name="degree" fetch={DictUtils.getDictByType("qualification")} renderItem={this.renderSelectOption} defaultValue={applyerInfo&&applyerInfo.degree} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="所学专业" name="lastMajor" defaultValue={applyerInfo&&applyerInfo.lastMajor} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="辅修专业" name="minorMajor" defaultValue={applyerInfo&&applyerInfo.minorMajor} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="毕业学校" name="lastSchool" defaultValue={applyerInfo&&applyerInfo.lastSchool} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<DatePicker label="毕业时间" name="lastSchoolEnd" defaultValue={applyerInfo&&moment(applyerInfo.lastSchoolEnd)}  />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="资格技能证书" name="skillCertificate" defaultValue={applyerInfo&&applyerInfo.skillCertificate} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="英语水平" name="englishLevel " defaultValue={applyerInfo&&applyerInfo.englishLevel} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="本人联系电话" name="mobilephone " defaultValue={applyerInfo&&applyerInfo.mobilephone} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="邮箱地址" name="email" defaultValue={applyerInfo&&applyerInfo.email} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="紧急联系人姓名" name="urgencyName" defaultValue={applyerInfo&&applyerInfo.urgencyName} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="紧急联系人电话" name="urgencyPhone" defaultValue={applyerInfo&&applyerInfo.urgencyPhone} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<DatePicker label="预计到岗时间" name="predictTime" defaultValue={applyerInfo&&moment(applyerInfo.predictTime)}  />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="目前薪酬" name="currentSalary" defaultValue={applyerInfo&&applyerInfo.currentSalary} />
							</FormItem>
						</Col>
						<Col span={12}>
							<FormItem  >
								<Input label="期望薪酬福利" name="expectedSalary" defaultValue={applyerInfo&&applyerInfo.expectedSalary} />
							</FormItem>
						</Col>
						<Col span={24}>
							<FormItem  >
								<Input label="爱好特长" name="hobby" defaultValue={applyerInfo&&applyerInfo.hobby} />
							</FormItem>
						</Col>
						<Col span={24}>
							<FormItem  >
								<Input label="其他要求" name="otherRequirements" defaultValue={applyerInfo&&applyerInfo.otherRequirements} />
							</FormItem>
						</Col>
					<Col span={24}>
						<FormItem >
							<EditableFeild label="主要家庭" name="relationshipList" columns={[{
							      title: '称谓',
							      dataIndex: 'relationship',
							    },{
							      title: '姓名',
							      dataIndex: 'name',
							    }, {
							      title: '年龄',
							      dataIndex: 'age',
							    }, {
							      title: '所在单位',
							      dataIndex: 'company',
							    }, {
							      title: '职务',
							      dataIndex: 'position',
							    }, {
							      title: '联系方式 ',
							      dataIndex: 'relationPhone',
							    }]
							} />
						</FormItem>
					</Col>
				</Row>
					<h2>工作经验及业绩说明</h2>
					<Row gutter={24}>
						<Col span={24}>
							<FormItem  >
              <EditableFeild label="工作经历" name="workList" columns={[{
                    title: '工作经历',
                    dataIndex: 'duringTime',
                  },{
                    title: '单位及部门',
                    dataIndex: 'company',
                  }, {
                    title: '职务',
                    dataIndex: 'jobTitle',
                  }, {
                    title: '离职原因',
                    dataIndex: 'reasonsForLeaving',
                  }, {
                    title: '证明人',
                    dataIndex: 'referener',
                  }, {
                    title: '证明人联系电话',
                    dataIndex: 'referenerPhone',
                  }]
              } />
							</FormItem>
							{/* duringTime时间段（工作经历）
														String  company单位及部门
							String jobTitle职务
							String  reasonsForLeaving离职原因
							String  referener证明人
							String  referenerPhone证明人联系电话
													String learningIntroduction学习情况介绍 */}
						</Col>
						<Col span={24}>
							<FormItem  >
								<TextArea rows={4} label="工作经验及业绩说明" name="workExperienceDescribe" defaultValue={applyerInfo&&applyerInfo.otherRequirements}/>
							</FormItem>
						</Col>
					</Row>
					<h2>主要学习经历</h2>
					<Row gutter={24}>
						<Col span={24}>
							<FormItem  >
              <EditableFeild label="主要学习经历" name="studyList" columns={[{
                    title: '学习起止时间段',
                    dataIndex: 'studyTime',
                  },{
                    title: '所在学校',
                    dataIndex: 'school',
                  }, {
                    title: '学历及专业',
                    dataIndex: 'major',
                  }, {
                    title: '担任职务及获奖情况',
                    dataIndex: 'positionAwards',
                  }, {
                    title: '证明人',
                    dataIndex: 'referener',
                  }, {
                    title: '证明人联系电话',
                    dataIndex: 'referenerPhone',
                  }]
              } />
							</FormItem>
							{/* studyTime学习起止时间段
										String  school所在学校
										String major学历及专业
			String positionAwards担任职务及获奖情况
			String  referener证明人
			String  referenerPhone证明人联系电话*/}
						</Col>
						<Col span={24}>
							<FormItem  >
								<TextArea rows={4} label="学习情况介绍" name="learningIntroduction" defaultValue={applyerInfo&&applyerInfo.learningIntroduction} />
							</FormItem>
						</Col>
					</Row>
					<Button type="primary" htmlType="button" onClick={this.handleSubmit.bind(this)}>保存</Button>
				</BaseForm>
			</div>

		);
	}
}
// 打包前开
// ReactDOM.render(
// 	<LocaleProvider locale={zh_CN}>
//   	<ApplyFormView/>
// 	</LocaleProvider>
// , createContainer())

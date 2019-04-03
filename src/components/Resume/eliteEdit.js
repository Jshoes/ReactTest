import React, {Component, PropTypes} from 'react'
import {
    Row,
    Avatar,
    Col,
    Button,
    Input,
    Table,
    Dropdown,
    Icon,
    Spin,
    Rate,
    Select,
    DatePicker,
    Upload,
} from 'antd'
import moment from 'moment';
import {FormPage} from 'components/Page'
import ModalView ,{ModalDetailView} from 'components/Modal.view'
import CalendarPicker from 'components/CalendarPicker'
import BaseForm,{FormItem,customRules} from 'components/BaseForm'
import DictUtils from 'app-utils/DictUtils'
import {ImgUpload} from 'components/FileUpload'
import InputStrGroup from 'components/InputStrGroup'
const { TextArea } = Input;
const MonthPicker = DatePicker.MonthPicker
const Option = Select.Option
const ButtonGroup = Button.Group;

function filterTime(start,end) {
    if(!start){
        return [null,null]
    }else if(!end){
        return [moment(start),null]
    }else{
        return [moment(start),moment(end)]
    }
}

class PersonalInfoEdit extends Component{
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    responseType(res){
        return res.fileUrl
    }
    onSuccess(info,that){
        that.setState({
            imgUrl:info.file.response.fileUrl
        })
    }
    render(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel,handleToggle} = this.props
        let {info:{talentId,name,age,photoUrl,workyear,politicsStatus,startWorkingYear,currentAddress,mobilephone,email,sex,birthYear,maritalStatus,grade,residenceAddress}} = this.props
        return (
            <CommonForm actions={actions} type="basic" handleCancel={handleCancel} handleToggle={handleToggle}>
                <FormItem>
                    <Input type="hidden" name="talentId" defaultValue={talentId}/>
                </FormItem>
                <Row gutter={6} style={{borderBottom:"1px solid #cedbe4",marginBottom:10}}>
                    <Col span={12} className="imgBox">
                        <FormItem {...formFullItemLayout}>
                            <ImgUpload label="照片" type={2} name="photoUrl" onResponse={this.responseType} imgUrl={photoUrl} onSuccess={this.onSuccess}></ImgUpload>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Rate label=" " name='grade' defaultValue={Number(grade)}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="姓名"  name='name' defaultValue={name} rules={[{required: true, message: "姓名不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="性别" name="sex" defaultValue={sex&&sex.toString()}  fetch={DictUtils.getDictByType("sex")} renderItem={this.renderSelectOption} rules={[{required: true, message: "性别不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="户口"  name='residenceAddress' defaultValue={residenceAddress} rules={[{required: true, message: "户口不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="现居住地"  name='currentAddress' defaultValue={currentAddress} rules={[{required: true, message: "现居住地不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="婚姻状况" name="maritalStatus" defaultValue={maritalStatus&&maritalStatus.toString()} fetch={DictUtils.getDictByType("maritalstatus")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <MonthPicker label="出生年份"  name='birthYear' format="YYYY" defaultValue={moment(birthYear && birthYear.toString())} rules={[{required: true, message: "出生日期不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="政治面貌" name="politicsStatus" defaultValue={politicsStatus&&politicsStatus.toString()} fetch={DictUtils.getDictByType("political")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="手机号码"  name='mobilephone' defaultValue={mobilephone} rules={[{required: true, message: "手机号码不可为空"},{validator:customRules.checkMobile},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="邮箱号码"  name='email' defaultValue={email} rules={[{type:"email",message:"邮箱格式不正确"}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <MonthPicker label="参加工作年份"  name='startWorkingYear' format="YYYY" defaultValue={moment(startWorkingYear && startWorkingYear.toString())}/>
                        </FormItem>
                    </Col>
                </Row>
            </CommonForm>
        )
    }
}

class CurrentSalaryEdit extends Component{
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    render(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel} = this.props
        let {info:{talentId,annualSalary,basicSalary,subsidy,bonus,stockRights}} = this.props
        return(
            <CommonForm actions={actions}  type="salary" handleCancel={handleCancel}>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='talentId' defaultValue={talentId}/>
                </FormItem>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="目前工作收入"  name='annualSalary' defaultValue={annualSalary}  rules={[{validator:customRules.integer}]} />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        （包含基本工资、补贴、奖金、股权收益等）
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="基本工资"  name='basicSalary'defaultValue={basicSalary}  rules={[{validator:customRules.integer}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="股权收益"  name='stockRights'defaultValue={stockRights}  rules={[{validator:customRules.integer}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="补贴"  name='subsidy' defaultValue={subsidy}  rules={[{validator:customRules.integer}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="奖金"  name='bonus' defaultValue={bonus} rules={[{validator:customRules.integer}]}/>
                        </FormItem>
                    </Col>
                </Row>
            </CommonForm>
        )
    }
}

class JobWantedEdit extends Component{
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    render(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel} = this.props
        let {info:{expectedAddress,workStatus,expectedSalaryLower,expectedSalaryUpper,expectedJobTitle ,dutyTime,selfEvaluation,talentId},jobNatureArr,tradeArr,individualLabel} = this.props
        return(
            <CommonForm actions={actions}  type="jobs" handleCancel={handleCancel}>
                <FormItem>
                    <Input type="hidden"  name='talentId' defaultValue={talentId}/>
                </FormItem>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="职位"  name='expectedJobTitle' defaultValue={expectedJobTitle} rules={[{required: true, message: "职位不可为空"},{validator:customRules.required}]} placeholder="可输入多项，中间用英文逗号“,”分隔"/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="行业" name="tradeArr" defaultValue={tradeArr?tradeArr:[]} fetch={DictUtils.getDictByType("industry")} mode="multiple" renderItem={this.renderSelectOption} rules={[{required: true, message: "行业不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <InputStrGroup label="期望薪资" name="expectedSalary" defaultValue={[expectedSalaryLower,expectedSalaryUpper]} rules={[{validator:customRules.required},{required:true},{validator:customRules.integer}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="期望地点"  name='expectedAddress' defaultValue={expectedAddress} rules={[{required: true, message: "期望地点不可为空"},{validator:customRules.required}]} placeholder="可输入多项，中间用英文逗号“,”分隔"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="到岗时间" name="dutyTime" defaultValue={dutyTime&&dutyTime.toString()} fetch={DictUtils.getDictByType("comedate")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="工作类型" name="jobNatureArr" defaultValue={jobNatureArr?jobNatureArr:[]} mode="multiple" fetch={DictUtils.getDictByType("workproperty")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="求职状态" name="workStatus" defaultValue={workStatus&&workStatus.toString()} fetch={DictUtils.getDictByType("jobstatus")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="个人标签"  name='individualLabel' defaultValue={individualLabel} placeholder="可输入多项，中间用英文逗号“,”分隔"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={24}>
                        <FormItem {...formFullItemLayoutSpec}>
                            <TextArea label="自我评价"  name='selfEvaluation' defaultValue={selfEvaluation}/>
                        </FormItem>
                    </Col>
                </Row>
            </CommonForm>
        )
    }
}

class WorkExperienceEdit extends Component{
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    render(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel} = this.props
        let {workItem:{talentId,id,company,duringStart,duringEnd,jobTitle,trade,department,companyScale,achievements,companyNature,reasonsForLeaving,boss,subordinates,jobNature,jobContent}} = this.props
        return(
            <CommonForm actions={actions}  type="workExp" handleCancel={handleCancel}>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='id' defaultValue={id}/>
                </FormItem>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='talentId' defaultValue={talentId}/>
                </FormItem>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <CalendarPicker label="时间"  name='duringTime' defaultValue={filterTime(duringStart,duringEnd)} rules={[{required: true, message: "时间不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="公司名称"  name='company' defaultValue={company} rules={[{required: true, message: "公司名称不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="职位名称"  name='jobTitle' defaultValue={jobTitle} rules={[{required: true, message: "职位名称不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="行业" name="trade" defaultValue={trade&&trade.toString()} fetch={DictUtils.getDictByType("industry")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="部门"  name='department' defaultValue={department}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="公司规模" name="companyScale" defaultValue={companyScale&&companyScale.toString()} fetch={DictUtils.getDictByType("scale")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="公司性质" name="companyNature" defaultValue={companyNature&&companyNature.toString()} fetch={DictUtils.getDictByType("companyproperty")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="离职原因"  name='reasonsForLeaving' defaultValue={reasonsForLeaving}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="汇报对象"  name='boss' defaultValue={boss}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="下属人数"  name='subordinates' defaultValue={subordinates}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="工作性质" name="jobNature" defaultValue={jobNature&&jobNature.toString()} fetch={DictUtils.getDictByType("workproperty")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={24}>
                        <FormItem {...formFullItemLayoutSpec}>
                            <TextArea label="工作内容"  name='jobContent' defaultValue={jobContent} rules={[{required: true, message: "工作内容不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={24}>
                        <FormItem {...formFullItemLayoutSpec}>
                            <TextArea label="主要业绩"  name='achievements' defaultValue={achievements} />
                        </FormItem>
                    </Col>
                </Row>
            </CommonForm>
        )
    }
}

class ProExperienceEdit extends Component{
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    render(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel} = this.props
        let {proItem:{id,talentId,duringStart,duringEnd,title,company,duty,description}} = this.props
        return(
            <CommonForm actions={actions}  type="projectExp" handleCancel={handleCancel}>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='id' defaultValue={id}/>
                </FormItem>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='talentId' defaultValue={talentId}/>
                </FormItem>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <CalendarPicker label="时间"  name='duringTime' defaultValue={filterTime(duringStart,duringEnd)} rules={[{required: true, message: "时间不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="项目名称"  name='title' defaultValue={title} rules={[{required: true, message: "项目名称不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="所属公司"  name='company' defaultValue={company}rules={[{required: true, message: "所属公司不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={24}>
                        <FormItem {...formFullItemLayoutSpec}>
                            <TextArea label="项目描述"  name='description' defaultValue={description} rules={[{required: true, message: "项目描述不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={24}>
                        <FormItem {...formFullItemLayoutSpec}>
                            <TextArea label="责任描述"  name='duty' defaultValue={duty}/>
                        </FormItem>
                    </Col>
                </Row>
            </CommonForm>
        )
    }
}

class EducationExperEdit extends Component{
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    render(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel} = this.props
        let {eduItem:{id,talentId,duringStart,duringEnd,school,major,degree}} = this.props
        return(
            <CommonForm actions={actions}  type="educationExp" handleCancel={handleCancel}>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='id' defaultValue={id}/>
                </FormItem>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='talentId' defaultValue={talentId}/>
                </FormItem>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <CalendarPicker label="时间"  name='duringTime' defaultValue={filterTime(duringStart,duringEnd)} rules={[{required: true, message: "时间不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="学校名称"  name='school' defaultValue={school} rules={[{required: true, message: "学校名称不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="专业名称"  name='major' defaultValue={major} rules={[{required: true, message: "专业名称不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="学历/学位" name="degree" defaultValue={degree&&degree.toString()} fetch={DictUtils.getDictByType("education")} renderItem={this.renderSelectOption} rules={[{required: true, message: "学历/学位不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
            </CommonForm>
        )
    }
}

class SkillLanEdit extends Component{
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    render(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel} = this.props
        let {lanItem:{id,talentId,duringStart,duringEnd,skill,language,level,writing,speaking}} = this.props
        return(
            <CommonForm actions={actions}  type="skillLanExp" handleCancel={handleCancel}>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='id' defaultValue={id}/>
                </FormItem>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='talentId' defaultValue={talentId}/>
                </FormItem>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <CalendarPicker label="时间"  name='duringTime' defaultValue={filterTime(duringStart,duringEnd)} rules={[{required: true, message: "时间不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="技能"  name='skill' defaultValue={skill} rules={[{required: true, message: "技能不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="掌握程度" name="level" defaultValue={level&&level.toString()} fetch={DictUtils.getDictByType("degree")} renderItem={this.renderSelectOption} rules={[{required: true, message: "掌握程度不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="语种"  name='language' defaultValue={language}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="读写能力" name="writing" defaultValue={writing&&writing.toString()} fetch={DictUtils.getDictByType("degree")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Select label="听说能力" name="speaking" defaultValue={speaking&&speaking.toString()} fetch={DictUtils.getDictByType("degree")} renderItem={this.renderSelectOption}/>
                        </FormItem>
                    </Col>
                </Row>
            </CommonForm>
        )
    }
}

class CertificateEdit extends Component{
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    render(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel} = this.props
        let {certItem:{id,talentId,getDate,title,score}} = this.props
        return(
            <CommonForm actions={actions}  type="certExp" handleCancel={handleCancel}>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='id' defaultValue={id}/>
                </FormItem>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='talentId' defaultValue={talentId}/>
                </FormItem>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <DatePicker label="时间"  name='getDate' defaultValue={moment(getDate)} rules={[{required: true, message: "时间不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="证书名称"  name='title' defaultValue={title} rules={[{required: true, message: "证书名称不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="成绩"  name='score' defaultValue={score} rules={[{required: true, message: "成绩不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
            </CommonForm>
        )
    }
}

class TrainingEdit extends Component{
    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    render(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel} = this.props
        let {trainItem:{id,talentId,duringStart,duringEnd,trainingAgency,trainingCourse,certificate,trainingAddress,description}} = this.props
        return(
            <CommonForm actions={actions}  type="trainExp" handleCancel={handleCancel}>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='id' defaultValue={id}/>
                </FormItem>
                <FormItem {...formFullItemLayout}>
                    <Input type="hidden"  name='talentId' defaultValue={talentId}/>
                </FormItem>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <CalendarPicker label="时间"  name='duringTime' defaultValue={filterTime(duringStart,duringEnd)} rules={[{required: true, message: "时间不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="培训机构"  name='trainingAgency' defaultValue={trainingAgency} rules={[{required: true, message: "培训机构不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="培训课程"  name='trainingCourse' defaultValue={trainingCourse} rules={[{required: true, message: "培训课程不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formFullItemLayout}>
                            <Input label="获得证书"  name='certificate' defaultValue={certificate} rules={[{required: true, message: "获得证书不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={24}>
                        <FormItem {...formFullItemLayoutSpec}>
                            <TextArea label="培训地点"  name='trainingAddress' defaultValue={trainingAddress} rules={[{required: true, message: "培训地点不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={24}>
                        <FormItem {...formFullItemLayoutSpec}>
                            <TextArea label="详细描述"  name='description' defaultValue={description} rules={[{required: true, message: "详细描述不可为空"},{validator:customRules.required}]}/>
                        </FormItem>
                    </Col>
                </Row>
            </CommonForm>
        )
    }
}

class CommonForm extends Component{
    saveFormRef = (form) => {
        this.form = form;
    }
    handleSubmit(values){
        let {actions,type,reduce,handleCancel,handleToggle} = this.props
        this.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            switch (type){
                case "basic":
                    actions.addBasicAction(values,handleToggle,handleCancel)
                    break ;
                case "salary":
                    actions.addSalaryAction(values)
                    handleCancel()
                    break ;
                case "jobs":
                    actions.addJobAction(values)
                    handleCancel()
                    break;
                case "workExp" :
                    actions.addWorkAction(values)
                    handleCancel()
                    break;
                case "projectExp" :
                    actions.addProAction(values)
                    handleCancel()
                    break;
                case "educationExp" :
                    actions.addEduAction(values)
                    handleCancel()
                    break;
                case "skillLanExp":
                    actions.addSkiAction(values)
                    handleCancel()
                    break;
                case "certExp":
                    actions.addCertAction(values)
                    handleCancel()
                    break;
                case "trainExp":
                    actions.addTrainAction(values)
                    handleCancel()
                    break;
            }

        });
    }
    render(){
        let {children,handleCancel,type} =this.props
        return (
            <BaseForm onSubmit={this.handleSubmit} ref={this.saveFormRef}>
                {children}
                    <div className="eliteForm-btnGroup">
                        <Button type="primary" size="default" onClick={this.handleSubmit.bind(this)}>确认</Button>
                        {type == "basic"? "":<Button type="default" size="default" onClick={handleCancel}>取消</Button>}
                    </div>
            </BaseForm>
        )
    }
}


export {PersonalInfoEdit,CurrentSalaryEdit,JobWantedEdit,WorkExperienceEdit,ProExperienceEdit,EducationExperEdit,SkillLanEdit,CertificateEdit,TrainingEdit}

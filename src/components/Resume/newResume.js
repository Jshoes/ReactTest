import React,{Component} from 'react'
import {
    Row,
    Avatar,
    Col,
    Button,
    Input,
    Table,
    Card,
    Tag,
    message,
    List,
    Collapse,
    Dropdown,
    Timeline,
    Spin,
    Rate,
    Divider,
    Icon,
} from 'antd'
import {PersonalInfoEdit,CurrentSalaryEdit,JobWantedEdit,WorkExperienceEdit,ProExperienceEdit,EducationExperEdit,SkillLanEdit,CertificateEdit,TrainingEdit} from 'components/Resume/eliteEdit'
import WrapperComponent from "../../decorators/WrapperComponent"
import AddFollow from './addFollow'
import {ModalDetailView} from 'components/Modal.view'
import CheckTag from 'components/CheckTag'
import moment from 'moment'
import Ellipsis from 'components/Ellipsis'
import {Link} from 'react-router'
import ClassNames from 'classnames'
import DictUtils from 'app-utils/DictUtils'
import style from './index.less'
import ResumeDownload from '../../app_modules/Resume/views/downloadModal'
const Panel = Collapse.Panel
const {CheckableTag} = Tag


function filterTimeShow(time) {
    if(time){
        return moment(time).format("YYYY-MM")
    }else{
        return ""
    }
}
function cutNullArr(arr){
  let newArr = arr.filter((it,idx)=>{
      return it != "" && it != null && it != undefined
  })
  return newArr || []
}
function dealWithContact(type,info,bean){
  if(type == "resume"){
    let { downloadStatus , mobilephone , email } = bean
    return(
      downloadStatus == 1 ?
          <Row>
            <span>
              <Icon type="mobile" />{mobilephone}
            </span>
            <Divider type="vertical" />
            <span>
              <Icon type="mail" />{email}
            </span>
          </Row>
          :
          <Row>
            <Button type="primary">查看联系方式</Button>
          </Row>
    )
  }
  if(type == "elite"){
    let { mobilephone , email } = info
    return(
      <Row>
        <span>
          <Icon type="mobile" />{mobilephone}
        </span>
        <Divider type="vertical" />
        <span>
          <Icon type="mail" />{email}
        </span>
      </Row>
    )
  }
}
function dealWithJobTitle(type,info,bean){
  if(type == "resume"){
    return bean.jobTitle
  }
  if(type == "elite"){
    return info.jobTitle
  }
}
function dealWithTags(type,info,bean){
  if(type == "resume"){
    return cutNullArr([DictUtils.getDictLabelByValue("sex",info.sex),
                      bean.age+"岁",
                      DictUtils.getDictLabelByValue("maritalstatus",bean.maritalStatus),
                      DictUtils.getDictLabelByValue("political",info.politicsStatus),
                      DictUtils.getDictLabelByValue("education",info.degree),
                      info.currentAddress,
                      "工作经验"+bean.workYear+"年",
                      info.residenceAddress
                    ]).join(" | ")
  }
  if(type == "elite"){
    return cutNullArr([DictUtils.getDictLabelByValue("sex",info.sex),
                      //bean.age+"岁",
                      DictUtils.getDictLabelByValue("maritalstatus",info.maritalStatus),
                      DictUtils.getDictLabelByValue("political",info.politicsStatus),
                      DictUtils.getDictLabelByValue("education",info.degree),
                      info.currentAddress,
                      //"工作经验"+bean.workYear+"年",
                      info.residenceAddress
                    ]).join(" | ")
  }
}

class LabelShow extends Component{
    render(){
        let {label,children} = this.props
        if(label){
          return (
              <div>
                  <label>{label}：</label>
                  <span>{children}</span>
              </div>
          )
        }else{
          return (
              <div>
                  <span>{children}</span>
              </div>
          )
        }
    }
}

class LayoutKeyValue extends Component{
  render(){
    let { span , label , val } = this.props
    return (
      <Col span={span}>
        <LabelShow label={label}>{val}</LabelShow>
      </Col>
    )
  }
}

class DetailTitle extends Component{
  render(){
    let { title } = this.props
    return(
      <Row gutter={12}>
        <Col span={24} style={{fontSize:"16px"}}><strong>{title}</strong></Col>
      </Row>
    )
  }
}

class TotalItemFrameWork extends Component{
  render(){
    let { title , children } = this.props
    if(title){
      return (
        <div>
          <DetailTitle title={title}/>
          {children}
        </div>
      )
    }else{
      return (
        <div>
          {children}
        </div>
      )
    }

  }
}

class TimeShower extends Component{
  /*
  *time 时间
  *type single double
  *format 'YYYY-MM-DD'
  */
  render(){
    let { type , time , format } = this.props
    if(type === "array"){
      return (
        <span>
          <span>{moment(time[0]).format(format)}</span>
          <span>~</span>
          <span>{moment(time[ time.length - 1 ]).format(format)}</span>
        </span>
      )
    }
    if(type === "string"){
      return (
        <span>
          {moment(time).format(format)}
        </span>
      )
    }
  }
}

TimeShower.defaultProps = {
  format:"YYYY-MM"
}

class PersonInfomationData extends Component{
  render(){
    let { info , bean , type } = this.props
    if(info){
      let renderTags = dealWithTags(type,info,bean)
      let contactInfo = dealWithContact(type,info,bean)
      let jobTitle = dealWithJobTitle(type,info,bean)
      return <PersonalInfomationShow {...this.props} tags={renderTags} contactInfo={contactInfo}/>
    }else{
      return null
    }
  }
}

class PersonalInfomationShow extends Component{

  renderShowData(){
    let {
      info :{ photoUrl , name  },
      jobTitle ,
      tags ,
      contactInfo ,
      btnGroup
    } = this.props


    return (
      <div className="resume-mainInfo">
        <Row gutter={12}>
          <Col span={4} style={{textAlign:"center"}}>
            <img src={photoUrl} style={{height:"90px"}} />
          </Col>
          <Col span={20}>
            <Row>
              <div>
                <span>{name}</span>
                <span>{jobTitle}</span>
              </div>
            </Row>
            <Row>
              <div>{tags}</div>
            </Row>
            {contactInfo}
          </Col>
        </Row>
        {btnGroup}
      </div>
    )
  }

  render(){
    return (
      <div>
        {this.renderShowData()}
      </div>
    )
  }
}

class SalaryInfomationData extends Component{
  render(){
    let { info } = this.props
    if(info){
      return <SalaryInfomationShow {...this.props} />
    }else{
      return null
    }
  }
}

class SalaryInfomationShow extends Component{
  renderShowData(){
    let {
      info:{
        annualSalary,
        basicSalary,
        subsidy,
        bonus,
        stockRights
      }
    } = this.props

    return (
      <TotalItemFrameWork title="目前年收入">
        <Row gutter={12}>
          <span>{annualSalary}</span>
          <span>（包含基本工资、补贴、奖金、股权收益等）</span>
        </Row>
        <Row gutter={12}>
          <LayoutKeyValue span={6} label="基本工资" val={basicSalary}/>
          <LayoutKeyValue span={6} label="补贴" val={subsidy}/>
          <LayoutKeyValue span={6} label="奖金" val={bonus}/>
          <LayoutKeyValue span={6} label="股权收益" val={stockRights}/>
        </Row>
      </TotalItemFrameWork>
    )
  }
  render(){
    let { info } = this.props
    return (
      <div>
      {this.renderShowData()}
      </div>
    )
  }
}

class JobWantedInfomationData extends Component{
  render(){
    let { objectives } =this.props
    if(objectives){
      let expectTotal = !objectives.expectedSalaryUpper && !objectives.expectedSalaryLower ? "":objectives.expectedSalaryLower +"-"+objectives.expectedSalaryUpper
      let tradeResult = objectives.trade.map((it)=>{return DictUtils.getDictLabelByValue("industry",it)+","})
      let jobNatureResult = objectives.jobNature.map((it)=>{return DictUtils.getDictLabelByValue("workproperty",it)+","})
      return <JobWantedInfomationShow {...this.props} {...objectives} expectTotal={expectTotal} tradeResult={tradeResult} jobNatureResult={jobNatureResult}/>
    }else{
      return null
    }
  }
}

class JobWantedInfomationDataForElite extends Component{
  render(){
    let { info , item } = this.props
    if(info){
      let expectTotal = !info.expectedSalaryUpper && !info.expectedSalaryLower ? "":info.expectedSalaryLower +"-"+info.expectedSalaryUpper
      let tradeResult = item.tradeArr && item.tradeArr.map((it)=>{return DictUtils.getDictLabelByValue("industry",it)+","})
      let jobNatureResult = item.jobNatureArr && item.jobNatureArr.map((it)=>{return DictUtils.getDictLabelByValue("workproperty",it)+","})
      return <JobWantedInfomationShow {...this.props} {...info} expectTotal={expectTotal} tradeResult={tradeResult} jobNatureResult={jobNatureResult}/>
    }else{
      return null
    }
  }
}

class JobWantedInfomationShow extends Component{
  renderShowData(){
    let {
      expectedAddress , expectedJobTitle , selfEvaluation , dutyTime ,individualLabel , workStatus ,
      expectTotal,
      tradeResult,
      jobNatureResult
    } = this.props

    return (
      <TotalItemFrameWork title="求职意向">
        <Row gutter= {12}>
          <LayoutKeyValue span={8} label="期望薪资" val={expectTotal}/>
          <LayoutKeyValue span={8} label="工作地点" val={expectedAddress}/>
        </Row>
        <Row gutter= {12}>
          <LayoutKeyValue span={8} label="职位" val={expectedJobTitle}/>
          <LayoutKeyValue span={8} label="行业" val={tradeResult}/>
        </Row>
        <Row gutter={12}>
          <LayoutKeyValue span={24} label="自我评价" val={selfEvaluation}/>
        </Row>
        <Row gutter= {12}>
          <LayoutKeyValue span={8} label="到岗时间" val={DictUtils.getDictLabelByValue("comedate",dutyTime)}/>
          <LayoutKeyValue span={8} label="工作类型" val={jobNatureResult}/>
        </Row>
        <Row gutter={12} >
          <LayoutKeyValue span={8} label="个人标签" val={individualLabel}/>
          <LayoutKeyValue span={8} label="工作状态" val={DictUtils.getDictLabelByValue("jobstatus",workStatus)}/>
        </Row>
      </TotalItemFrameWork>
    )
  }
  render(){
    return (
      <div>
      {this.renderShowData()}
      </div>
    )
  }
}

class WorkInfomationData extends Component{
  render(){
    let { jobs } = this.props
    if(jobs){
      return <WorkInformationShow {...this.props}/>
    }else{
      return null
    }
  }
}

class WorkInformationShow extends Component{
  renderShowData(){
    let {
      jobs
    } = this.props

    return jobs.map((it,idx)=>{
      return (
        <div key={idx}>
          <Row gutter={12}>
            <LayoutKeyValue span={6} val={<TimeShower type="array" time={[it.duringStart,it.duringEnd]}/>}/>
            <LayoutKeyValue span={6} val={<strong>{it.company}</strong>}/>
            <LayoutKeyValue span={6} val={<strong>{it.jobTitle}</strong>}/>
          </Row>
          <Row gutter={12}>
            <LayoutKeyValue span={24} val={
              cutNullArr([
                DictUtils.getDictLabelByValue("industry",it.trade),
                DictUtils.getDictLabelByValue("workproperty",it.jobNature),
                DictUtils.getDictLabelByValue("companyproperty",it.companyNature),
                DictUtils.getDictLabelByValue("scale",it.companyScale),
                it.department,
                it.subordinates=="" ?"":"下属人数:"+it.subordinates+"人",
                it.boss == "" ? "" : "汇报对象:"+it.boss
              ]).join(" | ")
            }/>
          </Row>
          <Row gutter={12}>
            <LayoutKeyValue span={24} label="工作内容" val={it.jobContent}/>
          </Row>
          <Row gutter={12}>
            <LayoutKeyValue span={24} label="主要业绩" val={it.achievements}/>
          </Row>
          <Row gutter={12}>
            <LayoutKeyValue span={24} label="离职原因" val={it.reasonsForLeaving}/>
          </Row>
        </div>
      )
    })
  }
  render(){
    return (
      <TotalItemFrameWork title="工作经验">
        {this.renderShowData()}
      </TotalItemFrameWork>
    )
  }
}

class ProjectInfomationData extends Component{
  render(){
    let { projects } = this.props
    if(projects){
      return <ProjectInfomationShow {...this.props}/>
    }else{
      return null
    }
  }
}

class ProjectInfomationShow extends Component{
  renderShowData(){
    let {
      projects
    } = this.props
    return projects.map((it,idx)=>{
      return (
        <div key={idx}>
          <Row gutter={12}>
            <LayoutKeyValue span={6} val={<TimeShower type="array" time={[it.duringStart,it.duringEnd]}/>}/>
            <LayoutKeyValue span={6} val={<strong>{it.company}</strong>}/>
            <LayoutKeyValue span={6} val={<strong>{it.title}</strong>}/>
          </Row>
          <Row gutter={12}>
            <LayoutKeyValue span={24} label="项目描述" val={it.description}/>
          </Row>
          <Row gutter={12}>
            <LayoutKeyValue span={24} label="责任描述" val={it.duty}/>
          </Row>
        </div>
      )
    })
  }
  render(){
    return (
      <TotalItemFrameWork title="项目经验">
        {this.renderShowData()}
      </TotalItemFrameWork>
    )
  }
}

class EducationInfomationData extends Component{
  render(){
    let { educations } = this.props
    if(educations){
      return <EducationInfomationShow {...this.props}/>
    }else{
      return null
    }
  }
}

class EducationInfomationShow extends Component{
  renderShowData(){
    let {
      educations
    } = this.props
    return educations.map((it,idx)=>{
      return (
        <div key={idx}>
          <Row gutter={12}>
            <LayoutKeyValue span={6} val={<TimeShower type="array" time={[it.duringStart,it.duringEnd]}/>}/>
            <LayoutKeyValue span={6} val={<strong>{it.school}</strong>}/>
          </Row>
          <Row gutter={12}>
            <LayoutKeyValue span={24} val={
              cutNullArr([
                DictUtils.getDictLabelByValue("education",it.degree),
                it.major
              ]).join(" | ")
            }/>
          </Row>
        </div>
      )
    })
  }
  render(){
    return (
      <TotalItemFrameWork title="教育经历">
        {this.renderShowData()}
      </TotalItemFrameWork>
    )
  }
}

class LanguageInfomationData extends Component {
  render(){
    let { languages } =this.props
    if(languages){
      return <LanguageInfomationShow {...this.props}/>
    }else{
      return null
    }
  }
}

class LanguageInfomationShow extends Component{
  renderShowData(){
    let {
      languages
    } = this.props
    return languages.map((it,idx)=>{
      return (
        <div key={idx}>
          <Row gutter={12}>
            <LayoutKeyValue span={4} val={it.skill}/>
            <LayoutKeyValue span={4} val={DictUtils.getDictLabelByValue("degree",it.level)}/>
          </Row>
          <Row gutter={12}>
            <LayoutKeyValue span={24} val={it.language}/>
            <LayoutKeyValue span={24} val={
              cutNullArr([
                DictUtils.getDictLabelByValue("degree",it.speaking),
                DictUtils.getDictLabelByValue("degree",it.writing),
              ]).join(" | ")
            }/>
          </Row>
        </div>
      )
    })
  }
  render(){
    return(
      <TotalItemFrameWork title="技能/语言">
        {this.renderShowData()}
      </TotalItemFrameWork>
    )
  }
}

class CredentialsInfomationData extends Component{
  render(){
    let { credentials } =this.props
    if(credentials){
      return <CredentialsInfomationShow {...this.props}/>
    }else{
      return null
    }
  }
}

class CredentialsInfomationShow extends Component{
  renderShowData(){
    let {
      credentials
    } = this.props
    return credentials.map((it,idx)=>{
      return (
        <div key={idx}>
          <Row gutter={12}>
            <LayoutKeyValue span={6} val={<TimeShower type="string" time={it.getDate}/>}/>
            <LayoutKeyValue span={10} val={<strong>{it.title}</strong>}/>
            <LayoutKeyValue span={6} val={<strong>{it.score?"成绩"+it.score:""}</strong>}/>
          </Row>
        </div>
      )
    })
  }
  render(){
    return (
      <TotalItemFrameWork title="证书">
        {this.renderShowData()}
      </TotalItemFrameWork>
    )
  }
}

class TrainingInfomationData extends Component{
  render(){
    let { trainings } = this.props
    if(trainings){
      return <TrainingInfomationShow {...this.props}/>
    }else{
      return null
    }
  }
}

class TrainingInfomationShow extends Component{
  renderShowData(){
    let {
      trainings
    } = this.props
    return trainings.map((it,idx)=>{
      return (
        <div key={idx}>
          <Row gutter={12}>
            <LayoutKeyValue span={6} val={<TimeShower type="array" time={[it.duringStart,it.duringEnd]}/>}/>
            <LayoutKeyValue span={10} val={<strong>{it.trainingAgency}</strong>}/>
            <LayoutKeyValue span={6} val={<strong>{it.trainingCourse}</strong>}/>
          </Row>
          <Row gutter={12}>
            <LayoutKeyValue span={24} val={
              cutNullArr([
                it.certificate,
                it.trainingAddress,
              ]).join(" | ")
            } />
          </Row>
        </div>
      )
    })
  }
  render(){
    return (
      <TotalItemFrameWork title="培训经历">
        {this.renderShowData()}
      </TotalItemFrameWork>
    )
  }
}

@WrapperComponent(ModalDetailView)
export default class ResumeDetailShow extends Component{
  render(){
    let { reduce , actions , btnGroup } = this.props
    let { item: { resumeInfo , resumeOrgBean , objectives , jobs , projects , educations , languages , credentials , trainings } } = reduce
    return (
      <Spin tip="Loading..." spinning={reduce.spins.itemSpin}>
          <div className="resume-background">
            <div>
              <div></div>
              <PersonInfomationData info={resumeInfo} bean={resumeOrgBean} type="resume" btnGroup={btnGroup}/>
              <SalaryInfomationData info={resumeInfo} />
              <JobWantedInfomationData objectives={objectives}/>
              <WorkInfomationData  jobs={jobs}/>
              <ProjectInfomationData projects={projects}/>
              <EducationInfomationData educations={educations}/>
              <LanguageInfomationData languages={languages}/>
              <CredentialsInfomationData credentials={credentials} />
              <TrainingInfomationData trainings={trainings}/>
            </div>
          </div>
      </Spin>
    )
  }
}

@WrapperComponent(ModalDetailView)
export class EliteDetailShow extends Component{
  render(){
    let { reduce , actions , btnGroup } = this.props
    let itSpan = reduce.spins.itemSpin? reduce.spins.itemSpin : false
    let { item } = reduce
    let { info } = item
    return(
      <Spin tip="Loading..." spinning={itSpan}>{/*编辑信息时不载入*/}
        <div className="resume-background">
          <div>
            <div></div>
            <PersonInfomationData info={info} type="elite" btnGroup={btnGroup}/>
            <SalaryInfomationData info={info} />
            <JobWantedInfomationDataForElite info={info} item={item}/>
          </div>
        </div>
      </Spin>
    )
  }
}

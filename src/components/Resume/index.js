
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

class LabelShow extends Component{
    render(){
        let {label,children} = this.props
        return (
            <div>
                <label>{label}：</label>
                <span>{children}</span>
            </div>
        )
    }
}

class PersonalInfo extends Component{

    constructor(props){
        super(props)
        let {edit} = this.props
        this.state = {
            edit:edit,
            visible:false,
            reshow:true
        }
    }

    componentWillReceiveProps (nextProps) {
        let {reshow} = this.state
        if(this.props != nextProps){
            this.setState({
                reshow: !reshow
            })
        }
    }

    componentWillMount() {

    }

    handleCallPhone(number,resumeId,name,type){
        if(!number){
            message.info("号码为空！",5)
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
        console.log(callOutJsonStr)
        global.invokeMethod('OnCallJson',callOutJsonStr)
    }

    handleClick(){
        this.setState({
            edit:true
        })
    }

    handleCancel(){
        this.setState({
            edit: false
        })
    }
    closeFn(){
        this.setState({
            visible:false,
        })
    }

    lookAtContact(channel){
        let channelName=""
        if(channel == 1){
            channelName = "(智联招聘)"
        }else if(channel == 2){
            channelName = "(前程无忧)"
        }else if(channel == 3){
            channelName = "(58同城)"
        }
        this.setState({
            visible:true,
            title:"下载渠道简历"+channelName
        })
    }
    cutNullArr(arr){
        let newArr = arr.filter((it,idx)=>{
            return it != "" && it != null && it != undefined
        })
        return newArr || []
    }


    renderElitEdit(){
        let {actions,reduce,formFullItemLayout,formFullItemLayoutSpec,info,handleToggle} = this.props
        return(
            <PersonalInfoEdit actions={actions} info={info} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} handleCancel={this.handleCancel.bind(this)} handleToggle={handleToggle}/>
        )
    }
    /*简历文件夹 2 才需要关联职位
     * 简历筛选  3 需要面试阶段
     * */
    rednerElitShow(){
        let {id,name,age,channel,workyear,photoUrl,resumeId,currentAddress,residenceAddress,expectedJobTitle,mobilephone,email,sex,degree,maritalStatus,politicsStatus,btnGroup,editable,info,resumeOrgBean,jobTitle,pathType,eliteFlag,grade,talentId} = this.props;
        let {row} = this.props
        return(<div className="resume-mainInfo" >
            <Row gutter={12}>
                <Col span={3} style={{textAlign:"center"}} className="resume-avatar">
                    <img src={photoUrl} alt="加载图片" />
                </Col>
                <Col span={21} className="person-row">
                    <Row gutter={6} className="person-item">
                        <Col span={24}>
                            <span>
                                <span className="personal-name">{name}</span>
                                <span className="personal-jobWanted">
                                    {pathType == 2?
                                        ""
                                        :
                                        <Ellipsis tooltip={true} length={30}>{resumeOrgBean && resumeOrgBean["jobTitle"]}</Ellipsis>
                                    }

                                    {eliteFlag&&grade?
                                        <Rate name='grade' value={Number(grade)} disabled={true}/>
                                        :
                                        ""
                                    }
                                </span>
                                {
                                    (pathType == 3 || pathType == 4) && resumeOrgBean && resumeOrgBean["statusStr"]?
                                        <Tag color="#07b58e" style={{marginLeft:"10px"}}>{DictUtils.getDictLabelByValue("candidatestatus",resumeOrgBean && resumeOrgBean["statusStr"])}</Tag>
                                        :
                                        ""
                                }
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={6}>
                        <Col span={24} style={{position:"relative"}}>
                            {
                                resumeOrgBean?
                                this.cutNullArr([
                                    DictUtils.getDictLabelByValue("sex",sex),
                                    resumeOrgBean["age"]+"岁",
                                    DictUtils.getDictLabelByValue("maritalstatus",maritalStatus),
                                    DictUtils.getDictLabelByValue("political",politicsStatus),
                                    DictUtils.getDictLabelByValue("education",degree),
                                    currentAddress,
                                    "工作经验"+resumeOrgBean["workYear"]+"年",
                                    residenceAddress
                                ]).join(" | ")
                                :
                                    this.cutNullArr([
                                        DictUtils.getDictLabelByValue("sex",sex),
                                        age?age+"岁":"",
                                        DictUtils.getDictLabelByValue("maritalstatus",maritalStatus),
                                        DictUtils.getDictLabelByValue("political",politicsStatus),
                                        DictUtils.getDictLabelByValue("education",degree),
                                        currentAddress,
                                        workyear?"工作经验"+workyear+"年":"",
                                        residenceAddress
                                ]).join(" | ")
                            }
                            {editable?
                                <span className="eliteEditBtn" onClick={this.handleClick.bind(this)}><Icon type="edit"/>编辑</span>
                                :
                                ""
                            }
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        {resumeOrgBean && resumeOrgBean.downloadStatus == 0 ?
                            <Col span={24}><Button type="primary" disabled={JSON.stringify(row) == "{}" ? true : false} onClick={this.lookAtContact.bind(this,channel)}>查看联系方式</Button></Col>
                            :
                            <Col span={24}>
                            <span className="persoal-mobile" onClick={resumeOrgBean?this.handleCallPhone.bind(this,mobilephone,resumeOrgBean.id,name,"2"):this.handleCallPhone.bind(this,mobilephone,talentId,name,"3")}>
                                手机：{mobilephone}
                                <Icon type="mobile" />
                            </span>
                                <span className="persoal-email">
                                邮箱：{email}
                                <Icon type="email" />
                            </span>
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
            {btnGroup}
        </div>)
    }
    renderShowOrEdit(edit){
        return !edit ? this.rednerElitShow(): this.renderElitEdit()
    }
    render(){
        let {actions,resumeOrgBean,channel,router,row} = this.props
        let {edit,visible,title} = this.state
        return (
            <div>
                {visible?<ResumeDownload actions={actions} row={row} router={router} channelResumeId={resumeOrgBean.channelResumeId}  channel={channel} closeFn={this.closeFn.bind(this)} propTitle={title}/>:""}
                {this.renderShowOrEdit(edit)}
            </div>
        )
    }
}

class CurrentSalary extends Component{

    constructor(props){
        super(props)
        let {edit} = this.props
        this.state = {
            edit:edit
        }
    }

    componentWillMount() {

    }
    handleCancel(){
        this.setState({
            edit: false
        })
    }
    handleClick(){
        this.setState({
            edit: true
        })
    }

    renderElitEdit(){
        let {actions,formFullItemLayout,formFullItemLayoutSpec,info} = this.props
        return(
            <CurrentSalaryEdit actions={actions} info={info} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} handleCancel={this.handleCancel.bind(this)}/>
        )
    }
    rednerElitShow(){
        const {annualSalary,basicSalary,subsidy,bonus,stockRights,editable} = this.props;
        return (
            <div>
                <Row gutter={6} >
                    <Col span={8} style={{fontSize:16}}>
                        <strong>目前年收入</strong>
                    </Col>
                    <Col span={4} style={{fontSize:16}}>
                        <span>{annualSalary}</span>
                    </Col>
                    <Col span={8} >
                        <span>（包含基本工资、补贴、奖金、股权收益等）</span>
                    </Col>
                    {editable?<span className="eliteEditBtn" onClick={this.handleClick.bind(this)}><Icon type="edit"/>编辑</span>:""}
                </Row>
                <Row gutter={6} >
                    <Col span={6}>
                        <LabelShow label="基本工资">{basicSalary}</LabelShow>
                    </Col>
                    <Col span={6}>
                        <LabelShow label="补贴">{subsidy}</LabelShow>
                    </Col>
                    <Col span={6}>
                        <LabelShow label="奖金">{bonus}</LabelShow>
                    </Col>
                    <Col span={6}>
                        <LabelShow label="股权收益">{stockRights}</LabelShow>
                    </Col>
                </Row>
            </div>
        )
    }
    renderShowOrEdit(edit){
        return !edit ? this.rednerElitShow(): this.renderElitEdit()
    }
    render(){
        let {edit} = this.state
        return(
            <div>
                {this.renderShowOrEdit(edit)}
            </div>
        )
    }
}

class JobWanted extends Component{

    constructor(props){
        super(props)
        let {edit} = this.props
        this.state = {
            edit:edit
        }
    }

    componentWillMount() {

    }

    renderElitEdit(){
        let {actions,reduce,formFullItemLayout,formFullItemLayoutSpec,info,tradeArr,jobNatureArr,individualLabel} = this.props
        return(
            <JobWantedEdit actions={actions} info={info} individualLabel={individualLabel} tradeArr={tradeArr} jobNatureArr={jobNatureArr} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} handleCancel={this.handleCancel.bind(this)}/>
        )
    }

    handleCancel(){
        this.setState({
            edit: false
        })
    }
    handleClick(){
        this.setState({
            edit: true
        })
    }

    rednerElitShow(){
        const { expectedAddress,workStatus,jobNature,individualLabel,expectedSalaryLower,expectedSalaryUpper,expectedJobTitle ,dutyTime,selfEvaluation,trade,editable,tradeArr,jobNatureArr,disting}= this.props;
        return(
            <div>
                <Row gutter={6} >
                    <Col span={24} style={{fontSize:16}}>
                        <strong>求职意向</strong>
                    </Col>
                    {editable?<span className="eliteEditBtn" onClick={this.handleClick.bind(this)}><Icon type="edit"/>编辑</span>:""}
                </Row>
                <Row gutter={6} >
                    <Col span={8}>
                        <LabelShow label="期望薪资">{!expectedSalaryUpper && !expectedSalaryLower ? "":expectedSalaryLower +"-"+expectedSalaryUpper}</LabelShow>
                    </Col>
                    <Col span={8}>
                        <LabelShow label="工作地点">{expectedAddress}</LabelShow>
                    </Col>
                </Row>
                <Row gutter={6} >
                    <Col span={8}>
                        <LabelShow label="职位">{expectedJobTitle}</LabelShow>
                    </Col>
                    {disting == "resume"?
                        <Col span={8}>
                            <LabelShow label="行业">{trade && trade.map((it)=>{return DictUtils.getDictLabelByValue("industry",it)+","})}</LabelShow>
                        </Col>
                        :
                        <Col span={8}>
                            <LabelShow label="行业">{tradeArr && tradeArr.map((it)=>{return DictUtils.getDictLabelByValue("industry",it)+","})}</LabelShow>
                        </Col>
                    }
                </Row>
                <Row gutter={6} >
                    <Col span={24}>
                        <LabelShow label="自我评价">{selfEvaluation}</LabelShow>
                    </Col>
                </Row>
                <Row gutter={6} >
                    <Col span={8}>
                        <LabelShow label="到岗时间">{DictUtils.getDictLabelByValue("comedate",dutyTime)}</LabelShow>
                    </Col>
                    {disting == "resume"?
                        <Col span={8}>
                            <LabelShow label="工作类型">{jobNature && jobNature.map((it)=>{return DictUtils.getDictLabelByValue("workproperty",it)+","})}</LabelShow>
                        </Col>
                        :
                        <Col span={8}>
                            <LabelShow label="工作类型">{jobNatureArr && jobNatureArr.map((it)=>{return DictUtils.getDictLabelByValue("workproperty",it)+","})}</LabelShow>
                        </Col>
                    }

                </Row>
                <Row gutter={6} >
                    <Col span={8}>
                        <LabelShow label="个人标签">{individualLabel}</LabelShow>
                    </Col>
                    <Col span={8}>
                        <LabelShow label="工作状态">{DictUtils.getDictLabelByValue("jobstatus",workStatus)}</LabelShow>
                    </Col>
                </Row>
            </div>
        )
    }
    renderShowOrEdit(edit){
        return !edit ? this.rednerElitShow(): this.renderElitEdit()
    }
    render(){
        let {edit} = this.state
        return(
            <div>
                {this.renderShowOrEdit(edit)}
            </div>
        )
    }
}

class WorkExperience extends Component{

    constructor(props){
        super(props)
        let {edit} = this.props
        this.state = {
            edit:edit,
            workItem:{},
            proItem:{},
        }
    }

    componentWillMount() {

    }
    handleCancel(){
        this.setState({
            edit: false
        })
    }
    handleClickPro(item){
        this.setState({
            edit: true,
            proItem:item,
        })
    }
    handleClickWork(item){
        this.setState({
            edit: true,
            workItem:item,
        })
    }
    cutNullArr(arr){
        let newArr = arr.filter((it,idx)=>{
            return it != "" && it != null && it != undefined
        })
        return newArr || []
    }

    renderElitEdit(type){
        let {workItem,proItem} = this.state
        let {actions,formFullItemLayout,formFullItemLayoutSpec,handleCancel} = this.props
        if( type == 1){
           return <WorkExperienceEdit actions={actions} workItem={workItem} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} handleCancel={this.handleCancel.bind(this)}/>
        }
        if( type == 2){
            return <ProExperienceEdit actions={actions} proItem={proItem} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} handleCancel={this.handleCancel.bind(this)}/>
        }
    }

    workExperience(){
        let {workExp,editable} = this.props
        return workExp && workExp.map((item,index)=>{
                return (
                    <div key={index}>
                      <Row gutter={6} style={{position:"relative"}}>
                        <Col span={6}>
                            <span>{filterTimeShow(item.duringStart)}-{filterTimeShow(item.duringEnd)}</span>
                        </Col>
                        <Col span={6}>
                            <strong className="spacial">{item.company}</strong>
                        </Col>
                          <Col span={6}>
                              <strong className="spacial">{item.jobTitle}</strong>
                          </Col>
                          {editable?<span className="eliteEditBtn" onClick={this.handleClickWork.bind(this,item)}><Icon type="edit"/>编辑</span>:""}
                      </Row>
                      <Row gutter={6}>
                        <Col span={24}>
                            <span>{
                            this.cutNullArr([
                                DictUtils.getDictLabelByValue("industry",item.trade),
                                DictUtils.getDictLabelByValue("workproperty",item.jobNature),
                                DictUtils.getDictLabelByValue("companyproperty",item.companyNature),
                                DictUtils.getDictLabelByValue("scale",item.companyScale)
                            ]).join(" | ")}</span>
                        </Col>
                      </Row>
                      <Row gutter={6}>
                        <Col span={24}>
                            <LabelShow label="工作内容">{item.jobContent}</LabelShow>
                        </Col>
                      </Row>
                    <Row gutter={6}>
                        <Col span={24}>
                            <span>{
                                this.cutNullArr([item.department,
                                    item.subordinates=="" ?"":"下属人数:"+item.subordinates+"人",
                                    item.boss == "" ? "" : "汇报对象:"+item.boss
                            ]).join(" | ")}</span>
                        </Col>
                    </Row>
                    <Row gutter={6}>
                        <Col span={24}>
                            <LabelShow label="主要业绩">{item.achievements}</LabelShow>
                        </Col>
                    </Row>
                        <Row gutter={6}>
                            <Col span={24}>
                                <LabelShow label="离职原因">{item.reasonsForLeaving}</LabelShow>
                            </Col>
                        </Row>
                    </div>
                );
            })
    }
    projectExperience(){
        let {projectExp,editable} = this.props
        return projectExp && projectExp.map((item,index)=>{
                return (
                    <div key={index}>
                      <Row gutter={6} style={{position:"relative"}}>
                        <Col span={6}>
                            <span>{filterTimeShow(item.duringStart)}-{filterTimeShow(item.duringEnd)}</span>
                        </Col>
                          <Col span={6}>
                              <strong className="spacial">{item.company}</strong>
                          </Col>
                          <Col span={6}>
                              <strong className="spacial">{item.title}</strong>
                          </Col>
                          {editable?<span className="eliteEditBtn" onClick={this.handleClickPro.bind(this,item)}><Icon type="edit"/>编辑</span>:""}
                      </Row>
                      <Row gutter={6}>
                        <Col span={24}>
                            <LabelShow label="项目描述">{item.description}</LabelShow>
                        </Col>
                      </Row>
                        <Row gutter={6}>
                            <Col span={24}>
                                <LabelShow label="责任描述">{item.duty}</LabelShow>
                            </Col>
                        </Row>
                    </div>
                );
            })
    }

    rednerElitShow(type){
        let {editable,talentId} = this.props
        return (
            <div>
                <Row gutter={6} >
                     <Col span={24} style={{fontSize:16}}>
                        <strong>{type == 1? "工作": "项目"}经验</strong>
                     </Col>
                    {editable?<span className="eliteEditBtn" onClick={type == 1? this.handleClickWork.bind(this,{talentId:talentId}):this.handleClickPro.bind(this,{talentId:talentId})}><Icon type="plus"/>新增</span>:""}
                 </Row>
                {type == 1 ? this.workExperience():this.projectExperience()}
            </div>
        )
    }
    render(){
        let {type} = this.props
        let {edit} = this.state
        return (
            <div>
                {this.rednerElitShow(type)}
                {edit?this.renderElitEdit(type):""}
            </div>
        )
    }
}
class EducationExper extends Component{

    constructor(props){
        super(props)
        let {edit} = this.props
        this.state = {
            edit:edit,
            eduItem:{},
        }
    }

    componentWillMount() {

    }
    handleCancel(){
        this.setState({
            edit: false
        })
    }
    handleClick(item){
        this.setState({
            edit:true,
            eduItem:item,
        })
    }
    renderElitEdit(talentId){
        let {formFullItemLayout,formFullItemLayoutSpec,actions} = this.props
        let {eduItem} = this.state
        return <EducationExperEdit actions={actions} talentId={talentId} eduItem={eduItem} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} handleCancel={this.handleCancel.bind(this)}/>
    }

    renderEducation(){
        let{educationExp,editable} = this.props
        return educationExp && educationExp.map((item,index)=>{
                return (
                    <div key={index}>
                      <Row gutter={24} style={{position:"relative"}}>
                        <Col span={6}>{filterTimeShow(item.duringStart)}-{filterTimeShow(item.duringEnd)}</Col>
                        <Col span={6}><strong>{item.school}</strong></Col>
                          {editable?<span className="eliteEditBtn" onClick={this.handleClick.bind(this,item)}><Icon type="edit"/>编辑</span>:""}
                      </Row>
                        <Row gutter={24}>
                            <Col span={24}>{DictUtils.getDictLabelByValue("education",item.degree)}|{item.major}</Col>
                        </Row>
                    </div>
                )
            })

    }

    render(){
        let {edit} = this.state
        let {editable,talentId} = this.props
        return (
            <div>
              <Row gutter={6} >
                <Col span={24} style={{fontSize:16}}>
                    <strong>教育经历</strong>
                </Col>
                  {editable&&talentId?<span className="eliteEditBtn" onClick={this.handleClick.bind(this,{talentId:talentId})}><Icon type="plus"/>新增</span>:""}
              </Row>
                {this.renderEducation()}
                {edit?this.renderElitEdit():""}
            </div>
        )
    }
}

class SkillSpacial extends Component{
    render(){
        let {actions,talentId,talentLanguagesList,talentCredentialsList,talentTrainingsList,editable,formFullItemLayout,formFullItemLayoutSpec} = this.props
        return (
            <div>
                <Language actions={actions} talentId={talentId} talentLanguagesList={talentLanguagesList} editable={editable} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec}/>

                <Certificate actions={actions} talentId={talentId} talentCredentialsList={talentCredentialsList} editable={editable} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec}/>

                <Traing actions={actions} talentId={talentId} talentTrainingsList={talentTrainingsList} editable={editable} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec}/>
            </div>
        )
    }
}

class Traing extends Component{

    constructor(props){
        super(props)
        let {edit} = this.props
        this.state = {
            edit:edit,
            trainItem:{},
        }
    }

    componentWillMount() {

    }
    handleCancel(){
        this.setState({
            edit: false
        })
    }
    renderEliteEdit(talentId){
        let {actions,formFullItemLayout,formFullItemLayoutSpec} = this.props
        let {trainItem} = this.state
        return <TrainingEdit actions={actions} talentId={talentId} trainItem={trainItem} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} handleCancel={this.handleCancel.bind(this)}/>
    }

    handleClick(item){
        this.setState({
            edit: true,
            trainItem:item,
        })
    }
    renderEliteShow(){
        let {talentTrainingsList,editable} = this.props
        return talentTrainingsList && talentTrainingsList.map((item,index)=>{
                return (<div key={index}>
                    <Row gutter={6} style={{position:"relative"}}>
                        <Col span={6}>
                            <span>{filterTimeShow(item.duringStart)}-{filterTimeShow(item.duringEnd)}</span>
                        </Col>
                        <Col span={4} >
                            <span>{item.trainingAgency}</span>
                        </Col>
                        <Col span={4} >
                            <span>{item.trainingCourse}</span>
                        </Col>
                        {editable?<span className="eliteEditBtn" onClick={this.handleClick.bind(this,item)}><Icon type="edit"/>编辑</span>:""}
                    </Row>
                    <Row gutter={6}>
                        <Col span={24}>{item.certificate}|培训地点：{item.trainingAddress}</Col>
                    </Row>
                    <Row gutter={6}>
                        <Col span={24}>
                            <LabelShow label="详细描述">{item.description}</LabelShow>
                        </Col>
                    </Row>
                </div>)
            })
    }

    render(){
        let {edit} = this.state
        let {editable,talentId} = this.props
        return (
            <div>
                <Row gutter={6} >
                    <Col span={24} style={{fontSize:16}}>
                        <strong>培训经历</strong>
                    </Col>
                    {editable&&talentId?<span className="eliteEditBtn" onClick={this.handleClick.bind(this,{talentId:talentId})}><Icon type="plus"/>新增</span>:""}
                </Row>
                {this.renderEliteShow()}
                {edit?this.renderEliteEdit():""}
            </div>
        )
    }
}

class Certificate extends Component{

    constructor(props){
        super(props)
        let {edit} = this.props
        this.state = {
            edit:edit,
            certItem:{},
        }
    }

    componentWillMount() {

    }
    handleCancel(){
        this.setState({
            edit: false
        })
    }
    renderEliteEdit(talentId){
        let {actions,formFullItemLayout,formFullItemLayoutSpec} = this.props
        let {certItem} = this.state
        return <CertificateEdit actions={actions} talentId={talentId} certItem={certItem} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} handleCancel={this.handleCancel.bind(this)}/>
    }

    handleClick(item){
        this.setState({
            edit: true,
            certItem:item
        })
    }
    renderEliteShow(){
        let {talentCredentialsList,editable} = this.props
        return talentCredentialsList && talentCredentialsList.map((item,index)=>{
                return (<Row gutter={6} key={index} style={{position:"relative"}}>
                    <Col span={4} >
                        {moment(item.getDate).format("YYYY/MM")}
                    </Col>
                    <Col span={8} >
                        <strong>{item.title}</strong>
                    </Col>
                    <Col span={4} >
                        <strong>成绩{item.score}</strong>
                    </Col>
                    {editable?<span className="eliteEditBtn" onClick={this.handleClick.bind(this,item)}><Icon type="edit"/>编辑</span>:""}
                </Row>)
            })
    }

    render(){
        let {edit} = this.state
        let {editable,talentId} = this.props
        return (
            <div>
                <Row gutter={6} >
                    <Col span={24} style={{fontSize:16}}>
                        <strong>证书</strong>
                    </Col>
                    {editable&&talentId?<span className="eliteEditBtn" onClick={this.handleClick.bind(this,{talentId:talentId})}><Icon type="plus"/>新增</span>:""}
                </Row>
                {this.renderEliteShow()}
                {edit?this.renderEliteEdit():""}
            </div>
        )

    }
}

class Language extends Component{

    constructor(props){
        super(props)
        let {edit} = this.props
        this.state = {
            edit:edit,
            lanItem:{},
        }
    }

    componentWillMount() {

    }
    handleCancel(){
        this.setState({
            edit: false
        })
    }
    handleClick(item){
        this.setState({
            edit: true,
            lanItem:item
        })
    }
    cutNullArr(arr){
        let newArr = arr.filter((it,idx)=>{
            return it != "" && it != null && it != undefined
        })
        return newArr || []
    }
    renderEliteEdit(talentId){
        let {actions,formFullItemLayout,formFullItemLayoutSpec} = this.props
        let {lanItem} = this.state
        return <SkillLanEdit talentId={talentId} actions={actions} lanItem={lanItem} formFullItemLayout={formFullItemLayout} formFullItemLayoutSpec={formFullItemLayoutSpec} handleCancel={this.handleCancel.bind(this)}/>
    }
    renderEliteShow(){
        let {talentLanguagesList,editable} = this.props
        return talentLanguagesList && talentLanguagesList.map((item,index)=>{
                return	(
                    <div key={index}>
                        <Row gutter={6} style={{position:"relative"}}>
                            <Col span={4} >
                                <span>{item.skill }</span>
                            </Col>
                            <Col span={4}>
                                <span>{DictUtils.getDictLabelByValue("degree",item.level)}</span>
                            </Col>
                            {editable?<span className="eliteEditBtn" onClick={this.handleClick.bind(this,item)}><Icon type="edit"/>编辑</span>:""}
                        </Row>
                        <Row gutter={6}>
                            <Col span={24} >
                                <span>{item.language}</span>
                            </Col>
                        </Row>
                        <Row gutter={6}>
                            <Col span={24} >
                                {this.cutNullArr([
                                    item.speaking?"听说能力"+DictUtils.getDictLabelByValue("degree",item.speaking):"",
                                    item.writing?"读写能力"+DictUtils.getDictLabelByValue("degree",item.writing):""
                                ]).join(" | ")}
                            </Col>
                        </Row>

                    </div>)
            })
    }

    render(){
        let {edit} = this.state
        let {editable,talentId} = this.props
        return(
            <div>
                <Row gutter={6} >
                    <Col span={24} style={{fontSize:16}}>
                        <strong>技能/语言</strong>
                    </Col>
                    {editable&&talentId?<span className="eliteEditBtn" onClick={this.handleClick.bind(this,{talentId:talentId})}><Icon type="plus"/>新增</span>:""}
                </Row>
                {this.renderEliteShow()}
                {edit?this.renderEliteEdit():""}
            </div>
        )
    }
}


class DetailSideBar extends Component{
    state={
        expand:false
    }

    onExpand(){
        let {expand} = this.state
        this.setState({
            expand:!expand
        })
    }
    render(){
        let {expand} = this.state
        let {children} = this.props
        return(
            <div className={ClassNames({"DetailSideBar":true},{"DetailSideBar-expand":expand})}>
                <Button className="DetailSideBar-expand-btn" icon={expand?"caret-right":"caret-left"} onClick={this.onExpand.bind(this)}></Button>
                {children}
            </div>
        )
    }
}

class ResumeSideBar extends Component{
    hanldeFeedback(){
     let {actions,router,row} = this.props
        let {name ,resumeOrgId} = row
        actions.feedbackAction(router,resumeOrgId,name,row)
    }
    renderFeedBackList(){
        let {resumeInfoList} = this.props
        let typeTranslate = {
            1:"简历入库",
            2:"简历更新",
            3:"待邀约",
            4:"面试",
            5:"已发offer",
            6:"入职",
            7:"拒绝",
        }
        return resumeInfoList.map((it,idx)=>{
                let type = it.type
                let data = it.data
                let headers = (<div></div>)
                let bodys = (<div></div>)
                switch (type){
                    case 1:
                        headers = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={9}><Tag color="#32a0ed">{typeTranslate[type]}</Tag></Col>
                                    <Col span={9}><span>{moment(it.inputTime).format("YYYY-MM-DD HH:mm")}</span></Col>
                                    <Col span={6}><Ellipsis tooltip={true} length={5}>{it.inputName}</Ellipsis></Col>
                                </Row>
                            </div>
                        )
                        break
                    case 2:
                        headers = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={9}><Tag color="#32a0ed">{typeTranslate[type]}</Tag></Col>
                                    <Col span={9}><span>{moment(it.inputTime).format("YYYY-MM-DD HH:mm")}</span></Col>
                                    <Col span={6}><Ellipsis tooltip={true} length={5}>{it.inputName}</Ellipsis></Col>
                                </Row>
                            </div>
                        )
                        break
                    case 3:
                        headers = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={9}><Tag color="#32a0ed">{typeTranslate[type]}</Tag></Col>
                                    <Col span={9}><span>{moment(it.inputTime).format("YYYY-MM-DD HH:mm")}</span></Col>
                                    <Col span={6}><Ellipsis tooltip={true} length={5}>{it.inputName}</Ellipsis></Col>
                                </Row>
                            </div>
                        )
                        break
                    case 4:
                        headers = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={9}><Tag color="#32a0ed">{DictUtils.getDictLabelByValue("interviewstage",data.interview_level)}</Tag>{data.result == 1? <Tag color="#32a0ed">通过</Tag>:""}
                                    </Col>
                                    <Col span={9}><span>{moment(it.inputTime).format("YYYY-MM-DD HH:mm")}</span></Col>
                                    <Col span={6}><Ellipsis tooltip={true} length={5}>{it.inputName}</Ellipsis></Col>
                                </Row>
                            </div>
                        )
                        bodys = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={9}>面试官</Col>
                                    <Col span={15}><span>{data.interviewer?data.interviewer:it.inputAcc}</span></Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={9}>
                                        <span>面试反馈</span>
                                    </Col>
                                    <Col span={12}>
                                        <Ellipsis tooltip={true} length={10}>{data.feedback}</Ellipsis>
                                    </Col>
                                    <Col span={3}>
                                        <Button onClick={this.hanldeFeedback.bind(this)}><Icon type="edit"/></Button>
                                    </Col>
                                </Row>
                            </div>
                        )
                        break
                    case 5:
                        headers = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={9}><Tag color="#32a0ed">{typeTranslate[type]}</Tag></Col>
                                    <Col span={9}><span>{moment(it.inputTime && it.inputTime).format("YYYY-MM-DD HH:mm")}</span></Col>
                                    <Col span={6}><Ellipsis tooltip={true} length={5}>{it.inputName}</Ellipsis></Col>
                                </Row>
                            </div>
                        )
                        bodys = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={24}>
                                        <span>预计入职时间</span>
                                        <span>{moment(data.expectedEntryTime && data.expectedEntryTime).format("YYYY-MM-DD")}</span>
                                    </Col>
                                </Row>
                            </div>
                        )
                        break
                    case 6:
                        headers = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={9}><Tag color="#32a0ed">{typeTranslate[type]}</Tag></Col>
                                    <Col span={9}><span>{moment(it.inputTime && it.inputTime).format("YYYY-MM-DD HH:mm")}</span></Col>
                                    <Col span={6}><Ellipsis tooltip={true} length={5}>{it.inputName}</Ellipsis></Col>
                                </Row>
                            </div>
                        )
                        bodys = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={24}>
                                        <span>入职时间</span>
                                        <span>{moment(data.joinTime && data.joinTime).format("YYYY-MM-DD")}</span>
                                    </Col>
                                </Row>
                            </div>
                        )
                        break
                    case 7:
                        headers = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={9}><Tag color="#32a0ed">{typeTranslate[type]}</Tag></Col>
                                    <Col span={9}><span>{moment(it.inputTime).format("YYYY-MM-DD HH:mm")}</span></Col>
                                    <Col span={6}><Ellipsis tooltip={true} length={5}>{it.inputName}</Ellipsis></Col>
                                </Row>
                            </div>
                        )
                        bodys = (
                            <div>
                                <Row gutter={8}>
                                    <Col span={9}>
                                        <span>拒绝原因</span>
                                    </Col>
                                    <Col span={15}>
                                        {data.feedback}
                                    </Col>
                                </Row>
                            </div>
                        )
                        break
                }
                return (
                    <Panel header={headers} key={idx}>
                        {bodys}
                    </Panel>
                )
            })
    }

    handlePlaySound(item){
        let {row:{name}} = this.props
        let {data:{callId,url,timeLength,calledNum}} = item
        let  showRecordPlay ={
            RecordPlay:{
                code:callId,
                name:name == "" ? "播放录音" : name,
                phone:calledNum,
                url:url,
                dur:timeLength+"",
                bPlay:"1"
            }
        };
        let  showRecordPlayStr = JSON.stringify(showRecordPlay);
        global.invokeMethod('ShowRecordPlay',showRecordPlayStr)
    }
    renderEvents(){
        let {eventList} =this.props
        let typeTranslate = {
            1:"phone",
            2:"mail",
            3:"message",
        }
        return eventList && eventList.map((it,idx)=>{
                let data = it.data
                return (
                    <Timeline.Item dot={<Icon type={typeTranslate[it.type]} style={{fontSize:16,color:"#2a343e"}}/>}>
                        <Row gutter={8}>
                            <Col span={8}>
                                <span>
                                    {data.resumestage?
                                        data.resumestage == 2 ? DictUtils.getDictLabelByValue("interviewstage",data.interviewstage) :DictUtils.getDictLabelByValue("resumestage",data.resumestage)
                                        :
                                        "联系候选人"
                                    }
                                    </span>
                            </Col>
                            <Col span={8}><span>{moment(it.inputTime).format("YYYY-MM-DD HH:mm")}</span></Col>
                            <Col span={8}><Ellipsis tooltip={it.inputName} length={5}>{it.inputName}</Ellipsis></Col>
                        </Row>
                        {it.type == 1?
                            <Row gutter={8}>
                                <span style={{marginRight:20}}>通话时长：{data.timeLength}秒</span>
                                {data.timeLength > 0 ?<Icon type="play-circle-o" style={{cursor:"pointer"}} onClick={this.handlePlaySound.bind(this,it)}/>:null}
                            </Row>
                            :
                            null
                        }
                    </Timeline.Item>
                )
            })
    }
    render(){
        return (
            <div className="SideBar-content">
                <Card title="候选人信息反馈">
                    <Collapse bordered={false}>
                        {this.renderFeedBackList()}
                    </Collapse>
                </Card>
                <Card title="事件">
                    <Timeline>
                        {this.renderEvents()}
                    </Timeline>
                </Card>
            </div>
        )
    }
}


class EliteSideBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            labelcode:this.props.labelcode || "",
            labelname:this.props.labelname || ""
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.labelcode == this.props.labelcode){
            this.setState({
                labelcode:nextProps.labelcode || "",
                labelname:nextProps.labelname || ""
            })
        }
    }

    handleAddFollow(){
        let {actions,router} = this.props
        actions.openFollowWindow(router)
    }

    handleSaveBtn(){
        let {actions,talentId} = this.props
        let {labelcode,labelname} = this.state
        let params = {
            talentId:talentId,
            labelCode:labelcode,
            labelName:labelname
        }
        actions.tagEditAction(params)
    }

    renderList(){
        let {list}=this.props
        return (
            <Card  title="人才跟进">
                <List
                    dataSource={list}
                    renderItem={(item) =>{
                            return( <List.Item className='notices-list-item'>
                                <List.Item.Meta
                                    description={<Ellipsis tooltip={item.followContent} length={20}>{item.followContent}</Ellipsis>}
                                />
                                <div>{moment(item.inputTime).format("YYYY-MM-DD HH:MM")}</div>
                            </List.Item>)
                        }
                    }
                />
                <Button className="elite-follow-addbtn" onClick={this.handleAddFollow.bind(this)} title="添加跟进"><Icon type="plus"/></Button>
            </Card>
        )
    }
    handleChange(checked,labelCode,labelName){
        let {labelname,labelcode} = this.state
        let newname = ""
        let newcode = ""
        if(checked){
            newname = labelname + labelName +","
            newcode = labelcode + labelCode +","
            this.setState({
                labelname : newname,
                labelcode : newcode
            })
        }else{
            this.setState({
                labelname : labelname.replace(labelName+"," , ""),
                labelcode : labelcode.replace(labelCode+"," , "")
            })
        }
    }
    renderTags(){
        let {tagList} = this.props
        let {labelcode} = this.state
        return (
            <Card title="人才标签">
                {tagList.map((it,idx)=>{
                    return <CheckTag key={idx} checked={labelcode.indexOf(it.optionId)>=0} labelcode={it.optionId} labelname={it.optionName} onChange={this.handleChange.bind(this)}>{it.optionName}</CheckTag>
                })}
                <Button className="elite-follow-addbtn" onClick={this.handleSaveBtn.bind(this)} title="保存"><Icon type="save" /></Button>
            </Card>
        )
    }
    render(){
        return (
            <div className="SideBar-content">
                {this.renderList()}
                {this.renderTags()}
            </div>
        )
    }
}



@WrapperComponent(ModalDetailView)
export default class ResumeDetailShow extends Component{

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        let {actions,router,reduce,params:{id}} = this.props
    }
    renderChannels() {
        let {params,channel,resumeInfo} = this.props
        return channel && channel.map((item,idx)=>{
                return  (<Link key={idx} to={`/resume/list/detail/${item.resumeId}/${item.resumeId}`}>{DictUtils.getDictLabelByValue("channel",item.channel)}</Link>)
            })
    }
  render (){
        /*pathType 来区分功能点  字典在resumeDetail页面中*/
      let {actions,router,reduce,btnGroup,pathType,row} = this.props
      let {item,resumeInfoList,eventList} = reduce
      let {resumeInfo,objectives,resumeOrgBean,projects,credentials,educations,jobs,trainings,languages,jobTitle} = item
    return (
        <Spin tip="Loading..." spinning={reduce.spins.itemSpin}>
            <div className="resume-background">
                <div>
                    {pathType != 2?<DetailSideBar>
                        <ResumeSideBar actions={actions} router={router} row={row} identityId={identityId} resumeInfoList={resumeInfoList} eventList={eventList}/>
                    </DetailSideBar>:""}
                  <PersonalInfo {...resumeInfo} router={router} row={row} actions={actions} {...objectives} btnGroup={btnGroup} resumeOrgBean={resumeOrgBean} editable={false} jobTitle={jobTitle} pathType={pathType}/>
                  <CurrentSalary {...resumeInfo} editable={false}/>
                  <JobWanted {...objectives} disting="resume"  editable={false}/>
                  <WorkExperience workExp={jobs} type="1" editable={false} talentId={123}/>{/*统一简历和人才展示。 talentId必传 传入后editable为false时无用*/}
                  <WorkExperience projectExp={projects} type="2" editable={false} talentId={123}/>
                  <EducationExper educationExp={educations} editable={false} talentId={123}/>
                  <SkillSpacial  talentLanguagesList={languages} talentCredentialsList={credentials} talentTrainingsList={trainings} editable={false} talentId={123}/>
                </div>
            </div>
        </Spin>
    )
  }
}



@WrapperComponent(ModalDetailView)
export class EliteDetailShow extends Component{

    constructor(props) {
        super(props);
        this.state={
            hide:this.props.hide,
        }
    }
    componentWillMount() {
        let {actions,router,reduce} = this.props;
    }

    handleToggle(){
        this.setState({
            hide:false
        })
    }

    render (){
        let {actions,reduce,router,btnGroup,eliteFlag} = this.props
        let {item:{info,projects,atSchools,credentials,educations,jobs,trainings,languages,follows,jobNatureArr,tradeArr,workyear,age},tagList} = reduce
        let {talentId,labelName,labelCode} = info
        const formFullItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        };
        const formFullItemLayoutSpec = {
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 21
            }
        };
        let {hide,visible} = this.state
        let itSpan = reduce.spins.itemSpin? reduce.spins.itemSpin : false
        let commonProps = {
          editable: true,
          edit : false,
          actions : actions,
          formFullItemLayout : formFullItemLayout,
          formFullItemLayoutSpec : formFullItemLayoutSpec
        }

        let editPersonProps = {
          editable : true,
          edit : true,
          actions : actions,
          formFullItemLayout : formFullItemLayout,
          formFullItemLayoutSpec : formFullItemLayoutSpec,
          handleToggle : this.handleToggle.bind(this)
        }
        return (
            <Spin tip="Loading..." spinning={itSpan}>{/*编辑信息时不载入*/}
              <div className="resume-background">
                  {hide? <PersonalInfo {...info} info={info} {...editPersonProps}/> :
                      <div>
                          <DetailSideBar >
                              <EliteSideBar actions={actions} router={router} list={follows} tagList={tagList} labelcode={labelCode} labelname={labelName} talentId={talentId}/>
                          </DetailSideBar>
                          <PersonalInfo {...info} info={info} workyear={workyear} age={age} jobTitle="" btnGroup={btnGroup} eliteFlag={eliteFlag} {...commonProps}/>
                          <CurrentSalary {...info} info={info} {...commonProps} />
                          <JobWanted {...info} info={info} disting="elite" jobNatureArr={jobNatureArr} tradeArr={tradeArr} {...commonProps}/>
                          <WorkExperience workExp={jobs} talentId={talentId} type="1" {...commonProps}/>
                          <WorkExperience projectExp={projects} talentId={talentId} type="2" {...commonProps}/>
                          <EducationExper educationExp={educations} talentId={talentId} {...commonProps}/>
                          <SkillSpacial  talentLanguagesList={languages} talentId={talentId} talentCredentialsList={credentials} talentTrainingsList={trainings} {...commonProps}/>
                      </div>
                  }
                </div>
            </Spin>
        )
    }
}

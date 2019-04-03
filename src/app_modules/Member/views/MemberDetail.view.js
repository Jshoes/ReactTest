
import React,{Component} from 'react'
import {
    Row,
    Avatar,
    Col,
    Button,
    Input,
    Table,
    Dropdown,
    Icon,
} from 'antd'
import {ModalDetailView} from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'

class PersonalInfo extends Component{
    render(){
        const {name,job,stage,jobFrom,address,mobile,email,sex,age,workYear,nowSituation} = this.props;
        return (
            <div style={{paddingBottom:10,borderBottomWidth:1,borderBottomColor:"#000",borderBottomStyle:"solid"}}>
              <Row gutter={12}>
                <Col span={3}>
                  <Avatar shape="square" size="large" icon="user" style={{display:"block"}}/>
                  <Icon type="star-o" style={{fontSize:12}}/>
                  <Icon type="star-o" style={{fontSize:12}}/>
                  <Icon type="star-o" style={{fontSize:12}}/>
                  <Icon type="star-o" style={{fontSize:12}}/>
                  <Icon type="star-o" style={{fontSize:12}}/>
                </Col>
                <Col span={21} className="person-row">
                  <Row gutter={6} className="person-item">
                    <Col span={2}>{name}</Col>
                    <Col span={3}>{job}</Col>
                    <Col span={3}>{stage}</Col>
                    <Col span={3}>{jobFrom}</Col>
                    <Col span={3} offset={10}>
                      <Button type="default" htmlType="button">关联职位</Button>
                    </Col>
                  </Row>
                  <Row gutter={6} className="person-item">
                    <Col span={24}>现居住{address}/{sex}/{age}岁/{workYear}年工作经验/{nowSituation}</Col>
                  </Row>
                  <Row gutter={24} className="person-item">
                    <Col span={6}>
                      手机：{mobile}
                      <Icon type="mobile" />
                    </Col>
                    <Col span={6}>邮箱：{email}</Col>
                  </Row>
                </Col>
              </Row>
            </div>
        )
    }
}

class CurrentSalary extends Component{
    render(){
        const {yearSalary,basicSalary,subsidy,bonus,equity} = this.props;
        return (
            <div>
              <Row gutter={6} style={{marginTop:20}}>
                <Col span={3} style={{fontSize:18}}>
                  <Icon type="info-circle" />目前年收入
                </Col>
                <Col span={2} style={{fontSize:18}}>
                    {yearSalary}万元
                </Col>
                <Col span={12} >
                  （包含基本工资、补贴、奖金、股权收益等）
                </Col>
              </Row>
              <Row gutter={6} >
                <Col span={4}>
                  基本工资：{basicSalary}万元
                </Col>
                <Col span={4}>
                  补贴：{subsidy}万元
                </Col>
                <Col span={4}>
                  奖金：{bonus}万元
                </Col>
                <Col span={4}>
                  股权收益：{equity}万元
                </Col>
              </Row>
            </div>
        );
    }
}

class JobWanted extends Component{
    render(){
        const { evaluate }= this.props;
        return(
            <div>
              <Row gutter={6} style={{marginTop:20}}>
                <Col span={3} style={{fontSize:18}}>
                  <Icon type="info-circle" />求职意向
                </Col>
              </Row>
              <Row gutter={6} >
                <Col span={6}>
                  期望薪资：
                </Col>
                <Col span={6}>
                  工作地点：
                </Col>
              </Row>
              <Row gutter={6} >
                <Col span={6}>
                  职位：
                </Col>
                <Col span={6}>
                  行业：
                </Col>
              </Row>
              <Row gutter={6} >
                <Col span={24}>
                  自我评价：{evaluate}
                </Col>
              </Row>
              <Row gutter={6} >
                <Col span={6}>
                  到岗时间：
                </Col>
                <Col span={6}>
                  工作类型：
                </Col>
              </Row>
            </div>
        )
    }
}

class WorkExperience extends Component{

    workExperience(){
        const works = this.props.workExp;
        return works && works.map((item,index)=>{
                return (
                    <div key={index}>
                      <Row gutter={6}>
                        <Col span={4}>
                            {item.workYear}
                        </Col>
                        <Col span={4}>
                            {item.workContent}
                        </Col>
                      </Row>
                      <Row gutter={6}>
                        <Col span={24}>
                            {item.company}
                        </Col>
                      </Row>
                      <Row gutter={6}>
                        <Col span={24}>
                            {item.companyType}
                        </Col>
                      </Row>
                      <Row gutter={6}>
                        <Col span={24}>
                          工作描述：{item.workDesicb}
                        </Col>
                      </Row>
                    </div>
                );
            })
    }
    projectExperience(){
        const projects = this.props.projectExp;
        return projects && projects.map((item,index)=>{
                return (
                    <div key={index}>
                      <Row gutter={6}>
                        <Col span={4}>
                            {item.workYear}
                        </Col>
                        <Col span={4}>
                            {item.workContent}
                        </Col>
                      </Row>
                      <Row gutter={6}>
                        <Col span={24}>
                          项目描述：{item.workDesicb}
                        </Col>
                      </Row>
                      <Row gutter={6}>
                        <Col span={24}>
                          责任描述：{item.responsDesicb}
                        </Col>
                      </Row>
                    </div>
                );
            })
    }
    render(){
        const type = this.props.type;
        return (
            <div>
              <Row gutter={6} style={{marginTop:20}}>
                <Col span={3} style={{fontSize:18}}>
                  <Icon type="info-circle" />{type == 1? "工作": "项目"}经验
                </Col>
              </Row>
                {type == 1 ? this.workExperience():this.projectExperience()}

            </div>
        )
    }
}
class EducationExper extends Component{
    renderEducation(){
        const educationExp = this.props.educationExp;
        return educationExp && educationExp.map((item,index)=>{
                return (
                    <div key={index}>
                      <Row gutter={24}>
                        <Col span={3}>{item.time}</Col>
                        <Col span={3}>{item.school}</Col>
                        <Col span={3}>{item.profess}</Col>
                        <Col span={3}>{item.degree}</Col>
                      </Row>
                    </div>
                )
            })

    }

    render(){

        return (
            <div>
              <Row gutter={6} style={{marginTop:20}}>
                <Col span={3} style={{fontSize:18}}>
                  <Icon type="info-circle" />教育经历
                </Col>
              </Row>
                {this.renderEducation()}
            </div>
        )
    }
}

class SkillSpacial extends Component{
    renderLanguage(){
        const {skills} = this.props;
        if(!skills){return}
        const {skills:{skillLanguage}} = this.props;
        return (
            <div>
              <Row gutter={6} style={{marginTop:10,backgroundColor:"#bcbcbc"}}>
                <Col span={24} style={{fontSize:18}}>
                  技能/语言
                </Col>
              </Row>
              <Row gutter={6}>
                  {this.languageDetails(skillLanguage)}
              </Row>
            </div>
        )
    }
    languageDetails(skillLanguage){
        return skillLanguage && skillLanguage.map((item,index)=>{
                return	<Col span={4} key={index}>
                    {item}
                </Col>
            })
    }
    renderCertificate(){
        const {skills} = this.props;
        if(!skills){return}
        const {skills:{certificate}} = this.props;
        return (
            <div>
              <Row gutter={6} style={{marginTop:10,backgroundColor:"#bcbcbc"}}>
                <Col span={24} style={{fontSize:18}}>
                  证书
                </Col>
              </Row>
                {this.certificateDetails(certificate)}
            </div>
        )
    }
    certificateDetails(certificate){
        return certificate && certificate.map((item,index)=>{
                return	<Row gutter={6} key={index}>
                  <Col span={3} >
                      {item.time}
                  </Col>
                  <Col span={3} key={index}>
                      {item.name}
                  </Col>
                </Row>
            })
    }
    renderTrainExp(){
        const {skills} = this.props;
        if(!skills){return}
        const {skills:{trainExp}} = this.props;
        return (
            <div>
              <Row gutter={6} style={{marginTop:10,backgroundColor:"#bcbcbc"}}>
                <Col span={24} style={{fontSize:18}}>
                  培训经历
                </Col>
              </Row>
                {this.trainExpDetails(trainExp)}
            </div>
        )
    }
    trainExpDetails(trainExp){
        return trainExp && trainExp.map((item,index)=>{
                return <Row gutter={12} key={index}>
                  <Col span={4}>{item.time}</Col>
                  <Col span={4}>{item.content}</Col>
                  <Col span={4}>{item.organization}</Col>
                </Row>
            })
    }

    render(){

        return (
            <div>
              <Row gutter={6} style={{marginTop:20}}>
                <Col span={3} style={{fontSize:18}}>
                  <Icon type="info-circle" />技能特长
                </Col>
              </Row>
                {this.renderLanguage()}
                {this.renderCertificate()}
                {this.renderTrainExp()}
            </div>
        )
    }
}
@WrapperComponent(ModalDetailView)
export default class MemberDetailView extends Component{

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        let {actions,router} = this.props;
    }

  render (){
      const  json = {
          person:{
              name:"肖启波",
              job:"高级研发工程师",
              stage:"面试1面",
              jobFrom:"前程无忧",
              address:"杭州-西湖区",
              sex:"男",
              age:"30",
              workYear:"7",
              nowSituation:"目前正在找工作",
              mobile:"13738381212",
              email:"jin1998@163.com",
          },
          salary : {
              yearSalary :100,
              basicSalary:60,
              subsidy:10,
              bonus:20,
              equity:10,
          },
          jobWants : {
              evaluate:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
          },
          workExp : [{
              workYear:"2009/4-至今",
              workContent:"产品总监/产品中心",
              company:"帝国第一创业公司(8年8个月)",
              companyType:"公司所属行业|公司规模|公司性质",
              workDesicb:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
          },{
              workYear:"2009/4-至今",
              workContent:"产品总监/产品中心",
              company:"帝国第一创业公司(8年8个月)",
              companyType:"公司所属行业|公司规模|公司性质",
              workDesicb:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
          },{
              workYear:"2009/4-至今",
              workContent:"产品总监/产品中心",
              company:"帝国第一创业公司(8年8个月)",
              companyType:"公司所属行业|公司规模|公司性质",
              workDesicb:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
          }],
          projectExp : [{
              workYear:"2006/9-2008/9",
              workContent:"智能城市项目-杭州",
              workDesicb:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
              responsDesicb:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
          },{
              workYear:"2006/9-2008/9",
              workContent:"智能城市项目-杭州",
              workDesicb:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
              responsDesicb:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
          },{
              workYear:"2006/9-2008/9",
              workContent:"智能城市项目-杭州",
              workDesicb:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
              responsDesicb:"Praesent suscipit consequat neque, eu maximus nunc cursus sed. Duis sollicitudin massa in diam molestie accumsan. Ut ullamcorper hendrerit euismod. Aenean et varius purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod pretium lacinia.",
          }],
          educationExp: [{
              time:"2002/9 - 2006/9",
              school:"帝国第一大学",
              profess:"AI 设计",
              degree:"本科",
          },{
              time:"2002/9 - 2006/9",
              school:"帝国第一大学",
              profess:"AI 设计",
              degree:"本科",
          },{
              time:"2002/9 - 2006/9",
              school:"帝国第一大学",
              profess:"AI 设计",
              degree:"本科",
          },{
              time:"2002/9 - 2006/9",
              school:"帝国第一大学",
              profess:"AI 设计",
              degree:"本科",
          }],
          skills: {
              skillLanguage:["oracle(熟练)","oracle(熟练)","oracle(熟练)",],
              certificate:[{
                  name:"大学英语4级",
                  time:"2002/9",
              },{
                  name:"大学英语4级",
                  time:"2002/9",
              },],
              trainExp:[{
                  time:"2002/9-2006/9",
                  content:"产品经理是如何养成的",
                  organization:"新东方",
              }]
          }
      }

      const {person,salary,jobWants,workExp,projectExp,educationExp,skills} = json;
    return (
        <div>
          <PersonalInfo {...person}/>
          <CurrentSalary {...salary}/>
          <JobWanted {...jobWants}/>
          <WorkExperience workExp={workExp} type="1"/>
          <WorkExperience projectExp={projectExp} type="2"/>
          <EducationExper educationExp={educationExp}/>
          <SkillSpacial skills={skills}/>
        </div>
    )
  }
}

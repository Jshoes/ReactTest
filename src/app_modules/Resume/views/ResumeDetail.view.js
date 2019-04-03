
import React,{Component} from 'react'
import {
    Row,
    Avatar,
    Col,
    Button,
    Input,
    Table,
    Dropdown,
    Menu,
    Select,
    Modal,
    Tabs,
    Icon,
} from 'antd'
import {Link} from 'react-router'
import WrapperComponent from "app/decorators/WrapperComponent"
import NestedComponent from 'app/decorators/NestedComponent'
import PersonInfo,{PersonTabBaseInfo,PersonOffer,PersonOption,PersonRemarks,PersonCommunitcate,PersonOptionRecord,PersonFeedRecord,ExtraInformation} from 'app/components/PersonInfo'
import DictUtils from 'app-utils/DictUtils'
import SmartLink from 'app/components/SmartLink'
import Layout,{Fixed,Pane} from 'app/components/Layout'

const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

class InfoItem extends Component{
  render(){
    let {icon,text}= this.props
    return text ? (
      <span className="info-item">
        <Icon type={icon}/>
        {text}
      </span>
    ) : null
  }
}

function translateDic(type,value){
  return DictUtils.getDictLabelByValue(type,value)
}

@NestedComponent()
export default class PersonInfoDetail extends Component{
  render(){
    let {location:{pathname},params:{type}} = this.props
    if(pathname.indexOf("distrib") >= 0){//待分配
        return <ResumeDetail {...this.props} detailType={1}/>
    }else if(pathname.indexOf("resume/list") >= 0||pathname.indexOf("log/1") >= 0){//简历
        return <ResumeDetail {...this.props} detailType={2}/>
    }else if(pathname.indexOf("elite") >= 0 && type == 3){//人才
        return <ResumeDetail {...this.props} detailType={3}/>
    }else if(pathname.indexOf("elite") >= 0 && type == 4){//诚信
        return <ResumeDetail {...this.props} detailType={4}/>
    }

  }
}


class ResumeDetail extends Component{

    constructor(props) {
        super(props);
        this.state={
          defaultKey:"1"
        }
    }
    componentDidMount(){
      let {actions,params:{resumeId}} = this.props
      actions.itemAction({id:resumeId})
    }

    componentWillReceiveProps(nextProps){
        let {actions,router,reduce,params:{resumeId}} = this.props;

        if(JSON.stringify(nextProps.location.state) !== JSON.stringify(this.props.location.state)){
          if(nextProps.location.state && nextProps.location.state.key=="reload"){
            actions.itemAction({id:resumeId})
          }
        }
    }

    handleTabChange(value){
      this.setState({
        defaultKey:value
      })
    }

    getToRemark(){
      this.setState({
        defaultKey:"4"
      })
    }

    renderTypeButton(){
      let { detailType ,item , actions,router} = this.props
      let {status} = item
      let type = "resume"
      switch (detailType) {
        case 1:
          type = "allocat"
          break;
        case 2:
          type = "resume"
          break;
        case 3:
          type = "elite"
          break;
        case 4:
          type = "credit"
          break;
      }
      return <PersonOption item={item} status={status} actions={actions} router={router} type={type} callback={this.getToRemark.bind(this)}/>
    }


  render (){
    let {actions,detailType,item,router,reduce:{baseInfo,feedInfo,remarks,options,offer,commitcate,information},params:{resumeId}} = this.props
    let {status} = item
    return (
      <PersonInfo headNode={<PersonInfoPanelHead info={item} router={router} actions={actions}/>}>
        <div className="person-info-body">
          <Layout direction="row" >
            <Pane style={{flexDirection:"column"}}>
              <Tabs animated={false} className="personInfoTabs" activeKey={this.state.defaultKey} onTabClick={this.handleTabChange.bind(this)}>
                <TabPane tab="基本信息" key="1">
                  <PersonTabBaseInfo actions={actions} id={resumeId} info={baseInfo}/>
                </TabPane>
                <TabPane tab="面试" key="2">
                  <PersonFeedRecord detailType={detailType} actions={actions} router={router} resumeId={resumeId} info={feedInfo} status={status} item={item}/>
                </TabPane>
                <TabPane tab="offer" key="3">
                  <PersonOffer actions={actions} resumeId={resumeId} info={offer} item={item} status={status}/>
                </TabPane>
                <TabPane tab="备注" key="4">
                  <PersonRemarks actions={actions} resumeId={resumeId} info={remarks} item={item}/>
                </TabPane>
                <TabPane tab="附加信息" key="5">
                  <ExtraInformation actions={actions} resumeId={resumeId} info={information} item={item} />
                </TabPane>
                <TabPane tab="操作记录" key="6">
                  <PersonOptionRecord actions={actions} resumeId={resumeId} info={options}/>
                </TabPane>
                <TabPane tab="沟通记录" key="7">
                  <PersonCommunitcate actions={actions} resumeId={resumeId} info={commitcate}/>
                </TabPane>
              </Tabs>
            </Pane>
            <Fixed style={{width:'400px'}}>
              {this.renderTypeButton()}
            </Fixed>
          </Layout>
        </div>
      </PersonInfo>
    )
  }
}

class PersonInfoPanelHead extends Component{
  handleDelete(info){
    let {actions , router} = this.props
    let {id } = info
    /*留坑一枚  删除操作*/
    actions.deleteAction(router,[id],[info])

  }
  renderSelectOption(){
    let {info} = this.props
    if(info){
      let list = info.resumes ? info.resumes : []
      return (
        <Select style={{width:220}} value={info.id}>
          {list.map((it,idx)=>{
            return <Select.Option value={it.id} key={idx} >{`${it.jobTitle} ${translateDic("channel",it.channel)} ${translateDic("resume",it.resumeType)} ${translateDic("resumeplace",it.libType)}`}</Select.Option>
          })}
        </Select>
      )
    }
  }
  render(){
    let {info} = this.props
    let {isLock , havaSame,isFollowRemind} = info
    //console.log("isLock",isLock,"havaSame",havaSame,"isFollowRemind",isFollowRemind)
    return (
      <div className="person-info-head">
        <Button className="delete-btn" onClick={this.handleDelete.bind(this,info)}><Icon type="delete" /></Button>
        <Row gutter={12}>
          <span className="headInfoName">{info.name}</span>
          <span className="hasApply">已申请{info.resumes&&info.resumes.length}个职位</span>
            {this.renderSelectOption()}
            {havaSame ? <Icon type="icon-yisijianli" style={{color:"#e9578a"}}/> : null }
            {isLock ? <Icon type="icon-suoding" style={{color:"#f9744e"}}/> : null }
            {isFollowRemind ? <Icon type="icon-tubiao" style={{color:"#2fc4a4"}}/> : null }
        </Row>
        <Row gutter={12} className="headInfoBottom">
          <InfoItem icon="user" text={`${translateDic("sex",info.sex)} · ${info.age}`}/>
          <InfoItem icon="mobile" text={info.mobilephone}/>
          <InfoItem icon="mail" text={info.email}/>
          <InfoItem icon="clock-circle" text={info.workYear}/>
          <InfoItem icon="book" text={translateDic("education",info.degree)}/>
          <InfoItem icon="environment" text={info.currentAddress}/>
        </Row>
      </div>
    )
  }
}


export {InfoItem,translateDic}

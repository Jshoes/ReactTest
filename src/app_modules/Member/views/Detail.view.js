import React, { Component } from 'react'
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
	Tag
} from 'antd'
import { Link } from 'react-router'
import WrapperComponent from "app/decorators/WrapperComponent"
import NestedComponent from 'app/decorators/NestedComponent'
import PersonInfo, { PersonTabBaseInfo, PersonOffer, PersonOption, PersonRemarks, PersonCommunitcate, PersonOptionRecord, PersonFeedRecord,ExtraInformation } from 'app/components/PersonInfo'
import DictUtils from 'app-utils/DictUtils'
import SmartLink from 'components/SmartLink'
import ButtonGroups from 'app/components/ButtonGroups'
import moment from 'moment'
import ModalView, { ModalWidthView, ModalDetailView } from 'app/components/Modal.view'
import Detail,{InfoItem ,translateDic,} from '../../Resume/views/ResumeDetail.view'
import style from './detail.less'
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

@NestedComponent()
@WrapperComponent(ModalView,{width:800,footer:null})
export default class MemberDetail extends Detail {
	componentDidMount() {
		const{actions,params,item:{resumeId}}=this.props
		//console.log(item,'itemmmmmmm')
		// actions.resumeDataAction({id:params.id})
		// actions.resumeDataAction({id:item.resumeId})
		if(resumeId){
			actions.itemAction({id:resumeId})
		}
	}

	render() {
		let { actions, item,item:{resumeId}, reduce: { baseInfo, feedInfo,offer,remarks,information,commitcate,options },  } = this.props
		return (
			<PersonInfo headNode={<PersonInfoPanelHead {...this.props} info={item} />}>
				<div className="person-info-body">
					<Row gutter={12}>
						<Col span={24}>
							{ resumeId ?
								<Tabs animated={false} className="personInfoTabs">
									<TabPane tab="员工资料" key="0">
										<MemberInfo dataSource={item} />
									</TabPane>
									<TabPane tab="简历资料" key="1">
										<PersonTabBaseInfo actions={actions} id={resumeId} info={baseInfo} />
									</TabPane>
									<TabPane tab="面试记录" key="2">
										<PersonFeedRecord actions={actions} resumeId={resumeId} info={feedInfo} />
									</TabPane>
									<TabPane tab="offer记录" key="3">
										<PersonOffer actions={actions} resumeId={resumeId} info={offer} item={item} status={status}/>
									</TabPane>
									<TabPane tab="备注记录" key="4">
										<PersonRemarks actions={actions} resumeId={resumeId} info={remarks} item={item}/>
									</TabPane>
									<TabPane tab="附加信息" key="5">
										<ExtraInformation actions={actions} resumeId={resumeId} info={information} item={item} />
									</TabPane>
									<TabPane tab="操作记录" key="6">
										<PersonOptionRecord actions={actions} resumeId={resumeId} info={options||[]}/>
									</TabPane>
									<TabPane tab="沟通记录" key="7">
										<PersonCommunitcate actions={actions} resumeId={resumeId} info={commitcate||[]}/>
									</TabPane>
								</Tabs>
								:
								<Tabs animated={false} className="personInfoTabs">
									<TabPane tab="员工资料" key="0">
										<MemberInfo dataSource={item} />
									</TabPane>
								</Tabs>
							}
						</Col>
					</Row>
				</div>
			</PersonInfo>
		)
	}

}

class PersonInfoPanelHead extends Component {

	handleMenu(id, actionType) {
		let { memberActions, router,reduce:{page} } = this.props
		// actions[actionType].call(this,router,id)
		switch (actionType) {
      case "add":
          memberActions.deleteAction({ id:id, status:2 },page)
        break;
      case "edit":
          memberActions.editMemberRoute(id)
        break;
      case "delete":
          memberActions.deleteAction({ id:id, isDel:1 },page)
				break;
			case "dissmiss":
				memberActions.dissmissMemberAction({ id:id})
				break;

      default:
    }
	}
	render() {
		let { info } = this.props
		return (
			<div className="person-info-head">
				<Row gutter={12}>
					<span className="headInfoName">{info.name}</span>
					<span>{info.duty}</span>
					<Tag color="#108ee9">{DictUtils.getDictLabelByValue('memberstatus', info.status)}</Tag>
					<ButtonGroups className="detail-header" handleClick={this.handleMenu.bind(this, info.id)}>
						{/* <Button icon="profile" actionkey="detailRouteAction"/> */}
						<Button icon="user-add" actionkey="add" confirm={`确定员工 ${info.name} 转正？`} tooltext="转正" />
						<Button icon="user-delete" actionkey="dissmiss" confirm={`确定员工 ${info.name} 离职？`} tooltext="离职"/>
						<Button icon="edit" permission="editMember"  actionkey="edit" tooltext="编辑" />
						<Button icon="delete" permission="deleteMember" actionkey="delete" confirm={`确定删除员工 ${info.name} ？`} tooltext="删除"/>
					</ButtonGroups>
				</Row>
				<Row gutter={12} className="headInfoBottom">
					<InfoItem icon="user" text={`${translateDic("sex", info.sex)} · ${info.age}`} />
					<InfoItem icon="mobile" text={info.mobilephone} />
					<InfoItem icon="mail" text={info.email} />
					<InfoItem icon="clock-circle" text={info.workYear} />
					<InfoItem icon="book" text={translateDic("education", info.degree)} />
					<InfoItem icon="environment" text={info.currentAddress} />
				</Row>
			</div>
		)
	}
}

class MemberInfo extends Component {
	genValue(key){
		const { dataSource } = this.props
		if(dataSource[key]){
			if(key.indexOf('Time') > -1|| key=='birth'){
				return moment(dataSource[key]).format("YYYY-MM-DD")
			}else if(key=='degree'){
				console.log(dataSource[key],'sdasasdasdasdsa')
				return translateDic('education',dataSource[key])
			}else{
				return dataSource[key]
			}
		}
	}
	render() {
		const memberInfoKeys = ['birth', 'identityCard', 'degree', 'major', 'deptName', 'duty', 'cardNo', 'joinTime', 'conversionTime', 'contractExpireTime',]
		const memberInfoObj = {
			birth: '出生日期',
			identityCard: '身份证号',
			degree: '学历',
			major: '专业',
			deptName: '所属部门',
			duty: '职务岗位',
			cardNo: '银行卡号',
			joinTime: '入职日期',
			conversionTime: '转正日期',
			contractExpireTime: '合同到期日期'
		}
		const { dataSource } = this.props
		console.log(dataSource,'dataSourcedataSourcedataSourcedataSource')
		let sourceKey = Object.keys(dataSource._fields)
		let dataKeys = sourceKey.filter((ele) => memberInfoKeys.indexOf(ele) > -1)
		return dataKeys.map((e) => (
			<dl>
				<dt style={{ display: 'inline-block' }}>{memberInfoObj[e]}：</dt>
				<dd style={{ display: 'inline-block' }}>{this.genValue(e)}</dd>
			</dl>
		))


	}
}

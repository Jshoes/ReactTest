import React, {Component} from "react"
import PropTypes from "prop-types"
import {
	Row,
	Avatar,
	Col,
	Button,
	DatePicker,
	Input,
	Table,
	Card,
	Tag,
	message,
	List,
	Collapse,
	Dropdown,
	Tabs,
	Select,
	Steps,
	Timeline,
	Upload,
	Spin,
	Rate,
	Radio,
	Menu,
	Popconfirm,
	Switch,
	Icon
} from "antd"
import moment from "moment"
import {FormPage} from "app/components/Page"
import WrapperComponent from "app/decorators/WrapperComponent"
import {ModalDetailView} from "app/components/Modal.view"
import BaseForm, {FormItem, customRules} from "app/components/BaseForm"
import ButtonGroups from "app/components/ButtonGroups"
import FileUpload from "app/components/FileUpload"
import CalendarPicker from "app/components/CalendarPicker"
import {ImgUpload} from "app/components/FileUpload"
import Permission from "app/components/Permission"
import EmailTemplateLinkage, {SmsTemplateLinkage, SmsTemplateInterView} from "app/components/sendTemplate"
import InputStrGroup from "app/components/InputStrGroup"
import DictUtils from "app/utils/DictUtils"
import styles from "./style.less"

const Step = Steps.Step
const ButtonGroup = Button.Group
const {TextArea} = Input
const RadioGroup = Radio.Group
const MonthPicker = DatePicker.MonthPicker

/* 公用方法 */
/* 转化字典表 */
function translateDic(type, value) {
	return DictUtils.getDictLabelByValue(type, value)
}
/* 转化时间格式 */
function translateTime(time, defaultFormat) {
	let format = defaultFormat
		? defaultFormat
		: "YYYY/MM/DD"
	return time
		? moment(time).format(format)
		: ""
}
/* 转化为moment对象 */
function translateTimeToMoment(time) {
	return time
		? moment(time)
		: null
}
/* 转为字符串 */
function toStrings(str) {
	return str
		? str + ""
		: ""
}

/* 转为字符串数组 */
function arrayToString(array) {
	return array.map(it => toStrings(it))
}
/* 过滤数组 */
function filterArray(arr) {
	return arr.filter((it) => it != "" && it != undefined && it != null)
}

/* 进入下一级阶段公用方法 */

/* 小组件 */
class BaseInfoItem extends Component {
	render() {
		return this.props.info
			? (<div className="baseinfo-item">
				<label>{this.props.label}：</label>
				<span>{this.props.info}</span>
			</div>)
			: null
	}
}

class FormItemWrapparCol extends Component {
	render() {
		return (<Col span={this.props.span}>
			<FormItem>
				{this.props.children}
			</FormItem>
		</Col>)
	}
}
/* 默认导出组件  头身体分离 */
export default class PersonInfoPanel extends Component {
	render() {
		let {item, optionbtn, headNode, children} = this.props
		return (<div className="person-info-pannel">
			{headNode}
			{children}
		</div>)
	}
}

/* 右侧操作 */

/* * 简历 - 无权限 -  无权限按钮 （不考虑锁定）
*      - 有权限 - 向下继续判定是否锁定

*      - 锁定状态 - 锁定按钮
*      - 未锁定  - 简历按钮

*      - 简历阶段 0 1 2 3 4

* 人才库 - 锁定状态 - 人才库锁定按钮
*        - 未锁定 人才库按钮
* 待分配 -待分配按钮
* 诚信 - 诚信库按钮


type :resume elite credit allocat
status 0 1 2 3 4 */

export class PersonOption extends Component {
	renderStageLine() {
		let {type, status} = this.props
		if (type == "resume") {
			return (<Steps progressDot="progressDot" current={status} className="resumeStatus">
				<Step title="筛选"/>
				<Step title="邀约"/>
				<Step title="面试"/>
				<Step title="offer"/>
				<Step title="待入职"/>
			</Steps>)
		}
		return null
	}
	render() {
		return (<div className="person-edit-option">
			{this.renderStageLine()}
			<OptionButtons {...this.props}/>
		</div>)
	}
}
PersonOption.defaultProps = {
	type: "resume",
	status: 1
}

/* 按钮状态判断总组件 */
class OptionButtons extends Component {
	renderWhich() {
		let {
			actions,
			router,
			type,
			status,
			item,
			jurisdiction
		} = this.props
		let {isLock} = item
		let {isSame} = this.props
		if (type == "resume") {
			if (isSame && !jurisdiction) {
				return <OptionButtonsSame {...this.props}/>
			}
			return isLock == 1
				? <OptionButtonsLock {...this.props}/>
				: <OptionButtonsResume {...this.props}/>
		}
		if (type == "elite") {
			return (<div className="elite-head">
				{
					isLock == 1
						? <h2>该候选人已被锁定</h2>
						: null
				}
				<dl>
					<dt>入库时间：</dt>
					<dd>{item.filingTime}</dd>
				</dl>
				<dl>
					<dt>操作者：</dt>
					<dd>{item.filingAcc}</dd>
				</dl>
				<dl>
					<dt>归档前阶段：</dt>
					<dd>{translateDic("resumestage", item.status)}</dd>
				</dl>
				<dl>
					<dt>归档原因：</dt>
					<dd>{item.filingReason}</dd>
				</dl>
				<dl>
					<dt>归档描述：</dt>
					<dd>{item.filingRemark}</dd>
				</dl>
				{
					isLock == 1
						? <OptionButtonsEliteLock isElite={true} {...this.props}/>
						: <OptionButtonsElite {...this.props}/>
				}
			</div>)
		}
		if (type == "allocat") {
			return <OptionButtonsAllocat {...this.props}/>
		}
		if (type == "credit") {
			return <OptionButtonsCredit {...this.props}/>
		}
	}
	render() {
		return this.renderWhich()
	}
}
/* 公用方法类 */
class OptionCommonFn extends Component {
	send2Other() {
		let {actions, router, item: {
			id
		}} = this.props
		actions.send2InterviewerAction(router, [id])
	}
	send2OtherJob() {
		let {actions, router, item: {
			id
		}} = this.props
		actions.recommend2OtherAction(router, [id])
	}
	handleFollow() {
		let {actions, router, item: {
			id
		}} = this.props
		actions.followAction(router, [id])
	}
	handleRemark() {
		let {actions, router, callback} = this.props
		callback()
	}
	addElite(libType) {
		let {actions, router, item: {
			id
		}} = this.props
		//console.log(libType)
		actions.joinAction(router, [id], libType)
	}
	addCredit() {
		let {actions, router, item: {
			id
		}} = this.props
		actions.creditAction(router, id)
	}
	entryNextStage(status) {
		let target = parseInt(status) + 1
		this.resumeUpgrading(target)
	}
	entry2Stage(item) {
		let {key} = item
		this.resumeUpgrading(key)
	}
	addLabel() {
		let {actions, router, item: {
			labels
		}} = this.props
		actions.addLabelAction(router, labels)
	}
	eliminate() {
		let {actions, item: {
			id
		}, router} = this.props
		actions.eliminateAction(router, [id])
	}
	entryJob() {
		let {actions, router, item: {
			id
		}} = this.props
		let params = {
			ids: [id]
		}
		actions.entryJobAction(params)
	}
	relateJob() {
		let {actions, router, item: {
			id
		}} = this.props
		actions.connectEliteAction(router, [id])
	}
	resumeUpgrading(target) {
		let {
			actions,
			router,
			item: {
				id,
				expectedEntryTime
			}
		} = this.props
		let data = {
			id: id
		}

		switch (parseInt(target)) {
		case 1:
			actions.entryInvite(data)
			break
		case 2:
			actions.feedAction(router)
			break
		case 3:
			actions.entryOffer(data)
			break
		case 4:
			expectedEntryTime
				? actions.entryWaiting(data)
				: actions.entryAction(router, id)
			break
		}
	}
}
/* 按钮状态简历组件 */
class OptionButtonsResume extends OptionCommonFn {

	renderButtons() {
		let {status} = this.props
		const menu = (<Menu className="ant-button-menu" onClick={this.entry2Stage.bind(this)}>
			<Menu.Item key="1">
				<Button disabled={status < 1
					? false
					: true} type="ghost">邀约</Button>
			</Menu.Item>
			<Menu.Item key="2">
				<Button disabled={status < 2
					? false
					: true} type="ghost">面试</Button>
			</Menu.Item>
			<Menu.Item key="3">
				<Button disabled={status < 3
					? false
					: true} type="ghost">offer</Button>
			</Menu.Item>
			<Menu.Item key="4">
				<Button disabled={status < 4
					? false
					: true} type="ghost">待入职</Button>
			</Menu.Item>
		</Menu>)
		return status == 4
			? <Button className="block" onClick={this.entryJob.bind(this)}>入职</Button>
			: <Dropdown.Button overlay={menu} className="block next-block" onClick={this.entryNextStage.bind(this, status)}>进入下一阶段</Dropdown.Button>
	}

	render() {
		let {
			item: {
				hrName,
				labelNames
			}
		} = this.props
		return (<ButtonGroup style={{
			padding: "20px"
		}}>
			{this.renderButtons()}
			<Button className="block" onClick={this.send2Other.bind(this)}>发送给面试官</Button>
			<Button className="block" confirm="是否批量淘汰" onClick={this.eliminate.bind(this)}>淘汰</Button>
			<Button className="block" onClick={this.send2OtherJob.bind(this)}>推荐到其他职位</Button>
			<Button className="half-block" onClick={this.handleFollow.bind(this)}>跟进提醒</Button>
			<Button className="half-block" onClick={this.handleRemark.bind(this)}>备注</Button>
			<Button className="half-block" onClick={this.addElite.bind(this, 1)}>放入人才库</Button>
			<Button className="half-block" onClick={this.addCredit.bind(this)}>放入诚信库</Button>

			<BaseInfoItem label="招聘负责人" info={hrName}/>
			<BaseInfoItem label="标签" info={<Button onClick = {
				this.addLabel.bind(this)
			} > <Icon type="plus"/></Button>}/>
			<div className="tags-box">
				{
					labelNames && labelNames.map(it => {
						return <Tag>{it}</Tag>
					})
				}
			</div>
		</ButtonGroup>)
	}
}
// 关联职位、跟进提醒、备注、放入诚信库、添加标签；
/* 人才库 */
class OptionButtonsElite extends OptionCommonFn {
	render() {
		let {
			item: {
				hrName,
				labelNames
			}
		} = this.props
		return (<ButtonGroup>
			<Button className="block" onClick={this.relateJob.bind(this)}>关联职位</Button>
			<Button className="block" onClick={this.handleFollow.bind(this)}>跟进提醒</Button>
			<Button className="half-block" onClick={this.handleRemark.bind(this)}>备注</Button>
			<Button className="half-block" onClick={this.addCredit.bind(this)}>放入诚信库</Button>
			<BaseInfoItem label="标签" info={<Button onClick = {
				this.addLabel.bind(this)
			} > <Icon type="plus"/></Button>}/>
			<div className="tags-box">
				{
					labelNames && labelNames.map(it => {
						return <Tag>{it}</Tag>
					})
				}
			</div>
		</ButtonGroup>)
	}
}
class OptionButtonsEliteLock extends OptionCommonFn {
	render() {
		let {
			item: {
				hrName,
				labelNames
			}
		} = this.props
		return (<ButtonGroup>
			<Button className="block" onClick={this.relateJob.bind(this)}>关联职位</Button>
			<Button className="block" onClick={this.handleFollow.bind(this)}>跟进提醒</Button>
			<Button className="block" onClick={this.handleRemark.bind(this)}>备注</Button>
			<BaseInfoItem label="标签" info={<Button onClick = {
				this.addLabel.bind(this)
			} > <Icon type="plus"/></Button>}/>
			<div className="tags-box">
				{
					labelNames && labelNames.map(it => {
						return <Tag>{it}</Tag>
					})
				}
			</div>
		</ButtonGroup>)
	}
}
/* 诚信库 */
class OptionButtonsCredit extends OptionCommonFn {
	render() {
		return (<ButtonGroup>
			<Button className="block" onClick={this.addElite.bind(this, 4)}>加入人才库</Button>
		</ButtonGroup>)
	}
}

// 淘汰、放入人才库、备注、添加标签；
// 锁定信息：锁定职位、招聘负责人、锁定时间、解锁提醒；
// 人才库锁定状态没有放入人才库和解锁提醒

/* 锁定* */
class OptionButtonsLock extends OptionCommonFn {
	handelChange(checked) {
		/* 解锁提醒函数 */
	}
	renderSwitch() {
		let {item: {
			lockInfo
		}, isElite} = this.props
		if (!isElite && lockInfo) {
			return <BaseInfoItem label="解锁提醒" info={<Switch checkedChildren = "已开启" unCheckedChildren = "已关闭" defaultChecked = {
				lockInfo.isRemind == 1
			}
			onChange = {
				this.handelChange.bind(this)
			} />
			}/>
		}
	}
	render() {
		let {
			item: {
				hrName,
				labelNames,
				lockInfo
			}
		} = this.props
		let {isElite} = this.props
		let lockShow = lockInfo
			? lockInfo
			: {}
		return (<ButtonGroup className="lockedInfo">
			<BaseInfoItem label="锁定职位" info={lockShow.lockJobTitle}/>
			<BaseInfoItem label="招聘负责人" info={lockShow.lockJobHr}/>
			<BaseInfoItem label="锁定时间" info={lockShow.inputTime}/> {this.renderSwitch()}
			<Button className="block" confirm="是否批量淘汰" onClick={this.eliminate.bind(this)}>淘汰</Button>
			{
				isElite
					? null
					: <Button className="block" onClick={this.addElite.bind(this, 1)}>放入人才库</Button>
			}
			<Button className="half-block" onClick={this.handleRemark.bind(this)}>备注</Button>
			<Button className="half-block" onClick={this.send2OtherJob.bind(this)}>推荐到其他职位</Button>

			<BaseInfoItem label="标签" info={<Button onClick = {
				this.addLabel.bind(this)
			} > <Icon type="plus"/></Button>}/>
			<div className="tags-box">
				{
					labelNames && labelNames.map(it => {
						return <Tag>{it}</Tag>
					})
				}
			</div>
		</ButtonGroup>)
	}
}
OptionButtonsLock.defaultProps = {
	isElite: false
}

//分配职位、放入人才库、备注、添加标签；
/* 待分配简历 */
class OptionButtonsAllocat extends OptionCommonFn {
	distrbuted() {
		let {actions, router, item: {
			id
		}} = this.props
		actions.distributionAction(router, [id], "single")
	}
	render() {
		let {
			item: {
				hrName,
				labelNames
			}
		} = this.props
		//console.log(this.props)
		return (<ButtonGroup>
			<Button className="block" onClick={this.distrbuted.bind(this)}>分配职位</Button>
			<Button className="half-block" onClick={this.addElite.bind(this, 1)}>放入人才库</Button>
			<Button className="half-block" onClick={this.handleRemark.bind(this)}>备注</Button>

			<BaseInfoItem label="标签" info={<Button onClick = {
				this.addLabel.bind(this)
			} > <Icon type="plus"/></Button>}/>
			<div className="tags-box">
				{
					labelNames && labelNames.map(it => {
						return <Tag>{it}</Tag>
					})
				}
			</div>
		</ButtonGroup>)
	}
}
//备注、添加标签、、招聘负责人
/* 疑似简历无权限 */
class OptionButtonsSame extends OptionCommonFn {
	render() {
		let {
			item: {
				hrName,
				labelNames
			}
		} = this.props
		return (<ButtonGroup>
			<Button className="block" onClick={this.handleRemark.bind(this)}>备注</Button>
			<BaseInfoItem label="招聘负责人" info={hrName}/>

			<BaseInfoItem label="标签" info={<Button onClick = {
				this.addLabel.bind(this)
			} > <Icon type="plus"/></Button>}/>
			<div className="tags-box">
				{
					labelNames && labelNames.map(it => {
						return <Tag>{it}</Tag>
					})
				}
			</div>
		</ButtonGroup>)
	}
}

/* ItemChange */
class ItemChangeCommon extends Component {
	handleEdit() {
		this.setState({editFlag: true})
	}
	handleCancelEdit() {
		this.setState({editFlag: false})
	}
	renderWhich() {
		let {editFlag} = this.state
		return editFlag
			? this.renderEdit()
			: this.renderShow()
	}
	render() {
		let {item} = this.props
		return this.renderWhich()
	}
}
/* tabs组件开始 */
export class PersonTabBaseInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			infoEdit: false,
			objEdit: false,
			jobEdit: false,
			proEdit: false,
			eduEdit: false,
			lanEdit: false,
			credEdit: false,
			trainEdit: false,
			showType: 1
		}
		/* showtype 1 标准  2 原始 3 编辑 */
	}
	componentDidMount() {
		let {actions, id} = this.props
		//id = "04e7fc53e9b6469ab527168d0346f51b"
		actions.personBaseAction({id: id})
	}
	changeFlag(type, value) {
		let states = Object.assign({}, this.state, {
			infoEdit: false,
			objEdit: false,
			jobEdit: false,
			proEdit: false,
			eduEdit: false,
			lanEdit: false,
			credEdit: false,
			trainEdit: false
		}, {[type]: value})
		this.setState({
			...states
		})
	}
	renderOrigin() {
		let {showType} = this.state
		this.setState({
			showType: showType == 1
				? 2
				: 1
		})
	}
	renderToolbar() {
		let {showType} = this.state
		return showType == 1
			? <div className="resume-toolbar">
				<Button type="default" htmlType="button" onClick={this.renderOrigin.bind(this)}>原始简历
					<Icon type="right"/></Button>
				<ButtonGroup style={{
					float: "right"
				}}>
					<Button type="default" htmlType="button" icon="printer" onClick={() => window.print()}></Button>
				</ButtonGroup>
			</div>
			: <div className="resume-toolbar">
				<Button type="default" htmlType="button" onClick={this.renderOrigin.bind(this)}>标准简历
					<Icon type="right"/></Button>
			</div>
	}
	render() {
		let {info, actions} = this.props
		let {
			resumeInfo,
			objectives,
			jobs,
			projects,
			educations,
			languages,
			credentials,
			trainings
		} = info
		let {sourceUrl, channelResumeId} = resumeInfo
		let {
			showType,
			infoEdit,
			objEdit,
			jobEdit,
			proEdit,
			eduEdit,
			lanEdit,
			credEdit,
			trainEdit
		} = this.state
		if (showType == 1) {
			return (<div className="personBaseInfoPanel">
				{this.renderToolbar()}
				{/* 基本信息判断是否编辑状态 */}
				{
					infoEdit
						? <PersonBaseInfoEditHead actions={actions} info={resumeInfo} editChangeFn={this.changeFlag.bind(this, "infoEdit", false)}/>
						: <PersonBaseInfoShowHead info={resumeInfo} editChangeFn={this.changeFlag.bind(this, "infoEdit", true)}/>
				}

				{/* <PersonSalaryShow /> */}
				{/* 求职意向判断是否编辑状态 */}
				<div className="otherInfo">
					{
						objEdit
							? <PersonObjectiveEdit actions={actions} info={objectives} channelResumeId={channelResumeId} editChangeFn={this.changeFlag.bind(this, "objEdit", false)}/>
							: <PersonObjectiveShow info={objectives} editChangeFn={this.changeFlag.bind(this, "objEdit", true)}/>
					}
					<PersonJobsProShow info={jobs} type="job" channelResumeId={channelResumeId} actions={actions}/>
					<PersonJobsProShow info={projects} type="pro" channelResumeId={channelResumeId} actions={actions}/>
					<PersonEducationShow info={educations} channelResumeId={channelResumeId} actions={actions}/>
					<PersonLanguageShow info={languages} channelResumeId={channelResumeId} actions={actions}/>
					<PersonCredentialShow info={credentials} channelResumeId={channelResumeId} actions={actions}/>
					<PersonTraningShow info={trainings} channelResumeId={channelResumeId} actions={actions}/>
				</div>
			</div>)
		} else if (showType == 2) { //原始简历
			return (<div className="personBaseInfoPanel">
				{this.renderToolbar()}
				<div>{sourceUrl}</div>
			</div>)
		} else if (showType == 3) {
			return null
		}

	}
}
/* 标准简历头部展示* */
class PersonBaseInfoShowHead extends Component {
	renderPersonBase() {
		let {info} = this.props
		let age = info.age
			? info.age + "岁"
			: ""
		let sex = translateDic("sex", info.sex)
		let workYear = info.workYear
			? info.workYear + "年工作经验"
			: ""
		let edu = translateDic("education", info.degree)
		let marry = translateDic("maritalstatus", info.maritalStatus)
		let polit = translateDic("political", info.politicsStatus)

		return filterArray([
			sex,
			age,
			marry,
			polit,
			workYear,
			edu,
			info.currentAddress
		]).join(" · ")

	}
	render() {
		let {info} = this.props
		return (<div className="personinfo-detailHead">
			<Button className="part-editBtn" onClick={this.props.editChangeFn}>编辑</Button>
			<img src={info.photoUrl} className="person-headicon"/>
			<div className="personinfo-headInfo">
				<h2>{info.name}</h2>
				<div className="contactInfo">
					{
						info.mobilephone
							? (<span><Icon type="phone"/>{info.mobilephone}</span>)
							: null
					}
					{
						info.email
							? (<span><Icon type="mail"/>{info.email}</span>)
							: null
					}
				</div>
				<div>
					{this.renderPersonBase()}
				</div>
			</div>
		</div>)
	}
}
/* 标准简历头部编辑 */
class PersonBaseInfoEditHead extends FormPage {

	saveInfo() {
		let {actions, editChangeFn} = this.props
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			//console.log(values)
			actions.savePersonBaseAction(values).then(() => {
				editChangeFn()
			})
		})
	}
	responseType(res) {
		return res.fileUrl
	}
	onSuccess(info, that) {
		that.setState({imgUrl: info.file.response.fileUrl})
	}
	renderSelectOption(data, idx) {
		return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
	}
	render() {
		let {info} = this.props
		console.log(moment(info.birthYear), moment(info.startWorkingYear))
		return (<BaseForm ref={this.saveFormRef} className="baseInfo-edit">
			<FormItem>
				<Input type="hidden" name="channelResumeId" defaultValue={info.channelResumeId}/>
			</FormItem>
			<Row gutter={12}>
				<FormItemWrapparCol span={6}>
					<ImgUpload label="照片" type={2} name="photoUrl" imgUrl={info.photoUrl} onResponse={this.responseType} onSuccess={this.onSuccess}></ImgUpload>
				</FormItemWrapparCol>
				<Col span={18}>
					<FormItemWrapparCol span={12}>
						<Input label="姓名" name='name' defaultValue={info.name} rules={[
							{
								required: true,
								message: "姓名不可为空"
							}, {
								validator: customRules.required
							}
						]}/>
					</FormItemWrapparCol>

					<FormItemWrapparCol span={12}>
						<Select label="性别" name="sex" defaultValue={toStrings(info.sex)} fetch={DictUtils.getDictByType("sex")} renderItem={this.renderSelectOption} rules={[
							{
								required: true,
								message: "性别不可为空"
							}, {
								validator: customRules.required
							}
						]}/>
					</FormItemWrapparCol>

					<FormItemWrapparCol span={12}>
						<Input label="户口" name='residenceAddress' defaultValue={info.residenceAddress} rules={[
							{
								required: true,
								message: "户口不可为空"
							}, {
								validator: customRules.required
							}
						]}/>
					</FormItemWrapparCol>

					<FormItemWrapparCol span={12}>
						<Input label="现居住地" name='currentAddress' defaultValue={info.currentAddress} rules={[
							{
								required: true,
								message: "现居住地不可为空"
							}, {
								validator: customRules.required
							}
						]}/>
					</FormItemWrapparCol>

					<FormItemWrapparCol span={12}>
						<Select label="婚姻状况" name="maritalStatus" defaultValue={toStrings(info.maritalStatus)} fetch={DictUtils.getDictByType("maritalstatus")} renderItem={this.renderSelectOption}/>
					</FormItemWrapparCol>

					<FormItemWrapparCol span={12}>
						<MonthPicker label="出生年份" name='birthYear' defaultValue={moment(toStrings(info.birthYear))} format="YYYY" rules={[
							{
								required: true,
								message: "出生日期不可为空"
							}, {
								validator: customRules.required
							}
						]}/>
					</FormItemWrapparCol>

					<FormItemWrapparCol span={12}>
						<Select label="政治面貌" name="politicsStatus" defaultValue={toStrings(info.politicsStatus)} fetch={DictUtils.getDictByType("political")} renderItem={this.renderSelectOption}/>
					</FormItemWrapparCol>

					<FormItemWrapparCol span={12}>
						<Input label="手机号码" name='mobilephone' defaultValue={info.mobilephone} rules={[
							{
								required: true,
								message: "手机号码不可为空"
							}, {
								validator: customRules.checkMobile
							}, {
								validator: customRules.required
							}
						]}/>
					</FormItemWrapparCol>

					<FormItemWrapparCol span={12}>
						<Input label="邮箱号码" name='email' defaultValue={info.email} rules={[{
							type: "email",
							message: "邮箱格式不正确"
						}
						]}/>
					</FormItemWrapparCol>

					<FormItemWrapparCol span={12}>
						<MonthPicker label="参加工作年份" name='startWorkingYear' defaultValue={moment(toStrings(info.startWorkingYear))} format="YYYY"/>
					</FormItemWrapparCol>
				</Col>

				<Button.Group>
					<Button onClick={this.props.editChangeFn}>取消</Button>
					<Button type="primary" onClick={this.saveInfo.bind(this)}>保存</Button>
				</Button.Group>
			</Row>

		</BaseForm>)
	}
}
/* 目前收入组件 */
class PersonSalaryShow extends Component {
	render() {
		return (<div></div>)
	}
}
/* 求职意向组件 */
class PersonObjectiveShow extends Component {
	renderArrayInfo(array, code) {
		return array && array.map((it, idx) => {
			return code
				? translateDic(code, it)
				: it
		}).join("，")
	}
	renderArrayData(array) {
		return array && array.join("，")
	}
	translateSalary(lower, upper) {
		return lower && upper
			? `${lower} - ${upper}`
			: "面议"
	}
	render() {
		let {info} = this.props
		return (<div className="objective-info">
			<Button className="part-editBtn" onClick={this.props.editChangeFn}>编辑</Button>
			<h3>求职意向</h3>
			<BaseInfoItem label="期望薪资" info={this.translateSalary(info.expectedSalaryLower, info.expectedSalaryUpper)}/>
			<BaseInfoItem label="工作地点" info={info.expectedAddress}/>
			<BaseInfoItem label="职位" info={info.expectedJobTitle}/>
			<BaseInfoItem label="行业" info={this.renderArrayInfo(info.trade, "industry")}/>
			<BaseInfoItem label="到岗时间" info={translateDic("comedate", info.dutyTime)}/>
			<BaseInfoItem label="工作类型" info={this.renderArrayInfo(info.jobNature, "workproperty")}/>
		</div>)
	}
}
/* 求职意向编辑 */
class PersonObjectiveEdit extends FormPage {
	renderSelectOption(data, idx) {
		return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
	}
	saveInfo() {
		let {actions} = this.props
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			//console.log(values)
			actions.savePersonObjAction(values).then(() => {
				this.props.editChangeFn()
			})
		})
	}
	jobTitleTrans(jobArr) {
		return jobArr.join(",")
	}
	toStrings(str) {
		return str + ""
	}
	render() {
		let {info} = this.props
		return (<BaseForm ref={this.saveFormRef} className="baseInfo-edit">
			<FormItem>
				<Input type="hidden" name="channelResumeId" defaultValue={this.props.channelResumeId}/>
			</FormItem>
			<Row>
				<FormItemWrapparCol span={12}>
					<Input label="职位" name='expectedJobTitle' disabled="disabled" defaultValue={this.jobTitleTrans(info.expectedJobTitle)} rules={[
						{
							required: true,
							message: "职位不可为空"
						}, {
							validator: customRules.required
						}
					]} placeholder="可输入多项，中间用英文逗号“,”分隔"/>
				</FormItemWrapparCol>

				<FormItemWrapparCol span={12}>
					<Select label="行业" name="trade" defaultValue={arrayToString(info.trade)} fetch={DictUtils.getDictByType("industry")} mode="multiple" renderItem={this.renderSelectOption} rules={[
						{
							required: true,
							message: "行业不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>

				<FormItemWrapparCol span={12}>
					<InputStrGroup label="期望薪资" name="expectedSalary" defaultValue={[info.expectedSalaryLower, info.expectedSalaryUpper]} rules={[
						{
							validator: customRules.required
						}, {
							required: true
						}, {
							validator: customRules.integer
						}
					]}/>
				</FormItemWrapparCol>

				<FormItemWrapparCol span={12}>
					<Input label="工作地点" name='expectedAddress' disabled="disabled" defaultValue={info.expectedAddress} rules={[
						{
							required: true,
							message: "期望地点不可为空"
						}, {
							validator: customRules.required
						}
					]} placeholder="可输入多项，中间用英文逗号“,”分隔"/>
				</FormItemWrapparCol>

				<FormItemWrapparCol span={12}>
					<Select label="到岗时间" name="dutyTime" defaultValue={info.dutyTime} fetch={DictUtils.getDictByType("comedate")} renderItem={this.renderSelectOption}/>
				</FormItemWrapparCol>

				<FormItemWrapparCol span={12}>
					<Select label="工作类型" name="jobNature" defaultValue={arrayToString(info.jobNature)} mode="multiple" fetch={DictUtils.getDictByType("workproperty")} renderItem={this.renderSelectOption}/>
				</FormItemWrapparCol>

				{/*<FormItemWrapparCol span={12}>
            <Select label="求职状态" name="workStatus" defaultValue={toStrings(info.workStatus)} fetch={DictUtils.getDictByType("jobstatus")} renderItem={this.renderSelectOption}/>
          </FormItemWrapparCol>*/
				}

				{/*<FormItemWrapparCol span={12}>
            <Input label="个人标签"  name='individualLabel' placeholder="可输入多项，中间用英文逗号“,”分隔"/>
          </FormItemWrapparCol>*/
				}

				{/*<FormItemWrapparCol span={24}>
            <TextArea autosize={{minRows:4}} label="自我评价"  name='selfEvaluation' defaultValue={info.selfEvaluation}/>
          </FormItemWrapparCol>*/
				}

				<Button.Group>
					<Button onClick={this.props.editChangeFn}>取消</Button>
					<Button type="primary" onClick={this.saveInfo.bind(this)}>保存</Button>
				</Button.Group>
			</Row>
		</BaseForm>)
	}
}
/* 工作经验 & 项目经验 组件 */
class PersonJobsProShow extends Component {
	state = {
		add: false
	}
	handleAdd() {
		this.setState({add: true})
	}
	handleCancle() {
		//console.log(111)
		this.setState({add: false})
	}
	renderAddForm() {
		let {add} = this.state
		let {type, channelResumeId, actions} = this.props
		if (add && type == "job") {
			return <PersonJobEditItem item={{}} channelResumeId={channelResumeId} actions={actions} editChangeFn={this.handleCancle.bind(this)}/>
		}
		if (add && type == "pro") {
			return <PersonProjectEditItem item={{}} channelResumeId={channelResumeId} actions={actions} editChangeFn={this.handleCancle.bind(this)}/>
		}
	}
	render() {
		let {info, type, channelResumeId, actions} = this.props
		return (<div>
			<h3>{
				type == "job"
					? "工作经验"
					: "项目经验"
			}<Button className="add-title" onClick={this.handleAdd.bind(this)}>新增</Button>
			</h3>
			{/* content */}
			{
				info.map((it, idx) => {
					return type == "job"
						? <PersonJobsItem item={it} channelResumeId={channelResumeId} actions={actions}/>
						: <PersonProjectsItem item={it} channelResumeId={channelResumeId} actions={actions}/>
				})
			}
			{/* addbox */}
			{this.renderAddForm()}
		</div>)
	}
}
/* 工作经验item组件 */
class PersonJobsItem extends ItemChangeCommon {

	state = {
		editFlag: false
	}
	renderJobsBaseInfo() {
		let {item} = this.props
		let companyScale = translateDic("scale", item.companyScale)
		let companyNature = translateDic("industry", item.companyNature)
		let jobNature = translateDic("workproperty", item.jobNature)
		return filterArray([companyScale, companyNature, jobNature, item.subordinates, item.boss]).join(" · ")
	}
	renderShow() {
		let {item} = this.props
		return (<div>
			<h4>
				<span>{`${translateTime(item.duringStart)}-${translateTime(item.duringEnd)}`}</span>
				<span>{item.company}</span>
				<span>{item.jobTitle}</span>

				<Button className="item-edit-btn" onClick={this.handleEdit.bind(this)}>编辑</Button>
			</h4>
			{this.renderJobsBaseInfo()}
			<BaseInfoItem label="工作内容" info={item.jobContent}/>
			<BaseInfoItem label="主要成就" info={item.achievements}/>
		</div>)
	}
	renderEdit() {
		return <PersonJobEditItem {...this.props} editChangeFn={this.handleCancelEdit.bind(this)}/>
	}
}
/* 工作经验编辑item组件 */
class PersonJobEditItem extends FormPage {
	saveInfo() {
		let {actions} = this.props
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			actions.savePersonJobAction(values).then(() => {
				this.props.editChangeFn()
			})
		})
	}
	renderSelectOption(data, idx) {
		return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
	}
	render() {
		let {item} = this.props
		//console.log(this.props)
		return (<BaseForm ref={this.saveFormRef}>
			<FormItem>
				<Input type="hidden" name="channelResumeId" defaultValue={this.props.channelResumeId}/>
			</FormItem>
			<FormItem>
				<Input type="hidden" name="id" defaultValue={item.id}/>
			</FormItem>
			<FormItemWrapparCol span={12}>
				<CalendarPicker label="时间" name='duringDates' defaultValue={[
					translateTimeToMoment(item.duringStart),
					translateTimeToMoment(item.duringEnd)
				]} rules={[
					{
						required: true,
						message: "时间不可为空"
					}, {
						validator: customRules.required
					}
				]}/>
			</FormItemWrapparCol>
			<FormItemWrapparCol span={12}>
				<Input label="公司名称" name='company' defaultValue={item.company} rules={[
					{
						required: true,
						message: "公司名称不可为空"
					}, {
						validator: customRules.required
					}
				]}/>
			</FormItemWrapparCol>
			<FormItemWrapparCol span={12}>
				<Input label="职位名称" name='jobTitle' defaultValue={item.jobTitle} rules={[
					{
						required: true,
						message: "职位名称不可为空"
					}, {
						validator: customRules.required
					}
				]}/>
			</FormItemWrapparCol>
			{/*<FormItemWrapparCol span={12}>
          <Select label="行业" name="trade" defaultValue={toStrings(item.trade)} fetch={DictUtils.getDictByType("industry")} renderItem={this.renderSelectOption}/>
        </FormItemWrapparCol>
        <FormItemWrapparCol span={12}>
            <Input label="部门"  name='department' defaultValue={item.department}/>
          </FormItemWrapparCol>
          <FormItemWrapparCol span={12}>
            <Select label="公司规模" name="companyScale" defaultValue={item.companyScale} fetch={DictUtils.getDictByType("scale")} renderItem={this.renderSelectOption}/>
          </FormItemWrapparCol>
          <FormItemWrapparCol span={12}>
            <Select label="公司性质" name="companyNature" defaultValue={item.companyNature} fetch={DictUtils.getDictByType("companyproperty")} renderItem={this.renderSelectOption}/>
          </FormItemWrapparCol>
          <FormItemWrapparCol span={12}>
            <Input label="离职原因"  name='reasonsForLeaving' defaultValue={item.reasonsForLeaving}/>
          </FormItemWrapparCol>
          <FormItemWrapparCol span={12}>
            <Input label="汇报对象"  name='boss' defaultValue={item.boss}/>
          </FormItemWrapparCol>
          <FormItemWrapparCol span={12}>
            <Input label="下属人数"  name='subordinates' defaultValue={item.subordinates}/>
          </FormItemWrapparCol>
          <FormItemWrapparCol span={12}>
            <Select label="工作性质" name="jobNature" defaultValue={toStrings(item.jobNature)} fetch={DictUtils.getDictByType("workproperty")} renderItem={this.renderSelectOption}/>
          </FormItemWrapparCol>*/
			}
			<FormItemWrapparCol span={12}>
				<Input label="主要成就" name='achievements' defaultValue={item.achievements}/>
			</FormItemWrapparCol>
			<FormItemWrapparCol span={24}>
				<TextArea autosize={{
					minRows: 4
				}} label="工作内容" name='jobContent' defaultValue={item.jobContent} rules={[
					{
						required: true,
						message: "工作内容不可为空"
					}, {
						validator: customRules.required
					}
				]}/>
			</FormItemWrapparCol>

			<Button.Group>
				<Button onClick={this.props.editChangeFn}>取消</Button>
				<Button type="primary" onClick={this.saveInfo.bind(this)}>保存</Button>
			</Button.Group>
		</BaseForm>)
	}
}
/* 项目经验组件 item组件 */
class PersonProjectsItem extends ItemChangeCommon {
	state = {
		editFlag: false
	}
	renderShow() {
		let {item} = this.props
		return (<div>
			<h4>
				<span>{`${translateTime(item.duringStart)}-${translateTime(item.duringEnd)}`}</span>
				<span>{item.company}</span>
				<span>{item.title}</span>

				<Button className="item-edit-btn" onClick={this.handleEdit.bind(this)}>编辑</Button>
			</h4>
			<BaseInfoItem label="项目描述" info={item.description}/>
			<BaseInfoItem label="主要负责" info={item.duty}/>
		</div>)
	}
	renderEdit() {
		return <PersonProjectEditItem {...this.props} editChangeFn={this.handleCancelEdit.bind(this)}/>
	}
}
/* 项目经验编辑item组件 */
class PersonProjectEditItem extends FormPage {
	saveInfo() {
		let {actions} = this.props
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			actions.savePersonProAction(values).then(() => {
				this.props.editChangeFn()
			})
		})
	}
	renderSelectOption(data, idx) {
		return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
	}
	render() {
		let {item} = this.props
		//console.log(this.props)
		return (<BaseForm ref={this.saveFormRef}>
			<Row>
				<FormItem>
					<Input type="hidden" name="channelResumeId" defaultValue={this.props.channelResumeId}/>
				</FormItem>
				<FormItem>
					<Input type="hidden" name="id" defaultValue={item.id}/>
				</FormItem>
				<FormItemWrapparCol span={12}>
					<CalendarPicker label="时间" name='duringDates' defaultValue={[
						translateTimeToMoment(item.duringStart),
						translateTimeToMoment(item.duringEnd)
					]} rules={[
						{
							required: true,
							message: "时间不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Input label="项目名称" name='title' defaultValue={item.title} rules={[
						{
							required: true,
							message: "项目名称不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Input label="所属公司" name='company' defaultValue={item.company} rules={[
						{
							required: true,
							message: "所属公司不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={24}>
					<TextArea autosize={{
						minRows: 4
					}} label="项目描述" name='description' defaultValue={item.description} rules={[
						{
							required: true,
							message: "项目描述不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={24}>
					<TextArea autosize={{
						minRows: 4
					}} label="责任描述" name='duty' defaultValue={item.duty}/>
				</FormItemWrapparCol>

				<Button.Group>
					<Button onClick={this.props.editChangeFn}>取消</Button>
					<Button type="primary" onClick={this.saveInfo.bind(this)}>保存</Button>
				</Button.Group>
			</Row>
		</BaseForm>)
	}
}
/* 教育经历组件 */
class PersonEducationShow extends Component {
	state = {
		add: false
	}
	handleAdd() {
		this.setState({add: true})
	}
	handleCancle() {
		this.setState({add: false})
	}
	render() {
		let {info, channelResumeId, actions} = this.props
		return (<div>
			<h3>教育经历<Button className="add-title" onClick={this.handleAdd.bind(this)}>新增</Button>
			</h3>
			{
				info.map((it, idx) => {
					return <PersonEducationItem {...this.props} item={it} actions={actions} channelResumeId={channelResumeId}/>
				})
			}

			{
				this.state.add
					? <PersonEducationEditItem actions={actions} channelResumeId={channelResumeId} editChangeFn={this.handleCancle.bind(this)}/>
					: null
			}
		</div>)
	}
}
/* 教育经历item组件 */
class PersonEducationItem extends ItemChangeCommon {
	state = {
		editFlag: false
	}
	renderEduInfo() {
		let {item} = this.props
		let education = translateDic("education", item.degree)

		return filterArray([education, item.major]).join(" | ")
	}
	renderShow() {
		let {item} = this.props
		//console.log(item)
		return (<div>
			<h4>
				<span>{`${translateTime(item.duringStart)}-${translateTime(item.duringEnd)}`}</span>
				<span>{item.school}</span>

				<Button className="item-edit-btn" onClick={this.handleEdit.bind(this)}>编辑</Button>
			</h4>
			{this.renderEduInfo()}
		</div>)
	}
	renderEdit() {
		return <PersonEducationEditItem {...this.props} editChangeFn={this.handleCancelEdit.bind(this)}/>
	}
}
/* 教育经历编辑item组件 */
class PersonEducationEditItem extends FormPage {
	saveInfo() {
		let {actions} = this.props
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			actions.savePersonEduAction(values).then(() => {
				this.props.editChangeFn()
			})
		})
	}
	renderSelectOption(data, idx) {
		return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
	}
	render() {
		let {item} = this.props
		//console.log(this.props)
		return (<BaseForm ref={this.saveFormRef}>
			<Row>
				<FormItem>
					<Input type="hidden" name="channelResumeId" defaultValue={this.props.channelResumeId}/>
				</FormItem>
				<FormItem>
					<Input type="hidden" name="id" defaultValue={item.id}/>
				</FormItem>
				<FormItemWrapparCol span={12}>
					<CalendarPicker label="时间" name='duringDates' defaultValue={[
						translateTimeToMoment(item.duringStart),
						translateTimeToMoment(item.duringEnd)
					]} rules={[
						{
							required: true,
							message: "时间不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Input label="学校名称" name='school' defaultValue={item.school} rules={[
						{
							required: true,
							message: "学校名称不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Input label="专业名称" name='major' defaultValue={item.major} rules={[
						{
							required: true,
							message: "专业名称不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Select label="学历/学位" name="degree" defaultValue={toStrings(item.degree)} fetch={DictUtils.getDictByType("education")} renderItem={this.renderSelectOption} rules={[
						{
							required: true,
							message: "学历/学位不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>

				<Button.Group>
					<Button onClick={this.props.editChangeFn}>取消</Button>
					<Button type="primary" onClick={this.saveInfo.bind(this)}>保存</Button>
				</Button.Group>
			</Row>
		</BaseForm>)
	}
}
PersonEducationEditItem.defaultProps = {
	item: {}
}
/* 技能语言组件 */
class PersonLanguageShow extends Component {
	state = {
		add: false
	}
	handleAdd() {
		this.setState({add: true})
	}
	handleCancle() {
		this.setState({add: false})
	}
	render() {
		let {info, channelResumeId, actions} = this.props
		return (<div>
			<h3>技能/语言<Button className="add-title" onClick={this.handleAdd.bind(this)}>新增</Button>
			</h3>
			{
				info.map((it, idx) => {
					return <PersonLanguageItem item={it} channelResumeId={channelResumeId} actions={actions}/>
				})
			}

			{
				this.state.add
					? <PersonLanguageEditItem channelResumeId={channelResumeId} actions={actions} editChangeFn={this.handleCancle.bind(this)}/>
					: null
			}
		</div>)
	}
}
/* 技能语言item组件 */
class PersonLanguageItem extends ItemChangeCommon {
	state = {
		editFlag: false
	}
	renderSkill() {
		let {item} = this.props
		return (<div>
			<h4>
				<span>{item.skill}</span>
				<span>{translateDic("degree", item.level)}</span>

				<Button className="item-edit-btn" onClick={this.handleEdit.bind(this)}>编辑</Button>
			</h4>
		</div>)
	}
	renderLanguage() {
		let {item} = this.props
		let write = item.writing
			? translateDic("degree", item.writing)
			: ""
		let speak = item.speaking
			? translateDic("degree", item.speaking)
			: ""

		return (<div>
			<h4>
				<span>{item.language}</span>

				<Button className="item-edit-btn" onClick={this.handleEdit.bind(this)}>编辑</Button>
			</h4>
			{filterArray([write, speak]).join(" | ")}
		</div>)
	}
	renderShow() {
		let {item} = this.props
		return item.skill
			? this.renderSkill()
			: this.renderLanguage()
	}
	renderEdit() {
		return <PersonLanguageEditItem {...this.props} editChangeFn={this.handleCancelEdit.bind(this)}/>
	}
}
/* 技能语言编辑item组件 */
class PersonLanguageEditItem extends FormPage {
	saveInfo() {
		let {actions} = this.props
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			actions.savePersonLanAction(values).then(() => {
				this.props.editChangeFn()
			})
		})
	}
	renderSelectOption(data, idx) {
		return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
	}
	render() {
		let {item} = this.props
		//console.log(this.props)
		return (<BaseForm ref={this.saveFormRef}>
			<Row>
				<FormItem>
					<Input type="hidden" name="channelResumeId" defaultValue={this.props.channelResumeId}/>
				</FormItem>
				<FormItem>
					<Input type="hidden" name="id" defaultValue={item.id}/>
				</FormItem>
				{/*  <FormItemWrapparCol span={12}>
            <CalendarPicker label="时间"  name='duringDates' defaultValue={[translateTimeToMoment(),translateTimeToMoment()]} rules={[{required: true, message: "时间不可为空"},{validator:customRules.required}]}/>
          </FormItemWrapparCol>*/
				}
				<FormItemWrapparCol span={12}>
					<Input label="技能" name='skill' defaultValue={item.skill} rules={[
						{
							required: true,
							message: "技能不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Select label="掌握程度" name="level" defaultValue={toStrings(item.level)} fetch={DictUtils.getDictByType("degree")} renderItem={this.renderSelectOption} rules={[
						{
							required: true,
							message: "掌握程度不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Input label="语种" name='language' defaultValue={item.language}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Select label="读写能力" name="writing" defaultValue={toStrings(item.writing)} fetch={DictUtils.getDictByType("degree")} renderItem={this.renderSelectOption}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Select label="听说能力" name="speaking" defaultValue={toStrings(item.speaking)} fetch={DictUtils.getDictByType("degree")} renderItem={this.renderSelectOption}/>
				</FormItemWrapparCol>

				<Button.Group>
					<Button onClick={this.props.editChangeFn}>取消</Button>
					<Button type="primary" onClick={this.saveInfo.bind(this)}>保存</Button>
				</Button.Group>
			</Row>
		</BaseForm>)
	}
}
PersonLanguageEditItem.defaultProps = {
	item: {}
}
/* 证书 组件 */
class PersonCredentialShow extends Component {
	state = {
		add: false
	}
	handleAdd() {
		this.setState({add: true})
	}
	handleCancle() {
		this.setState({add: false})
	}
	render() {
		let {info, channelResumeId, actions} = this.props
		return (<div>
			<h3>证书<Button className="add-title" onClick={this.handleAdd.bind(this)}>新增</Button>
			</h3>
			{
				info.map((it, idx) => {
					return <PersonCredentialItem item={it} channelResumeId={channelResumeId} actions={actions}/>
				})
			}

			{
				this.state.add
					? <PersonCredentialEditItem channelResumeId={channelResumeId} actions={actions} editChangeFn={this.handleCancle.bind(this)}/>
					: null
			}
		</div>)
	}
}
/* 证书item组件 */
class PersonCredentialItem extends ItemChangeCommon {
	state = {
		editFlag: false
	}
	renderShow() {
		let {item} = this.props
		return (<div>
			<h4>
				<span>{translateTime(item.getDate)}</span>
				<span>{item.title}</span>
				<span>{item.score}</span>

				<Button className="item-edit-btn" onClick={this.handleEdit.bind(this)}>编辑</Button>
			</h4>
		</div>)
	}
	renderEdit() {
		return <PersonCredentialEditItem {...this.props} editChangeFn={this.handleCancelEdit.bind(this)}/>
	}
}
/* 证书编辑item组件 */
class PersonCredentialEditItem extends FormPage {
	saveInfo() {
		let {actions} = this.props
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			actions.savePersonCreAction(values).then(() => {
				this.props.editChangeFn()
			})
		})
	}
	render() {
		let {item} = this.props
		//console.log(this.props)
		return (<BaseForm ref={this.saveFormRef}>
			<Row>
				<FormItem>
					<Input type="hidden" name="channelResumeId" defaultValue={this.props.channelResumeId}/>
				</FormItem>
				<FormItem>
					<Input type="hidden" name="id" defaultValue={item.id}/>
				</FormItem>
				<FormItemWrapparCol span={12}>
					<DatePicker label="时间" name='getDate' defaultValue={translateTimeToMoment(item.getDate)} rules={[
						{
							required: true,
							message: "时间不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Input label="证书名称" name='title' defaultValue={item.title} rules={[
						{
							required: true,
							message: "证书名称不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Input label="成绩" name='score' defaultValue={item.score} rules={[
						{
							required: true,
							message: "成绩不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>

				<Button.Group>
					<Button onClick={this.props.editChangeFn}>取消</Button>
					<Button type="primary" onClick={this.saveInfo.bind(this)}>保存</Button>
				</Button.Group>
			</Row>
		</BaseForm>)
	}
}
PersonCredentialEditItem.defaultProps = {
	item: {}
}
/* 培训经历组件 */
class PersonTraningShow extends Component {
	state = {
		add: false
	}
	handleAdd() {
		this.setState({add: true})
	}
	handleCancle() {
		this.setState({add: false})
	}
	render() {
		let {info, channelResumeId, actions} = this.props
		return (<div>
			<h3>培训经历<Button className="add-title" onClick={this.handleAdd.bind(this)}>新增</Button>
			</h3>
			{
				info.map((it, idx) => {
					return <PersonTraningItem item={it} channelResumeId={channelResumeId} actions={actions}/>
				})
			}
			{
				this.state.add
					? <PersonTraningEditItem channelResumeId={channelResumeId} actions={actions} editChangeFn={this.handleCancle.bind(this)}/>
					: null
			}
		</div>)
	}
}
/* 培训经历item组件 */
class PersonTraningItem extends ItemChangeCommon {
	state = {
		editFlag: false
	}
	renderTraningInfo() {
		let {item} = this.props
		return filterArray([item.description, item.trainingAddress, item.certificate]).join(" | ")
	}
	renderShow() {
		let {item} = this.props
		return (<div>
			<h4>
				<span>{`${translateTime(item.duringStart)}-${translateTime(item.duringEnd)}`}</span>
				<span>{item.trainingAgency}</span>
				<span>{item.trainingCourse}</span>

				<Button className="item-edit-btn" onClick={this.handleEdit.bind(this)}>编辑</Button>
			</h4>
			{this.renderTraningInfo()}
		</div>)
	}
	renderEdit() {
		return <PersonTraningEditItem {...this.props} editChangeFn={this.handleCancelEdit.bind(this)}/>
	}
}
/* 培训经历编辑item组件 */
class PersonTraningEditItem extends FormPage {
	saveInfo() {
		let {actions} = this.props
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			actions.savePersonTraAction(values).then(() => {
				this.props.editChangeFn()
			})
		})
	}
	render() {
		let {item} = this.props
		return (<BaseForm ref={this.saveFormRef}>
			<Row>
				<FormItem>
					<Input type="hidden" name="channelResumeId" defaultValue={this.props.channelResumeId}/>
				</FormItem>
				<FormItem>
					<Input type="hidden" name="id" defaultValue={item.id}/>
				</FormItem>
				<FormItemWrapparCol span={12}>
					<CalendarPicker label="时间" name='duringDates' defaultValue={[
						translateTimeToMoment(item.duringStart),
						translateTimeToMoment(item.duringEnd)
					]} rules={[
						{
							required: true,
							message: "时间不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Input label="培训机构" name='trainingAgency' defaultValue={item.trainingAgency} rules={[
						{
							required: true,
							message: "培训机构不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				<FormItemWrapparCol span={12}>
					<Input label="培训课程" name='trainingCourse' defaultValue={item.trainingCourse} rules={[
						{
							required: true,
							message: "培训课程不可为空"
						}, {
							validator: customRules.required
						}
					]}/>
				</FormItemWrapparCol>
				{/*<FormItemWrapparCol span={12}>
            <Input label="获得证书"  name='certificate' defaultValue={item.certificate} rules={[{required: true, message: "获得证书不可为空"},{validator:customRules.required}]}/>
          </FormItemWrapparCol>
          <FormItemWrapparCol span={24}>
            <TextArea autosize={{minRows:4}} label="培训地点"  name='trainingAddress' defaultValue={item.trainingAddress} rules={[{required: true, message: "培训地点不可为空"},{validator:customRules.required}]}/>
          </FormItemWrapparCol>
          <FormItemWrapparCol span={24}>
            <TextArea autosize={{minRows:4}} label="详细描述"  name='description' defaultValue={item.description} rules={[{required: true, message: "详细描述不可为空"},{validator:customRules.required}]}/>
          </FormItemWrapparCol>*/
				}

				<Button.Group>
					<Button onClick={this.props.editChangeFn}>取消</Button>
					<Button type="primary" onClick={this.saveInfo.bind(this)}>保存</Button>
				</Button.Group>
			</Row>
		</BaseForm>)
	}
}
PersonTraningEditItem.defaultProps = {
	item: {}
}

/* offer */
export class PersonOffer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			edit: true
		}
	}
	componentWillMount() {
		let {info} = this.props
		//console.log(info)
		if (info) {
			this.setState({
				edit: info.offerId
					? false
					: true
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		if (JSON.stringify(nextProps.info) !== JSON.stringify(this.props.info)) {
			this.setState({
				edit: nextProps.info.offerId
					? false
					: true
			})
		}
	}
	componentDidMount() {
		let {actions, resumeId} = this.props
		actions.getOfferAction({resumeId: resumeId})
	}
	changeEdit() {
		let {edit} = this.state
		this.setState({
			edit: !edit
		})
	}
	renderWhich() {
		let {info, resumeId, actions, item} = this.props
		return this.state.edit
			? <PersonOfferEdit resumeId={resumeId} actions={actions} item={item} info={info} handleReset={this.changeEdit.bind(this)}/>
			: <PersonOfferShow info={info} handleEdit={this.changeEdit.bind(this)}/>
	}
	render() {
		let {status} = this.props
		return status != 3
			? <div className="list-no-data no-offer-record">暂无offer记录</div>
			: this.renderWhich()
	}
}
class PersonOfferShow extends Component {
	render() {
		let {info} = this.props
		return (<div>
			<BaseInfoItem label="offer" info='已发送'/>
			<BaseInfoItem label="预计入职日期" info={translateTime(info.expectedEntryTime, "YYYY-MM-DD")}/>
			<BaseInfoItem label="发件人" info={info.mailFrom}/>
			<BaseInfoItem label="收件人" info={info.mailTo}/>
			<BaseInfoItem label="邮件主题" info={info.mailSubject}/>
			<div>{info.mailContent}</div>
			<Button onClick={this.props.handleEdit} style={{
				float: "right"
			}}>再发一封</Button>
		</div>)
	}
}
class PersonOfferEdit extends FormPage {
	state = {
		which: "0"
	}

	updateFieldValue(name, value) {
		let {item} = this.props
		//console.log(item)
		var object = {}
		let translate = [
			// {'面试时间':interviewTime},
			{
				"职位名称": item.jobTitle
			}, {
				"姓名": item.name
			}, {
				"入职时间": item.expectedEntryTime
			}, {
				"所属部门": ""
			}
		]

		if (value.length) {
			// value = value.replace("{面试时间}",interviewTime)
			value = value.replace("{职位名称}", item.jobTitle)
			value = value.replace("{姓名}", item.name)
			value = value.replace("{入职时间}", item.expectedEntryTime)
			value = value.replace("{所属部门}", "")

		}
		object[name] = value
		this.form.setFieldsValue(object)
	}

	renderSmsOrEmail() {
		let {item} = this.props
		let {which} = this.state

		if (which == "2") {
			return (<EmailTemplateLinkage mailSubject="offer通知函" updateFieldValue={this.updateFieldValue.bind(this)} templateUse={"2"} mailTo={item.email}/>)
		} else {
			return null
		}
	}
	offerSubmit() {
		let {actions} = this.props
		this.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			actions.offerOptionAction(values).then((it) => {
				this.props.handleReset()
			})
		})
	}
	handleChange(e) {
		this.setState({which: e.target.value})
	}
	render() {
		const options = [
			/*{ label: '不通知', value: '0' },*/
			{
				label: "不通知",
				value: "0"
			}, {
				label: "邮件通知",
				value: "2"
			}
		]
		let {info} = this.props
		//console.log(this.props)
		return (<BaseForm ref={this.saveFormRef}>
			<FormItem>
				<Input type="hidden" name="resumeId" defaultValue={this.props.resumeId}/>
			</FormItem>
			<FormItem>
				<Input type="hidden" name="offerId" defaultValue={info.offerId}/>
			</FormItem>
			<FormItem>
				<DatePicker label="预计入职日期" name="expectedEntryTime" defaultValue={info.expectedEntryTime
					? moment(info.expectedEntryTime)
					: null} rules={[
					{
						required: true,
						message: "预计入职时间不可为空"
					}, {
						validator: customRules.required
					}
				]}/>
			</FormItem>
			{/*<FormItem>
          <Input label="发件人" name="sendEmail"/>
        </FormItem>
        <FormItem>
          <Input label="收件人" name="receiveEmail"/>
        </FormItem>*/
			}
			<FormItem>
				<RadioGroup name="noticeType" label="通知候选人" options={options} onChange={this.handleChange.bind(this)} defaultValue={this.state.which}/>
			</FormItem>
			{this.renderSmsOrEmail()}
			<Button onClick={this.offerSubmit.bind(this)} style={{
				float: "right"
			}}>发送</Button>
		</BaseForm>)
	}
}
/* 备注 */
export class PersonRemarks extends FormPage {
	componentDidMount() {
		let {actions, resumeId} = this.props
		actions.getRemarkAction({resumeId: resumeId})
	}
	handleSubmit() {
		let {actions} = this.props
		let formDom = this.form
		formDom.validateFieldsAndScroll((err, values) => {
			if (err) {
				return
			}
			formDom.resetFields("context")
			actions.sendRemarkAction(values)
		})
	}
	render() {
		let {
			resumeId,
			info,
			item: {
				jobId,
				name
			}
		} = this.props
		return (<div className="PersonRemarksBox">
			<BaseForm ref={this.saveFormRef} layout="vertical">
				<div className="remarks_text">
					<FormItem>
						<Input type="hidden" name="jobId" defaultValue={jobId}/>
					</FormItem>
					<FormItem>
						<Input type="hidden" name="resumeId" defaultValue={resumeId}/>
					</FormItem>
					<FormItem>
						<Input type="hidden" name="name" defaultValue={name}/>
					</FormItem>
					<FormItem>
						<TextArea className="Textarea" name="context" placeholder="输入对该候选人的备注" autosize={{
							minRows: 6
						}} rules={[{
							max: 50,
							message: "限制50个字"
						}
						]}/>
					</FormItem>
					<Button className="button_save" type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
				</div>
			</BaseForm>
			<div className="remarks_list">
				<List itemLayout="horizontal" dataSource={info} renderItem={item => (<List.Item>
					<List.Item.Meta avatar={<Avatar style = {{ backgroundColor: "#3fc2a0" }} > {
						item.inputName.substring(0, 1)
					}
					</Avatar>} title={item.inputName} description={<div > <div>{item.context}</div>
						<div>{translateTime(item.inputTime, "YYYY-MM-DD HH:mm")}</div>
					</div>}/>
				</List.Item>)}/>
			</div>
		</div>)
	}
}
/* 操作记录 */
export class PersonOptionRecord extends Component {
	componentDidMount() {
		let {actions, resumeId} = this.props
		actions.getOptionAction({resumeId: resumeId})
	}
	render() {
		let {info} = this.props
		return (<Timeline>
			{
				info.map((it, idx) => {
					return <Timeline.Item color="green">
						<PersonOptionRecordItem item={it}/>
					</Timeline.Item>
				})
			}
		</Timeline>)
	}
}
class PersonOptionRecordItem extends Component {
	render() {
		let {item} = this.props
		return (<div classNmae="optionRecordItem">
			<div>{translateTime(item.inputTime, "YYYY-MM-DD HH:mm")}</div>
			<div>{item.content}</div>
			<div>操作人：{item.inputAcc}</div>
		</div>)
	}
}
/* 沟通记录 */
export class PersonCommunitcate extends Component {
	componentDidMount() {
		let {actions, resumeId} = this.props
		actions.getCommiuncateAction({resumeId: resumeId})
	}
	render() {
		let {info} = this.props
		return (<Timeline>
			{
				info.map((it, idx) => {
					return <Timeline.Item color="green">
						<PersonCommunitcateItem item={it}/>
					</Timeline.Item>
				})
			}
		</Timeline>)
	}
}
class PersonCommunitcateItem extends Component {
	playRecord() {}
	render() {
		let {item} = this.props
		return (<div className="comunitcattionItem">
			<Row gutter={10}>
				<Col span={18}>
					<span>通话时间：{item.startTime}</span>
				</Col>
				<Col span={6}>
					<span><Icon type="play-circle" style={{
						color: "#0e8df8"
					}} onClick={this.playRecord.bind(this, item.recordUrl)}/>{item.showTimeLength}</span>
				</Col>
			</Row>
		</div>)
	}
}
/* 面试记录 */
export class PersonFeedRecord extends Component {
	componentDidMount() {
		let {actions, resumeId} = this.props
		actions.getFeedDataAction({resumeId: resumeId})
	}
	handleAddFeed(item) {
		let {actions, router} = this.props
		actions.feedAction(router, item)
	}
	render() {
		let {
			info: {
				list
			},
			actions,
			router,
			status,
			detailType,
			item
		} = this.props
		/* 面试数组数据map容错 */
		let lists = list
			? list
			: []
		return (<div className="feedRecord-box">
			<Permission expression={status <= 2 && detailType == 2}>
				<Button icon="plus" onClick={this.handleAddFeed.bind(this, item)} className="add-feed">添加面试</Button>
			</Permission>
			{
				lists.length
					? <Timeline>
						{
							lists.map((it, idx) => {
								return <Timeline.Item dot={<Icon type = "calendar" style = {{ fontSize: "20px" ,color:"#fff"}}/>} key={idx}>
									<PersonFeedRecordItem item={it} actions={actions} router={router}/>
								</Timeline.Item>
							})
						}

					</Timeline>
					: <div className="feed-no-data">尚未安排面试</div>
			}
		</div>)
	}
}
class PersonFeedRecordItem extends Component {
	handleFeedBack(resumeId, planId, interviewer) {
		let {actions, router} = this.props
		actions.feedbackAction(router, planId, undefined, interviewer)
	}
	handleUrge(id) {
		let {actions, router} = this.props
		actions.urgeFeedbackAction({id: id})
	}
	handlDelay(id, resumeId, type, time) {
		let {actions, router} = this.props
		actions.delayAction(router, id, type, time)
	}
	renderInterviewList(it, item, resumeId) {
		if (item.statusStr != 6) {
			return it.isFeedback
				? <Button onClick={this.handleFeedBack.bind(this, resumeId, it.interviewPlanId, it.interviewerId)}>查看反馈</Button>
				: <Button onClick={this.handleFeedBack.bind(this, resumeId, it.interviewPlanId, it.interviewerId)}>填写反馈</Button>
		}
	}
	renderFeedBackList() {
		let {
			item: {
				feedbackList,
				resumeId
			},
			item
		} = this.props
		let that = this
		let list = feedbackList
			? feedbackList
			: []
		//console.log(list)
		return list.map((it, idx) => {
			//console.log(it)
			return it
				? (<div className="item-feedback">
					<span>{it.interviewer || it.interviewerId}</span>
					<span className="feedback-state">{translateDic("feedbackstate", it.feedbackState)}</span>
					{that.renderInterviewList(it, item, resumeId)}
				</div>)
				: null
		})
	}
	renderBtns() {
		let {item} = this.props
		if (item.statusStr == 1) {
			return (<ButtonGroup>
				<Button className="reset-interview-time" onClick={this.handlDelay.bind(this, item.id, item.resumeId, item.type, item.interviewTime)}>调整面试时间</Button>
			</ButtonGroup>)
		} else if (item.isFeedback != 2 && item.statusStr != 6) {
			return (<ButtonGroup>
				<Button onClick={this.handleUrge.bind(this, item.id)}>催促反馈</Button>
			</ButtonGroup>)
		}

	}
	render() {
		let {item} = this.props
		//console.log(item)
		let json = {
			2: "#ed6492",
			3: "#ff8156",
			4: "#38c4a7"
		}
		return (<div className="feedRecored-item">
			<div className="item-head"><Icon type="down"/>
				<span className="item-head-time">{translateTime(item.interviewTime, "MM月DD日")}</span>
				<span className="feed-status">{translateDic("interviewstate", item.statusStr)}</span>
			</div>
			<div className="item-body">
				<div className="item-feed-info">
					面试信息：
					<Tag className="interview-stage-tag" color={json[item.type]}>{translateDic("interviewstage", item.type)}</Tag>
					{translateTime(item.interviewTime, "HH:mm")}
					{this.renderBtns()}

				</div>
				<div className="item-feedback-info">
					{this.renderFeedBackList()}
				</div>
			</div>
		</div>)
	}
}
/* 附加信息 */
export class ExtraInformation extends Component {
	state = {
		editid: "",
		newItem: undefined
	}
	componentDidMount() {
		const {actions, resumeId} = this.props
		actions.listLinkAction({"resumeId": resumeId})
		actions.fetchAdditionInfoAction({"resumeId": resumeId})
	}
	handlerAdditionDelete(id) {
		// handlerDelete
		const {actions, resumeId} = this.props
		actions.deleteAdditionInfoAction({id}).then(() => {
			actions.fetchAdditionInfoAction({"resumeId": resumeId})
		})
	}
	renderUploadList() {
		const {actions, resumeId, info} = this.props
		// let data=[{fileName:"abc.jpg",url:"http://www.baidu.com",type:"jpg"},{fileName:"信息登记表",url:"http://www.baidu.com",type:"rar"}]
		return (<List header={<div> 信息登记表</div>} footer={<FileUpload accept = "image/*" text = "上传信息登记表" action = {
			`/fileUpload/file/uploadResumeAttr?resumeId=${resumeId}&s=`
		}
		uploadType = "1" onChange = {
			() => {}
		}
		onSuccess = {
			() => {
				actions.fetchAdditionInfoAction({"resumeId": resumeId})
			}
		} > <Button>上传信息登记表</Button>
		</FileUpload>} dataSource={info.files} renderItem={item => (<List.Item actions={[<Popconfirm onConfirm={this.handlerAdditionDelete.bind(this, item.id)} title="是否确定删除这条数据" okText="是" cancelText="否">
			<Icon type="delete"/>
		</Popconfirm>
		]}>
			<a href={item.fileUrl} target="_blank">{item.name}</a>
		</List.Item>)}/>)
	}
	editChange(e) {
		this.setState({textVal: e.target.value})
	}
	handlerEdit(id) {
		this.setState({editid: id})
	}
	handleAdd() {
		const {actions, resumeId} = this.props
		this.setState({
			editid: undefined,
			newItem: {
				id: undefined,
				personalLink: "",
				resumeId: resumeId
			}
		})
	}
	handlerSave(id, personalLink) {
		const {actions, resumeId} = this.props
		const {textVal} = this.state

		actions.saveLinkAction({
			id,
			personalLink: textVal || personalLink,
			resumeId
		}).then(() => {
			this.setState({editid: "", newItem: undefined})
			actions.listLinkAction({"resumeId": resumeId})
		})
	}
	handlerDelete(id) {
		const {actions, resumeId} = this.props
		actions.deleteLinkAction({id}).then(() => {
			actions.listLinkAction({"resumeId": resumeId})
		})
	}
	renderLinksList() {
		const {info} = this.props
		const {editid, newItem} = this.state
		// let data=[{id:"abc",personalLink:"http://www.baidu.com"},{id:"abcc",personalLink:"http://www.baidu.com"}]
		return (<List header={<div> 个人链接</div>} dataSource={newItem
			? [].concat(info.links).concat(newItem)
			: info.links}
		// dataSource={data}
		footer={<Button icons = "add" onClick = {
			this.handleAdd.bind(this)
		} > 添加个人链接</Button>
		} renderItem={item => (<List.Item actions={editid != item.id
			? [
				<Icon onClick={this.handlerEdit.bind(this, item.id)} type="edit"/>,
				<Popconfirm onConfirm={this.handlerDelete.bind(this, item.id)} title="是否确定删除这条数据" okText="是" cancelText="否">
					<Icon type="delete"/>
				</Popconfirm>
			]
			: [<Icon onClick={this.handlerSave.bind(this, item.id, item.personalLink)} type="save"/>]}>
			{
				editid == item.id
					? (<Input defaultValue={item.personalLink} onChange={this.editChange.bind(this)}/>)
					: (<a href={item.personalLink} target="_blank">{item.personalLink}</a>)
			}
		</List.Item>)}/>)
	}
	render() {
		return (<div className="extra-information">
			{this.renderUploadList()}
			{this.renderLinksList()}
		</div>)
	}
}

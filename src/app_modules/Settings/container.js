/**
* @Author: jax <jaxchow>
* @Date:   2016-03-03T11:14:41+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-02-06T15:52:51+08:00
* @description:  connect state to view props for redux
*/

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {reducerItemSelector,reducerListSelector,reducerListSelectorFilter} from 'app-model/reducerSelector'
import SideLayout from 'app/decorators/SideLayout'
import SettingsFormView from './views/Settings.view'
import RemindFormView from './views/Remind.view'
import CustomSystemFieldView from './views/CustomSystemField.view'
import SystemFieldFormView from './views/SystemFieldForm.view'
import ChannelSettingsView from './views/ChannelSettings.view'
import ResumeLinkedFormView from './views/ResumeLinkedForm.view'
import TalentLabelView from './views/TalentLabel.view'
import TemplateView from './views/Template.view'
import TemplateFormView from './views/TemplateForm.view'
import UserRightView from './views/UserRights.view'
import UserOptionView from './views/newUser.view'
import UserEditView from './views/editUser.view'
import HandoverView from './views/handover.view'
import MailboxView from './views/mailbox.view'
import MailboxFormView from './views/mailboxForm.view'
import SettingsSide from './views/SettingsSide'
import OrganizationView from './views/organization.view'
import OrganizationForm from './views/organizationForm.view'
import RoleView from './views/Role.view'
import RoleFormView from './views/RoleForm.view'
import RoleDetailView from './views/RoleDetail.view'

import CompanyView from './views/Company.view'
import CompanyFormView from './views/CompanyForm.view'

import ArchiveView from './views/Archive.view'
import ArchiveFormView from './views/ArchiveForm.view'

import AdverseView from './views/Adverse.view'
import AdverseFormView from './views/AdverseForm.view'

import RejectView from './views/Reject.view'
import RejectFormView from './views/RejectForm.view'

import ApplyView from './views/Apply.view'
import ApplyFormView from './views/ApplyForm.view'
import ChannelView from './views/Channel.view'

import Ercode from './views/Ercode.view'


import * as actions from './action'


const mapStateToProps = (state) => {
    return { reduce: state.settingsReducer, appConfig: state.appReducer }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
        dispatch
    };
}
let Container = SideLayout(SettingsSide,connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SettingsFormView))
let RemindContainer = connect((state)=>({
  item:reducerItemSelector(state.ORMReducer,"Remind",'account'),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(SettingsSide)(RemindFormView))
let CustomSystemFieldContainer= connect((state)=>({
  items:reducerListSelector(state.ORMReducer,"CustomSystemField"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(SettingsSide)(CustomSystemFieldView))
let SystemFieldFormContainer= connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"CustomSystemField",props.params.fieldId),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SystemFieldFormView)
let ChannelSettingsContainer = connect((state)=>({
  item:reducerItemSelector(state.ORMReducer,"ChannelSettings",'account'),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(SettingsSide)(ChannelSettingsView))
let ResumeLinkedContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideLayout(SettingsSide)(ResumeLinkedFormView))
let TalentLabelContainer = connect((state)=>({
  items:reducerListSelector(state.ORMReducer,"Tag"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(SettingsSide)(TalentLabelView))

let TemplateContainer = connect((state)=>({
  items:reducerListSelector(state.ORMReducer,"Template"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(SettingsSide)(TemplateView))
let TemplateFormContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"Template",props.params.id),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(TemplateFormView)

let userRightsContainer = connect((state)=>({
  items:reducerListSelector(state.ORMReducer,"User"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(SettingsSide)(UserRightView))
let accountAddContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"User",props.params.account),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(UserOptionView)

let accountEditContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(UserEditView)
let handoverContainer = connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(HandoverView)

let mailboxContainer = connect((state)=>({
	items:reducerListSelector(state.ORMReducer,"Mailbox"),
	channelList:reducerListSelectorFilter(state.ORMReducer,"Channel",function(channel){
		return channel.isMailResumeImport==1
	}),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(SideLayout(SettingsSide)(MailboxView))
let mailboxFormContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"Mailbox",props.params.mailId),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(MailboxFormView)

//此功能暂时不考虑ORM 存储，层级CHILDREN 无法体现ORM 优势
let OrganizationContainer= connect((state)=>({
  // items:reducerListSelector(state.ORMReducer,"Organization"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(SideLayout(SettingsSide)(OrganizationView ))


//此功能暂时不考虑ORM 存储，层级CHILDREN 无法体现ORM 优势
let OrganizationFormContainer = connect((state,props)=>({
  // item:reducerItemSelector(state.ORMReducer,"Organization",props.params.mailId),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(OrganizationForm)


let RoleContainer = connect((state)=>({
  items:reducerListSelector(state.ORMReducer,"Role"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(SideLayout(SettingsSide)(RoleView))

let RoleFormContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"Role",props.params.roleId),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(RoleFormView)

let RoleDetailContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"Role",props.params.roleId),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(RoleDetailView)
let CompanyContainer = connect((state,props)=>({
  items:reducerListSelector(state.ORMReducer,"Company"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(SideLayout(SettingsSide)(CompanyView))

let CompanyFormContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"Company",props.params.companyId),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(CompanyFormView)

let ArchiveContainer = connect((state,props)=>({
  items:reducerListSelector(state.ORMReducer,"SystemOption"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(SideLayout(SettingsSide)(ArchiveView))

let ArchiveFormContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"SystemOption",props.params.optionId),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(ArchiveFormView)

let AdverseContainer = connect((state,props)=>({
  items:reducerListSelector(state.ORMReducer,"SystemOption"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(SideLayout(SettingsSide)(AdverseView))

let AdverseFormContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"SystemOption",props.params.optionId),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(AdverseFormView)

let RejectContainer = connect((state,props)=>({
  items:reducerListSelector(state.ORMReducer,"SystemOption"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(SideLayout(SettingsSide)(RejectView))

let RejectFormContainer = connect((state,props)=>({
  item:reducerItemSelector(state.ORMReducer,"SystemOption",props.params.optionId),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, { pure: false })(RejectFormView)

let ApplyContainer = connect((state)=>({
  item:reducerItemSelector(state.ORMReducer,"Remind",'account'),
  // items:reducerListSelector(state.ORMReducer,"Template"),
  // reduce: state.settingsReducer,
  // appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(SettingsSide)(ApplyView))

let ApplyFormContainer = connect((state)=>({
  // item:reducerItemSelector(state.ORMReducer,"Remind",'account'),
  // items:reducerListSelector(state.ORMReducer,"Template"),
  // reduce: state.settingsReducer,
  // appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(ApplyFormView)

let ErcodeContainer = connect((state)=>({
  // item:reducerItemSelector(state.ORMReducer,"Remind",'account'),
  // items:reducerListSelector(state.ORMReducer,"Template"),
  // reduce: state.settingsReducer,
  // appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(Ercode)
let ChannelContainer = connect((state)=>({
  items:reducerListSelector(state.ORMReducer,"Channel"),
  reduce: state.settingsReducer,
  appReducer:state.appReducer
}), mapDispatchToProps, null, {pure: false})(SideLayout(SettingsSide)(ChannelView))
export {
    Container,
    RemindContainer,
    CustomSystemFieldContainer,
    SystemFieldFormContainer,
    ChannelSettingsContainer,
    ResumeLinkedContainer,
    TalentLabelContainer,
    TemplateContainer,
    TemplateFormContainer,
    userRightsContainer,
    accountAddContainer,
    handoverContainer,
    accountEditContainer,
    mailboxContainer,
    mailboxFormContainer,
    OrganizationContainer,
    OrganizationFormContainer,
    RoleContainer,
		RoleFormContainer,
		RoleDetailContainer,
    CompanyContainer,
		CompanyFormContainer,
		ArchiveContainer,
		ArchiveFormContainer,
		AdverseContainer,
		AdverseFormContainer,
		RejectContainer,
		RejectFormContainer,
		ApplyContainer,
		ApplyFormContainer,
    ErcodeContainer,
		ChannelContainer
}

export default Container;

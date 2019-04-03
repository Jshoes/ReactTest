import React, { Component } from 'react'
import ReactRouter, { Router, Route, IndexRoute,IndexRedirect } from 'react-router'

import Container, {
	RemindContainer,
	CustomSystemFieldContainer,
	ChannelSettingsContainer,
	SystemFieldFormContainer,
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
	ErcodeContainer,
	ArchiveContainer,
	ArchiveFormContainer,
	AdverseContainer,
	AdverseFormContainer,
	RejectContainer,
	RejectFormContainer,
	ApplyContainer,
	// ApplyFormContainer,
	ChannelContainer
} from './container'

let Routes = (
	<Router>
		<IndexRoute component={CompanyContainer} />
		<IndexRedirect to="company" />
		<Route path="channelsettings" components={ChannelSettingsContainer} breadcrumbName="渠道设置">
			<Route path="set/:id" components={ResumeLinkedContainer} breadcrumbName="推荐规则" />
		</Route>
		<Route path="remind" components={RemindContainer} breadcrumbName="提醒设置" />
		<Route path="field" components={CustomSystemFieldContainer} breadcrumbName="系统字段">
			<Route path="add" components={SystemFieldFormContainer} breadcrumbName="添加系统字段" />
			<Route path="edit/:fieldId" components={SystemFieldFormContainer} breadcrumbName="编辑系统字段" />
		</Route>
		<Route path="talentList" components={TalentLabelContainer} breadcrumbName="人才标签" />

		<Route path="template" components={TemplateContainer} breadcrumbName="短信模板">
			<Route path="add/:smsType" components={TemplateFormContainer} breadcrumbName="新增模板" />
			<Route path="edit/:id" components={TemplateFormContainer} breadcrumbName="编辑模板" />
		</Route>
		<Route path="userRights" components={userRightsContainer} breadcrumbName="用户权限">
			<Route path="add" components={accountAddContainer} breadcrumbName="新增用户" />
			<Route path="handover/:nowAcc" components={handoverContainer} breadcrumbName="管理员交接" />
			<Route path="edit/:account" components={accountAddContainer} breadcrumbName="编辑用户" />
		</Route>
		<Route path="mailbox" components={mailboxContainer} breadcrumbName="邮箱" >
			<Route path="add" components={mailboxFormContainer} breadcrumbName="添加邮箱" />
		</Route>
		<Route path="organization" components={OrganizationContainer} breadcrumbName="组织结构设置">
			<Route path="add" components={OrganizationFormContainer} breadcrumbName="添加部门" />
			<Route path="edit/:orgId" components={OrganizationFormContainer} breadcrumbName="编辑部门" />
		</Route>
		<Route path="role" components={RoleContainer} breadcrumbName="角色权限设置">
			<Route path="add" components={RoleFormContainer} breadcrumbName="添加角色" />
			<Route path="edit/:roleId" components={RoleFormContainer} breadcrumbName="编辑角色" />
			<Route path="detail/:roleId" components={RoleDetailContainer} breadcrumbName="查看角色详情" />
		</Route>
		<Route path="company" components={CompanyContainer} breadcrumbName="公司信息" >
			<Route path="edit/:companyId" components={CompanyFormContainer} breadcrumbName="编辑公司地址" />
			<Route path="add" components={CompanyFormContainer} breadcrumbName="添加公司地址" />
		</Route>
		<Route path="archive" components={ArchiveContainer} breadcrumbName="归档原因设置" >
			<Route path="edit/:optionId" components={ArchiveFormContainer} breadcrumbName="编辑归档原因" />
			<Route path="add" components={ArchiveFormContainer} breadcrumbName="添加归档原因" />
		</Route>
		<Route path="adverse" components={AdverseContainer} breadcrumbName="不良事件设置" >
			<Route path="edit/:optionId" components={AdverseFormContainer} breadcrumbName="编辑" />
			<Route path="add" components={AdverseFormContainer} breadcrumbName="添加" />
		</Route>
		<Route path="reject" components={RejectContainer} breadcrumbName="offer拒绝原因设置" >
			<Route path="edit/:optionId" components={RejectFormContainer} breadcrumbName="编辑拒绝原因" />
			<Route path="add" components={RejectFormContainer} breadcrumbName="添加拒绝原因" />
		</Route>
		<Route path="apply" components={ApplyContainer} breadcrumbName="信息登记表设置" >

		</Route>
		<Route path="channel" components={ChannelContainer} breadcrumbName="支持渠道列表" >

		</Route>
		<Route path="ercode" components={ErcodeContainer} breadcrumbName="二维码" >

		</Route>
	</Router>
)

export { Container }
export default Routes

/**
 * @Date:   2017-09-07T08:39:52+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-07T20:11:43+08:00
 */

import FetchAPI from 'app-utils/FetchAPI'

export default class API extends FetchAPI {
	constructor(props) {
		super(props);
	}

	fetchList(params) {
		return this.fetchPostList(`${APP_SERVER}/field/listJson`, {
			body: params
		})
	}
	fetchSaveApplyForm(params) {
		return this.fetchPost(`${APP_SERVER}/registration/saveJson`, {
			body: params
		})
	}
	fetchMailboxList(params) {
		return this.fetchPostList(`${APP_SERVER}/reciveMailbox/listJson`, {
			body: params
		})
	}
	fetchSaveOrDeleteMailbox(params) {
		return this.fetchPost(`${APP_SERVER}/reciveMailbox/saveOrDeleteJson`, {
			body: params
		})
	}
	/*company */
	fetchCompanyList(params) {
		return this.fetchPostList(`${APP_SERVER}/company/listJson`, {
			body: params
		})
	}
	fetchAddCompany(params) {
		return this.fetchPost(`${APP_SERVER}/company/saveJson`, {
			body: params
		})
	}
	fetchEditCompany(params) {
		return this.fetchPost(`${APP_SERVER}/company/infoJson`, {
			body: params
		})
	}
	fetchDeleteCompany(params) {
		return this.fetchPost(`${APP_SERVER}/company/deleteJson`, {
			body: params
		})
	}
	/*company END */

	/*sys setting */
	fetchOptionList(params) {
		return this.fetchGet(`${APP_SERVER}/option/optionListJson`, {
			body: params
		})
	}
	fetchAddOption(params) {
		return this.fetchPost(`${APP_SERVER}/option/saveOrUpdateJson`, {
			body: params
		})
	}
	fetchDeleteOption(params) {
		return this.fetchPost(`${APP_SERVER}/option/deleteJson`, {
			body: params
		})
	}
	/*sys setting END */

	/*role setting */
	fetchRoleList(params) {
		return this.fetchPost(`${APP_SERVER}/authRole/getRoleInfo`, {
			body: params
		})
	}
	fetchAuthTree(params) {
		return this.fetchPost(`${APP_SERVER}/authRole/getResourceTree`, {
			body: params
		})
	}
	fetchAddRole(params) {
		return this.fetchPost(`${APP_SERVER}/authRole/saveJson`, {
			body: params
		})
	}
	fetchRoleDetail(params) {
		return this.fetchPost(`${APP_SERVER}/authRole/editRoleDetail`, {
			body: params
		})
	}
	fetchDeleteRole(params) {
		return this.fetchPost(`${APP_SERVER}/authRole/deleteRole`, {
			body: params
		})
	}
	/*sys setting END */

	/*org setting */
	fetchOrgTree(params) {
		return this.fetchPost(`${APP_SERVER}/organizationGroup/getDepartmentTree`, {
			body: params
		})
	}
	fetchAddOrg(params) {
		return this.fetchPost(`${APP_SERVER}/organizationGroup/saveJson`, {
			body: params
		})
	}
	fetchDeleteOrg(params) {
		return this.fetchPost(`${APP_SERVER}/organizationGroup/deleteDeparts`, {
			body: params
		})
	}
	fetchParentOrg(params) {
		return this.fetchPost(`${APP_SERVER}/organizationGroup/getParentDepart`, {
			body: params
		})
	}
	/*org setting END */
	/*channel list  */
	fetchChannelList(params) {
		return this.fetchPostList(`${APP_SERVER}/sysSupportChannel/listJson`, {
			body: params
		})
	}
	/*channel list END */

	fetchRightList(params) {
		return this.fetchPostList(`${APP_SERVER}/accountOperate/listJson`, {
			body: params
		})
	}

	fetchAddUser(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/addAccount`, {
			body: params
		})
	}
	fetchEditUser(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/editAccount`, {
			body: params
		})
	}
	fetchDeleteUser(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/deleteAccount`, {
			body: params
		})
	}
	fetchCurrAcc(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/getPresentAccount`, {
			body: params
		})
	}

	fetchIsReal(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/isRealName`, {
			body: params
		})
	}

	fetchGetCode(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/getCode`, { body: params })
	}

	fetchDisabledAcc(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/forbidden`, { body: params })
	}

	fetchReloadAcc(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/resetPassword`, { body: params })
	}

	fetchAdminChange(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/adminChange`, {
			body: params
		})
	}
	fetchHrChange(params) {
		return this.fetchPost(`${APP_SERVER}/accountOperate/checkAndDeleteAccount`, {
			body: params
		})
	}

	fetchSaveList(params) {
		return this.fetchPost(`${APP_SERVER}/field/batchSaveJson`, {
			body: params
		})
	}

	fetchSave(params) {
		return this.fetchPost(`${APP_SERVER}/field/saveJson`, {
			body: params
		})
	}

	fetchItem(params) {
		return this.fetchPost(`${APP_SERVER}/field/infoJson`, {
			body: params
		})
	}

	fetchRemind(params) {
		return this.fetchPost(`${APP_SERVER}/dictionary/infoJson`, {
			body: params
		})
	}

	fetchSaveRemind(params) {
		return this.fetchPost(`${APP_SERVER}/dictionary/saveJson`, {
			body: params
		})
	}

	fetchTagList(params) {
		return this.fetchGet(`${APP_SERVER}/option/optionListJson`, {
			body: params
		})
	}

	fetchOperationTag(params){
		return this.fetchPost(`${APP_SERVER}/option/saveOrUpdateJson`, {
			body: params
		})
	}

	fetchSaveTalentList(params) {
		return this.fetchPost(`${APP_SERVER}/option/batchSaveJson`, {
			body: params
		})
	}

	fetchTemplateList(params) {
		return this.fetchPostList(`${APP_SERVER}/template/listJson`, {
			body: params
		})
	}


	fetchTemplateItem(params) {
		return this.fetchPost(`${APP_SERVER}/template/infoJson`, {
			body: params
		})
	}



	fetchSaveTemplateItem(params) {
		return this.fetchPost(`${APP_SERVER}/template/saveJson`, {
			body: params
		})
	}

	fetchDeleteTemplateItem(params) {
		return this.fetchPost(`${APP_SERVER}/template/deleteTemplate`, {
			body: params
		})
	}

	fetchChannelResumeList(params) {
		return this.fetchPost(`${APP_SERVER}/channel/listJson`, {
			body: params
		})
	}

	fetchChannelSettings(params) {
		return this.fetchPost(`${APP_SERVER}/channel/channelJson`, {
			body: params
		})
	}

	fetchSaveChannelSettings(params) {
		return this.fetchPost(`${APP_SERVER}/channel/saveJson`, {
			body: params
		})
	}

	fetchSysSetChannelRule(params) {
		let channel = params.channel
		return this.fetchPost(`${APP_SERVER}/sysSetChannelRule/${channel}InfoJson`, {
			body: params
		})
	}

	fetchSysSaveChannelRule(params, state) {
		let channel = state.channel
		return this.fetchPost(`${APP_SERVER}/sysSetChannelRule/${channel}SaveJson`, {
			body: params
		})
	}

}

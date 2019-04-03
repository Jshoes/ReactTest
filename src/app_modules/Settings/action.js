
import API from './api'

import {createAction} from 'redux-actions'
import { routerActions, push, replace } from 'react-router-redux'
import createConstants, { dispatchHandler, createTypes, createActionRoute } from 'app-utils/CreateConstants'
import ActionRouter from 'app-utils/ActionRouterUtils'
import ClientAPI from 'utils/externalUtils'



export const customSystemFieldSaveList = createAction("STORE_CUSTOMSYSTEMFIELD")
export const customSystemFieldSave = createAction("UPSERT_CUSTOMSYSTEMFIELD")

export const mailboxSaveList = createAction("STORE_MAILBOX")
export const mailboxRemove = createAction("REMOVE_MAILBOX")
export const mailboxSave = createAction("UPSERT_MAILBOX")

export const tagSaveList = createAction("STORE_TAG")
export const tagRemove = createAction("REMOVE_TAG")
export const tagSave = createAction("UPSERT_TAG")

// company
export const companySaveList = createAction("STORE_COMPANY")
export const companySave = createAction("UPSERT_COMPANY")
export const companyRemove = createAction("REMOVE_COMPANY")
// company END

// option
export const optionSaveList = createAction("STORE_SYSTEMOPTION")
export const optionSave = createAction("UPSERT_SYSTEMOPTION")
export const optionRemove = createAction("REMOVE_SYSTEMOPTION")
// option END

// role
export const roleSaveList = createAction("STORE_ROLE")
export const roleSave = createAction("UPSERT_ROLE")
export const roleRemove = createAction("REMOVE_ROLE")
export const authTreeSave = createAction("STORE_AUTH_TREE")
export const roleDetailSave = createAction("STORE_ROLE_DETAIL")
export const roleDetailRemove = createAction("REMOVE_ROLE_DETAIL")

// role END


// org
export const orgTreeSave = createAction("STORE_ORG_TREE")
export const orgSave = createAction("UPSERT_ROLE")
export const parentOrgSave = createAction("STORE_PARENT_ORG")
export const parentOrgRemove = createAction("REMOVE_PARENT_ORG")//仅为新增时清除
// org END


// channel list
export const channelListSave = createAction("STORE_CHANNEL")
export const channelSave = createAction('UPSERT_CHANNEL')
// channel list END

export const userSaveList = createAction("STORE_USER")
export const userRemove = createAction("REMOVE_USER")
export const userSave = createAction("UPSERT_USER")
export const userInsert = createAction("INSERT_USER")

export const templateSaveList = createAction('STORE_TEMPLATE')
export const templateRemove  =  createAction('REMOVE_TEMPLATE')
export const templateSave = createAction('UPSERT_TEMPLATE')


export const remindSave = createAction('UPSERT_REMIND')

export const channelListSettingsSave = createAction("UPSERT_CHANNELSETTINGS")

const CONSTANTS = createConstants('setting', [
	'fetch_request',
	'fetch_success',
	'fetch_failure',
	'change_prop',
])
export default CONSTANTS
let {
	fetchFailure, fetchRequest, fetchSuccess
} = createTypes(CONSTANTS)

let { backRoute, addRoute, editRoute } = createActionRoute()
export { backRoute, addRoute, editRoute }


function changeProp(id, propName, value) {
	return { type: CONSTANTS.CHANGE_PROP, payload: { id, propName, value } }
}

function saveIsReal(json) {
	return { type: CONSTANTS.SAVE_REAL, payload: json }
}

function boolToInt(obj, name) {
	if (obj[name] && obj[name] == true) {
		obj[name] = '1'
	} else {
		obj[name] = '0'
	}
}

function processBool2Str(object) {
	for (var key in object) {
		if (object[key] === true) {
			object[key] = '1'
		} else if (object[key] === false) {
			object[key] = '0'
		}
	}
	return object
}
export function deleteMailboxAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		const target = {
			id: value.id,
			isDel: 1
		}
		return new API().fetchSaveOrDeleteMailbox(target).then(json => {
			dispatch(fetchSuccess('tableSpin',true))
			dispatch(mailboxRemove(json.id))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function mailboxListAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchMailboxList().then(json => {
			dispatch(fetchSuccess('tableSpin'))
			dispatch(mailboxSaveList(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}
export function saveMailboxItemAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchSaveOrDeleteMailbox(value).then(json => {
			dispatch(fetchSuccess('tableSpin',true))
			dispatch(mailboxSave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}


export function listUserAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchRightList(value).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			let { list, ...page } = json
			dispatch(userSaveList(json))
			// dispatch(saveRightsList(list, page))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}
export function saveUserAction(value) {
	if(value.id){
		return (dispatch, getState) => {
			dispatch(fetchRequest('itemSpin'))
				let{id,...data}=value
				return new API().fetchEditUser(data).then(json => {
					dispatch(fetchSuccess('itemSpin', true))
					dispatch(userSave(json))
				}).catch(ex => {
					return dispatch(fetchFailure('itemSpin', ex))
				})
		}

	}else{
		return (dispatch, getState) => {
			dispatch(fetchRequest('itemSpin'))
				return new API().fetchAddUser(value).then(json => {
					dispatch(fetchSuccess('itemSpin', true))
					console.log(json,'jsonjsonjson')
					dispatch(userSave(json))
				}).catch(ex => {
					return dispatch(fetchFailure('itemSpin', ex))
				})
		}
	}

}
/*删除用户*/
export function deleteUserAction(value) {
	const {userId} = value
	return (dispatch, getState) => {
		dispatch(fetchRequest('itemSpin'))
		return new API().fetchDeleteUser({ account: account }).then(json => {
			dispatch(fetchSuccess('itemSpin', true))
			dispatch(userRemove(json))
		}).catch(ex => {
			return dispatch(fetchFailure('itemSpin', ex))
		})
	}
}


export function listAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchList(value).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			let { list, ...page } = json
			dispatch(customSystemFieldSaveList(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function fetchRemindAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('remind'))
		return new API().fetchRemind().then(json => {
			dispatch(fetchSuccess('remind'))
			dispatch(remindSave(Object.assign({id:'account'},json)))
		}).catch(ex => {
			return dispatch(fetchFailure('remind', ex))
		})
	}
}

export function saveRemindAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('remind'))
		processBool2Str(params)
		return new API().fetchSaveRemind(params).then(json => {
			dispatch(fetchSuccess('remind', true))
			dispatch(remindSave(Object.assign({id:'account'},params)))
		}).catch(ex => {
			return dispatch(fetchFailure('remind', ex))
		})
	}
}

export function saveAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('formSpin'))
		boolToInt(params, "enable");
		boolToInt(params, "isRequired");
		return new API().fetchSave(params).then(json => {
			dispatch(fetchSuccess('formSpin', true))
			dispatch(customSystemFieldSave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('formSpin', ex))
		})
	}
}


export function itemAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('formSpin'))
		return new API().fetchItem({ fieldId: value }).then(json => {
			dispatch(fetchSuccess('formSpin'))
			dispatch(customSystemFieldSave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('formSpin', ex))
		})
	}
}


export function tagsListAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('talentLabelSpin'))
		return new API().fetchTagList(value).then(json => {
			dispatch(fetchSuccess('talentLabelSpin'))
			let { list } = json
			dispatch(tagSaveList(json))
		}).catch(ex => {
			return dispatch(fetchFailure('talentLabelSpin', ex))
		})
	}
}

export function removeTag(value){
	return (dispatch, getState) => {
		dispatch(fetchRequest('talentLabelSpin'))
		return new API().fetchOperationTag(value).then(json => {
			dispatch(fetchSuccess('talentLabelSpin',true))
			dispatch(tagRemove(value.optionId))
		}).catch(ex => {
			return dispatch(fetchFailure('talentLabelSpin', ex))
		})
	}
}

export function addTag(value){
	return (dispatch, getState) => {
		dispatch(fetchRequest('talentLabelSpin'))
		return new API().fetchOperationTag(value).then(json => {
			dispatch(fetchSuccess('talentLabelSpin',true))
			dispatch(tagSave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('talentLabelSpin', ex))
		})
	}
}

export function saveTalentListAction(value) {
	return (dispatch, getState) => {
		return new API().fetchSaveTalentList(value).then(json => {
			dispatch(fetchSuccess('talentLabelSpin'))
			dispatch(saveTalentList(value.list))
		}).catch(ex => {
			return dispatch(fetchFailure('talentLabelSpin', ex))
		})
	}
}
/**
 *  template list action
 *
 */
export function templateListAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('templateSpin'))
		return new API().fetchTemplateList(value).then(json => {
			dispatch(fetchSuccess('templateSpin'))
			let { list,...page } = json
			dispatch(templateSaveList(json))
		}).catch(ex => {
			return dispatch(fetchFailure('templateSpin', ex))
		})
	}
}

export function saveTemplateAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('formSpin'))
		return new API().fetchSaveTemplateItem(value).then(json => {
			dispatch(fetchSuccess('formSpin', true))
			dispatch(templateSave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('formSpin', ex))
		})
	}
}

export function fetchTemplateItemAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('formSpin'))
		return new API().fetchTemplateItem(value).then(json => {
			dispatch(fetchSuccess('formSpin'))
			dispatch(templateSave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('formSpin', ex))
		})
	}
}


export function deleteTemplateAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('formSpin'))
		return new API().fetchDeleteTemplateItem({id:value}).then(json => {
			dispatch(fetchSuccess('formSpin', true))
			dispatch(templateRemove(json.id))
		}).catch(ex => {
			return dispatch(fetchFailure('formSpin', ex))
		})
	}
}


// unconst

export function changePropAction(row) {
	return (dispatch, getState) => {
		return 	dispatch(customSystemFieldSave(row))
		// return dispatch(changeProp(id, propName, value ? 1 : 0))
	}
}


export function channelSettingsAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('channelSpin'))
		return new API().fetchChannelSettings(value).then(json => {
			dispatch(fetchSuccess('channelSpin'))
			dispatch(channelListSettingsSave(Object.assign({id:'account'},json)))
		}).catch(ex => {
			return dispatch(fetchFailure('channelSpin', ex))
		})
	}
}

export function saveChannelSettingsAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('channelSpin'))
		return new API().fetchSaveChannelSettings(value).then(json => {
			dispatch(fetchSuccess('channelSpin', true))
			dispatch(channelListSettingsSave(Object.assign({id:'account'},json)))
		}).catch(ex => {
			return dispatch(fetchFailure('channelSpin', ex))
		})
	}
}
//userRightadd
export function jumpToaddAction() {
	return dispatch => dispatch(routerActions.push(`/settings/userRights/add`))
}
//uerRightEdit
export function jumpToEditAction(row){
	let {account} = row
	return dispatch => dispatch(routerActions.push(`/settings/userRights/edit/${account}`))
}
//userRightHandover
export function jumpTohandoverAction(row) {
	let {account} = row
	return dispatch => dispatch(routerActions.push(`/settings/userRights/handover/${account}`))
}
//userAdd
export function addUserAction(value){
	return (dispatch , getState) =>{
		dispatch(fetchRequest('formSpin'))
		return new API().fetchAdminChange(value).then(json => {
			dispatch(fetchSuccess('formSpin', true))
			dispatch(userInsert(json))
		}).catch(ex => {
			return dispatch(fetchFailure('formSpin', ex))
		})
	}
}

export function disabledAction(row) {
	let value = {
		account:row.account
	}
	return (dispatch, getState) => {
		dispatch(fetchRequest('itemSpin'))
		return new API().fetchDisabledAcc(value).then(json => {
			dispatch(fetchSuccess('itemSpin', true))
		}).catch(ex => {
			return dispatch(fetchFailure('itemSpin', ex))
		})
	}
}

export function reloadAction(row) {
	let value = {
		account:row.account
	}
	return (dispatch, getState) => {
		dispatch(fetchRequest('itemSpin'))
		return new API().fetchReloadAcc(value).then(json => {
			dispatch(fetchSuccess('itemSpin', true))
		}).catch(ex => {
			return dispatch(fetchFailure('itemSpin', ex))
		})
	}
}

export function adminChangeAction(value){
	return (dispatch, getState) => {
		dispatch(fetchRequest('itemSpin'))
		return new API().fetchAdminChange(value).then(json => {
			dispatch(fetchSuccess('itemSpin', true))
		}).catch(ex => {
			return dispatch(fetchFailure('itemSpin', ex))
		})
	}
}

// company
export function companyListAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchCompanyList().then(json => {
			dispatch(fetchSuccess('tableSpin'))
			let { list, ...page } = json
			dispatch(companySaveList(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}
export function saveCompanyAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin',true))
		// console.log('vvvvvv',value)
		// value.areaStr = value.areaStr.join('')
		return new API().fetchAddCompany(value).then(json => {
			dispatch(fetchSuccess('tableSpin',true))
			dispatch(companySave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function deleteCompanyAction(value,id) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchDeleteCompany({id:id}).then(json => {
      dispatch(companyRemove(id))
      dispatch(fetchSuccess('tableSpin',true))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin', ex))
    })
  }
}

// sys setting
export function optionListAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchOptionList(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      let { list, ...page } = json
      dispatch(optionSaveList(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin', ex))
    })
  }
}

export function saveOptionAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchAddOption(value).then(json => {
			dispatch(fetchSuccess('tableSpin',true))
			dispatch(optionSave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function deleteOptionAction(value,id) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchDeleteOption({optionId:id}).then(json => {
	    if(value=='tagRemove'){
				dispatch(tagRemove(id))
			}else{
				dispatch(optionRemove(id))
			}
      dispatch(fetchSuccess('tableSpin',true))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin', ex))
    })
  }
}
// role setting
export function roleListAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchRoleList(value).then(json => {
      dispatch(fetchSuccess('tableSpin'))
      let { list, ...page } = json
      dispatch(roleSaveList(json))
    }).catch(ex => {
//       return dispatch(fetchFailure('tableSpin', ex))
    })
  }
}

export function saveRoleAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchAddRole(value).then(json => {
			dispatch(fetchSuccess('tableSpin',true))
			dispatch(roleSave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function saveRoleDetailAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchRoleDetail({roleId:value}).then(json => {
			dispatch(roleDetailSave(json,true))
			dispatch(fetchSuccess('tableSpin'))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function deleteRoleAction(value,id) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchDeleteRole({roleId:id}).then(json => {
      dispatch(roleRemove(id))
      dispatch(fetchSuccess('tableSpin'))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin', ex))
    })
  }
}

export function removeRoleDetailAction(value) {
	return (dispatch, getState) => {
		dispatch(roleDetailRemove())
	}
}
export function detailRouteAction(router,id){
	let newLocation={
		pathname: `${router.location.pathname}/detail/${id}`,
	}
	// let hash=router.createLocation(newLocation)
	return (dispatch, getState) => {
		dispatch(routerActions.push(newLocation))
  }
}
// org
export function orgTreeAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchOrgTree().then(json => {
      dispatch(fetchSuccess('tableSpin'))
      let { list, ...page } = json
      dispatch(orgTreeSave(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin', ex))
    })
  }
}

export function saveOrgAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchAddOrg(value).then(json => {
			dispatch(fetchSuccess('tableSpin',true))
			dispatch(orgSave(json))
			dispatch(orgTreeAction())
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}

export function deleteOrgAction(value,id) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchDeleteOrg({groupId:id}).then(json => {
//       dispatch(orgRemove(id))

      dispatch(fetchSuccess('tableSpin',true))
			dispatch(orgTreeAction())

    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin', ex))
    })
  }
}

export function saveParentOrgAction(value) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('tableSpin'))
		return new API().fetchParentOrg(value).then(json => {
			dispatch(fetchSuccess('tableSpin'))
			dispatch(parentOrgSave(json))
		}).catch(ex => {
			return dispatch(fetchFailure('tableSpin', ex))
		})
	}
}
export function removeParentOrgAction(value) {
	return (dispatch, getState) => {
		dispatch(parentOrgRemove())
	}
}
// auth
export function authTreeAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchAuthTree().then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(authTreeSave(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin', ex))
    })
  }
}
//channel list
export function channelListAction(value) {
  return (dispatch, getState) => {
    dispatch(fetchRequest('tableSpin'))
    return new API().fetchChannelList().then(json => {
      dispatch(fetchSuccess('tableSpin'))
      dispatch(channelListSave(json))
    }).catch(ex => {
      return dispatch(fetchFailure('tableSpin', ex))
    })
  }
}


export function saveListAction(params) {
	return (dispatch, getState) => {
		dispatch(fetchRequest('formSpin'))
		return new API().fetchSaveList(params).then(json => {
			dispatch(fetchSuccess('formSpin', true))
			console.log(json)
		}).catch(ex => {
			return dispatch(fetchFailure('formSpin', ex))
		})
	}
}

import {createSelector} from 'redux-orm'
// import orm from './index'
import orm from './index'


/**
 *   getItem by key
 *
 *
 **/

export function reducerItemSelector(reducer,modelName,key){
	return createSelector(orm,session=>{
	  return session[modelName].idExists(key) ? session[modelName].withId(key) :session[modelName].create({})
	})(reducer)
}

/**
 *   getList all
 *
 *
 **/

export function reducerListSelector(reducer,modelName){
	return createSelector(orm,session=>{
		 return session[modelName].all().filter(model => !(JSON.stringify(model) =="{}" || model.id=="") ).toModelArray()
		 // return session[modelName].all().toModelArray()
	})(reducer)
}

/**
 *   getModel
 *
 *
 **/

export function reducerModel(reducer,modelName){
	return createSelector(orm,session=>{
		 return session[modelName]
	})(reducer)
}

/**
 *   getListPage
 *
 *
 **/


export function reducerListPageSelector(reducer,modelName,props){
	return createSelector(orm,(session,props)=>{
		 return session[modelName].all().toModelArray()
	})(reducer)
}


export function reducerListSelectorFilter(reducer,modelName,filterCallback){
	return createSelector(orm,(session,props)=>{
		 return session[modelName].all().filter(filterCallback).toModelArray()
	})(reducer)
}

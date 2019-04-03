import {message} from 'antd'
import {routerActions, push, replace} from 'react-router-redux'

export default function createConstants(name,constants){
  let CONSTANTS={}
  if(typeof(constants)=='string'){
    constants=constants.split(",")
  }
  constants.map((cst)=>{
    CONSTANTS[cst.toLocaleUpperCase()]=[name,cst].join("_")
  })
  return CONSTANTS
}

export function createTypes(CONSTANTS){
  function newItem() {
    return {type: CONSTANTS.NEW_ITEM ,payload:{}}
  }

  function getItem(key) {
    return {type: CONSTANTS.GET_ITEM, payload:{key}}
  }

  function removeItem(item) {
    return {type: CONSTANTS.REMOVE_ITEM, payload:item}
  }

  function saveItem(item) {
    return {type: CONSTANTS.SAVE_ITEM, payload:{item}}
  }
  function saveParams(params){
    return {type:CONSTANTS.SAVE_PARAMS,payload:{params}}
  }
  function saveList(list, page) {
    return {type: CONSTANTS.SAVE_LIST,payload:{ list, page}}
  }

  function listItem(idx, offset) {
    return {type: CONSTANTS.LIST_ITEM, payload:{ idx, offset}}
  }

  function fetchFailure(label,error) {
    try{
      if(error.response){
        error.response.json().then((json)=>{
          message.error(`${json.msg||""}`)
        })
      }else{
        message.error(error)
      }
    }catch(e){
      console.log(e)
        message.error(error.response?error.response.statusText:"服务器请求失败",5)
    }
    return {type: CONSTANTS.FETCH_FAILURE, payload:{label,spin:false,status:error.response?error.response.statusText:500}}
  }

  function fetchRequest(label,status) {
    return {type: CONSTANTS.FETCH_REQUEST,payload:{label,spin:true}}
  }

  function fetchSuccess(label,showSuccess,tips) {
      let msgContent = tips?tips:"数据操作成功"
      let duration = 5
    showSuccess && message.success(msgContent,duration)
    return {type: CONSTANTS.FETCH_SUCCESS,payload:{label,spin:false}}
  }
  return {
    newItem,
    getItem,
    removeItem,
    saveItem,
    saveList,
    listItem,
    saveParams,
    fetchFailure,
    fetchRequest,
    fetchSuccess
  }
}

function filterPathSpec(path,splitNum){
  let arr = path.split("/")
  arr.length = arr.length - splitNum
  return arr.join("/")
}

function filterPath(path){
  if(path.indexOf("/resume/folder")>=0){
    return "/resume/folder"
  }else if(path.indexOf("/resume/list")>=0){
    return "/resume/list"
  }else if(path.indexOf("/interview/calendar")>=0){
    return "/interview/calendar"
  }else if(path.indexOf("/interview/list")>=0){
    return "/interview/list"
  }else if(path.indexOf("/job/jobrelease")>=0 ){
    return filterPathSpec(path,1)
  }else if(path.indexOf("/job")>=0 ){
    return "/job/list"
  }else if(path.indexOf("/elite/3")>=0){
      return "/elite/3"
  }else if(path.indexOf("/elite/4")>=0){
      return "/elite/4"
  }else if(path.indexOf("/dashboard")>=0){
      return "/dashboard"
  }else{
    return ""
  }
}


export function createActionRoute(){
   function listRoute(router) {
    let pathname =  filterPath(router.getCurrentLocation().pathname)
    return dispatch => dispatch(routerActions.push(`${pathname}`))
  }
   function addRoute(router) {
    let pathname = router.getCurrentLocation().pathname.replace(/\/$/,"")
    let hash=router.createLocation(`${pathname}/add`)
    return dispatch => dispatch(routerActions.push(hash))
  }

   function backRoute(router) {
    return dispatch => dispatch(routerActions.goBack())
  }

  function backRouteReload(router,location) {
     // let pathname = filterPath(router.getCurrentLocation().pathname)
     // 统一路径 detail/*之后 返回路径有问题
     let pathname=location.state.pathname.replace(/\/$/,"")
     // let pathname =  ""
     let newLocation={
       pathname: pathname,
       state:Object.assign({
         key: 'reload'
       },location.state)
     }
     let hash=router.createLocation(newLocation)

      return dispatch => dispatch(routerActions.push(hash))

  }
  function backListRoute(router) {
    let pathname = filterPath(router.getCurrentLocation().pathname.replace(/\/$/,""))
    let location={
      pathname: pathname,
    }
    let hash=router.createLocation(location)
   return dispatch => dispatch(routerActions.push(hash))
  }


   function editRoute(router,id) {
    let pathname = router.getCurrentLocation().pathname.replace(/\/$/,"")
    let hash=router.createLocation(`${pathname}/edit/${id}`)
    return dispatch => dispatch(routerActions.push(hash))
  }

  function detailRoute(router,id) {
   let pathname = router.getCurrentLocation().pathname.replace(/\/$/,"")
   let hash=router.createLocation(`${pathname}/detail/${id}`)
   return dispatch => dispatch(routerActions.push(hash))
  }

  return {
    listRoute,addRoute,editRoute,detailRoute,backRoute,backRouteReload,backListRoute
  }
}

export function dispatchHandler(name,payload){
    return {
      type:name,
      payload
    }
}

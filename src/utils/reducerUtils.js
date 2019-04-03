/**
 * @Date:   2017-09-20T10:57:29+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-02-01T08:59:58+08:00
 * @Description :  reducer 工具类，提供常见的方法包装修正STATE数据
 */



let filterListQuery=function(list,params){
    return list;
}

/**
 * [getList 获取列表方法，不带缓存处理]
 * @param  {[type]} state   [description]
 * @param  {[type]} list  [description]
 * @return {[type]} state   [description]
 */

export function getList(state,{list}){
  return Object.assign({},state,{
    list:list
  })
}
/**
 * [getList 保存列表方法，不带缓存处理]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]} state   [description]
 */

export function saveList(state,payload){
  state.list.clear()
  let {page,pageSize,totalRecord}=payload.page
  payload.list.forEach((it)=>state.list.set(it[state.key],it))
  state.page={current:page,pageSize,total:totalRecord}
  return state
}

/**
 * [removeItem 获取数据项]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */

export function removeItem(state,payload){
  state.list.delete(payload[state.key])
  return Object.assign({},state,{
  })
}

/**
 * [getItem 获取数据项]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */

export function getItem(state,payload){
  return Object.assign({},state,{
    item:state.list.get(payload.key)
  })
}


/**
 * [getItem 保存数据项]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
export function saveItem(state,payload){
  state.item={}
  return Object.assign({},state,payload)
}


/**
 * [newList 新列表，暂时无用]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */

export function newList(state,payload){
  return Object.assign({},state,{
    list:[]
  })
}

/**
 * [clearList 清空列表方法]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
export function clearList(state,payload){
  return Object.assign({},state,{
    list:[]
  })
}

/**
 * [newItem  创建空的对象]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
export function newItem(state,payload){
  return Object.assign({},state,{
    item:{}
  })
}

/**
 * [clearItem 清空对象方法]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */

export function clearItem(state,payload){
  return Object.assign({},state,{
    item:payload
  })
}

/**
 * [saveParams 保存页面请求参数]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */

export function saveParams(state,payload){
  return Object.assign({},state,{
    params:payload.params
  })
}
/**
 * [fetchRequest 请求发起状态]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */

export function fetchRequest(state,payload){
    let {spins} = state;
    spins[payload.label]=payload.spin
  return Object.assign({},state,{
    // status: state.status.set(payload.label,payload.code),
    spins:spins
  })
}

/**
 * [fetchSuccess 请求发起成功]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */

export function fetchSuccess(state,payload){
  let {spins} = state;
  spins[payload.label]=payload.spin
  return Object.assign({},state,{
    // status: state.status.set(payload.label,payload.code),
    spins:spins
  })
}

/**
 * [fetchFailure 请求发起失败]
 * @param  {[type]} state   [description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
export function fetchFailure(state,payload){
  let {spins} = state;
  spins[payload.label]=payload.spin
  console.log(payload)
  return Object.assign({},state,{
    // status: state.status.set(payload.label,payload.code),
    spins:spins
  })
}


// 下面带缓存扩展后续补充
// to reducerUtils method
/*
let savePage = (state,payload) =>{
  return Object.assign({},state,{
    cached:{
      paging:{
        pages:state.cached.paging.pages.push(payload.paging.pageIndex),
      },
      query:{
        pageIndex:payload.paging.pageIndex
      }
    }
  })
}

let storage2Map = (state,payload)=> {
  payload.data.forEach((it)=>state.cached.storage.set(it['a'],it))
  return Object.assign({},state,{
    cached:{
      storage:storage2Map(state.cached.storage,payload.data)
    }
  })
}
*/


import store from '../store'

function getAuthList(){
   return store.getState().appReducer.resourceList
}
let hasPermission

if (process.env.NODE_ENV === 'development') {
  hasPermission=function(modulesName){
    // console.log(modulesName)
    return getAuthList().filter((rl)=>{
      return modulesName.indexOf(rl.note)>=0
    }).length>0
  }
}else{
  hasPermission=function(modulesName){
    // console.log(modulesName)
    return getAuthList().filter((rl)=>{
      return modulesName.indexOf(rl.note)>=0
    }).length>0
  }
}



var  ConfigUtils={
  getAuthList,
  hasPermission
}

export {
  getAuthList,
  hasPermission
}
export default ConfigUtils

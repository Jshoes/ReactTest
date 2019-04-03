import store from '../store'

export function getDictByType(type){
  var dictObject=store.getState().appReducer.dicts
  return dictObject.get(type) &&  dictObject.get(type).sort((a,b)=>a.keySort>b.keySort)

}

export function getDictItemByValue(type,value){
  var dictObject=store.getState().appReducer.dicts
  return this.getDictByType(type) &&  this.getDictByType(type).filter((it)=>{
    return it.keyValue == value
  })
}

export function getDictLabelByValue(type,value){
    var dictObject=store.getState().appReducer.dicts
    var result=this.getDictItemByValue(type,value)
    if(result && result.length>0){
      return result[0].keyName
    }else{
      return
    }
}

let DictUtils={getDictByType,getDictItemByValue,getDictLabelByValue}

export default DictUtils

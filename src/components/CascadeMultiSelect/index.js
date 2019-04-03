import React,{Component} from 'react'
import styles from './style.less'
function cascadeLabel(item){
  var children = !item.children?"":item.children
  var length = !item.children?0:item.children.length
  if(length>0){
    for(var i=0;i<length;i++){
      return item.label + "-" + cascadeLabel(children[i])
    }
  }else{
    return item.label
  }
}
export default class CascadeMultiSelect extends Component{
  state ={
    defaultValue:[]
  }

  constructor(props) {
    super(props);
    this.state = {
       defaultValue:props.value
    };

    // this.state.editorState=convertFromRaw(props.value)
  }
  componentWillReceiveProps(nextProps){
    let {value} = nextProps
    this.setState({
      defaultValue:value
    });
  }

  onSelectHandler(valueList, labelList, leafList, cascadeList){
    // console.log(valueList, labelList, leafList, cascadeList)
    let onChange=this.props.onChange
    this.props.onChange(valueList)
  }
  convertValue(value){
    let vArray=[]
    return value &&  value.map(v=>{
      if(v){
        vArray=v.split("-")
        return vArray[vArray.length-1]
      }else{
        return ""
      }
    })
  }
  render(){
    let {options,onChange,cascadeSize,sort} = this.props
    let {defaultValue}=this.state
    // console.log(options)
    return (
      <CMS options={sort?options.sort((a,b)=>{return a.code - b.code}):options} cascadeSize={cascadeSize} onSelect={this.onSelectHandler.bind(this)} value={defaultValue} />
    )
  }
}

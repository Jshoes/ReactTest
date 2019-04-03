import React,{Component} from 'react'
import {Card,Switch,Collapse} from 'antd'
import BaseForm,{FormItem} from 'components/BaseForm'

const Panel = Collapse.Panel

export default class SwitchCard extends Component{
  static  defaultProps ={
      defaultValue:true,
      prefixCls: 'ant-collapse',
      name:""
  }

   state = {
      checked:false
    }
    constructor(props) {
      super(props);
    //  console.log("props:",props)
      this.state = {
        checked:props.defaultValue
      };
    }
    componentWillReceiveProps(nextProps){
      let {defaultValue} = nextProps
      if(nextProps.defaultValue !== this.props.defaultValue){
        this.setState({
          checked:defaultValue
        })
      }
    }
    switchChange(checked){
      this.setState({
        checked:checked
      },function(){
        console.log(this.state.checked)
      })
    }
    renderSwitch(){
      const {children,title,name, ...otherProps} = this.props
      const {checked} = this.state
      return (<h4>{title}<FormItem><Switch checkedChildren="开" unCheckedChildren="关" name={name} valuePropName={"checked"}  defaultValue={checked} value={checked} onChange={this.switchChange.bind(this)} /></FormItem></h4>)
    }
    render(){
      let {children,title,name,...otherProps} = this.props
      let {checked} = this.state
      return (
        <Panel showArrow={false}  key={this.props.name} {...otherProps} header={this.renderSwitch() } prefixCls='ant-collapse' destroyInactivePanel={true} isActive={checked} onItemClick={()=>null}>
          {children}
        </Panel>
      )
    }
}

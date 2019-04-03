/**
 * @Author: jaxchow
 * @Date:   2017-07-06T11:27:15+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-16T14:03:43+08:00
 * @Description: DEMO页
 */

import React, {Component} from 'react'
import HierarchySelection from 'components/HierarchySelection'
import BaseForm,{FormItem} from 'components/BaseForm'
//import {reduxForm,Field } from 'redux-form'
//import { required, email } from 'redux-form-validators'
import {Icon,Popover, Button} from 'antd';
import source from './zl_data'

// import style from './style.less'

let data=source.options.place
export default class Demo extends Component {
  state={
    activeNode:undefined,
    activeSubNode:undefined,
    activeLastNode:undefined,
    values:[]
  }

  handleSubmit(value) {
    console.log(value)
  }
  activeNode(node){
    this.setState({
      activeNode:node,
      activeSubNode:undefined,
      activeLastNode:undefined
    })
  }
  activeSubNode(node){
    this.setState({
      activeSubNode:node
    })
  }
  activeLastNode(node){
    this.setState({
      activeLastNode:node
    })
  }
  selectNode(e){
    let {onChange}=this.props
    let {values} =this.state
  //  console.log(e.target.checked)
    if(e.target.checked){
      values=values.concat(e.target.value)
    }else{
      values=values.filter((v)=>v!=e.target.value)
    }
    if(values.length>5){
      e.preventDefault()
      e.stopPropagation()
    }else{
      this.setState({
        values:values
      })
      onChange && onChange(this.state.values)
    }
    // return false
  }
  renderSubItem(d,p){
    let {activeLastNode,values} = this.state
    return d && d.children && d.children.length>0 && d.children.map((c)=>{
        let className="nodeSubItem"
        if(activeLastNode && activeLastNode.code == c.code){
          className+=" active"
        }
       return (<div key={c.code} className={className} onClick={this.activeLastNode.bind(this,c)}><label><input type="checkbox" onClick={this.selectNode.bind(this)} defaultChecked={values.indexOf(p.keyName+"-"+d.keyName+"-"+c.keyName)>=0} value={p.keyName+"-"+d.keyName+"-"+c.keyName} />{c.keyName}</label></div>)
    })
  }
  renderItem(d){
    let {activeSubNode,values} = this.state
    return d && d.children && d.children.length>0 && d.children.map((c)=>{
      let className="nodeItem"
      if(activeSubNode && activeSubNode.code == c.code){
        className+=" active"
      }
      return (<div key={c.code} className={className} onClick={this.activeSubNode.bind(this,c)}><label><input type="checkbox" onClick={this.selectNode.bind(this)} defaultChecked={values.indexOf(d.keyName+"-"+c.keyName)>=0} value={d.keyName+"-"+c.keyName} />{c.keyName}</label><div className="nodeItemCon">{this.renderSubItem(c,d)}</div></div>)
    })
  }
  renderSider(){
    let {activeNode} = this.state
    return data.map((d)=>{
      let className="catalog"
      if(activeNode && activeNode.code == d.code){
        className+=" active"
      }
      return (<li key={d.code} className={className} onClick={this.activeNode.bind(this,d)}>{d.keyName}</li>)
    })
  }
  renderSelectNodes(values) {
    if(values.length > 0){
      return values.map((it)=>{
        return (<li className="node">{it}<Icon type="close" className="node-close" onClick={this.deleteSelectNode.bind(this,it)} /></li>)
      })
    }
  }
  deleteSelectNode(value) {
    let {values} = this.state
    values=values.filter((v)=>v!=value)
    this.setState({
      values: values
    })
  }
  // <div className="cascade-multiple-selection">
  //
  //   <ul className="selectNodes">
  //     {this.renderSelectNodes(values)}
  //   </ul>
  //
  //   <div className="caseMutile">
  //     <ul className="renderSider" >
  //       {this.renderSider()}
  //     </ul>
  //     <div className="catalog-active-node">
  //       {this.renderItem(activeNode)}
  //     </div>
  //   </div>
  // </div>

  render() {
    let {activeNode,values}=this.state
    console.log(values)
    let saveFormRef = (form) => {
      this.form = form;
    }
    let handleSubmit = (values)=>{
      console.log(values)
    }
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
        <FormItem>
          <HierarchySelection name="test" label="test" options={data} maxChosen={3} />
        </FormItem>
      </BaseForm>

    )
  }
}

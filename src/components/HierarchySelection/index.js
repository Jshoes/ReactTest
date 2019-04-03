/**
 * @Author: jaxchow
 * @Date:   2017-07-06T11:27:15+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-01-16T14:03:43+08:00
 * @Description: DEMO页
 */

import React, {Component} from 'react'
import {FormPage} from 'components/Page'
//import {reduxForm,Field } from 'redux-form'
//import { required, email } from 'redux-form-validators'
import {Icon,Popover,Input,Modal} from 'antd';
import style from './style.less'

class HierarchySelection extends Component {
  state={
    activeNode:undefined,
    activeSubNode:undefined,
    activeLastNode:undefined,
    values:[]
  }
  constructor(props) {
    super(props)
    this.state.values = props.defaultValue
  }

  handleSubmit(value) {
    // console.log(value)
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
    let {onChange,maxChosen}=this.props
    let {values} =this.state

    if(e.target.checked){
      values=values.concat(e.target.value)
    }else{
      values=values.filter((v)=>v!=e.target.value)
    }


    if(values.length<=maxChosen){
      onChange && onChange(values)
      // console.log(values)
      this.setState({
        values:values
      })

      // console.log(onChange)

    }else{
      e.preventDefault()
      e.stopPropagation()
    }
    if(e.delete) {
      let valueArr = e.target.value.split('-')
      if(valueArr.length == 2){
        this.setState({
          activeSubNode:undefined,
          activeLastNode:undefined
        })
      }else if(valueArr.length == 3){
        this.setState({
          activeLastNode:undefined
        })
      }
      // console.log(this.state)
    }
    // console.log(values)
    // return false
  }
  renderSubItem(d,p){
    let {activeLastNode,values} = this.state
    // console.log(values)
    return d && d.children && d.children.length>0 && d.children.map((c)=>{
        let className="nodeSubItem"
        if(activeLastNode && activeLastNode.keyName == c.keyName){
          className+=" active"
        }
       return (<div key={c.keyName} className={className}  onClick={this.activeLastNode.bind(this,c)}><label><input type="checkbox" onClick={this.selectNode.bind(this)} defaultChecked={values.indexOf(p.keyName+"#"+d.keyName+"#"+c.keyName)>=0} checked={values.indexOf(p.keyName+"#"+d.keyName+"#"+c.keyName)>=0} value={p.keyName+"#"+d.keyName+"#"+c.keyName} />{c.keyName}</label></div>)
    })
  }
  renderItem(d){
    let {activeSubNode,values} = this.state
    // console.log(values)
    return d && d.children && d.children.length>0 && d.children.map((c)=>{
      let className="nodeItem"
      let subClassName = "nodeItemCon"
      if(activeSubNode && activeSubNode.keyName == c.keyName){
        className+=" active"
      }
      if(c.children.length == 0){
        subClassName += " nodeItemCon-noborder"
      }
      return (<div key={c.keyName} className={className} onClick={this.activeSubNode.bind(this,c)}><label><input type="checkbox" onClick={this.selectNode.bind(this)} defaultChecked={values.indexOf(d.keyName+"#"+c.keyName)>=0} checked={values.indexOf(d.keyName+"#"+c.keyName)>=0} value={d.keyName+"#"+c.keyName} />{c.keyName}</label><div className={subClassName}>{this.renderSubItem(c,d)}</div></div>)
    })
  }
  renderSider(data,values){
    let {activeNode} = this.state
    let {sliderSelect} = this.props
    return data.map((d)=>{
      let className="catalog"
      if(activeNode && activeNode.keyName == d.keyName){
        className+=" active"
      }
      if(sliderSelect){
        return (<li key={d.keyName} className={className} title={d.keyName} onClick={this.activeNode.bind(this,d)}><input type="checkbox" onClick={this.selectNode.bind(this)} defaultChecked={values.indexOf(d.keyName)>=0} checked={values.indexOf(d.keyName)>=0} value={d.keyName} />{d.keyName}</li>)
      }else {
        return (<li key={d.keyName} className={className} title={d.keyName} onClick={this.activeNode.bind(this,d)}>{d.keyName}</li>)
      }
    })
  }
  renderSelectNodes(values) {
    if(values.length > 0){
      return values.map((it)=>{
        return (<li className="node" key={it}>{it}<Icon type="close" className="node-close" onClick={this.deleteSelectNode.bind(this,it)} /></li>)
      })
    }
  }
  deleteSelectNode(value) {
    let node = {
      target: {
        checked: false,
        value: value
      },
      delete: true
    }
    this.selectNode(node)
    // console.log(this.state)
  }
  render() {
    let {activeNode,values}=this.state
    // console.log(activeNode)
    let {options} = this.props
    return (
      <div className="cascade-multiple-selection">
        <ul className="selectNodes">
          {this.renderSelectNodes(values)}
        </ul>
        <div className="caseMutile">
          <ul className="renderSider" >
            {this.renderSider(options,values)}
          </ul>
          <div className="catalog-active-node">
            {this.renderItem(activeNode)}
          </div>
        </div>
      </div>
    )
  }
}


export default class HierarchySelectionView extends Component {
  state = {
    visible: false,
    value: ""
  }
  constructor(props) {
    super(props)
    this.state.value = props.value
  }
  componentWillReceiveProps(nextProps){

      this.setState({
        value:nextProps.value
      });

  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    let {options,maxChosen,onChange,label,sliderSelect} = this.props
    let {value} = this.state
    // console.log(value)
    return (
      <div>
       <Input onClick={this.showModal} value={value&&value!=""&&value.length>0?value.join(" , "):""} />
       <Modal
         title={"选择"+label}
         visible={this.state.visible}
         onOk={this.handleOk}
         onCancel={this.handleCancel}
         width={800}
       >
         <HierarchySelection onChange={onChange} options={options} maxChosen={maxChosen} defaultValue={value} sliderSelect={sliderSelect}/>
       </Modal>
     </div>
    )
  }
}

HierarchySelectionView.defaultProps = {
  maxChosen: 3
}

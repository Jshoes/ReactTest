import React,{Component,} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {Menu,Icon,Dropdown,Button,Tooltip,Popconfirm,Modal} from 'antd'

class Comfirm extends Component{
  onConfirmClick(){
    const {onConfirm,title}=this.props
    return Modal.confirm({
    title: '确认框',
    content: title,
    okText: '确认',
    onOk:onConfirm,
    cancelText: '取消'})
  }
  render(){
    // return Modal.confirm({ title: 'Confirm',
    // content: 'Bla bla ...',
    // okText: '确认',
    // cancelText: '取消'})
    let {children} =this.props
    return  React.cloneElement(children,{onClick:this.onConfirmClick.bind(this)},)
  }
}

// onConfirm
// title

export default class ButtonGroupExt extends Component{
  static defaultProps={
    showSize:3
  }
  renderButtomMenu(){
    var {children,onClick} = this.props;
    var primaryChildren=children.filter((it,idx)=>idx==0)
    const menu = (
      <Menu onClick={onClick}>
        {
          children.map((ch,idx)=>{
            let {icon,children,actionkey,href,disabled} = ch.props
            return (
              <Menu.Item key={actionkey} disabled={disabled} style={{textAlign:"center"}}>
                <Link to={href}>
                  {children}
                </Link>
              </Menu.Item>
            )
            // return React.createElement(Menu.Item,{key:actionkey},React.cloneElement(ch,{size:'small'}))
          })
        }
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <Icon type="bars" />
      </Dropdown>
    )
  }
  renderButtomGroup(){
    var {children,onClick} = this.props;
      let element = children
    if(children && React.Children.count(children)==1){
      let {icon,children,actionkey,confirm} = element.props
      if(confirm){
        return React.createElement(Tooltip,{title:children},React.createElement(Comfirm,{title:confirm,placement:"bottom",onConfirm:()=>onClick.call(this,actionkey)},React.cloneElement(element,{size:'small'},"")))
      }else{
        return React.createElement(Tooltip,{title:children},React.cloneElement(element,{size:'small',onClick:onClick.bind(this,actionkey)},""))
      }
    }
    //  console.log(children)
     return children &&  children.map((ch,idx)=>{
        let {icon,children,actionkey,confirm,disabled} = ch.props
        let otherProps={}
        if(disabled){
          otherProps={
            visible:false
          }
        }
        if(confirm){
          return React.createElement(Tooltip,Object.assign({},{title:children,key:idx},otherProps),React.createElement(Comfirm,{title:confirm,placement:"bottom",onConfirm:()=>onClick.call(this,actionkey)},React.cloneElement(ch,{size:'small'},"")))
        }else{
          return React.createElement(Tooltip,Object.assign({},{title:children,key:idx},otherProps),React.cloneElement(ch,{size:'small',onClick:onClick.bind(this,actionkey)},""))
        }
     })
  }
  renderChildren(){
    var {children,showSize} = this.props
    if(children.length>showSize){
      return this.renderButtomMenu()
    }else{
      return (
        <Button.Group size="small">
          {this.renderButtomGroup()}
        </Button.Group>
      )
    }
  }
  render(){
    var {children} = this.props;
    return (
      <div className="ant-botton-bar">
        {this.renderChildren()}
      </div>
    )
  }
}

ButtonGroupExt.propTypes = {
  children: PropTypes.any.isRequired,
}

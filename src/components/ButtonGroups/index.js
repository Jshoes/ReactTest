import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {menu,Button,Icon,Tooltip,Popconfirm,Menu,Dropdown,Modal} from 'antd'
import {hasPermission} from 'app/utils/ConfigUtils'

/*
*children 1个 多个数据格式处理
*
*/

export class Comfirm extends Component{
  onConfirmClick(){
    const {onConfirm,title,content}=this.props
    return Modal.confirm({
      title: "确认框",
      content: content,
      okText: '确认',
      onOk:onConfirm,
      cancelText: '取消'
    })
  }
  render(){
    let {children} =this.props
    return  React.cloneElement(children,{onClick:this.onConfirmClick.bind(this)})
  }
}

export default class ButtonGroups extends Component {

  static contextTypes = {
    appReducer:PropTypes.object
  }


  renderButtonOnly(){
    let {children,handleClick} = this.props
    let childrenArray = React.Children.toArray(children)
    let {appReducer} = this.context
    // console.log(this.context.appReducer)
    return childrenArray
    .filter((it)=>{
      return it.props.permission==undefined?true:hasPermission(it.props.permission)
    })
    .map((it,idx)=>{
      return this.renderReactElement(it,idx)
    })
  }

  renderReactElement(it,idx){
    let {handleClick} = this.props
    let {tooltext,confirm,placement,children,actionkey,block} = it.props

    if(confirm){
      return React.createElement(
        Comfirm,
        Object.assign({},{title:"确认框",content:confirm,placement:placement,onConfirm:()=>{handleClick(actionkey)}}),
        React.createElement(Tooltip,Object.assign({},{key:idx,title:tooltext}),React.cloneElement(it,Object.assign({},it.props),children))
      )
    }else{
      return React.createElement(Tooltip,Object.assign({},{key:idx,title:tooltext}),React.cloneElement(it,Object.assign({},it.props,{onClick:()=>{handleClick(actionkey)}}),children))
    }
  }
    // return

  renderMenuReactElement(it,idx){
    let {tooltext,placement,children,actionkey} = it.props
    return React.createElement(
      Tooltip,
      Object.assign({},{key:idx,title:tooltext}),
      React.cloneElement(it,Object.assign({},it.props),children)
    )
  }

  renderMixButtonMenu(){
    let {children,showSize,handleClick} = this.props
    let childrenArray = React.Children.toArray(children)

    let endArray = childrenArray.splice(showSize)

    return (
      <div>
        {
          childrenArray
          .filter((it)=>{
            return it.props.permission==undefined?true:hasPermission(it.props.permission)
          })
          .map((it,idx)=>{
            return this.renderReactElement(it,idx)
          })
        }
        <Dropdown overlay={this.renderMenuItem(endArray)}><Button><Icon type="ellipsis"/></Button></Dropdown>
      </div>
    )
  }

  renderMenuItem(itemList){
    let {handleClick} = this.props
    return (
      <Menu onClick={handleClick}>
        {itemList.map((it,idx)=>{
          return (<Menu.Item key={idx}>
                  {this.renderMenuReactElement(it,idx)}
            </Menu.Item>)
          })}
      </Menu>
    )
  }

  renderChildren(){
    let {children,showSize} = this.props
    let childrenArray = React.Children.toArray(children)

    return (
      <Button.Group>
        {childrenArray.length > showSize ? this.renderMixButtonMenu() : this.renderButtonOnly() }
      </Button.Group>
    )
  }

  render(){
    let {children} = this.props
    return (
      <div className="button-groups">
        {this.renderChildren()}
      </div>
    )
  }
}

/*
* showSize:超过收起的数目
* handleClick : 点击事件（需子元素以actionKey区分）
* 子元素如需confirm确认 子元素自身添加confirm 属性 value为提醒文字
* tooltext 为元素上移显示文字
*/
ButtonGroups.propTypes = {
  showSize: PropTypes.number,
  handleClick:PropTypes.func,
  children:PropTypes.element,
}
ButtonGroups.defaultProps = {
  showSize:5,
}

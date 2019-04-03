
import React, {Component} from 'react'
import PropTypes from 'prop-types'


/**
 * 列表页的父类组件
 * @type {component}
 */

export default class IframePage extends Component {
  render(){
    let {src,name}=this.props
    return (<iframe src={src} name={name} width="100%" height="100%" frameBorder="0" stye="height:100%;width:100%;"></iframe>)
  }
}

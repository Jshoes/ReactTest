import React,{Component} from 'react'
import PropTypes from 'prop-types'

export default class Layout extends Component{

  static defaultProps={
    direction:'column',
    position:false
  }
  static propTypes={
    direction:PropTypes.oneOf(['column', 'rows'])
  }

  render(){
    let {children,direction,style,className} = this.props
    let styles=  Object.assign({}, {
        display:'flex',
        flex:'1',
        overflow:'hidden',
        flexDirection:direction
      }, style)
    return (<div className={`layout ${className}`} style={styles}>{children}</div>)
  }
}

class Fixed extends Component{

  static defaultProps={
  }
  static defaultTypes={
  }
  render(){
    let {children,style,width} = this.props
    let styles=  Object.assign({display:'flex',flexDirection: 'column'},style)
    return (<div className="layout-fixed" style={styles}>{children}</div>)
  }
}

class Pane extends Component{
  render(){
    let {children,style} = this.props
    let styles=  Object.assign({}, {display:'flex','flex':'1',position:'relative'}, style)
    return (<div className="layout-pane" style={styles}>{children}</div>)
  }
}

export {Layout,Fixed,Pane}

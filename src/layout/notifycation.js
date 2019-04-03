import {Component} from 'react'
import {connect} from 'react-redux'
import {notification} from 'antd'

@connect((state,ownProps)=>state.notifycation)
export default class Notifycation extends Component{
  constructor(props) {
      super(props)
  }
  render(){
    const notify=this.props.notifycation
   notify &&  notification.open({
      message: 'server error',
      description: `${notify.status}`,
    })
    return null
  }
}

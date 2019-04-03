/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-13T10:12:15+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row,
  Col,
  Modal,
  Button,
  Input,
  Form,
  DatePicker,
  Layout,
  Spin,
  Select,
  Checkbox,
  Popover
} from 'antd'
import moment from 'moment';
import {FormPage} from 'components/Page'
import WrapperComponent from '../../decorators/WrapperComponent'
import DictUtils from 'app-utils/DictUtils'
import PropsList from '../PropsList.component'

const Option = Select.Option
const InputGroup = Input.Group;
const {TextArea} = Input

export default class CountdownButton extends Component {
  state = {
    disabled: false,
    content: ""
  }

  constructor(props) {
    super(props);
    this.state.content = props.name
  }

  handlerCountdown(clickEvent) {
    let {time,buttonChanged} = this.props
    clickEvent()
    if(buttonChanged) {
      let self = this
      let timer = setInterval(function(){
        self.setState({
          content: (time--) + "s",
          disabled: true
        })
        if(time<0){
          clearInterval(timer)
          self.setState({
            content: "重新获取",
            disabled: false
          })
        }
      },1000)
    }
  }

  render() {
    let {content,disabled} = this.state
    let {clickEvent} = this.props
    return (
      <Button onClick={this.handlerCountdown.bind(this,clickEvent)} disabled={disabled} className="extra-button">{content}</Button>
    )
  }
}

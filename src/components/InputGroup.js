/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-13T10:12:15+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Input,
} from 'antd'

const InputGroup = Input.Group;

export default class InputStrGroup extends Component {
  state = {
    value:["",""]
  }

  constructor(props) {
    super(props);
    this.state.value = props.value
  }

  componentWillReceiveProps(nextProps){
    let {value} = nextProps
    this.setState({
      value:value
    });
  }

  onChange(type,e) {
    // console.log(type,e.target.value)
    let {onChange} = this.props
    let value = this.state.value
    if(type == 1){
      value[0] = e.target.value
    }else if(type == 2){
      value[1] = e.target.value
    }
    this.setState({
      value: value
    })
    onChange(value)
    // console.log(this.state.value)
  }
  render() {
    let {value} = this.state
    return (
      <InputGroup compact>
        <Input style={{ textAlign: 'center',width:"45%" }} placeholder="" onChange={this.onChange.bind(this,'1')} value={value[0]} />
        <Input style={{ width: "10%", borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
        <Input style={{ textAlign: 'center', borderLeft: 0,width:"45%" }} placeholder="" onChange={this.onChange.bind(this,'2')} value={value[1]} />
      </InputGroup>
    )
  }
}


InputStrGroup.defaultProps = {
  value:["",""]
}

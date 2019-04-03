import React,{Component} from 'react'
import { Tag } from 'antd';
const { CheckableTag } = Tag;

export default class CheckTag extends React.Component {
  state = { checked:false }
  
  constructor(props) {
      super(props)
      this.state.checked=props.checked
  }
    componentWillReceiveProps(nextProps){
        if(nextProps.checked == this.props.checked){
            this.state.checked=nextProps.checked
        }
    }
  handleChange = (checked) => {
    let {onChange,labelcode,labelname} = this.props
    this.setState({ checked })
      onChange(checked,labelcode,labelname)
  }
  render() {
    return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  }
}

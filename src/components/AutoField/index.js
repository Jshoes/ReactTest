import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Input,
    AutoComplete,
    Dropdown,
    Icon,
} from 'antd'

const Search = Input.Search;
const AutoCompleteOption = AutoComplete.Option;


export default class AutoField extends Component{
  static state={
    value:""
  }
  constructor(props) {
    const {options} = props
    super(props)
     this.state={
       value : options.filter((c)=>c.isDefault=="1").map(v=>v.company).pop()
     }
  }
  componentWillMount(){
    let {value} = this.state
    this.props.onChange(value)
  }
  componentWillReceiveProps(nextProps){
    let {value,options} = nextProps
    const { onChange } = this.props
    if(JSON.stringify(this.props.options) != JSON.stringify(options)){
      const defaultValue=options.filter((c)=>c.isDefault=="1").map(v=>v.company).pop()
      this.setState({
        value:defaultValue
      });
      onChange(defaultValue)
    }
  }

  renderAutoCompleteOpt(data){
    return data.map((opt,idx)=>{
      return (<AutoCompleteOption key={opt.company+idx} value={opt.company}>
      {opt.company}
      <span className="certain-search-item-count">{opt.companyArea} </span>
    </AutoCompleteOption>)
    })
  }
  onSearch(value) {
    const { onChange } = this.props
    this.setState({
      value: value
    })
    onChange(value)
  }

  render(){
    let {value} = this.state
    let {options} = this.props
    const acOptions=options.map((c)=>c.company)
    return (
      <AutoComplete
        defaultActiveFirstOption={true}
        size="large"
        name="companyName"
        style={{ width: '100%' }}
        // dataSource={this.renderAutoCompleteOpt(options)}
        dataSource={acOptions}
        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        placeholder="请输入公司名称搜索"
        value={value}
        defaultValue={value}
        onChange={this.onSearch.bind(this)}
      >
          <Input value={value}/>
      </AutoComplete>
    )
  }


}

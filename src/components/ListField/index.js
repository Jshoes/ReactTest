
import React, {Component} from 'react'
import style from'./style.less'
import PropTypes from 'prop-types'
import {
    List,
    Input,
    Icon,
    Button,
    Menu
} from 'antd'
const Search = Input.Search;

const { SubMenu } = Menu;

export default class ListField extends Component{
  static state={
    value:""
  }
  constructor(props) {
    const {options} = props
    super(props)
     this.state={
       value : ""
     }
  }
  componentWillReceiveProps(nextProps){
    let {value} = nextProps
    this.setState({
      value:value
    });
  }

  render(){
    let {value} = this.state
    let {dataSource,renderItem} = this.props

    return (
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={dataSource}
        renderItem={renderItem}
      />
    )
  }
}

export class JobListField extends Component{
  state ={
    filterText:"",
    inside:true,
    value:this.props.value
  }

  componentWillReceiveProps(nextProps){
    let {value} = this.props
    if(this.props.value != nextProps.value){
      this.setState({
        value : nextProps.value,
      })
    }
  }

  onChange({item, key, selectedKeys}){
    let {onChange} = this.props
    // console.log("onChange",item.props.jobId,this.state.value)
    this.setState({
      value:item.props.jobId
    },function(){
      onChange(item.props.jobId)
    })
  }
  onSearchChange(evt){
    this.setState({
      filterText:evt.target.value
    })
  }
  onSearch(value){
    this.setState({
      filterText:value
    })
  }
  onExpand(inside){
    // if(this.state.value){
      this.setState({
        inside:!inside
      })
    // }
  }
  render(){
    let {children} = this.props
    const {filterText,value,inside} = this.state
    var patte=new RegExp(filterText,"gi")
    return (
      <div className="JobListField" onMouseEnter={()=>this.onExpand.call(this,false)} onMouseLeave={()=>this.onExpand.call(this,true)}>
        <Button className="toggle-btn" onClick={this.onExpand.bind(this,inside)}>{inside?"收起":"展开"}</Button>
        <Search
        onSearch={this.onSearch.bind(this)}
        onChange={this.onSearchChange.bind(this)}
      />
        <Menu selectedKeys={[".$"+value]} onSelect={this.onChange.bind(this)}>
          {
            React.Children.toArray(children).filter((it)=>{
              if(inside){
                return filterText=="" || patte.test(it.props.children)
              }else{
                return new RegExp(it.props.jobId).test(value)
              }
            })
          }
        </Menu>
      </div>
    )
  }
}

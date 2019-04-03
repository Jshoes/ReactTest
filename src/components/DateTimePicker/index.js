import React,{Component} from 'react'
import {
  DatePicker,
  TimePicker,
  Input,
} from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './styles.less'
const InputGroup = Input.Group



export default class DateTimePicker extends Component{
  constructor(props){
    super(props)
    this.state = {
      date:props.defaultDate,
      time:props.defaultTime,
    }
  }
  componentWillMount(){
    let {onChange,defaultDate,defaultTime} = this.props
    if(defaultDate&&defaultTime){
      onChange(this.getFormatFn(defaultDate,defaultTime))
    }
  }
  getFormatFn(date,time){
    let resultDate = moment().set({
      year:moment(date).get("year"),
      month:moment(date).get("month"),
      date:moment(date).get("date"),
      hour:moment(time).get("hour"),
      minute:moment(time).get("minute"),
      second:moment(time).get("second"),
    })
    return resultDate
  }
  dateChangeFn(date,dateStr){
    let {onChange} = this.props
    let {time} = this.state
    this.setState({
      date:date
    })
    onChange(this.getFormatFn(date,time))
  }
  timeChangeFn(time,timeStr){
    let {onChange} = this.props
    let {date} = this.state
    console.log(time,timeStr)
    this.setState({
      time:time
    })
    console.log(this.getFormatFn(date,time))
    onChange(this.getFormatFn(date,time))
  }
  render(){
    let {defaultDate,defaultTime} = this.props
    return (
      <InputGroup compact className="feedForm-DateTimePicker">
      <DatePicker defaultValue={defaultDate} onChange={this.dateChangeFn.bind(this)} rules={this.props.rules}/>
      <TimePicker minuteStep={15} hideDisabledOptions defaultValue={defaultTime} format='HH:mm' onChange={this.timeChangeFn.bind(this)} rules={this.props.rules} />
      </InputGroup>
    )
  }
}

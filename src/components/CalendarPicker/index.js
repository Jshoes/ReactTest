import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DatePicker } from 'antd'
const {RangePicker} = DatePicker;

class CalendarPicker extends Component {
  disabledDate(value){
    var {minDate,maxDate}= this.props
    return !value.isBetween(moment(minDate),moment(maxDate))
  }
  render() {
    let {children,value,...otherProps} = this.props
    // console.log(this.props)
    for(var i in value){
      if(typeof(value[i])=='string'){
        value[i]=moment(value[i])
      }
    }

    // newValue=[moment(value[0]),moment(value[1])]
    return (
      <RangePicker {...otherProps} value={value} disabledDate={this.disabledDate.bind(this)} />
    )
  }
}

CalendarPicker.defaultProps = {
  ranges: {
    '今天': [
      moment(), moment()
    ],
    '近三天': [
      moment().add(-2,'days'), moment()
    ],
    '近七天': [
        moment().add(-6,'days'), moment()
    ],
    '近三十天': [
        moment().add(-29,'days'), moment()
    ]
  },
  showToday:true,
  format:'YYYY-MM-DD',
  minDate:'1900-01-01',
  maxDate:'2299-01-01'
}

export default CalendarPicker

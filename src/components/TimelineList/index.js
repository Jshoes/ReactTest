import React,{Component} from 'react'
import PropTypes from 'prop-types'
import groupArray from  'group-array'
import { Timeline,List } from 'antd'
import moment from 'moment'


export default class TimelineList extends Component{

  dateFromNow(date){
    return new moment(date,'YYYY-MM-DD').calendar(null,{
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'YYYY-MM-DD'
    })
  }
  renderList(title,data){
    let {itemRender} = this.props
    // console.log(this.dateFromNow(title))
    return (
        <Timeline.Item key={title}>{this.dateFromNow(title)}
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) =><List.Item>{itemRender(item)}</List.Item>
              }
            />
        </Timeline.Item>
    )
  }
  renderTimelineItems(){
    let { list }=this.props
    let listArray=new Array()
    let groupList = groupArray(list,'createDate')
    for(var it in groupList){
      listArray.push(this.renderList(it,groupList[it]))
    }
    return listArray
  }

  render(){
    return (
      <Timeline>
        {this.renderTimelineItems()}
      </Timeline>
    )
  }
}

TimelineList.propTypes={
  list:PropTypes.array.isRequired,
  itemRender:PropTypes.func.isRequired
}

TimelineList.defaultProps={
  list:[],
  listItemRender:function(){}

}

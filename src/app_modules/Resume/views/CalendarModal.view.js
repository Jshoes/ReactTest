import React, {Component, PropTypes} from 'react'
import {
  Button,
  Col,
  Row,
  Card,
  Input,
  Table,
  Select,
  Modal,
  List,
  Menu,
  Tag,
  Calendar,
  Dropdown,
  Icon,
  Avatar,
} from 'antd'
import {Link} from 'react-router'
import WrapperComponent from "app/decorators/WrapperComponent"
import {ResumeCalendarModal} from 'app/components/Modal.view'
import PageView from 'app/components/Page'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import Permission from 'app/components/Permission'
import Ellipsis from 'app/components/Ellipsis'
import DictUtils from 'app/utils/DictUtils'
import styles from './resumeCalendar.less'
import moment from 'moment';
const Option = Select.Option

@WrapperComponent(ResumeCalendarModal)
export default class CalendarModalView extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let {actions,router} = this.props;
      let dateStr = moment().format("YYYY-MM-DD")
    actions.loadCards({dateStr:dateStr,resultType:1})
  }
    renderCard(todos){
       return  todos && todos.map((it,idx)=>{
            return (
                <Col key={idx} span={8}>
                    <Card>
                        <Row>
                            <span>
                                <Tag color="#2db7f5">
                                    {DictUtils.getDictLabelByValue("interviewstage",it.type)}
                                </Tag>
                            </span>
                            <span>
                                {moment(it.interviewTime).format("HH:mm")}
                            </span>
                        </Row>
                        <Row>
                            <span>
                                <Icon type="user" style={{fontSize:16,marginRight:10}}/><Ellipsis tooltip={true} length={10}>{it.interviewer}</Ellipsis>
                            </span>
                        </Row>
                        <Row>
                            <span className="name">
                                <Ellipsis tooltip={true} length={8}>{it.name}</Ellipsis>
                            </span>
                            <span className="jobTitle">
                                <Ellipsis tooltip={true} length={10}>{it.jobTitle}</Ellipsis>
                            </span>
                        </Row>
                    </Card>
                </Col>
            )
        })

    }
  handleSelectChange(value) {
    let {actions} = this.props
    let dateStr = value.format("YYYY-MM-DD")
    actions.loadCards({dateStr:dateStr,resultType:1})
  }

  render(){
    let {children,reduce:{todos}} = this.props
      let lengths = [...todos.values()].length
      let todosArr = [...todos.values()].sort(function(a,b){
          return moment(a.interviewTime).unix() - moment(b.interviewTime).unix()
      })
    return (
      <Layout direction="rows">
        <Fixed style={{width:'300px'}}>
          <Calendar fullscreen={false} onSelect={this.handleSelectChange.bind(this)} onPanelChange={this.handleSelectChange.bind(this)} className="resumeDetail-calendar"/>
        </Fixed>
        <Pane span="20" style={{flexDirection: 'column',textAlign:"center"}}>
            {lengths == 0 ?
                <div className="ant-list-empty-text"><div className='list-no-data'>暂无面试</div></div>
            :
                <div class="interview-arrangements"><Row gutter={2}>{this.renderCard(todosArr)}</Row></div>
            }

        </Pane>
      </Layout>
    )
  }
}

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Schema} from 'redux-orm'

import {Row, Col,List,Avatar,Card,Badge,Calendar,Spin,Icon,Modal,Button,Table,Popconfirm, Select, } from 'antd';
import DictUtils from 'app-utils/DictUtils'
import moment from 'moment';
import MessageCenter from './MessageCenter.view'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import GroupedColumnChart from 'app/components/Charts/GroupedColumnChart'
import orm,{reducerItemSelector,reducerListSelector} from '../../model'
import  {Link} from 'react-router'
import styles from './styles.less'
import WrapperComponent from 'app/decorators/WrapperComponent'
import ErrorBoundary from 'app/components/ErrorBoundary'
import NestedComponent from 'app/decorators/NestedComponent'

const { Meta } = Card;
const confirm = Modal.confirm;

// @WrapperComponent(ErrorBoundary)

class WeekCalendarPicker extends Calendar{
  state = {
    date:null,
    startDate:null,
  }
  constructor(props) {
    super(props)
    this.state.date = moment()
    this.state.startDate = moment().startOf('week')
  }


  offsetWeek(pos){
    let {startDate}=this.state
    let offsetStartDate = startDate.add(pos*7,'days')

    this.setState({
      date: offsetStartDate,
      startDate: offsetStartDate
    })

    this.handlerSelectDate(offsetStartDate)
  }

  handlerSelectDate(value){
    this.setState({ date: value })
    var dateStr=value.format("YYYY-MM-DD")
    let {actions} = this.props;
    actions.loadTodos({dateStr:dateStr});
    // actions.loadTodos();
  }
  isActive(weekDate,date){
    if(weekDate.format("YYYY-MM-DD")==date.format("YYYY-MM-DD")){
      return "active"
    }
  }
  renderWeekCalendar(){
    let startDateStr = this.state.startDate.format('YYYY-MM-DD')
    let dateStr = this.state.date.format('YYYY-MM-DD')
    let weekTitle = {
      'Mon': '周一',
      'Tus': '周二',
      'Wed': '周三',
      'Thu': '周四',
      'Fri': '周五',
      'Sat': '周六',
      'Sun': '周日',
    }
    let weekDays = [
      { key: 'Mon', value: moment(startDateStr) },
      { key: 'Tus', value: moment(startDateStr).add(1,'days') },
      { key: 'Wed', value: moment(startDateStr).add(2,'days') },
      { key: 'Thu', value: moment(startDateStr).add(3,'days') },
      { key: 'Fri', value: moment(startDateStr).add(4,'days') },
      { key: 'Sat', value: moment(startDateStr).add(5,'days') },
      { key: 'Sun', value: moment(startDateStr).add(6,'days') }
    ]
    return (
      <div className="week-calendar">
        <h3 className='week-calendar-head'>{dateStr}</h3>
        <ul className='week-calendar-body'>
          {
            weekDays.map((item,idx) => {
              return (
                <li key={idx} onClick={this.handlerSelectDate.bind(this,item.value)} className={this.isActive(item.value,this.state.date)}>
                  <div className='week-title'>{weekTitle[item.key]}</div>
                  <div className='week-days'>{item.value.format('DD')}</div>
                </li>
              )
            })
          }
        </ul>
        <div className='offset-week'>
          <Button className='offset-left' onClick={this.offsetWeek.bind(this,-1)}><Icon type="left" /></Button>
          <Button className='offset-right' onClick={this.offsetWeek.bind(this,1)}><Icon type="right" /></Button>
        </div>
      </div>
    )
  }
  render(){
    return (
      <div>
        {this.renderWeekCalendar()}
      </div>
    )
  }

}
/*
const toDoSelector = orm.createSelector(session=>{
  // console.log(session.Schedule.all().toRefArray())
  return session.Schedule.all().toModelArray()
})
*/
function mapStateToProps(state,props) {
    return {
        items: reducerListSelector(state.ORMReducer,"Schedule"),
    };
}
@connect(mapStateToProps)
// @WrapperComponent(ErrorBoundary)
class WeekTodoView extends Component{

  componentWillMount(){
    let {actions} = this.props
    let dateStr = moment().format('YYYY-MM-DD')
    actions.loadTodos({dateStr:dateStr});
    // actions.loadTodos();
  }

  joinInfo(array,mark){
    return array && array.length>0 && array.filter(it=>(it&&it!="")).map(it=>{return moment(it).format('HH:mm')}).join(mark)
  }

  handlerAddSchedule(){
    let {actions,router} = this.props;
    actions.addRoute(router)
  }
  handlerEditSchedule(id){
    let {actions,router} = this.props;
    actions.editRoute(router,id);
  }
  handlerDelSchedule(id){
    let {actions,reduce} = this.props;
    // let {params} = reduce
    actions.deleteAction({ id:id, isDel:1 })
    // actions.loadTodos(params)
  }
  renderCalendarPickerList(){
    let {items} = this.props;
    return (<List
        className="calendar-todo-list"
        locale={{
          emptyText:(<div className='list-no-data'>暂无待办事件</div>)
        }}
        itemLayout="horizontal"
        loadMore={false}
        dataSource={items}
        renderItem={item => {
          let defaultActions = [<Icon onClick={this.handlerEditSchedule.bind(this,item.id)} type="edit" />,
          <Popconfirm onConfirm={this.handlerDelSchedule.bind(this,item.id)} title="是否确定删除这条待办事件？" okText="是" cancelText="否">
            <Icon type="delete"  />
          </Popconfirm>]
          if(item.remindType != 1){
            defaultActions=[<Icon type="clock-circle" />].concat(defaultActions)
          }

          return(
            <List.Item className='week-todo-list-item' actions={defaultActions}>
              <List.Item.Meta
                title={<div className='title'><span className='point'></span>{item.getScheduleStr()}&nbsp;{item.title}</div>}
                description={item.content}
              />
            </List.Item>
          )
        }}
      />)
  }
  render(){
    return (
       <Card title="待办事件" className="week-todo-view">
          <Button className='add-week-todo' onClick={this.handlerAddSchedule.bind(this)}><Icon type="plus" /></Button>
          <WeekCalendarPicker actions={this.props.actions} />
          {this.renderCalendarPickerList()}
       </Card>
    )
  }
}

@NestedComponent()
export default class Dashboard extends Component {
	state={
		axisType:1
	}
  componentWillMount(){
		let {actions} = this.props
		window.addTab = parent.addTab
  }
	componentDidMount() {
		const { actions } = this.props
		actions.unreadMsgListAction()
		actions.hireDataListAction()
		actions.recentDataAction({type:1})
	}

  constructor(props) {
    super(props)
	}
	handleSelectChange(val){
		const{actions}=this.props
		actions.recentDataAction({type:val})
		this.setState({
			axisType:val
		})

  }
	renderSelectOption(){
		let options=[
			{keyValue:1,keyName:"今日/昨日"},
			{keyValue:2,keyName:"本周/上周"},
			{keyValue:3,keyName:"本月/上月"},
		]
		return options.map((data,idx)=>(<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>))
	}
	handleLogClick(type){
		console.log('click')
		window.addTab&&window.addTab({ title: '消息中心', key: 'log' ,src:`/static/js/client/main.html#/log/${type}`})
	}
	handleRowClick(pane){
		window.addTab&&window.addTab(pane)
	}
  render() {

    let {reduce,actions,children,appReducer,router} = this.props
		let {spins:{noticeSpin,todoSpin,peopleSpin},notices,todos,people,unreadMessage:{dbsjNum,gxrzNum,hxrxgNum,xtxxNum,ygxgNum},hireData:{dfpResumeNum,recruitJobNum,sendOfferNum,todayInterviewNum,todayNewResumeNum},recentData}=reduce

    return (
      <Layout direction="rows" className="dashboard">
				<Fixed style={{width:'100px',backgroundColor:'#ddd'}}>

					{process.env.NODE_ENV === 'development'?
					(<Card title='重要提醒' className="direction-column-card">
					<div>
						<Link to={{ pathname: "log/1" }}>
							<Badge count={hxrxgNum}>
								<Icon type='user' style={{ fontSize: 24,  }}/>
							</Badge>
							<p>候选人相关</p>
						</Link>
					</div>
					<div>
						<Link to={{ pathname: "log/2" }}>
							<Badge count={ygxgNum}>
								<Icon type='team' style={{ fontSize: 24,  }}/>
							</Badge>
							<p>员工相关</p>
						</Link>
					</div>
					<div>
						<Link to={{ pathname: "log/3" }}>
							<Badge count={dbsjNum}>
								<Icon type="schedule" style={{ fontSize: 24,  }}/>
							</Badge>
						<p>待办事件</p>
						</Link>
					</div>
					<div>
						<Link to={{ pathname: "log/4" }}>
							<Badge count={xtxxNum}>
								<Icon type="notification" style={{ fontSize: 24,  }}/>
							</Badge>
							<p>系统消息</p>
						</Link>
					</div>
					<div>
						<Link to={{ pathname: "log/5" }}>
							<Badge count={gxrzNum}>
								<Icon type="sync" style={{ fontSize: 24,  }}/>
							</Badge>
							<p>更新日志</p>
						</Link>
					</div>
				</Card>)
				:
				(<Card title='重要提醒' className="direction-column-card">
					<div onClick={this.handleLogClick.bind(this,'1')}>
							<Badge count={hxrxgNum}>
								<Icon type='user' style={{ fontSize: 24,  }}/>
							</Badge>
							<p>候选人相关</p>
					</div>
					<div onClick={this.handleLogClick.bind(this,'2')}>
							<Badge count={ygxgNum}>
								<Icon type='team' style={{ fontSize: 24,  }}/>
							</Badge>
							<p>员工相关</p>
					</div>
					<div onClick={this.handleLogClick.bind(this,'3')}>
							<Badge count={dbsjNum}>
								<Icon type="schedule" style={{ fontSize: 24,  }}/>
							</Badge>
						<p>待办事件</p>
					</div>
					<div onClick={this.handleLogClick.bind(this,'4')}>
							<Badge count={xtxxNum}>
								<Icon type="notification" style={{ fontSize: 24,  }}/>
							</Badge>
							<p>系统消息</p>
					</div>
					<div onClick={this.handleLogClick.bind(this,'5')}>
							<Badge count={gxrzNum}>
								<Icon type="sync" style={{ fontSize: 24,  }}/>
							</Badge>
							<p>更新日志</p>
					</div>
				</Card>)}
        </Fixed>
        <Layout direction="column" style={{marginLeft:'10px'}}>
          <Fixed style={{marginBottom:'10px',backgroundColor:'#ddd'}}>
						<Card title="招聘数据" className="direction-row-card">
							<Row gutter={16}>
								<Col span={4} onClick={this.handleRowClick.bind(this,{ title: '职位管理', key: 'job/list' ,src:"/static/js/client/main.html#/job/list"})}>
										<Icon type="solution" style={{fontSize:24,color:'#f06493'}}/>
										<h1>{recruitJobNum}</h1>
										<p>招聘中职位</p>
								</Col>
								<Col span={4} onClick={this.handleRowClick.bind(this,{ title: '待分配简历', key: 'resume/distributed' ,src:"/static/js/client/main.html#/resume/distributed"})}>
										<Icon type="copy" style={{fontSize:24,color:'#ff8053'}}/>
										<h1>{dfpResumeNum}</h1>
										<p>待分配简历</p>
								</Col>
								<Col span={4} onClick={this.handleRowClick.bind(this,{ title: '候选人管理', key: 'resume/list' ,src:"/static/js/client/main.html#/resume/list"})}>
										<Icon type="file-add" style={{fontSize:24,color:'#13c7aa'}}/>
										<h1>{todayNewResumeNum}</h1>
										<p>今日新简历</p>
								</Col>
								<Col span={4} onClick={this.handleRowClick.bind(this,{ title: '面试管理', key: 'interview/list' ,src:"/static/js/client/main.html#/interview/list"})}>
										<Icon type="contacts" style={{fontSize:24,color:'#64b5f7'}}/>
										<h1>{todayInterviewNum}</h1>
										<p>今日面试</p>
								</Col>
								<Col span={4} onClick={this.handleRowClick.bind(this,{ title: '待发offer', key: 'offer' ,src:"/static/js/client/main.html#/resume/list/query/3"})}>
										<Icon type="tag-o" style={{fontSize:24,color:'#9edc61'}}/>
										<h1>{sendOfferNum}</h1>
										<p>待发送offer</p>
								</Col>
							</Row>
						</Card>
          </Fixed>
					<Pane style={{backgroundColor:'#ddd',flexDirection:'column'}}>
						<Card title={'近期统计'}
							className="dashboard-chart-container"
							extra={
								<Select size="small" name="libType" onChange={this.handleSelectChange.bind(this)} defaultValue={'今日/昨日'}>
									{this.renderSelectOption()}
								</Select>
								}>
							<GroupedColumnChart dataSource={recentData} axisType={this.state.axisType}/>
						</Card>
          </Pane>
        </Layout>
        <Fixed style={{width:'400px',marginLeft:'10px',marginRight:'10px'}}>
          <Spin tip="Loading..." spinning={todoSpin}>
            <WeekTodoView  actions={actions} router={router} reduce={reduce}></WeekTodoView>
          </Spin>
        </Fixed>
      </Layout>
    )
  }
}

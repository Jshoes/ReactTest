import React, { Component } from 'react'
import WrapperComponent from '../../../decorators/WrapperComponent'
import ErrorBoundary from 'components/ErrorBoundary'
import NestedComponent from 'app/decorators/NestedComponent'
import { Layout, List, Avatar, Checkbox, Cascader, Card } from 'antd';
const CheckboxGroup = Checkbox.Group



@WrapperComponent(ErrorBoundary)
@NestedComponent()
export default class LogListView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	componentWillReceiveProps() {
		const { items, } = this.props
		this.setState({
			data: items
		})
	}
	componentDidMount() {
		const { actions, params } = this.props
		console.log('cdm',params.type)
		actions.logListAction({ fatherType: params.type })
	}
	componentDidUpdate(prevProps) {
		let { actions } = this.props
		let oldId = prevProps.params.type
		let newId = this.props.params.type
		if (newId != oldId) {
			this.setState({
				checkedValues: []
			})
			if (newId == 1) {
				actions.logListAction({ fatherType: 1 })
			} else if (newId == 2) {
				actions.logListAction({ fatherType: 2 })
			} else if (newId == 3) {
				actions.logListAction({ fatherType: 3 })
			} else if (newId == 4) {
				actions.logListAction({ fatherType: 4 })
			} else if (newId == 5) {
				actions.updateLogListAction({ fatherType: 5, msgType: 14 })
			}
		}
	}
	renderCheckGroup(type) {
		let options = []
		switch (type) {
			case '1':
				options = [
					{ label: '面试安排', value: 2 },
					{ label: '面试官反馈', value: 8 },
					{ label: '跟进提醒', value: 9 },
					{ label: '解锁提醒', value: 10 },
					{ label: '诚信库提醒', value: 11 },
					{ label: 'offer反馈提醒', value: 12 },
				]
				break;
			case '2':
				options = [
					{ label: '员工入职', value: 3 },
					{ label: '员工转正', value: 4 },
					{ label: '员工生日', value: 5 },
					{ label: '员工周年', value: 6 },
					{ label: '合同到期', value: 7 },
				]
				break;
			default:
				break;
		}
		return (<CheckboxGroup value={this.state.checkedValues} options={options} onChange={this.handleChange.bind(this)} />)
		// return (<p>{type}</p>)

	}
	handleChange(checkedValues) {
		console.log('checked = ', checkedValues)
		console.log('this.', this.state)
		this.setState({
			checkedValues
		})
		let newData = this.props.items.filter((item) => {
			console.log(checkedValues.indexOf(item.msgType) > -1)
			return checkedValues.indexOf(item.msgType) > -1
		})
		if (checkedValues.length) {
			this.setState({
				data: newData
			})
		} else {
			this.setState({
				data: this.props.items
			})
		}
	}
	renderDescription(item) {
		return (
			<div >
				{/* <p>{item.title}</p> */}
				<p>{item.updateDate}</p>
			</div>
		)
	}
	handleClick(id) {
		if(this.props.params.type==5){
			let { actions, router } = this.props;
			actions.detailRoute(router,id)
		}
	}
	render() {
		const { params, items } = this.props
		const { data } = this.state
		console.log(params.type,'params.typeparams.typeparams.typeparams.type')
		return (
			<Card >
				{this.renderCheckGroup(params.type)}
				<List
					bordered={false}
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<List.Item onClick={this.handleClick.bind(this, item.messageId)}>
							<List.Item.Meta
								avatar={<Avatar src={item.avatar} />}
								title={item.title}
								description={this.renderDescription(item)}
							/>
						</List.Item>
					)}
				/>
			</Card>
		)
	}
}

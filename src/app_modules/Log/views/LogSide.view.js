import React, { Component } from 'react'
import ErrorBoundary from 'components/ErrorBoundary'
import { Link } from 'react-router'
import LogList from './LogList.view'
import { Menu, Badge } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class LogView extends Component {
	componentDidMount() {
		const { actions } = this.props
		actions.unreadMsgListAction()
	}

	render() {
		const { routeParams,logReducer: { unreadMessage: { hxrxgNum, ygxgNum, dbsjNum, xtxxNum, gxrzNum } } } = this.props
		return (
			<Menu
				onClick={this.handleClick}
				selectedKeys={[routeParams.type]}
				mode="inline"
				className='side-menu log-side'
			>
				<MenuItemGroup key="g1" title="消息中心">
					<Menu.Item key="1">
						<Link to={{ pathname: "log/1" }}>
							<span>候选人相关</span>
							<Badge count={hxrxgNum}>
							</Badge>
						</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to={{ pathname: "log/2" }}>
							<span>员工相关</span>
							<Badge count={ygxgNum}>
							</Badge>
						</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to={{ pathname: "log/3" }}>
							<span>待办事件</span>
							<Badge count={dbsjNum}>
							</Badge>
						</Link>
					</Menu.Item>
					<Menu.Item key="4">
						<Link to={{ pathname: "log/4" }}>
							<span>系统消息</span>
							<Badge count={xtxxNum}>
							</Badge>
						</Link>
					</Menu.Item>
					<Menu.Item key="5">
						<Link to={{ pathname: "log/5" }}>
							<span>更新日志</span>
							<Badge count={gxrzNum}>
							</Badge>
						</Link>
					</Menu.Item>
				</MenuItemGroup>
			</Menu>
		)
	}
}

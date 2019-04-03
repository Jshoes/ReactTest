import React, { Component } from 'react'
import ErrorBoundary from 'components/ErrorBoundary'
import { Menu,  } from 'antd';
import { Link } from 'react-router'
import ReportList from './ReportList.view'
import style from './styles.less'
const MenuItemGroup = Menu.ItemGroup;

export default class ReportSideView extends Component {
	componentDidMount() {
		const { actions } = this.props
	}

	render() {
		const { location:{pathname},} = this.props
		let selectedKey = pathname.split('/').pop()
		return (
			<Menu
				onClick={this.handleClick}
				selectedKeys={[selectedKey]}
				mode="inline"
				className='side-menu report-side'
			>
				<MenuItemGroup key="g1" title="统计分析">
					<Menu.Item key="recruitment">
						<Link to={{ pathname: "report/recruitment" }}>
							<span>招聘现状</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="workload">
						<Link to={{ pathname: "report/workload" }}>
							<span>工作量统计</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="feedback">
						<Link to={{ pathname: "report/feedback" }}>
							<span>反馈统计</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="channel">
						<Link to={{ pathname: "report/channel" }}>
							<span>渠道统计</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="reason">
						<Link to={{ pathname: "report/reason" }}>
							<span>原因统计</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="call">
						<Link to={{ pathname: "report/call" }}>
							<span>通信统计</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="remark">
						<Link to={{ pathname: "report/remark" }}>
							<span>备注统计</span>
						</Link>
					</Menu.Item>
				</MenuItemGroup>
			</Menu>
		)
	}
}

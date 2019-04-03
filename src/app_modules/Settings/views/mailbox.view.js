import React, { Component } from 'react'
import { Button, Card ,List} from "antd"
import NestedComponent from 'app/decorators/NestedComponent'
import PageView from 'app/components/Page'
import DataTable from 'app/components/DataTable'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
import ChannelList from 'app/components/ChannelList'


@NestedComponent()
class Mailbox extends PageView {
	componentWillMount() {
		let { actions } = this.props
		actions.mailboxListAction()
		actions.channelListAction()
	}

	renderToolbar() {
		let { actions, reduce,items} = this.props
		return (
			<Button.Group>
				<Button type="primary" disabled={items.length >= 10 ? true : false} onClick={this.handleAdd.bind(this)} >添加简历接收邮箱</Button>
			</Button.Group>
		)
	}
	_renderTableList() {
		let { actions, reduce,items } = this.props
		let { mailboxList ,spins:{tableSpin}} = reduce
		const tableConf = {
			loading:tableSpin,
			dataSource:items,
			rowkey: 'id',
			columns: [{
				title: '邮箱帐号',
				dataIndex: 'email',
				key: 'email',
			}, {
				title: '操作',
				width: 100,
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => (
					<ButtonGroupExt onClick={this.handleDelete.bind(this, record)}>
						<Button icon="delete" actionkey="deleteAction" confirm="是否确认删除该邮箱">移除</Button>
					</ButtonGroupExt>
				),
			}],
		}
		return (
			<DataTable  {...tableConf} pagination={false} />
		)
	}
	handleDelete(data) {
		let { actions } = this.props
		actions.deleteMailboxAction(data)
	}
	handleAdd() {
		let { actions, router } = this.props;
		actions.addRoute(router)
	}
	renderChannelList(){
		const{channelList} = this.props
		// let channelSource = channelList.filter((v)=>v.isMailResumeImport)
		return(

				<ChannelList dataSource={channelList} channelKeyName='channel' headerTitle={<div><h3 className="card-title">目前邮箱支持渠道</h3></div>}/>
		)
	}
	render() {
		const { children } = this.props
		// console.log('children',children)
		return (
			<Card title={<div><h3 className="card-title">接收简历邮箱</h3></div>} extra={this.renderToolbar()} >
				{this._renderTableList()}
        {this.renderChannelList()}
			</Card>
		);
	}
}
export default Mailbox

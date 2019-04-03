import React, {Component} from 'react'
import {Row, Col,List,Avatar,Card,Badge,Calendar,Spin,Icon,Modal,Button,Menu} from 'antd';
import {Layout,Fixed,Pane} from 'components/Layout'
import DictUtils from 'app-utils/DictUtils'
import  {Link} from 'react-router'


const { Meta } = Card;
const confirm = Modal.confirm;

export default class MessageCenter extends Component {
  componentWillMount(){
    let {actions,router,msgType} = this.props;
    actions.loadNotices()
    actions.loadNoticesList({ msgType:msgType })
  }

  componentDidUpdate (prevProps) {
    // 上面步骤3，通过参数更新数据
    let { actions, router } = this.props
    let oldId = prevProps.params.type
    let newId = this.props.params.type
      if (newId !== oldId){
        actions.loadNoticesList({msgType:newId})
      }
  }

  renderNoticesList(){
    let {list} = this.props;
    return (<List
        className='notices-list'
        itemLayout="horizontal"
        loadMore={false}
        locale={{
          emptyText:(<div className='list-no-data-x'>查不到此类数据</div>)
        }}
        dataSource={list}
        renderItem={item => {
          let isRead = item.isRead;
          let className = "notices-list-item"
          if(isRead == 0) {
            className = "notices-list-item not-read"
          }
          return (
            <List.Item className={className}>
              <List.Item.Meta
                title={item.title}
                description={item.messageContent}
              />
              <div>{item.sendDate}</div>
            </List.Item>
          )}
        }
      />)
  }
  renderMsgType(msgType){
    switch (msgType) {
      case 1:
        return "待办事件"
        break;
      case 2:
        return "预约面试"
        break;
      case 3:
        return "员工入职"
        break;
      case 4:
        return "员工转正"
        break;
      case 5:
        return "员工生日"
        break;
      case 6:
        return "员工周年"
        break;
      case 7:
        return "合同到期"
        break;
      default:
        return ""
    }
  }
  renderItemBadge(){
    let {reduce:{notices}} = this.props;
    return [...notices.values()].map(
      (it,idx)=>(
        <Link to={`/dashboard/message/${it.msgType}`} activeClassName="active">
          <li key={idx}>
            {this.renderMsgType(it.msgType)}
            <Badge count={it.zyxxNum} overflowCount={99} ></Badge>
          </li>
        </Link>
      )
    )
  }
  render() {
    let {reduce,actions,children,router} = this.props
    return (
      <Layout direction="rows">
        <Fixed style={{width:'130px','overflowX':'hidden',backgroundColor:'#fafafa',borderRight:'1px solid #bfbfbf'}}>
          <ul className='item-badge'>
          </ul>
        </Fixed>
        <Pane style={{flexDirection: 'column'}}>
          {this.renderNoticesList()}
        </Pane>
      </Layout>
    )
  }
}

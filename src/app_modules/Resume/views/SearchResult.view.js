import React, {Component, PropTypes} from 'react'
import {
  Button,
  Input,
  Table,
  Select,
  DatePicker,
  Modal,
  Menu,
  Tag,
  Card,
  Popover,
  Dropdown,
  Icon,
} from 'antd'
import {Link} from 'react-router'
import moment from 'moment'
import PageView from 'app/components/Page'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import DataTable from 'app/components/DataTable'
import PersonInfoShow from 'app/components/TableRow/Resume'
import styles from './styles.less'

const Option = Select.Option


export default class ResumeSearchListView extends PageView {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let {actions,router,params:{type,text}} = this.props
    actions.listSearchAction({type:text})
  }

  renderTableList() {
    let that=this;
    let {reduce,actions,items} = this.props
    let {spins:{tableSpin},key} = reduce
    let page= reduce.page

    let tableConf = {
      loading: tableSpin,
      rowKey: key,
      dataSource:items,
      onChange:this.onChange.bind(this),
      columns: [
         {
          title: "基本信息",
          key: "name",
          width: 150,
          dataIndex: "name",
          sorter:true,
          render:(name,row) => <PersonInfoShow item={row} />
        }, {
          title: "最新入库时间",
          key: "inputTime",
          width: 150,
          dataIndex: "inputTime",
        },{
          title: "最近应聘职位",
          key: "jobTitle",
          width: 150,
          dataIndex: "jobTitle"
        }, {
          title: "分类",
          key: "resumeType",
          dataIndex: "resumeType",
          width: 150,
        }
      ]
    }

    return (<DataTable  {...tableConf} page={page} />)
  }

  render() {
    let {children} = this.props
      return (
        <Card type="inner">
                {children}
            {this.renderTableList()}
        </Card>
      )
    // }
  }
}

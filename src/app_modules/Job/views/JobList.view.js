import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {
    Button,
    Input,
    Table,
    Select,
    DatePicker,
    Modal,
    Menu,
    Popconfirm,
    Card,
    message,
    List,
    Dropdown,
    Icon,
} from 'antd'
import moment from 'moment';
import {Link} from 'react-router'
import IframeView from './iframe.view'
import ClientAPI from 'app/utils/externalUtils'
import FetchAPI from 'utils/FetchAPI'
import PageView from 'app/components/Page'
import ChannelList from 'app/components/ChannelList'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
import LinkagePullDown from 'app/components/LinkagePullDown'
import ButtonGroups from 'app/components/ButtonGroups'
import Permission from 'app/components/Permission'
import SmartLink from 'app/components/SmartLink'
import DataTable,{SelectDataTable} from 'app/components/DataTable'
import DictUtils from 'app-utils/DictUtils'
import CalendarPicker from 'app/components/CalendarPicker'
import NestedComponent from 'app/decorators/NestedComponent'
import JobTitleInTable from 'app/components/TableRow/Job'
import JobListView from './JobList.view'
import NewResumeListView from '../container'

const Option = Select.Option

@NestedComponent()
export default class NewJobListView extends PageView {

    constructor(props) {
        super(props);
    }
    componentWillMount(){
      let {actions} = this.props
        // actions.listAction()
      }
    handleMenu(actionkey){
        let {actions,router,location} = this.props;
      const {selectedRowKeys,selectedRows}=this.state
      if(actionkey=="endingFireAction"){
        actions[actionkey].call(this,router,selectedRows,selectedRowKeys,()=>{
          // console.log("callback")
          this.clearSelector()
          // actions.backRouteReload(router,location)
        })
      }else{
        actions[actionkey].call(this,router,selectedRows,selectedRowKeys)
      }
    }

    clearSelector(){
      this.setState({
        selectedRows: [],
        selectedRowKeys: []
      }, () => {
        console.log("clear state select")
      })
    }

    componentWillReceiveProps(nextProps){
        let {actions,router,reduce} = this.props;

 		if (JSON.stringify(nextProps.reduce.params) != JSON.stringify(this.props.reduce.params) ) {
  			this.setState({
  				selectedRows: [],
  				selectedRowKeys: []
  			}, () => {
  				console.log("clear state select")
  			})
 		}
      if(JSON.stringify(nextProps.location.state) !== JSON.stringify(this.props.location.state)){
        if(nextProps.location.state && nextProps.location.state.key=="reload"){
    			this.setState({
    				selectedRows: [],
    				selectedRowKeys: []
    			}, () => {
    				console.log("clear state select")
    			})
          actions.listAction(reduce.params)
        }
      }
    }


    renderToolbar() {
        let {actions} = this.props;
        let endText = "确认结束招聘后，简历将不再进入此职位，如果后续还有此类简历，简历直接进入人才库"
        return this.selectRowShow(
              <ButtonGroups handleClick={this.handleMenu.bind(this)}>
                <Button icon="sync" actionkey="syncAction">批量刷新</Button>
                <Button icon="pause-circle-o" confirm={endText} actionkey="endingFireAction">结束招聘</Button>
                <Button icon="edit" actionkey="changeDeptAction">修改部门</Button>
                <Button icon="solution" actionkey="changeChargerAction">修改负责人</Button>
                <Button icon="exception" actionkey="changeFeederAction">修改面试官</Button>
              </ButtonGroups>
        )
    }
    renderOption(data,idx){
      return (<Select.Option value={data.account} key={idx}>{data.name}</Select.Option>)
		}
		openTab(pane){
			parent.addTab&&parent.addTab(pane)
		}
    renderTableList() {
        let that=this;

        let {reduce,items} = this.props
        let {spins:{tableSpin},key,page} = reduce
        let rowSelection={
          onChange:this.onSelectChange.bind(this),
          selectedRowKeys:this.state.selectedRowKeys
        }
        // alert("111")
        let tableConf = {
            loading: tableSpin,
            rowKey: key,
            rowSelection:rowSelection,
            dataSource: items,
            onChange:this.onChange.bind(this),
            title:(selectedRows)=>{
                // console.log(selectedRows)
                return this.renderToolbar()
            },
            columns: [
               {
                    title: "职位名称",
                    key: "jobTitle",
                    dataIndex: "jobTitle",
										sorter: true,
										render:(val,row)=>{
											if(process.env.NODE_ENV === 'development'){
												return(
													<Link to={`/job/jobrelease/${row.jobId}/4/1`}><JobTitleInTable item={row}/></Link>
												)
											}else{
												return(
													<Link onClick={this.openTab.bind(this,{
														title: '职位详情',
														key: 'job/jobrelease' ,
														src:`/static/js/client/main.html#/job/jobrelease/${row.jobId}/4/1`
													})}><JobTitleInTable item={row}/></Link>
												)
											}
										},
                }, {
                    title: "招聘负责人",
                    key: "hrName",
                    dataIndex: "hrName",
                    width: 120,
                }, {
                    title: "招聘渠道",
                    key: "channelListIcon",
                    dataIndex: "channelListIcon",
                    width: 120,
                    render:(val)=>val.map((v)=><Icon type={v} style={{margin:'0 3px'}} />)
                },{
                    title: "候选人总数",
                    key: "totalNum",
                    dataIndex: "totalNum",
                    width: 120,
                    render:(val,row)=>{
											if(process.env.NODE_ENV === 'development'){
												return(
													<SmartLink to={`/resume/list/query/0/${row.jobId}`}>{val}</SmartLink>
												)
											}else{
												return(
													<SmartLink onClick={this.openTab.bind(this,{
														title: '候选人管理',
														key: 'resume/list' ,
														src:`/static/js/client/main.html#/resume/list/query/0/${row.jobId}`
													})}>{val}</SmartLink>
												)
											}
										}
                },{
                    title: "待入职人数",
                    key: "pendingPost",
                    dataIndex: "pendingPost",
                    align:"center",
										width: 120,
										render:(val,row)=>{
											if(process.env.NODE_ENV === 'development'){
												return(
													<SmartLink to={`/resume/list/query/4/${row.jobId}`}>{val}</SmartLink>
												)
											}else{
												return(
													<SmartLink onClick={this.openTab.bind(this,{
														title: '候选人管理',
														key: 'resume/list' ,
														src:`/static/js/client/main.html#/resume/list/query/4/${row.jobId}`
													})}>{val}</SmartLink>
												)
											}
										},
                },{
                    title: "已入职人数",
                    key: "yrzNum",
                    dataIndex: "yrzNum",
                    align:"center",
                    width: 120,
                },{
                    title: "招聘人数",
                    key: "hiringNumber",
                    dataIndex: "hiringNumber",
                    align:"center",
                    width: 120,
                }
            ]
        }
        return (<DataTable  {...tableConf}  page={page} />)
        // return null
    }


    render() {

        return (
            <Card type="inner" title={
              <div>
                <h2>一键刷新</h2>
                <ChannelList dataSource={DictUtils.getDictByType("channel")} sortKey="keySort"/>
              </div>
            }>
                {this.renderTableList()}
            </Card>
        )

    }
}

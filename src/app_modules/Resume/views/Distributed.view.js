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
import styles from './styles.less'


const Option = Select.Option


@NestedComponent()
export default class DistributedView extends PageView {

    constructor(props) {
        super(props);
    }
    componentWillMount(){
      let {actions} = this.props
        actions.distrAction()
      }
      handleFilter(value){
        let {actions} = this.props
        actions.distrAction(value)
      }
    handleMenu(actionkey){
      let {actions,router} = this.props
      const {selectedRowKeys,selectedRows}=this.state
      console.log(actions,actionkey)
      actions[actionkey].call(this,router,selectedRowKeys,"mulite")
    }
    handleSingle(id,actionkey){
      let {actions,router} = this.props
      let params = [id]
      actions[actionkey].call(this,router,params,"mulite")
    }
    renderSelectOption(data,idx){
      return (<Option value={data.email} key={idx}>{data.email}</Option>)
    }
    renderDistr(){
      return (
        <AdvancedSearchForm filterSubmitHandler={this.handleFilter.bind(this)} isSearchBtnHide={true} >
          <Select name="originalEmail" fetch={`${APP_SERVER}/reciveMailbox/listJson`} params={{}} renderItem={this.renderSelectOption} placeholder="请选择来源邮箱" style={{width:240}} getPopupContainer={(node)=>{return document.body}}/>
        </AdvancedSearchForm>
      )
    }

    renderToolbar() {
        let {actions} = this.props;
        return this.selectRowShow(
              <ButtonGroups handleClick={this.handleMenu.bind(this)}>
                <Button icon="edit" actionkey="distributionAction">分配职位</Button>
                <Button icon="plus" actionkey="talentAction">放入人才库</Button>
              </ButtonGroups>
        )
		}
		openTab(pane){
			parent.addTab&&parent.addTab(pane)
		}
    renderTableList() {
        let that=this;

        let {reduce,items} = this.props
        let {spins:{tableSpin},key,page} = reduce
        let rowSelection={
          onChange:this.onSelectChange.bind(this)
        }
        console.log(page)
        // alert("111")
        let tableConf = {
            loading: tableSpin,
            rowKey: 'id',
            page:page,
            rowSelection:rowSelection,
            dataSource: items,
            onChange:this.onChange.bind(this),
            title:(selectedRows)=>{
                // console.log(selectedRows)
                return this.renderToolbar()
            },
            columns: [
               {
                    title: "简历数量",
                    key: "resumeNum",
                    dataIndex: "resumeNum",
                    width:100
                }, {
                    title: "职位名称",
                    key: "jobTitleEmail",
										dataIndex: "jobTitleEmail",
										render:(val,row)=>{
											if(process.env.NODE_ENV === 'development'){
												return(
													<Link to={`resume/distrib/${row.id}`}>{val}</Link>
												)
											}else{
												return(
													<Link onClick={this.openTab.bind(this,{
														title: val,
														key: 'resume/distrib/' ,
														src:`/static/js/client/main.html#/resume/distrib/${row.id}`
													})}>{val}</Link>
												)
											}
										},
                }, {
                    title: "渠道",
                    key: "channel",
                    dataIndex: "channel",
                    width:120
                },{
                    title: "接收简历邮箱",
                    key: "originalEmail",
                    dataIndex: "originalEmail",
                    width:200
                },{
                    title: "最近投递日期",
                    key: "deliveryTime",
                    dataIndex: "deliveryTime",
                    width:160,
                    render:(val)=>{
                      return moment(val).format("YYYY-MM-DD")
                    }
                },{
                    title: "操作",
                    key: "id",
                    dataIndex: "id",
                    width:200,
                    render:(val,row)=><ButtonGroups handleClick={this.handleSingle.bind(this,val)}><Button actionkey="distributionAction">分配职位</Button><Button actionkey="talentAction">放入人才库</Button></ButtonGroups>
                }
            ]
        }
        return (<DataTable  {...tableConf}  />)
        // return null
    }


    render(){

        return (
            <Card type="inner" title={
                <div>
                  {this.renderDistr()}
                  <div className="distrbuted-title">
                    <Icon type="warning" />
                    邮箱中自动接收的简历，在系统中没有找到匹配的职位，需要分配职位后才能正常查看和处理
                  </div>
                </div>
            }>
                {this.renderTableList()}
            </Card>
        )

    }
}

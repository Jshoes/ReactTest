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
import PersonInfoShow from 'app/components/TableRow/Resume'
import LinkagePullDown from 'app/components/LinkagePullDown'
import ButtonGroups from 'app/components/ButtonGroups'
import Permission from 'app/components/Permission'
import DataTable,{SelectDataTable} from 'app/components/DataTable'
import DictUtils from 'app-utils/DictUtils'
import CalendarPicker from 'app/components/CalendarPicker'
import NestedComponent from 'app/decorators/NestedComponent'


@NestedComponent()
export default class DistributedJobView extends PageView {

    constructor(props) {
        super(props);
    }
    componentWillMount(){
      let {actions,params} = this.props

        actions.distrJobAction(params)
      }
      handleFilter(value){
        let {actions,params,reduce} = this.props
        let data = Object.assign({},params,reduce.params,value)
        this.setState({
          selectedRows: [],
          selectedRowKeys: []
        },function(){
          actions.distrJobAction(data)
        })
      }
      handleFilterSearch(value){
        let {actions,params,reduce} = this.props
        this.setState({
          selectedRows: [],
          selectedRowKeys: []
        },function(){
          actions.distrJobAction( Object.assign(value,params))
        })
      }
    handleMenu(actionkey){
      let {actions,router} = this.props
      const {selectedRowKeys,selectedRows}=this.state
      let dataArray = selectedRows.map(it=>it.id)
      actions[actionkey].call(this,router,dataArray,"single")
    }
    handleSingle(id,actionkey){
      let {actions,router} = this.props
      let params = [id]
      actions[actionkey].call(this,router,params,"single")
    }
    renderSelectOption(data,idx){
      console.log(data)
      return (<Option value={data.email} key={idx}>{data.email}</Option>)
    }
    renderDistr(){
      return (
        <AdvancedSearchForm filterSubmitHandler={this.handleFilterSearch.bind(this)} isSearchBtnHide={true} >
          <CalendarPicker name="time" changeCalendarContainer={true}/>
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
            page:page,
            onChange:this.onChange.bind(this),
            title:(selectedRows)=>{
                // console.log(selectedRows)
                return this.renderToolbar()
            },
            columns: [
               {
                    title: "基本信息",
                    key: "id",
                    dataIndex: "id",
                    render:(val,row)=><PersonInfoShow item={row}/>
                }, {
                    title: "渠道",
                    key: "channel",
                    dataIndex: "channel",
                    width:120
                }, {
                    title: "接收简历邮箱",
                    key: "originalEmail",
                    dataIndex: "originalEmail",
                    width:120
                },{
                    title: "申请时间",
                    key: "deliveryTime",
                    dataIndex: "deliveryTime",
                    width:120
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


    render() {

        return (
            <Card type="inner" title={
              this.renderDistr()
            }>
                {this.renderTableList()}
            </Card>
        )

    }
}

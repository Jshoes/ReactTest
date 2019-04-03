/**
 * Created by Administrator on 2018/3/12.
 */
import React, {Component, PropTypes} from 'react'
import {
    Button,  Table, Card, Tooltip,Select,Input
} from 'antd'
import moment from 'moment'
import NestedComponent from 'app/decorators/NestedComponent'
import PageView from 'app/components/Page'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import DataTable from 'app/components/DataTable'
import ButtonGroups from 'app/components/ButtonGroups'
import CalendarPicker from 'app/components/CalendarPicker'
import TagSelect from 'app/components/TagSelect'
import Permission from 'app/components/Permission'
import DictUtils from 'app/utils/DictUtils'


@NestedComponent()
export default class UserRightView extends PageView {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let {actions,router} = this.props;
        actions.listUserAction()
    }

    // handover(){
    //     let {actions} = this.props
    //     actions.jumpTohandoverAction()
    // }

    addNewAccount(){
        let {actions} = this.props
        actions.jumpToaddAction()
    }

    renderToolbar(){
				let {items} = this.props
        return (
            <Button.Group>
              <Button onClick={this.addNewAccount.bind(this)}>新增用户</Button>
            </Button.Group>
        )
    }
    handleFilter(value) {
        let {actions} = this.props;
        // console.log(value)
        actions.listUserAction(value);
    }

    renderSearchBar() {
        let {reduce} = this.props
        let keysOption = [
            {
                label: "姓名",
                value: "name"
            },
            {
                label:"用户名",
                value:"account"
            }
        ]
        //  let params = reduce.params || {}
        return (
            <AdvancedSearchForm keysOption={keysOption} filterSubmitHandler={this.handleFilter.bind(this)} isSearchBtnHide={true} autoSubmitForm={true}>
              <Input name="name" label="姓名" />
              <Select name="roleId" label="角色类别" placeholder="请选择"  fetch={`${APP_SERVER}/authRole/getRoleInfo`} renderItem={this.renderRoleOption} style={{width:'120px'}} />
            </AdvancedSearchForm>
        )
    }

    renderRoleOption(data,idx){
        return (<Select.Option value={data.roleId} key={idx}>{data.roleName}</Select.Option>)
    }
    handlerMenu(row,actionType){
        let {actions} = this.props
        actions[actionType].call(this,row)
    }

    renderTableList() {
        let that=this;
        let {reduce,items} = this.props
        let {spins:{tableSpin},key,page} = reduce
				let list = reduce.rightsList
				const{appReducer:{user:{account}}} = this.props
        let tableConf = {
            loading: tableSpin,
            rowKey: "userId",
            dataSource:items,
            onChange:this.onChange.bind(this),
            // title:()=>{
            //     return this.renderToolbar()
            // },
            columns: [
                {
                    title: "姓名",
                    key: "name",
										width: 120,
                    dataIndex: "name",
                }, {
                    title: "角色类别",
                    key: "roleName",
                    dataIndex: "roleName",
                    width: 120,
                }, {
										title: "电话",
										key: "account",
										dataIndex: "account",
										width: 120,
								},{
                    title: "所属部门",
                    key: "deptName",
                    dataIndex: "deptName",
                    width: 120,
                }, {
                    title: "操作",
                    dataIndex: "userId",
                    width: 150,
                    render:(val,row)=>{
                        let {roleType} = row
                        return (
                            <ButtonGroups showSize="5" handleClick={this.handlerMenu.bind(this,row)}>
                                <Button icon="edit" actionkey="jumpToEditAction" tooltext="编辑"/>
                                <Button icon="swap" actionkey="jumpTohandoverAction" tooltext="交接"/>
																{row.account==account?null:([<Button icon="lock" actionkey="disabledAction" tooltext="禁用" confirm="已禁用帐号将无法登录系统。是否确定禁用该帐号吗？"/>,
                                <Button icon="reload" actionkey="reloadAction" tooltext="重置" confirm="重置的密码将以短信形式发送到成员手机。确定重置登录密码？"/>])}

                            </ButtonGroups>
                        )
                    },
                }
            ]
        }

        return (<DataTable  {...tableConf} pagination={false}  style={{marginTop:'20px'}}/>)
    }

    render() {
        let {children} = this.props
        //模版没有好的解决方案，暂时这样处理
        //console.log(children)

        // if(children && children.type && children.type.WrappedComponent==ResumeFolderListView){
        //     return React.cloneElement(children)
        // }else{
        return (
            <Card title={<div><h3 className="card-title">成员设置</h3></div>} extra={this.renderToolbar()}>
                {this.renderSearchBar()}
                {this.renderTableList()}
            </Card>
        )
        // }
    }
}

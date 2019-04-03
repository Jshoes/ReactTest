import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Input, Table, Form, Modal} from 'antd'

import AdvancedSearchForm from 'components/AdvancedSearch'

/**
 * 列表页的父类组件
 * @type {component}
 */

export default class PageView extends Component {


  static childContextTypes = {
        appConfig : PropTypes.object
  }
  componentDidCatch(error, errorInfo) {
    // Display fallback UI
    // this.setState({
    //   error: error,
    //   errorInfo: errorInfo
    // });
    // You can also log the error to an error reporting service
    // console.log(error, errorInfo);
    // console.log("1111",error)
    // console.log(this.props)
    // this.props.router.goBack()
    // throw new Error("error!!!")
  }
  getChildContext(){
   var { appConfig } =this.props;
   return {
       appConfig: appConfig
   };
 }
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      selectedRowKeys: []
    };
  }
  configColumns(){
    console.log("configColumns")
  }
  getCurrentLocation(){
    let {router} = this.props;
    console.log(router.getCurrentLocation())
  }

  showTotal(total) {
    return `共计 ${total} 条数据`;
  }
  //缺失深度合并，只做一级合并
  mergeTableConfig(config){
    return Object.assign({
      size:'middle',
      pagination:{
         showQuickJumper:true,
         showSizeChanger:true,
         pageSizeOptions:['10','20','50','100'],
         showTotal:this.showTotal.bind(this),
      },
      // rowSelection:{
      //   onChange: this.onSelectChange.bind(this)
      // },
      style:{
        width:'100%'
      },
    },config)
  }
  /**
   * 组件开始请求获取数据
   * @return {[type]} [description]
   */
  componentWillMount() {
    let {actions} = this.props;
  //  actions.listAction();
  }

  /**
   * [onSelectChange ]
   * @param  {[type]} selectedRowKeys [description]
   * @param  {[type]} selectedRows    [description]
   * @return {[type]}                 [description]
   */

  onSelectChange(selectedRowKeys, selectedRows) {
    this.setState({selectedRowKeys, selectedRows});
  }
  selectRowShow(reactNode){
    const {selectedRowKeys}=this.state
    return selectedRowKeys.length>0 ? (<div className="ant-table-title-toolbar" style={{textAlign:'left'}}><span>已选<span className="countNum">{selectedRowKeys.length}</span>条数据</span>{reactNode}</div>) :null
  }
  /**
   * [selectMultiple 判断当前是否多选]
   * @return {[boolean]} [返回是否多选状态]
   */
  selectMultiple(){
    return this.getSelectLength()<=0
  }
  /**
   * [selectSingle 判断当前是否单选]
   * @return {[type]} [返回当前是否单选状态]
   */
  selectSingle(){
    return this.getSelectLength()!=1
  }
  /**
   * [getSelectLength 获取当前列表选中记录数量]
   * @return {[number]} [返回选中记录数量]
   */
  getSelectLength() {
    return this.getSelectRows().length
  }
  /**
   * [getSelectKeys 获取选中列表的RowKeys]
   * @return {[array[string]]} [返回数组 keys]
   */
  getSelectKeys() {
    return this.state.selectedRowKeys
  }

  /**
   * [getSelectRows 获取选中列表行数据]
   * @return {[array[object]]} [返回选中记录数据]
   */

  getSelectRows() {
    return this.state.selectedRows
  }

  /**
   * 新增路由监听
   * @return {无}
   */

  handleAddRoute() {
    let {actions, history,router} = this.props
  //  console.log(router.getCurrentLocation())
    actions.addRoute(router)
  }

  /**
   * 编辑路由监听
   * @param  {key} id [description]
   * @return {[type]}    [description]
   */

  handleEditRoute(id) {
    let {actions, history,router} = this.props
    let key = id || this.getSelectKeys()
    actions.editRoute(router,key)
  }

  /**
   * 取消或回退路由监听
   * @return {[null]}
   */

  handleBackRoute() {
    let {actions, history} = this.props
    actions.backRoute()
  }
  /**
   * [handleDeleteRoute 删除路由监听]
   * @param  {[rowskey]} id [description]
   * @return {[null]}    [description]
   */
  handleDeleteRoute(id) {
    let {actions, history} = this.props
    let key = id || this.getSelectKeys()
    actions.deleteRoute(key)
  }

/**
 * [handleFilter 监听过滤方法，即搜索提交]
 * @param  {[object]} value [过滤数据条件对象]
 * @return {[type]}       [无]
 */

  handleFilter(value) {
    let {actions} = this.props;
    actions.listAction(value);
  }

    /**
     * [onChange 表格分页排序发生变化]
     * @param  {[type]} pagination [description]
     * @param  {[type]} filters    [description]
     * @param  {[type]} sorter     [description]
     * @return {[type]}            [description]
     */
  onChange(pagination, filters, sorter){
    let {reduce:{params}}=this.props
    var object=Object.assign({},params,pagination,sorter)
    this.handleFilter(object);
  }
  /**
   * 渲染搜索组件
   * @return {null} [description]
   */

  renderSearchBar() {
    let {reduce} = this.props
    let params = reduce.params || {}
    let keysOption = [
      {
        label: "联系人",
        value: "linkName"
      }, {
        label: "客户名称",
        value: "custName"
      }
    ]
    return (
      <AdvancedSearchForm keysOption={keysOption} filterSubmitHandler={this.handleFilter.bind(this)}></AdvancedSearchForm>
    )
  }


  /**
   * 渲染对话框组件
   * @return {[type]} [description]
   */

  renderDialogView() {
    var {route} = this.props
    var title = ""
    if (route.path == 'add') {
      title = "添加"
    } else if (route.path == 'edit/:id') {
      title = "编辑"
    } else {
      return (null)
    }
    return (
      <Modal title={title} visible={true} maskClosable={false} onCancel={this.handleBackRoute.bind(this)} onOK={this.handleBackRoute.bind(this)}>
        {this.renderFormView()}
      </Modal>
    )
  }
}

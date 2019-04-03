import React,{Component} from "react"
import ReactDOM from 'react-dom'
import {Table,Icon,Checkbox,Button,Row,Col } from 'antd'
import BaseForm,{FormItem} from 'components/BaseForm'
import {FormPage} from 'components/Page'
import API from '../../app_modules/Member/api'

class TableMenu extends FormPage{
  state = { visible: true }
  //请求远程数据接口
  componentWillMount() {
    let {actions} = this.props;

  //  actions.itemAction("1")
  }
  //处理表格提交后动作
  handleOk(){
    this.onSubmit()
    let { onClosePopup } = this.props
    onClosePopup()
  }
  handleSubmit(values){
    var {onSelectChange}=this.props
     return new API().fetchTableColumns(values).then(json => {
       onSelectChange(values.isShowArr)
       // console.log(json,values)
     }).catch(ex => {
       return "error"
     })
  }
  render() {
    const {
      form,
      initialValues,
      handleSubmit,
      children,
      defaultValue,
      columns,
      onClosePopup
    } = this.props
    const saveFormRef=this.saveFormRef
    const formFullItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }
    // onChange={this.onSelectChange.bind(this)}

    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef} layout="inline">
        <FormItem>
          <Checkbox.Group name="isShowArr" style={{ width: '100%' }} defaultValue={defaultValue} >
            <Row>
              {
               columns.filter(it=>{
                 return it.title!='操作'
               }).map((it,idx)=>{
                 return (<Col span={8} key={idx}><Checkbox value={it.key} disabled ={it.isRead==1?true:false} >{it.title}</Checkbox></Col>)
               })
              }
            </Row>
          </Checkbox.Group>
        </FormItem>
        <div style={{textAlign:'right'}}>
         <Button size="small" onClick={onClosePopup}>取消</Button>
         <Button size="small" type="primary" onClick={this.handleOk.bind(this)} style={{marginLeft:'10px'}}>确定</Button>
        </div>
      </BaseForm>
    )
  }
}

class DataTable extends Component{
  state={
    visible:false,
    newColumns:[],
    displayColumns:[]
  }
  static defaultProps={
    page:{},
    prefixCls: 'ant-table',
    showQuickJumper:true,
    pagination:{
       showTotal:total => `共 ${total} 条`,
       // showQuickJumper:true,
       showSizeChanger:true,
       pageSizeOptions:['10','20','50','100'],
    },
    scroll:{ y: 500 },
    style:{
      width:"100%"
    },
    showConfig:false,
    columns:[]
  }
  showPopover(){
    this.setState({
      visible:true
    })
  }
  constructor(props) {
    super(props)
    this.state.columns=props.columns
  }
  componentWillReceiveProps(nextProps){
    let {columns} = nextProps
      this.setState({
        columns:columns,
      });
  }

  onSelectChange(checkedValues){
    this.setState({
      columns:this.state.columns.map((col)=>{
        if(checkedValues.indexOf(col.key)>=0){
          col.visible=true
        }else{
          col.visible=false
        }
        return col
      })
    })
  }
  onClosePopup(){
    this.setState({
      visible:false
    })
  }
  onPopupVisibleChange(boolean){
     // console.log('show',arguments)
    this.setState({
      visible:boolean
    })
  }


  renderTableMenu(){
    // console.log("menu")
    let {columns}= this.state
    var defaultValue=columns.filter(col=>(col.type!='config' && col.visible==true)).map((col)=>col.key)
    return (
        <div className="" style={{width:400,height:200,padding:'10px',border:'1px solid #cfdae5'}}>
          <TableMenu defaultValue={defaultValue} columns={columns} onSelectChange={this.onSelectChange.bind(this)} onClosePopup={this.onClosePopup.bind(this)} ></TableMenu>
        </div>
      )
  }
  render(){
    let {pagination,showConfig,page,...otherProps}= this.props
    let {visible,columns}=this.state
    let newColumns;
    if(showConfig){
      newColumns =columns.filter((col)=>{
        return col.visible==true
      }).concat([{
          title:" ",
          filterDropdown:(
            this.renderTableMenu()
          ),
          filterDropdownVisible:visible,
          onFilterDropdownVisibleChange:this.onPopupVisibleChange.bind(this),
          width:30,
          fixed:'right',
          type:'config'
      }])
    }else{
      newColumns=columns
    }
    return (<Table {...otherProps} columns={newColumns} pagination={!pagination?false:Object.assign({},pagination,page)}/>)
  }
}


class SelectDataTable extends Component{
  state={
    selectedRowKeys:[],
    selectedRows:[]
  }

  onChange(selectedRowKeys, selectedRows){
    // console.log(selectedRows,selectedRowKeys)
    this.setState({
      selectedRows:selectedRows,
      selectedRowKeys:selectedRowKeys
    })
  }
  render(){
    let {pagination,showConfig,page,title,...otherProps}= this.props
    let {selectedRowKeys,selectedRows} =this.state
    let rowSelection={
      onChange:this.onChange.bind(this)
    }
    let titlebox=()=>(<span>已选{selectedRowKeys.length}条数据{title && title(selectedRows)}</span>)
    if(selectedRowKeys.length>0){
      return (<DataTable {...otherProps} title={titlebox} rowSelection={rowSelection} pagination={!pagination?false:Object.assign({},pagination,page)}/>)
    }else{
      return (<DataTable {...otherProps} rowSelection={rowSelection} pagination={!pagination?false:Object.assign({},pagination,page)}/>)
    }
  }
}
export { SelectDataTable }
export default DataTable

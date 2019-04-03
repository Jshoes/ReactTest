import React, {Component, PropTypes} from 'react'
import {
  Button,
  Input,
  Table,
  Select,
  DatePicker,
  Modal,
  Menu,
  Card,
  Dropdown,
  Icon,
} from 'antd'
import PageView from 'app/components/Page'
import  {Link} from 'react-router'
import NestedComponent from 'app/decorators/NestedComponent'
import SmartLink from 'app/components/SmartLink'
import AdvancedSearchPanel from 'app/components/AdvancedSearchPanel'
import ButtonGroups from 'app/components/ButtonGroups'
import CalendarPicker from 'app/components/CalendarPicker'
import BaseForm,{FormItem} from 'components/BaseForm'
import Permission from 'app/components/Permission'
import DataTable from 'app/components/DataTable'
import DictUtils from 'app/utils/DictUtils'
import moment from 'moment'
const Option = Select.Option
const confirm = Modal.confirm;

export class CreditSide extends Component{
  handleFilter(){

  }
  navgation(val){
    let {router}= this.props

    router.push(val)
  }
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  render(){
    return (<AdvancedSearchPanel titleSearch={
      <FormItem>
        <Select name="nav" onChange={this.navgation.bind(this)} defaultValue="/elite" fetch={[{keyValue:"/elite",keyName:"公共人才库"},{keyValue:"/credit",keyName:"诚信库"}]} renderItem={this.renderSelectOption} />
      </FormItem>
    } filterSubmitHandler={this.handleFilter.bind(this)} >
      <Select name="recordId" label="诚信记录" placeholder="请选择"  fetch={DictUtils.getDictByType("adversevent")} renderItem={this.renderSelectOption} />
      <Input label="姓名" placeholder="" name="a1" />
      <Input label="联系人" placeholder="" name="a2" />
      <CalendarPicker label="加入人才日期" name="inputTimeStr" />
    </AdvancedSearchPanel>)
  }

}

@NestedComponent()
export default class CreditListView extends PageView {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    let {actions,router} = this.props;
    actions.listAction()
  }
  handlerMenu(value,actionType){
      if(actionType == 'deleteAction'){
          this.handleDeleteComfirm(actionType,value);
      }
  }

  handleDeleteComfirm(actionType,value){
        let {actions,router} = this.props;
        actions[actionType](value);
        actions['listAction']();

  }

  renderToolbar() {
    return null
  }
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  renderSearchBar() {
    let {reduce} = this.props
    let keysOption = [
      {
        label: "姓名",
        value: "1"
      }
    ]
    return (
      <AdvancedSearchForm keysOption={keysOption} filterSubmitHandler={this.handleFilter.bind(this)} >
          <Select name="recordId" label="不良事件" placeholder="请选择"  fetch={DictUtils.getDictByType("adversevent")} renderItem={this.renderSelectOption}>
          </Select>
          <CalendarPicker label="入库时间" name="inputTimeStr" />
      </AdvancedSearchForm>
    )
  }
  handleMenu(type){
    let {actions,router} = this.props
    const {selectedRowKeys}=this.state
    console.log(this,selectedRowKeys)
  }

  renderToolbar() {
      let {actions} = this.props;
      return this.selectRowShow(
            <ButtonGroups handleClick={this.handleMenu.bind(this)} propostionNumber={5}>
              <Button btnType="abc">关联职位</Button>
            </ButtonGroups>
      )
  }
  renderTableList() {
    let that=this;
    let {reduce,items} = this.props
    let {spins:{tableSpin},page,key} = reduce

    let rowSelection={
      onChange:this.onSelectChange.bind(this)
    }
    let tableConf = {
      loading: tableSpin,
      rowKey: key,
      rowSelection:rowSelection,
      title:()=>this.renderToolbar(),
      dataSource:items,
      onChange:this.onChange.bind(this),
      columns: [
         {
          title: "姓名",
          key: "name",
          width: 120,
          dataIndex: "name",
          sorter: true,
          render:(name,row)=>{
              return (<SmartLink to={{
                  pathname:`${row['resumeId']}/detail`,
                  state:{item:row,name:name}
              }} target="tabs">{name}</SmartLink>)
          },
        }, {
          title: "电话号码",
          key: "mobilephone",
          width: 120,
          dataIndex: "mobilephone",
        }, {
          title: "职位名称",
          key: "jobTitle",
          dataIndex: "jobTitle",
          width: 170,
        }, {
          title: "性别",
          key: "sex",
          dataIndex: "sex",
          width: 120,
          render:(sex,row)=>{
              return DictUtils.getDictLabelByValue("sex",sex)
          }
        }, {
          title: "年龄",
          key: "age",
          dataIndex: "age",
          width: 180,
          sorter: true
        },{
          title: "公司",
          key: "company",
          dataIndex: "company",
          width: 180,
      },{
          title: "工作年限",
          key: "workingSeniority",
          dataIndex: "workingSeniority",
          width: 180,
      },{
          title: "入库时间",
          key: "inputTime",
          dataIndex: "inputTime",
          width: 180,
          sorter: true,
          render:(val)=>{
              return moment(val).format("YYYY-MM-DD");
          }
      },{
          title: "不良事件",
          key: "recordId",
          dataIndex: "recordId",
          width: 180,
              render:(val)=>{
                  return DictUtils.getDictLabelByValue("adversevent",val)
              }
      },
      ]
    }
    return (<DataTable  {...tableConf}   page={page} />)
  }
  render() {
    let {children} = this.props
    return (
      <Card type="inner">
          {this.renderTableList()}
      </Card>
    )
  }
}

import React, {Component, PropTypes} from 'react'
import DictUtils from 'app/utils/DictUtils'
import {
  Button,
  Input,
  Table,
  Form,
  Modal,
  Select,
  Menu,
  Icon,
  Card,
  Dropdown,
  DatePicker,
  TreeSelect
} from 'antd'

import PageView from 'app/components/Page'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
// import AdvancedSearchForm from 'app/components/AdvancedSearch'
import AdvancedSearchPanel from 'app/components/AdvancedSearchPanel'
import NestedComponent from 'app/decorators/NestedComponent'
import DataTable from 'app/components/DataTable'
import CalendarPicker from 'app/components/CalendarPicker'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'

const Option = Select.Option
const {RangePicker} = DatePicker;

export class SoundSideView extends Component{
	state={
		val:'2'
	}
	componentDidMount() {
		this.handleFilter({range:this.state.val})
	}
  handleFilter(values){
		let {actions} = this.props
		actions.paramsSaveAction(values)
    actions.listAction(values)
  }
	renderHrListOption(data,idx){
    return (<Select.Option value={data.account} key={idx}>{data.name==""?data.account:data.name}</Select.Option>)
	}
	renderCallstateOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
	}
	handleChangeSelect(value){
    let {actions} = this.props
		this.setState({
			val:value
		})
	}
	renderSelectOption(data,idx){

    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  authTypeFilter(array){
    let {appReducer} = this.props
    return array.filter((it)=>it.authType.some(authType=>authType==appReducer.user.authType))
  }
  render(){
    let nav=[{keyValue:"1",keyName:"全部记录",authType:[1]},{keyValue:"2",keyName:"我的记录",authType:[1,2,3]}]
		return (
		<AdvancedSearchPanel
			titleSearch={
      <div>
      <FormItem>
        <Select name="range" onChange={this.handleChangeSelect.bind(this)} defaultValue={this.state.val}  fetch={this.authTypeFilter(nav)} renderItem={this.renderSelectOption} />
      </FormItem>
      </div>
			}
			filterSubmitHandler={this.handleFilter.bind(this)} >
      <Input label="联系电话" name="keyWord" />
      <Input label="联系人" name="candidateName" />
      <CalendarPicker label="通话时间" name="callTime"   />
      <Select name="callState" label="呼叫类型"  fetch={DictUtils.getDictByType("callstate")} renderItem={this.renderCallstateOption}>
      </Select>
			{this.state.val!=2?(<Select name="inputAcc" label="HR" fetch={`${APP_SERVER}/callrecord/hrListJson`} renderItem={this.renderHrListOption}>
      </Select>):null}

    </AdvancedSearchPanel>)
  }
}

@NestedComponent()
class SoundListView extends PageView {

  componentDidMount() {
      let {actions,router} = this.props;
      // actions.listAction()
  }

  renderHrListOption(data,idx){
    return (<Select.Option value={data.account} key={idx}>{data.name==""?data.account:data.name}</Select.Option>)
  }

  renderCallstateOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }

    handlerMenu(row,actionType){
        let {recordUrl,timeLength,code,calledNum,callerNum,showCallState,candidateName} = row
        let phoneTypeNum = ""
        if(actionType == "playAction"){
            if(showCallState == "已接去电"){
                phoneTypeNum = calledNum
            }else if(showCallState == "已接来电"){
                phoneTypeNum = callerNum
            }
            let  showRecordPlay ={
                RecordPlay:{
                    code:code,
                    name:candidateName == "" ? "播放录音" : candidateName,
                    phone:phoneTypeNum,
                    url:recordUrl,
                    dur:timeLength+"",
                    bPlay:"1"
                }
            };
            let  showRecordPlayStr = JSON.stringify(showRecordPlay);
            global.invokeMethod('ShowRecordPlay',showRecordPlayStr)

        }

    }

  renderTableList() {
    let self = this;
    let {reduce,items} = this.props
    console.log(items)
    let {spins:{tableSpin},key} = reduce
    let page = reduce.page
    let tableConf = {
      rowKey: "id",
      dataSource: items,
      onChange:this.onChange.bind(this),
      loading: tableSpin,
      columns: [
         {
          title: "联系人",
          key: "candidateName",
          dataIndex: "candidateName"
        }, {
          title: "呼叫类型",
          key: "showCallState",
          dataIndex: "showCallState",
          width: 120
        }, {
          title: "主叫号码",
          key: "callerNum",
          dataIndex: "callerNum",
          width: 160
        }, {
          title: "被叫号码",
          key: "calledNum",
          dataIndex: "calledNum",
          width: 120
        }, {
          title: "通话时长",
          key: "showTimeLength",
          dataIndex: "showTimeLength",
          width: 160
        }, {
          title: "通话时间",
          key: "showStartTime",
          dataIndex: "showStartTime",
          width: 140
        }, {
          title: "HR",
          key: "inputName",
          dataIndex: "inputName",
          width: 100
        }, {
           title: "操作",
          dataIndex: "id",
          width: 200,
          render: (text, row, index) => {
               let {recordUrl} = row
            return (
                <ButtonGroupExt onClick={this.handlerMenu.bind(this,row)}>
                    <Button icon="download" actionkey="downloadAction" href={recordUrl}  disabled={recordUrl?false:true} confirm="">下载</Button>
                    <Button icon="play-circle-o" actionkey="playAction" disabled={recordUrl?false:true}>录音播放</Button>
                </ButtonGroupExt>
            )
          }
        }
      ]
    }
    return (<DataTable  {...this.props}  {...tableConf} page={page} />)
  }

  render() {
      let props = this.props
    return (
      <Card type="inner">
          {this.renderTableList()}
      </Card>
    )
  }
}

export default SoundListView

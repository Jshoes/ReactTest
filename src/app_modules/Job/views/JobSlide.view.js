import React, {Component, PropTypes} from 'react'
import {
  Button,
  Cascader,
  Input,
  Table,
  DatePicker,
  Select,
  Modal,
  Menu,
  Card,
  Dropdown,
  Icon,
} from 'antd'
import AdvancedSearchPanel from 'app/components/AdvancedSearchPanel'
import DictUtils from 'app/utils/DictUtils'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import CalendarPicker from 'app/components/CalendarPicker'
import {TreeSelectPicker} from 'app/components/TreeView'
import LinkagePullDown from 'app/components/LinkagePullDown'


export default class JobviewSlide extends Component{
  constructor(props){
    super(props)
    this.state = {
      val:'1',
      nav:[{keyValue:"1",keyName:"招聘中职位",authType:[1,3]},{keyValue:"2",keyName:"我负责的职位",authType:[1,2,3]},{keyValue:"3",keyName:"已关闭的职位",authType:[1,2,3]}]
    }
  }
  componentDidMount(){
    let {actions} = this.props
    let {nav} = this.state
    let json = this.authTypeFilter(nav).reverse().pop()?this.authTypeFilter(nav).reverse().pop():{}
    this.setState({
      val:json.keyValue
    })

    actions.listAction({jobType:json.keyValue})
    actions.listReportAction({jobType:json.keyValue})
  }
  handleFilter(values){
    // console.log(values)
    const {actions} = this.props
    actions.listAction(values)
  }
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
  }
  renderHrOption(data,idx){
    return (<Select.Option value={data.account} key={idx}>{data.name}</Select.Option>)
  }
  handleChangeSelect(value){
    let {actions} = this.props
    let params = {jobType:value}
    actions.listAction(params)
    actions.listReportAction(params).then(()=>{
      this.setState({
        val:value
      })
    })
  }
  /* 入参：int jobType 1--获取招聘中职位2 --- 我负责的职位，3--已关闭的职位
                String  codeOrTitle 职位名称或编号
                String groupId 部门id
                int channel 渠道筛选
                String hrAcc 职位负责人*/
  authTypeFilter(array){
    let {appReducer} = this.props
    return array.filter((it)=>it.authType.some(authType=>authType==appReducer.user.authType))
  }
  render(){
    let {nav} = this.state
    let {reduce:{count}} = this.props

    return (<AdvancedSearchPanel titleSearch={
      <div>
      <FormItem>
        <Select name="nav" onChange={this.handleChangeSelect.bind(this)} defaultValue={this.state.val}  fetch={this.authTypeFilter(nav)} renderItem={this.renderSelectOption} />
      </FormItem>
      <h5>{`共有${count}个${nav.filter(it=>it.keyValue==this.state.val).pop().keyName}`}</h5>
      </div>
      } filterSubmitHandler={this.handleFilter.bind(this)} >
      <Input name="codeOrTitle" label="职位名称" placeholder="请输入职位名称或编号"/>
      <TreeSelectPicker
        label="招聘部门"
        name="groupId"
        fetch={`${APP_SERVER}/organizationGroup/getDepartmentTree`}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="选择部门"
        treeDefaultExpandAll
      />
      <Select name="channel" label="渠道筛选" placeholder="请选择"  fetch={DictUtils.getDictByType("channel")} renderItem={this.renderSelectOption} />
      <Select name="hrAcc" label="招聘负责人" placeholder="请选择"  fetch={`${APP_SERVER}/accountOperate/getHrList`} renderItem={this.renderHrOption} />
    </AdvancedSearchPanel>)
  }

}

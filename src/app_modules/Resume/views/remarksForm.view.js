/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-13T18:48:26+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row,
  Col,
  Modal,
  Button,
  Input,
  Form,
  DatePicker,
  Layout,
  Spin,
  Rate,
  Select,
  message,
  Tag
} from 'antd'
import {FormPage} from 'app/components/Page'
import BaseForm,{FormItem,customRules} from 'app/components/BaseForm'
import DictUtils from 'app/utils/DictUtils'
import CheckTag from 'app/components/CheckTag'
import moment from 'moment'
import styles from './styles.less'

const Option = Select.Option
const {TextArea} = Input

function translateToParams(data){
  let params = ''

  params = data.join(",")
  return params
}

class RemarksTag extends Component{
  constructor(props){
    super(props)
    //this.filterLabels(props.allLabel,props.currLabel)
    this.state = {
      currLabel : props.currLabel || []
    }
  }
  filterLabels(allLabel,currenLabel){
    if(allLabel.length){
      return  currenLabel.filter((it,idx)=>{
        return allLabel.filter((its)=> its.optionId == it).length?it:null
      })
      return arr
    }else{
      return []
    }
  }
  componentWillReceiveProps(nextProps){
    let {currLabel,onChange} = this.props
    if(nextProps.currLabel != currLabel){
      let filterLabel = this.filterLabels(nextProps.allLabel,nextProps.currLabel)
      onChange(translateToParams(filterLabel))
      this.setState({
        currLabel :filterLabel
      })
    }
  }
  handleChange(value,checked){
    let {onChange} = this.props
    let {currLabel} = this.state

    //console.log(currLabel.length)
    //console.log(currLabel)

    if(checked){
      currLabel.push(value.optionId)
    }else{
      currLabel = currLabel.filter((it,idx)=>{
        return it != value.optionId
      })
    }

    this.setState({
      currLabel:currLabel
    })
  onChange(translateToParams(currLabel))
  }
  renderChooseTag(){
    let {allLabel} = this.props
    return allLabel.map((it,idx)=>(
      <CheckTag
        key={idx}
        checked={this.state.currLabel.filter((its,idxs)=>{return its == it.optionId }).length}
        value={it.optionId}
        onChange={this.handleChange.bind(this,it)}
      >
        {it.optionName}
      </CheckTag>))
  }
  render(){
    let {allLabel} = this.props
    //console.log(this.state.currLabel)
    return (
      <div className="remarks-tag-box">
        {this.renderChooseTag()}
      </div>
    )
  }
}

class RemarksForm extends Component{

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
      resumeId,
      allLabel,
      currLabel,
      name,
      jobId
    } = this.props
    const formFullItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
    return (
      <BaseForm onSubmit={handleSubmit} ref={saveFormRef}>
        <FormItem style={{marginBottom:0}}>
            <Input type="hidden" name="name" defaultValue={name}/>
        </FormItem>
        <FormItem style={{marginBottom:0}}>
            <Input type="hidden" name="jobId" defaultValue={jobId}/>
        </FormItem>
        <FormItem style={{marginBottom:0}}>
            <Input type="hidden" name="resumeId" defaultValue={resumeId}/>
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <TextArea label="添加备注" name="context"  rules={[{required: true, message: "备注内容不可为空"},{validator:customRules.required},{max:50,message:"最多50个字符"}]}></TextArea>
        </FormItem>
        <FormItem {...formFullItemLayout}>
          <RemarksTag label="备注标签" name="labels" allLabel={allLabel} currLabel={currLabel} rules={[{validator:customRules.tagMaxLength}]}/>
        </FormItem>
      </BaseForm>
    )
  }
}

class RemarksFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props;
    let getLabelParams = {optionCode:"remarks_code"}
    actions.getCurrentLabelAction(params)
    actions.getAllLabelAction(getLabelParams)
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,location} = this.props;
    actions.remarksSaveAction(values).then(()=>{
      setTimeout(function(){
        actions.backRouteReload(router,location)
      },2000)
    })
  }
  render() {
    let {params:{resumeId}, reduce:{spins:{formSpin},remarksCurrLabel,remarksAllLabel},location} = this.props;
    let {state:{item:{jobId},name}} = location
    return (
      <Spin tip="Loading..." spinning={false}>
        <RemarksForm onSubmit={this.handleSubmit} saveFormRef={this.saveFormRef}  resumeId={resumeId} allLabel={remarksAllLabel} currLabel={remarksCurrLabel} jobId={jobId} name={name}>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </RemarksForm>
      </Spin>
    )
  }
}

export default RemarksFormView

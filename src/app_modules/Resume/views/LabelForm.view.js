/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-17T17:32:29+08:00
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
  Select
} from 'antd'
import {FormPage} from 'app/components/Page'
import FetchAPI from 'app/utils/FetchAPI'
import CheckTag from 'app/components/CheckTag'
import BaseForm,{FormItem} from 'app/components/BaseForm'

const Option = Select.Option
const {TextArea} = Input

export default class LabelFormView extends FormPage{
  state = {
    label:[],
    current:[]
  }

  componentWillMount(){
    let {location:{state:{labels}}} = this.props
    new FetchAPI().fetch(`${APP_SERVER}/option/optionListJson?optionCode=labels_code`,{
      method:'GET'
    }).then((json) => {
        this.setState({
          label:json.list||[],
          current:labels||[]
        });
    });

  }
  /*label 的item是 json   current 则为id  别踩坑*/
  handleChange(checked,code){
    let {current} = this.state
    if(checked){
      current.push(code)
    }else{
      this.setState({
        current:current.filter(it=>it != code)
      })
    }
  }
  renderLabels(){
    let {label,current} = this.state
    return label.map((it,idx)=>{
        return <CheckTag key={idx} onChange={this.handleChange.bind(this)} checked={current.indexOf(it.optionId)>=0} labelcode={it.optionId}>{it.optionName}</CheckTag>
    })
  }
  handleSubmit(){
    let {current} = this.state
    let {params:{resumeId},actions,router} = this.props
    let json = {
      id:resumeId,
      remarkLabel:current.join(",")
    }
    actions.setLabelAction(json)
    actions.backRoute(router)
  }

  render() {
    let {params:{resumeId}, reduce:{spins:{formSpin}},location:{state:{item}}} = this.props;
    return (
      <BaseForm onSubmit={this.handleSubmit} ref={this.saveFormRef}>
        {this.renderLabels()}
      </BaseForm>
    )
  }
}

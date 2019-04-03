/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-01-31T09:53:15+08:00
 */

import React, {Component, PropTypes} from 'react'
import {
  Row, Col,  Button, Input, Form,  Spin,  Checkbox, Tag, Card, Icon,  message,
} from 'antd'

import BaseForm,{FormItem} from 'app/components/BaseForm'
import moment from 'moment';
import {FormPage} from 'components/Page'
import ModalView from 'components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import ErrorBoundary from 'app/components/ErrorBoundary'
import styles from './styles.less'

const InputGroup = Input.Group;
const {TextArea} = Input

class TalentLabel extends Component{
  state = {
    inputVisible: false,
    inputValue: '',
  };

  constructor(props) {
    super(props);
    this.state.tags=props.tags
  }


  handleClose = (removedTag) => {

    let {actions,optionCode} = this.props
    let params = {
      optionId:removedTag,
      optionCode:optionCode
    }
    actions.deleteOptionAction('tagRemove',removedTag)
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
  }
  handleInputConfirm = () => {
    const inputValue = this.state.inputValue;
    let {optionCode,actions} = this.props
    if(inputValue && this.trim(inputValue)!=="" && inputValue.indexOf("$")!=-1){
      message.error("标签不能含有特殊字符$")
      return false
    }
    if (inputValue && this.trim(inputValue)!=="") {
        let params = {
          optionName:inputValue,
          optionCode:optionCode
        }
        this.setState({
          inputValue:"",
          inputVisible:false
        })
        actions.addTag(params)
    }
  }

  saveInputRef = input => this.input = input

  render() {
    const { inputVisible, inputValue } = this.state;
    let {tags} = this.props
    let inputSaveBtn = (
      <a onClick={this.handleInputConfirm}>保存</a>
    )
    return (
      <div>
        {tags.map((tag, index) => {
          const tagElem = (
            <Tag className='talent-tag' key={tag.optionId} closable={true} afterClose={ this.handleClose.bind(this,tag.optionId)}>
              {tag.optionName}
            </Tag>
          );
          return tagElem
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className='tag-input'
            style={{ width: 150,height:30,lineHeight:30 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onPressEnter={this.handleInputConfirm}
            addonAfter={inputSaveBtn}
            maxLength="6"
          />
        )}
				{!inputVisible
				// &&tags.length<10 限制数量
				 && (
          <Tag
            className='talent-tag'
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" />添加标签
          </Tag>
        )}
      </div>
    );
  }
}


@WrapperComponent(ErrorBoundary)
class TalentLabelView extends Component{
  componentWillMount() {
    let {actions,params} = this.props
    actions.tagsListAction({optionCode:'labels_code'})
  }

  render() {
    let {params, reduce, actions,items} = this.props;
    return (
      <Card title={<div><h3 className="card-title">标签</h3></div>} className='talent-label-view'>
        <TalentLabel tags={items} actions={actions} optionCode="labels_code"></TalentLabel>
      </Card>
    )
  }
}

export default TalentLabelView

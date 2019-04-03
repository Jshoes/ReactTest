/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-14T14:43:02+08:00





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
import ModalView from 'app/components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import DictUtils from 'app/utils/DictUtils'
import moment from 'moment'

const Option = Select.Option
const {TextArea} = Input

export class CreditForm extends Component{
    state = {
        obj:{}
    }

    renderSelectOption(data,idx){
        return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }

    render() {
        const {
            form,
            handleSubmit,
            children,
            saveFormRef,
            params:{resumeId}
        } = this.props
        let {obj} = this.state
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
              <FormItem {...formFullItemLayout} style={{marginBottom:0}}>
                <Input type="hidden" name="resumeId" defaultValue={resumeId} />
              </FormItem>
              <FormItem {...formFullItemLayout}  >
                <Select label="不良事件" name="recordId" fetch={DictUtils.getDictByType("adversevent")} renderItem={this.renderSelectOption} rules={[{required: true, message: "不良事件必填"}]} />
              </FormItem>
            </BaseForm>
        )
    }
}

@WrapperComponent(ModalView)
class CreditFormView extends FormPage{
    //请求远程数据接口
    componentWillMount() {

    }
    //处理表格提交后动作
    handleSubmit(values){
        let {actions,router} = this.props
        actions.addCreditAction(values)
        actions.backRoute(router)
    }
    render() {
        let {params, reduce:{spins:{formSpin},item,feed}} = this.props;
        return (
            <Spin tip="Loading..." spinning={false}>
              <CreditForm onSubmit={this.handleSubmit} saveFormRef={this.saveFormRef} params={params}>
                <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
                <Button>取消</Button>
              </CreditForm>
            </Spin>
        )
    }
}

export default CreditFormView

/**
 * Created by Administrator on 2018/3/8.
 */
/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-13T14:31:32+08:00
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
import DictUtils from 'app/utils/DictUtils'
import moment from 'moment'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem} from 'app/components/BaseForm'

const Option = Select.Option
const {TextArea} = Input

class DelayForm extends Component{

    render() {
        const {
            form,
            handleSubmit,
            children,
            saveFormRef,
            id,
            type,
            resumeId,
            time
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
                    <Input type="hidden" name="id" defaultValue={id}/>
                </FormItem>
                <FormItem {...formFullItemLayout}>
                    <Input label="面试阶段" name="aaa" defaultValue={DictUtils.getDictLabelByValue("interviewstage",type)}  readOnly/>
                </FormItem>
                <FormItem {...formFullItemLayout}>
                    <DatePicker label="时间调整" name="interviewTime" defaultValue={moment(time)} format="YYYY-MM-DD HH:mm:ss" disabledDate={function(current){
                      return current && current <= moment().add('day',-1).endOf('day');
                    }}  showTime={{defaultValue:moment(time)}}  rules={[{ required: true, message: '调整时间不可为空' }]}/>
                </FormItem>
            </BaseForm>
        )
    }
}


class DelayFormView extends FormPage{
    //请求远程数据接口
    componentWillMount() {
        let {actions,params:{resumeId}} = this.props

        //actions.getFeedStageAction({resumeId:resumeId})
    }
    //处理表格提交后动作
    handleSubmit(values){
        let {actions,router,location} = this.props
         actions.delaySaveAction(values).then((json)=>{
           actions.backRouteReload(router,location)
         })
         //actions.backRoute(router)
    }
    render() {
        let {params:{resumeId},location:{state:{id,type,time}} } = this.props
        return (
            <Spin tip="Loading..." spinning={false}>
                <DelayForm handleSubmit={this.handleSubmit} saveFormRef={this.saveFormRef} type={type} resumeId={resumeId} id={id} time={time}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确认</Button>
                    <Button>取消</Button>
                </DelayForm>
            </Spin>
        )
    }
}

export default DelayFormView

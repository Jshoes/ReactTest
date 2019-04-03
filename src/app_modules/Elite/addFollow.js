/**
 * Created by Administrator on 2018/3/7.
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
import {FormPage} from 'components/Page'
import ModalView,{ModalViewTitleProps} from 'components/Modal.view'
import WrapperComponent from '../../decorators/WrapperComponent'
import BaseForm,{FormItem,customRules} from 'components/BaseForm'

const Option = Select.Option
const {TextArea} = Input

class AddForm extends Component{
    render() {
        const {
            handleSubmit,
            reduce:{item:{info:{talentId}}},
            saveFormRef,
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
                <FormItem>
                    <Input type="hidden" name="talentId" defaultValue={talentId}/>
                </FormItem>
                <FormItem {...formFullItemLayout}>
                    <TextArea label="人才跟进" name="followContent" rules={[{required: true, message: "人才跟进不可为空"},{validator:customRules.required},{max:100,message:"人才跟进最多100个字符"}]}/>
                </FormItem>
            </BaseForm>
        )
    }
}

@WrapperComponent(ModalView)
export default class AddFollow extends FormPage {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let {actions,router} = this.props;

    }



    handleSubmit(values){
        let {actions,router,location} = this.props;
        actions.addFollowAction(values).then(()=>{
          setTimeout(function(){
            actions.backRouteReload(router,location)
          },2000)
        })
    }
    render() {
        let {reduce} = this.props
        return (
            <Spin tip="Loading..." spinning={false}>
                <AddForm handleSubmit={this.onSubmit} reduce={reduce}   saveFormRef={this.saveFormRef}>
                    <Button type="primary" htmlType="submit" onClick={this.onSubmit.bind(this)}>确认</Button>
                    <Button>取消</Button>
                </AddForm>
            </Spin>
        )
    }
}

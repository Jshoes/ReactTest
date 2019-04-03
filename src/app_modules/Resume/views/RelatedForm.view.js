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
import {FormPage} from 'components/Page'
import ModalView from 'components/Modal.view'
import WrapperComponent from 'app/decorators/WrapperComponent'
import BaseForm,{FormItem} from 'components/BaseForm'

const Option = Select.Option

class RelatedForm extends Component{

    renderSelectOption(data,idx){
        return (<Select.Option value={data.jobId} key={idx}>{data.jobTitle}</Select.Option>)
    }

  render() {
    const {
      form,
      handleSubmit,
      children,
      saveFormRef,
        params:{resumeId},
        row:{resumeIdentityId}
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
              <Input type="hidden" name="id" defaultValue={resumeId}/>
          </FormItem>
          <FormItem>
              <Input type="hidden" name="resumeIdentityId" defaultValue={resumeIdentityId} />
          </FormItem>
        <FormItem {...formFullItemLayout}>
          <Select label="选择职位" name="jobId" fetch={`${APP_SERVER}/jobNew/listJson`} renderItem={this.renderSelectOption} rules={[{required: true, message: "关联职位不可为空"}]}></Select>
        </FormItem>
      </BaseForm>
    )
  }
}

@WrapperComponent(ModalView)
class RelatedFormView extends FormPage{
  //请求远程数据接口
  componentWillMount() {
      let {actions,params,location} = this.props;
     // actions.idDataAction(params)
      console.log(this.props)
  }
  //处理表格提交后动作
  handleSubmit(values){
    let {actions,router,location} = this.props;

    actions.relatedForm(values,router).then(()=>{
      setTimeout(function(){
        actions.backRouteReload(router,location)
      },2000)
    })
  }
  render() {
    let {params, reduce:{spins:{formSpin},feed} ,location:{state:{item}}} = this.props;
    //	let model=preduce.list[0]
    return (
      <Spin tip="Loading..." spinning={false}>
        <RelatedForm onSubmit={this.onSubmit} params={params}  saveFormRef={this.saveFormRef} row={item}>
            <Button type="primary" htmlType="submit" onClick={this.onSubmit.bind(this)}>确认</Button>
            <Button>取消</Button>
        </RelatedForm>
      </Spin>
    )
  }
}

export default RelatedFormView

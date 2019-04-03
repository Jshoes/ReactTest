/**
 * @Date:   2017-07-06T15:50:31+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2018-03-14T13:26:32+08:00
 */

import React, {Component} from 'react'
import {
   Button, Input, Spin, Tabs, Select, Card, Icon, message,List,Popconfirm,Radio
} from 'antd'
import NestedComponent from 'app/decorators/NestedComponent'
import PageView,{FormPage} from 'app/components/Page'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import DictUtils from 'app/utils/DictUtils'
// import EmailTemplateLinkage,{SmsTemplateLinkage} from 'app/components/sendTemplate'

const TabPane= Tabs.TabPane
const Option = Select.Option
const {TextArea} = Input

@NestedComponent()
export default class TemplateView extends PageView{
  state={
    type:"2"
  }
  //请求远程数据接口
  componentWillMount() {
    let {actions,params} = this.props
    actions.templateListAction({templateUse: "1", type: "2"})
  }

  handleFilter(value) {
    let {actions} = this.props;
    actions.templateListAction(value)
  }
  saveFormRef=(form)=>this.form=form
  smsTypeChange(e){
    // console.log(e.target.value)

    this.setState({
      type:e.target.value
    },function(){
      if(e.target.value==1){
         this.form.form.setFieldsValue({"templateUse":"1"})
      }
      //
    })
  }
  handleAddRoute(){

    let {actions,router} = this.props
    let {type} =this.state
    let pathname = router.getCurrentLocation().pathname.replace(/\/$/,"")
    router.push(`${pathname}/add/${type}`)
    // actions.addRoute(router)
  }
  handleDeleteRoute(key){
    const {actions} = this.props
    actions.deleteTemplateAction(key);
  }
	renderToolbar() {
		let { actions, reduce } = this.props
		// let { mailboxList } = reduce
		return (
			<Button.Group>
				<Button type="primary" onClick={this.handleAddRoute.bind(this)} >添加模版</Button>
			</Button.Group>
		)
	}
  renderSelectOption(data,idx){
    return (<Select.Option value={data.keyValue} key={idx} disabled={this.state.type==1 && data.keyValue=="2"}>{data.keyName}</Select.Option>)
  }
  renderSearchBar(){

    return (
      <AdvancedSearchForm layout="inline" filterSubmitHandler={this.handleFilter.bind(this)} isSearchBtnHide={true} ref={this.saveFormRef}>
        <Select name="templateUse" defaultValue="1" label="模板用途"  fetch={DictUtils.getDictByType("templateuse")} renderItem={this.renderSelectOption.bind(this)} allowClear={false} style={{width:'150px'}}/ >
        <Radio.Group defaultValue={this.state.type} name="type" buttonStyle="solid" onChange={this.smsTypeChange.bind(this)} className="radio-group-nav">
          <Radio.Button value="2">邮件模版</Radio.Button>
          <Radio.Button value="1">短信模版</Radio.Button>
        </Radio.Group>
      </AdvancedSearchForm>
    )
  }
  renderList(){
    let {items,actions} = this.props;

    return  (<List
        itemLayout="horizontal"
        className="template-list"
        dataSource={items}
        renderItem={item => (
            <List.Item actions={
              [<Icon onClick={this.handleEditRoute.bind(this,item.id)} type="edit" />,
              <Popconfirm onConfirm={this.handleDeleteRoute.bind(this,item.id)} title="是否确定删除这条模版设置？" okText="是" cancelText="否">
                <Icon type="delete"  />
              </Popconfirm>]
            }>
                <List.Item.Meta
                    title={item.name}
                    description={<pre dangerouslySetInnerHTML={{__html: item.content}} />}
                />
								<span></span>
            </List.Item>
        )}
    />)
  }
  render() {
    let {params, reduce:{templateList}, actions} = this.props;
    return (
      <Card title="模版设置" extra={this.renderToolbar()} className="other-card">
        {this.renderSearchBar()}
        {this.renderList()}
      </Card>
    )
  }
}

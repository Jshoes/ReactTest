import React from 'react'
import PropTypes from 'prop-types'
import {
  Menu,
  Row,
  Col,
  Input,
  Modal,
  Button,
  Transfer,
  Dropdown,
  Icon,
  message,
  Select,
} from 'antd'
import classNames from 'classnames'
import {FormItem,AdvancedForm} from 'app-components/BaseForm'
import Permission from 'app-components/Permission'
import FetchAPI from 'utils/FetchAPI'

import styles from './AdvancedSearch.less'

const Option = Select.Option

class AdvancedSearchConfig extends React.Component{
  state = {
   targetKeys:[],
   selectedKeys: [],
   show:true,
  }
  constructor(props) {
      super(props)
      this.state.targetKeys=props.selectedKeys
  }

  componentWillReceiveProps(nextProps){
    let {targetKeys,selectedKeys} = nextProps
      this.setState({
        targetKeys:selectedKeys,
      });
  }

  handleSelectChange (sourceSelectedKeys, targetSelectedKeys) {
     this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  }
  handleChange(nextTargetKeys, direction, moveKeys) {
    if(nextTargetKeys.length>=1 && nextTargetKeys.length<=4  ){
     this.setState({ targetKeys: nextTargetKeys });
   }else{
     message.error("最多只能选择4项且最少选择1项")
   }
 }


  handleOk(){
    let {handleSure}= this.props
    var targetKeys=this.state.targetKeys
    handleSure(targetKeys)

  }
  handleCancel(){
    let {handleClose}= this.props
    handleClose.call()
  }
  render(){
    var state = this.state
    let {items,show}= this.props
    return (
      <Modal
         title="查询项配置"
         visible={show}
         onOk={this.handleOk.bind(this)}
         onCancel={this.handleCancel.bind(this)}
       >
         <Transfer
            dataSource={items}
            titles={['待选查询项', '已选查询项']}
            targetKeys={state.targetKeys}
            selectedKeys={state.selectedKeys}
            onChange={this.handleChange.bind(this)}
            onSelectChange={this.handleSelectChange.bind(this)}
            render={item => item.title}
          />
       </Modal>
    )
  }

}

export default class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    defKeyType:null,
    placeHolder:"",
    items:[],
    show:false,
    displayItem:[]
  }

  constructor(props) {
    super(props);
    if(props.keysOption.length){
      let {label,value}=props.keysOption.reverse().pop()
      this.state.defKeyType=value
      this.state.placeHolder=`请输入${label}`
    }
  }
  componentWillMount(){
    var that=this
    let {module,showConfig}=this.props
    if(showConfig){
      new FetchAPI().fetchGet('/search/getSearchFieldSetJson',{body:{module}}).then((json)=>{
      var json = json.map((it)=>{ return{key:it.code,title:it.name,type:it.type,checked:it.checked,id:it.id}})
          that.setState({
            items:json,
            displayItem:json.filter((it)=>it.checked==1).map((it)=>it.key)
          })
      })
    }
  }

  handleSearch = (e,values) => {
    e.preventDefault()
    let {filterSubmitHandler} = this.props
    console.log(values)
    if(values){
      filterSubmitHandler.call(this,values);
    }else{
      this.form.validateFieldsAndScroll((err, values) => {
        // console.log(this.form.getFieldsValue())
        // console.log(values)
        filterSubmitHandler.call(this,values);
      });
    }
  }

  handleReset = () => {
    this.form.resetFields();
  }

  toggleExpand = () => {
    const {expand} = this.state;
    this.setState({
      expand: !expand
    });
  }

  // To generate mock Form.Item
  getFields() {
    const {children, form,laylout,classNames} = this.props
    let renderChildren;

    const formItemLayout =laylout&&layout!='inline'? {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }:{};
    if(React.Children.count(children)===0){
      return (null)
    }
    // if(this.state.expand==false ){
    //   renderChildren = children.filter((ch,idx)=>idx<3)
    // }else if(this.props.showConfig){  //高级配置后，前三固定 后四配置
    if(this.props.showConfig){  //高级配置后，前三固定 后四配置
      renderChildren = React.Children.toArray(children).filter((ch,idx)=>{
        //return this.state.displayItem.indexOf(ch.props.name)>=0 || idx<3
        return this.state.displayItem.indexOf(ch.props.name)>=0 || idx < this.props.showExpand
      })
    }else{
      renderChildren = React.Children.toArray(children).filter((ch,idx)=>idx< (this.props.showExpand + 4) )
    }
    return renderChildren.map((it, i) => {
        if(it.props.allowClear==false){
          return (
            <FormItem colon={false} {...formItemLayout} containerTo={false} className={classNames}>
              {React.cloneElement(it)}
            </FormItem>
          )
        }else{

          return (
            <FormItem colon={false} {...formItemLayout} containerTo={false} className={classNames}>
              {React.cloneElement(it,{allowClear:true}) }
            </FormItem>
          )
        }
    })
    return children;
  }

  onTypeChange(value,option){
    this.setState({
      placeHolder:option.props.placeholder
    })
  }
  handleAdvancedMenu(obj) {
    if (obj.key == 'advanced') {
      alert("call advanced")
    } else if (obj.key == 'clear') {
      this.handleReset()
    } else if (obj.key == 'preview') {
      alert("call restore")
    }
  }

  handleClose(){
    this.setState({
      show:false
    })
  }

  renderAdvancedConfigModal(){

    this.setState({
      show: true
    });
  //  return (<AdvancedSearchConfig handleSure={this.handleSure.bind(this)} items={items} selectedKeys={displayItem} />)
  //  return ()
  }
  // 此处使用下标留坑
  renderKeyCatalog() {
    let {defKeyType,placeHolder,children}= this.state
    let {keysOption} = this.props
  //  let {label,value}=keysOption[0]
    if (keysOption.length ) {
      return(
        <Col span={6} key="fixhead">
            <Input.Group compact style={{textAlign:'right'}}>
              <FormItem>
                <Select defaultActiveFirstOption={true} name="keyType" defaultValue={defKeyType} onSelect={this.onTypeChange.bind(this)} style={{width:'105px'}}>
                  {
                    keysOption.map((it) => {
                      return (
                        <Option value={it.value} key={it.value} placeholder={"请输入"+it.label}>{it.label}</Option>
                      )
                    })
                  }
                </Select>
              </FormItem>
              <FormItem  labelCol= {{span: 0}}  wrapperCol={{ span: 24 }} style={{flex:1}}>
                <Input placeholder={placeHolder} name="keyWord" style={{}} />
              </FormItem>
            </Input.Group>
        </Col>
      )
    }else{
      return null
    }
  }
  saveFormRef = (form) => {
    this.form = form;
  }

  renderKeyword(){

    return (
      <Row gutter={10}>
        {/* this.renderKeyCatalog() */}
        { this.getFields()}
      </Row>
    )
  }
  handleSure(value){
    var {module} = this.props
    var data=this.state.items.filter(it=>value.indexOf(it.key)>=0).map(it=>{ return{searchId:it.id}})
    new FetchAPI().fetchPost('/search/saveSelJson?module='+module,{
      body:{items:data}
    }).then((json)=>{
        this.setState({
          displayItem:value,
          show:false
        })
    })

  }
  renderConfig(){
    let {placeHolder,items,displayItem,show} = this.state
    let {showConfig,children} = this.props
    if(showConfig){
      return (<AdvancedSearchConfig handleSure={this.handleSure.bind(this)} handleClose={this.handleClose.bind(this)} items={items} selectedKeys={displayItem} show={show}/>)
    }
  }
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    let {placeHolder,items,displayItem,show} = this.state
    let {showConfig,children,isSearchBtnHide,className,autoSubmitForm} = this.props
    return (
      <div className={classNames("advanced-search-panel",className)}>
          {this.renderConfig()}
        <AdvancedForm autoSubmitForm={autoSubmitForm} className="advanced-search-form" onSubmit={this.handleSearch.bind(this)} ref={this.saveFormRef.bind(this)}>
          { this.renderKeyword() }
          <div className="advanced-search-toolbar">
              <Permission expression={showConfig} >
                <Button shape="circle" icon="setting" onClick={this.renderAdvancedConfigModal.bind(this)}/>
              </Permission>
              <Permission expression={React.Children.count(children)>3} >
                <Button shape="circle" icon={this.state.expand==false?'down':'up'} onClick={this.toggleExpand.bind(this)}/>
              </Permission>
							{isSearchBtnHide?null:<Button htmlType="submit" onClick={this.handleSearch.bind(this)} type="primary">查询</Button>}

          </div>
        </AdvancedForm>
      </div>
    );
  }
}

AdvancedSearchForm.propTypes = {
  keysOption: PropTypes.array.isRequired,
  // keysOption:PropTypes.arrayOf(PropTypes.shape([{
  //     label: PropTypes.string.isRequired,
  //     value: PropTypes.number.isRequired
  // }])),
  filterSubmitHandler: PropTypes.func,
  showConfig:PropTypes.bool,
  footer:PropTypes.element,
  showExpand:PropTypes.number
}

AdvancedSearchForm.defaultProps = {
  keysOption: [{
    label:"name",
    value:0
  }],
  autoSubmitForm:true,
  showConfig:false,
  module:"",
  filterSubmitHandler: function() {},
	showExpand:3,
	layout:''
}

//export default AdvancedSearchForm = Form.create()(AdvancedSearchForm)

import React,{Component} from 'react'
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
  Tag,
  Tree,
	message,
	Checkbox,
  Select,
} from 'antd'
const ButtonGroup = Button.Group;
import {FormItem,AdvancedForm,AutoSubmitForm} from 'app-components/BaseForm'
import Permission from 'app-components/Permission'
import FetchAPI from 'utils/FetchAPI'
import styles from './AdvancedSearchPanel.less'
const TreeNode = Tree.TreeNode;

const CheckboxGroup = Checkbox.Group;

class AdvancedSearchConfig extends React.Component{
  state = {
		checkedList: [],
    indeterminate: true,
    checkAll: false,
   	show:true,
  }
  constructor(props) {
      super(props)
      this.state.checkedList=props.selectedKeys
  }

  componentWillReceiveProps(nextProps){
    let {selectedKeys} = nextProps
      this.setState({
        checkedList:selectedKeys,
      });
  }

  handleOk(){
    let {handleSure}= this.props
    var checkedList=this.state.checkedList
    if(checkedList.length){
      handleSure(checkedList)
    }else{
      message.warning("至少选择一项")
    }
  }
  handleCancel(){
    let {handleClose}= this.props
    handleClose.call()
	}
	onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.props.checkGroupOptions.length),
      checkAll: checkedList.length === this.props.checkGroupOptions.length,
    });
  }

  onCheckAllChange = (e) => {
		let checkAllList= this.props.checkGroupOptions.map((ele)=>ele.value)
    this.setState({
      checkedList: e.target.checked ? checkAllList : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
  render(){
    let {checkedList} = this.state
    let {items,show,checkGroupOptions}= this.props
    //console.log(checkGroupOptions)
    return (
      <Modal
         title="设置筛选条件"
         visible={show}
         onOk={this.handleOk.bind(this)}
         onCancel={this.handleCancel.bind(this)}
       >
        <CheckboxGroup value={checkedList} onChange={this.onChange} >
          <Row>
            {
              checkGroupOptions.map((it)=><Col span={9} offset={3}><Checkbox value={it.value}>{it.label}</Checkbox></Col>)
            }
          </Row>
        </CheckboxGroup>
       </Modal>
    )
  }

}

export default class AdvancedSearchPanel extends Component{
  state = {
    show:false,
    items:[],
		displayItem:[],
		checkGroupOptions:[]
  }
  constructor(props){
    super(props)
	}

	_fetchData(module){
		let that = this
		new FetchAPI().fetchGet('/search/getSearchFieldSetJson',{body:{module}}).then((json)=>{
			let jsonArr = json.map((it)=>{ return{key:it.code,title:it.name,type:it.type,checked:it.checked,id:it.id}})
			let checkGroupOptions = json.map((it)=>{ return{value:it.code,label:it.name}})
			that.setState({
				checkGroupOptions,
				items:jsonArr,
				displayItem:jsonArr.filter((it)=>it.checked==1).map((it)=>it.key)
			})
		})
	}
  componentDidMount(){
    let that=this
    let {module,showConfig}=this.props
		if(showConfig){
			this._fetchData(module)
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.module!=this.props.module){
			let {module,showConfig}=nextProps
			if(showConfig){
				this._fetchData(module)
			}
		}
	}
  //渲染搜索item
  renderSearchItem(){
		let {children} = this.props
		let {displayItem}=this.state
		// console.log(displayItem,'displayItemdisplayItemdisplayItem')
    let childrenArray = React.Children.toArray(children)
    if(React.Children.count(children) === 0){
      return null
		}
		if(displayItem.length>0){
			return childrenArray.filter((ele)=>displayItem.indexOf(ele.props.name)>-1).map((it,idx)=>{
        // console.log("b",it.props.name)
				return (
					<Row gutter={10} key={idx+it.props.name}>
						<FormItem >
							{React.cloneElement(it,{allowClear:true}) }
						</FormItem>
					</Row>
				)
			})
		}
		return childrenArray.map((it,idx)=>{
			return (
				<Row gutter={10} key={idx+it.props.name}>
					<FormItem >
						{React.cloneElement(it,{allowClear:true}) }
					</FormItem>
				</Row>
			)
		})
  }
  //表单实例
  saveFormRef = (form) => {
    this.form = form;
  }
  handleRest(e,values){
    // console.log(this)
    this.form.resetFields()
  }
  //搜索函数。 作为baseform create的回调
  handleSearch(e,values){
    e.preventDefault()
    let {filterSubmitHandler} = this.props
    // console.log(e,values)
    // filterSubmitHandler.call(this,values);
    // console.log(this)
    this.form.validateFieldsAndScroll((err, values) => {

      if (err) {
        return;
      }
      filterSubmitHandler.call(this,values);
   });
  }
  //查询项配置窗口唤醒
  renderAdvancedConfigModal(){
    this.setState({
      show:true
    })
  }

  handleSure(value){
		var {module} = this.props
    var data=this.state.items.filter(it=>value.indexOf(it.key)>=0).map(it=>{ return{searchId:it.id}})
    new FetchAPI().fetchPost('/search/saveSelJson?module='+module,{
      body:{items:data}
		})
		.then((json)=>{
			this.setState({
				displayItem:value,
				show:false
			})
    })
  }

  handleClose(){
    this.setState({
      show:false
    })
  }

  renderConfig(){
    let {placeHolder,items,displayItem,show,checkGroupOptions} = this.state
    let {showConfig,children} = this.props
    if(showConfig){
      return (<AdvancedSearchConfig handleSure={this.handleSure.bind(this)} handleClose={this.handleClose.bind(this)} items={items} checkGroupOptions={checkGroupOptions} selectedKeys={displayItem} show={show}/>)
    }
  }

  render(){
    let {children,showConfig,titleSearch,jobList} = this.props
    // console.log(titleSearch)
    return(
      <div className="new-advanced-search-panel" style={{display:'flex',flex:1,overflow:'auto',overflowX:'hidden',width:'280px'}}>
        {this.renderConfig()}
        <AutoSubmitForm className="new-advanced-search-form" onSubmit={this.handleSearch.bind(this)} ref={this.saveFormRef.bind(this)}>
          <div className="search-top">
          { titleSearch && React.cloneElement(titleSearch) }
          </div>
          <div className="search-title">
            <h5>查询条件</h5>
						{/* <div>
							<Icon type="retweet" className="reset-btn" onClick={this.renderAdvancedConfigModal.bind(this)}/>
							<Button className="reset-btn" onClick={this.handleRest.bind(this)}>清空</Button>
							<Permission expression={showConfig} >
							<Button shape="circle" icon="setting" onClick={this.renderAdvancedConfigModal.bind(this)}/>
							<Icon type="setting" className="setting-btn" onClick={this.renderAdvancedConfigModal.bind(this)}/>
							</Permission>
						</div> */}
						<ButtonGroup>
              <Button title="重置输入内容" icon="retweet" onClick={this.handleRest.bind(this)}/>
              <Permission expression={showConfig} >
                <Button title="设置查询条件" icon="setting" onClick={this.renderAdvancedConfigModal.bind(this)}/>
              </Permission>
            </ButtonGroup>
          </div>
          <div className="search-content">
						{this.renderSearchItem()}
						<Row>
							<Col span={6} offset={18}>
								<Button htmlType="submit" type="primary">搜索</Button>
							</Col>
						</Row>
          </div>
        </AutoSubmitForm>
      </div>
    )
  }
}
class TreeViewListItem extends Component{
  state = {
    expand:true,
    selectedKeys:"",
    selectedTitle:""
  }
  renderTreeNode(){
    let {jobList} = this.props
    return jobList.map((it,idx)=>{
      return (
        <TreeNode key={idx} title={it} />
      )
    })
  }
  treeSelect(selectedKeys,e){
    let {selectedNodes} = e
    let title = selectedNodes.pop().props.title
    // console.log(title)
  }
  renderTreeView(){
    return (
      <div>
        <Tree onSelect={this.treeSelect.bind(this)} defaultSelectedKeys={[this.state.selectedKeys]}>
          {this.renderTreeNode()}
        </Tree>
      </div>
    )
  }
  renderSelectView(){
    return (
      <div>{this.state.selectedTitle}123123</div>
    )
  }
  renderWhich(){
    return this.state.expand?this.renderTreeView():this.renderSelectView()
  }
  handleMouer(falg){
    this.setState({
      expand:falg
    })
  }
  render(){
    return (
      <div onMouseEnter={this.handleMouer.bind(this,true)} onMouseLeave={this.handleMouer.bind(this,false)}>
        <div>招聘职位</div>
        {this.renderWhich()}
      </div>
    )
  }
}

AdvancedSearchPanel.propTypes = {
  showConfig:PropTypes.bool,
  filterSubmitHandler:PropTypes.func,
  titleSearch:PropTypes.element,
  jobList:PropTypes.Array,
}
AdvancedSearchPanel.defaultProps = {
  showConfig:false,
  filterSubmitHandler:function(){},
  module:"",
  jobList:[1,2,3,4,5,6,7,8,9]
}

import React, {Component, PropTypes} from 'react'
import {
  Button,
  Input,
  Table,
  Form,
  Dialog,
  Col,
  Row,
  DatePicker,
  Tooltip,
  Select,
  Checkbox,
  Tree,
	Card,
	Tag,
	Icon
} from 'antd'
import moment from 'moment';
import {Layout,Fixed,Pane} from 'app/components/Layout'
import TreeView from 'app/components/TreeView'
import WrapperComponent from 'app/decorators/WrapperComponent'
import ErrorBoundary from 'app/components/ErrorBoundary'
import NestedComponent from 'app/decorators/NestedComponent'
import PageView from 'app/components/Page'
import ButtonGroupExt from 'app/components/ButtonGroupExt'
import styles from './styles.less'

const {TreeNode} = Tree
const ButtonGroup = Button.Group;

const Option = Select.Option
const {RangePicker} = DatePicker;

@NestedComponent()
@WrapperComponent(ErrorBoundary)
export default class OrganizationView extends PageView {
  constructor(props) {
    super(props)
  }
  state = {

  }
  componentWillMount() {
    // let {actions} = this.props;
    // actions.listAction()
    //  actions.menuAction()
	}
	componentDidMount() {
		let { actions, reduce } = this.props;
		actions.orgTreeAction()
	}
  handleMenu(id,actionType){
    let { actions,router } = this.props
    actions[actionType].call(this,router,id)
		// actions.orgTreeAction()
  }
  renderTableList() {
    let self = this;
    let {reduce} = this.props
    // // console.log("reduce:",reduce)
    // let {spins:{tableSpin},key} = reduce
    // let page = reduce.page
    // let list = [...reduce.list.values()]

    return (
			<TreeView treeDataSource ={reduce.orgTree}
				renderNode={
					(data)=> <TreeNode key={data.key} title={
						<label>{data.text||data.title}
						<ButtonGroupExt onClick={this.handleMenu.bind(self,data.value)}>
							<Button actionkey="editRoute"  icon="edit">编辑</Button>
							<Button actionkey="deleteOrgAction" icon="delete" confirm="是否确认删除">删除</Button>
						</ButtonGroupExt>
						{data.names?data.names.map((value)=>(<Tag><Icon type="user"/>{value}</Tag>)):null}
					</label>}
				/>}
			/>
		)
  }
  handlerEditRoute(id){
    let {actions,router} = this.props;
    actions.editRoute(router,id);
  }
  handlerAddRoute(){
		let {actions,router} = this.props;
    actions.addRoute(router)
  }
  handlerSubmit(){
    let {actions,router,reduce} = this.props;
    let {list} = reduce
    actions.saveListAction({list:[...list.values()]})
  }
  renderToolbar() {
    let {actions} = this.props;
    return (
      <div className='button-group'>
        <Button.Group>
          <Button type="primary" onClick={this.handlerAddRoute.bind(this)}>添加</Button>
        </Button.Group>
      </div>
    )
  }
  render() {
    return (
      <Card title={<div><h3 className="card-title">组织结构设置</h3></div>} className='organizationView' extra={this.renderToolbar()} >
        {this.renderTableList()}
      </Card>
    )
  }
}

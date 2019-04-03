import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { is } from 'immutable';
import { Tabs,Button } from 'antd'
import { updateTabChecked, deleteTabFromList } from './action'
import {IframePage} from 'components/Page'
import style from './Tabs.less'
const TabPane = Tabs.TabPane

@connect(
    (state, props) => ({ tabList: state.tabListResult }),
    (dispatch) => ({ actions: bindActionCreators(routerActions, dispatch),
      dispatch: dispatch })
)
export default class TabsPage extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount() {
    // console.log('this.props', this.props);
  }
  onChange(activeKey) {
    const { actions } = this.props;
    this.props.dispatch(updateTabChecked({ activeKey: activeKey }))
    actions.push(activeKey)
  }
  onEdit(targetKey, action) {
    this[action](targetKey);
  }
  remove(targetKey) {
    const { actions, tabList } = this.props;
    let delIndex
    let activeKey

    if (targetKey === tabList.activeKey) {
      tabList.list.map((tab, index) => {
        tab.key === targetKey ? delIndex = index : null;
      });
      // eslint-disable-next-line no-nested-ternary
      activeKey = tabList.list[delIndex + 1] ?
        tabList.list[delIndex + 1].key : (tabList.list[delIndex - 1] ?
          tabList.list[delIndex - 1].key : '');
      actions.push(activeKey);
    }
    this.props.dispatch(deleteTabFromList({ targetKey: targetKey }));
  }
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
      return true;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    return false;
  }
  render() {
    const { tabList } = this.props
    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        className="menu-tab"
       // activeKey={tabList.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {
          tabList.list.map((tab) =>
            <TabPane tab={tab.title} key={tab.key}>{tab.content}</TabPane>)
        }
      </Tabs>
    )
  }
}


class MultiTab extends Component{
	constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: '首页', content: '首页首页', key: 'dashboard' ,closable: false,src:"/static/js/client/main.html#/dashboard"},
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
		};
		window.addTab = this.add.bind(this)
		window.changeTab = this.onChange.bind(this)
		window.editTab = this.onEdit.bind(this)
		window.removeTab = this.remove.bind(this)
  }
	componentDidMount = () => {
		this.setState({ activeKey:'dashboard' })
	}

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = (newPane) => {
    const panes = this.state.panes;
		let activeKey = this.state.activeKey
		if(newPane&&panes.some((e)=>e.key==newPane.key)){
			const {key:newKey} = newPane
			activeKey = newKey
			//todo
			panes.forEach((e,idx)=>{
				if(e.key==newPane.key){
					panes[idx] = newPane
					console.log(document.body.querySelector(`iframe[name='${activeKey}']`),'iframe')
					// document.querySelector(`iframe[name=${activeKey}]`)
					// todo
					if(newPane.refresh){
						document.body.querySelector(`iframe[name='${activeKey}']`).contentWindow.location.reload()
					}
				}
			})
		}else if(newPane){
			panes.push(newPane)
			activeKey = newPane.key
		}
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    return (
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
					onEdit={this.onEdit}
					className="menu-tab"
        >
          {this.state.panes.map(pane =>
					<TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
						<IframePage src={pane.src} name={pane.key}/>
					</TabPane>)}
        </Tabs>
    );
  }
}
export {MultiTab}

/**
* @Author: jax <jaxchow>
* @Date:   2016-02-24T09:43:05+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-03-16T15:35:59+08:00
* @Description: 应用头部布局区域
*/

import React from 'react'
import {
  Layout,
  Header,
  Menu,
  Button,
  Breadcrumb,
  Card,
  Avatar,
  Dropdown,
  Icon
} from 'antd';
import Permission from 'components/Permission'
import ConfigUtils,{hasPermission} from 'utils/ConfigUtils'
import {Link} from 'react-router'
const { Meta } = Card;

export default class HeaderSide extends React.Component {
  rootSubmenuKeys = ['2', '3', '8','10'];
  state = {
    collapsed: true,
    openKeys: ['0'],
   }

   onOpenChange = (openKeys) => {
     const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
     if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
       this.setState({ openKeys });
     } else {
       this.setState({
         openKeys: latestOpenKey ? [latestOpenKey] : [],
       });
     }
   }
   toggleCollapsed = (e,collapsed) => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  renderAuthMenuItem(element,name){
    if(hasPermission(name))
    {
      return (element)
    }else{
      return null
    }
	}
	handleSelect({ item, key, selectedKeys }){
		// console.log(item, key, selectedKeys,'aaaaaaaaaaa')
	}
  render() {
    let {location} = this.props
    let actions=this.state.collapsed==false ? [ <Icon type="edit" />, <Icon type="ellipsis" />]:[<Icon type='menu-fold' onClick={this.toggleCollapsed} />]
    return (

      <div className="app-header">
        <Menu mode="horizontal"  defaultSelectedKeys={['0']}  openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange.bind(this)}
				onSelect={this.handleSelect}
        style={{overflowY:'hidden'}}
				>

          {/* this.renderAuthMenuItem() */}
          <Menu.Item key="0" >
            <Link to={{
                pathname: 'dashboard',
                state: { breadcrumbName: "首页" }
              }}
            >
              <span>首页</span>
            </Link>
          </Menu.Item>
          {
            this.renderAuthMenuItem(<Menu.Item key="2" >
              <Link to={{
                  pathname: 'resume/list',
                  state: { breadcrumbName: "候选人管理" }
                }}
              >
                <span>候选人管理</span>
              </Link>
            </Menu.Item>,"resume")
          }
            {/*
            this.renderAuthMenuItem((<Menu.SubMenu key="2" title={<span>候选人管理</span>}>
              <Menu.Item key="2-1">
                <Link to={{
                    pathname: 'resume/list',
                    state: { breadcrumbName: "简历筛选" }
                  }}>
                  <span>简历筛选</span>
                </Link>
              </Menu.Item>

              <Menu.Item key="2-2">
                <Link to={{
                    pathname: 'resume/distributed',
                    state: { breadcrumbName: "待分配简历" }
                  }} >
                  <span>待分配简历</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>),"resume")

          */}
          {
            /*this.renderAuthMenuItem((<Menu.Item key="1">
                <Link to={{
                    pathname: 'job/list',
                    state: { breadcrumbName: "职位管理" }
                  }}>
                  <Icon type="nav-icon-job" />
                  <span>职位管理</span>
                </Link>
              </Menu.Item>),"job")*/
              this.renderAuthMenuItem((<Menu.SubMenu key="1" title={<span>职位管理</span>}>
                <Menu.Item key="1-1">
                  <Link to={{
                      pathname: 'job/list',
                      state: { breadcrumbName: "职位管理" }
                    }}>
                    <span>职位管理列表</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="1-2">
                  <Link to={{
                      pathname: '/job/jobrelease/1/1',
                      state: { breadcrumbName: "新增职位" }
                    }}>
                    <span>新增职位</span>
                  </Link>
                </Menu.Item>
								<Menu.Item key="1-3">
                  <Link to={{
                      pathname: 'job/search',
                      state: { breadcrumbName: "职位导入" }
                    }}>
                    <span>职位导入</span>
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>),"job")
            }
          {
            this.renderAuthMenuItem((<Menu.SubMenu key="3" title={<span>面试管理</span>}>
              <Menu.Item key="3-1">
                <Link  to={{
                    pathname: 'interview/list',
                    state: { breadcrumbName: "面试管理" }
                  }}>
                  <span>面试管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3-2">
                <Link to={{
                    pathname: 'interview/calendar',
                    state: { breadcrumbName: "面试日历" }
                  }}>
                  <span>面试日历</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>),"interview")
          }
          {
            this.renderAuthMenuItem((<Menu.Item key="4" >
            <Link to={{
                pathname: 'elite',
                state: { breadcrumbName: "人才库" }
              }}>
              <span>人才库</span>
            </Link>
          </Menu.Item>),"elite")
        }{
            this.renderAuthMenuItem((<Menu.Item key="5" >
            <Link to={{
                pathname: 'member/list',
                state: { breadcrumbName: "员工管理" }
              }}>
              <span>员工管理</span>
            </Link>
          </Menu.Item>),"member")
        }{
            this.renderAuthMenuItem((<Menu.Item key="6" >
            <Link to={{
                pathname: 'soundlist',
                state: { breadcrumbName: "通话记录" }
              }}>
              <span>通话记录</span>
            </Link>
          </Menu.Item>),"soundlist")
        }{
            this.renderAuthMenuItem((<Menu.Item key="7" >
            <Link to={{
                pathname: 'credit',
                state: { breadcrumbName: "诚信库" }
              }}>
            <span>诚信库</span>
            </Link>
          </Menu.Item>),"credit")
        }
        {
          this.renderAuthMenuItem(<Menu.Item key="8" >
            <Link to={{
                pathname: 'report',
                state: { breadcrumbName: "统计分析" }
              }}
            >
              <span>统计分析</span>
            </Link>
          </Menu.Item>,"report")
          /*
          this.renderAuthMenuItem((<Menu.SubMenu key="8"  title={<span>统计分析</span>}>
            <Menu.Item key="8-1">
              <Link to={{
                  pathname: 'report',
                  state: { breadcrumbName: "简历分析" }
                }}>
                <span>简历分析</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8-2">
            <Link to={{
                pathname: 'report/commin',
                state: { breadcrumbName: "通信分析" }
              }}>
                <span>通信分析</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8-3">
              <Link to={{
                  pathname: 'report/hrreport',
                  state: { breadcrumbName: "招聘分析" }
                }}>
                <span>招聘分析</span>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>),"report")
          */

      }
      {
          this.renderAuthMenuItem((<Menu.Item key="9" >
            <Link to={{
                pathname: 'wesite',
                state: { breadcrumbName: "微站管理" }
              }}>
              <Icon type="nav-icon-weChat" />
            <span>微站管理</span>
            </Link>
          </Menu.Item>),"wesite")
        }{
            this.renderAuthMenuItem((
					<Menu.Item key="10">
            <Link to={{
                pathname: 'settings',
                // state: { breadcrumbName: "人才标签",keyPath:['sub5','field'] }
              }}>
              <span>系统设置</span>
            </Link>
          </Menu.Item>),"settings")
        }
        </Menu>
      </div>
    )
  }
}

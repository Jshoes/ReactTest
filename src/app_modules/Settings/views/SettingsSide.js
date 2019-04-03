import React,{Component} from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router'
import Permission from 'app/components/Permission'
import ConfigUtils,{hasPermission} from 'app/utils/ConfigUtils'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class SettingsSide extends React.Component {

  state = {
    keyPath: ['sub1','company'],
  }

  renderAuthMenuItem(element,name){
    if(hasPermission(name))
    {
      return (element)
    }else{
      return null
    }
  }

  render() {
    // console.log(t)

    let [openKeys,selectedKey]= ['sub1','company']
    let {location} = this.props
    if(location.state && location.state.keyPath){
      [openKeys,selectedKey]= location.state.keyPath
    }
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[selectedKey]}
        defaultOpenKeys={[openKeys]}
				mode="inline"
				className='side-menu'
      >
        <SubMenu key="sub1" title={<span><Icon type="home" /><span>公司信息</span></span>}>
        { this.renderAuthMenuItem(
            <Menu.Item key="company">
              <Link to={{
                  pathname: 'settings/company',
                  state: { breadcrumbName: "公司信息设置",keyPath:['sub1','company'] }
                }}>
                <span>公司信息设置</span>
              </Link>
            </Menu.Item>
        ,"company")}
        </SubMenu>
        <SubMenu key="sub6" title={<span><Icon type="usergroup-add" /><span>组织角色管理</span></span>}>
          { this.renderAuthMenuItem(
            <Menu.Item key="organization">
              <Link to={{
                  pathname: 'settings/organization',
                  state: { breadcrumbName: "组织结构设置" ,keyPath:['sub6','organization']}
                }}>
                <span>组织结构设置</span>
              </Link>
            </Menu.Item>,"dept")
          }
          { this.renderAuthMenuItem(
            <Menu.Item key="role">
              <Link to={{
                  pathname: 'settings/role',
                  state: { breadcrumbName: "角色权限设置", keyPath:['sub6','role'] }
                }}>
                <span>角色权限设置</span>
              </Link>
            </Menu.Item>,"role")
          }
          { this.renderAuthMenuItem(
            <Menu.Item key="userRights">
              <Link to={{
                  pathname: 'settings/userRights',
                  state: { breadcrumbName: "成员设置" , keyPath:['sub6','userRights'] }
                }}>
                <span>成员设置</span>
              </Link>
            </Menu.Item>,"user")
          }
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="mail" /><span>邮箱设置</span></span>}>
          { this.renderAuthMenuItem(
          <Menu.Item key="mailbox">
            <Link to={{
                pathname: 'settings/mailbox',
                state: { breadcrumbName: "接收简历邮箱设置",keyPath:['sub2','mailbox']}
              }}>
              <span>接收简历邮箱设置</span>
            </Link>
          </Menu.Item>,"receiveMailBox")
          }
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="global" /><span>渠道</span></span>}>

        { this.renderAuthMenuItem(
          <Menu.Item key="channel">
            <Link to={{
                pathname: 'settings/channel',
                state: { breadcrumbName: "支持渠道列表" ,keyPath:['sub3','channel']}
              }}>
              <span>支持渠道列表</span>
            </Link>
          </Menu.Item>,"support")
        }
        </SubMenu>

        <SubMenu key="sub4" title={<span><Icon type="rocket" /><span>招聘提速</span></span>}>
          { this.renderAuthMenuItem(
          <Menu.Item key="remind">
            <Link to={{
                pathname: 'settings/remind',
                state: { breadcrumbName: "重要事项提醒设置",keyPath:['sub4','remind']}
              }}>
              <span>重要事项提醒设置</span>
            </Link>
          </Menu.Item>,"remind")
          }
          { this.renderAuthMenuItem(
          <Menu.Item key="template">
            <Link to={{
                pathname: 'settings/template',
                state: { breadcrumbName: "模板设置" ,keyPath:['sub4','template']}
              }}>
              <span>模板设置</span>
            </Link>
          </Menu.Item>,"template")
        }
          { this.renderAuthMenuItem(
          <Menu.Item key="channelsettings">
            <Link to={{
                pathname: 'settings/channelsettings',
                state: { breadcrumbName: "渠道设置" ,keyPath:['sub4','channelsettings']}
              }}>
              <span>简历更新周期设置</span>
            </Link>
          </Menu.Item>,"update")
        }
        { this.renderAuthMenuItem(
          <Menu.Item key="apply">
						<Link to={{
                pathname: 'settings/apply',
                state: { breadcrumbName: "信息登记表设置" ,keyPath:['sub4','apply']}
              }}>
              <span>信息登记表设置</span>
            </Link>
					</Menu.Item>,"register")
        }
        </SubMenu>

        <SubMenu key="sub5" title={<span><Icon type="setting" /><span>系统属性设置</span></span>}>
          { this.renderAuthMenuItem(
          <Menu.Item key="archive">
						<Link to={{
                pathname: 'settings/archive',
                state: { breadcrumbName: "归档原因设置" ,keyPath:['sub5','archive']}
              }}>
              <span>归档原因设置</span>
            </Link>
					</Menu.Item>,"filingReasons")
          }
          { this.renderAuthMenuItem(
          <Menu.Item key="adverse">
						<Link to={{
                pathname: 'settings/adverse',
                state: { breadcrumbName: "不良事件设置" ,keyPath:['sub5','adverse']}
              }}>
              <span>不良事件设置</span>
            </Link>
					</Menu.Item>,"adverseEvents")
          }
          { this.renderAuthMenuItem(
          <Menu.Item key="reject">
						<Link to={{
                pathname: 'settings/reject',
                state: { breadcrumbName: "offer拒绝原因设置" ,keyPath:['sub5','reject']}
              }}>
              <span>offer拒绝原因设置</span>
            </Link>
					</Menu.Item>,"refuseReasons")
        }
          { this.renderAuthMenuItem(
          <Menu.Item key="talentList">
            <Link to={{
                pathname: 'settings/talentList',
                state: { breadcrumbName: "标签设置",keyPath:['sub5','talentList']}
              }}>
              <span>标签设置</span>
            </Link>
          </Menu.Item>,"labels")
        }
        { this.renderAuthMenuItem(
          <Menu.Item key="field">
            <Link to={{
                pathname: 'settings/field',
                state: { breadcrumbName: "系统字段" ,keyPath:['sub5','field']}
              }}>
            <span>系统字段</span>
          </Link>
          </Menu.Item>,"fields")
        }
        </SubMenu>
      </Menu>
    );
  }
}

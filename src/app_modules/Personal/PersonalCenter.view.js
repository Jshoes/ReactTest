/**
 * Created by Administrator on 2018/3/12.
 */
import React, {Component, PropTypes} from 'react'
import {
    Button,
    Input,
    Table,
    Select,
    DatePicker,
    Modal,
    Menu,
    Card,
    Row,
    Col,
    Avatar,
    message,
    Dropdown,
    Icon,
} from 'antd'
import {Link} from 'react-router'
import moment from 'moment'
import PageView from 'components/Page'
import AdvancedSearchForm from 'components/AdvancedSearch'
import {Layout,Fixed,Pane} from 'components/Layout'
import DataTable from 'components/DataTable'
import Ellipsis from 'components/Ellipsis'
import ButtonGroupExt from 'components/ButtonGroupExt'
import CalendarPicker from 'components/CalendarPicker'
import TagSelect from 'components/TagSelect'
import Permission from 'components/Permission'
import DictUtils from 'app-utils/DictUtils'
import styles from './personalCenter.less'
import EmailFormView from 'components/sendTemplate/BindEmailForm.view'
import defaultIcon from'../../themes/defaultIcon.png'
const Option = Select.Option

class PersonalHead extends Component{


    jumpToRecord(){
        let {actions} = this.props
        actions.jumpToRecordAction()
    }
    jumpToWithdraw(){
        let {actions,accountInfo:{isRealName}} = this.props
        if(!isRealName){
            message.info("请先实名认证",5)
            return false
        }
        actions.jumpToWithdrawAction()
    }

    render(){
        let {accountInfo:{name,isRealName,account,email,roleName,moneyClear},showModal} = this.props
        return (
            <Row gutter={6} className="personalInfo-head">
                <Col span={12} className="personalInfo-head-left">
                    <Row gutter={6}>
                        <Col span={6}>
                            <img src={defaultIcon} width="80%" style={{borderRadius:"50%",marginLeft:"10%"}}/>
                        </Col>
                        <Col span={18} className="personalInfo-head-details">
                            <Row>
                                <span><span className="name"><Ellipsis tooltip={true} length={30}>{name + "("+roleName+")"}</Ellipsis></span>{isRealName?<span className="hasPromiseReal">已认证<Icon type="nav-icon-certify" style={{backgroundColor:"#fba64c",color:"#fff",borderRadius:"4px",marginLeft:"5px"}}/></span>:<Link to="/personal/list/bereal">实名认证</Link>}</span>
                            </Row>
                            <Row>
                                <span className="account">登录帐号：{account}</span>
                            </Row>
                            <Row>
                                <span className="email">邮箱：{email == "" ?<span><span className="unbound">未绑定</span><a onClick={showModal}>绑定邮箱</a></span>:email}</span>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={12} className="personalInfo-head-right">
                    <Row gutter={6}>
                        <Col span={18} offset={6}>
                            <Row>
                                <span>账户余额</span>
                            </Row>
                            <Row>
                                <span className="balancebtn-box">
                                    <span className="balance">{"￥"+moneyClear }</span>
                                    <Button type="primary" onClick={this.jumpToWithdraw.bind(this)}>提现</Button>
                                    <Button onClick={this.jumpToRecord.bind(this)}>提现记录</Button>
                                </span>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default class PersonalView extends PageView {

    constructor(props) {
        super(props);
        this.state = {
            visible:false
        }

    }
    componentWillMount() {
        let {actions,router} = this.props;
        actions.listAction()
        actions.accountInfoAction()
    }
    hideModal(){
        this.setState({
            visible:false
        })
    }
    showModal(){
        this.setState({
            visible:true
        })
    }

    renderTableList() {

        let that=this;
        let {reduce} = this.props
        let {spins:{tableSpin},key} = reduce
        let list = [...reduce.list.values()]

        let tableConf = {
            loading: tableSpin,
            rowKey: key,
            onChange:this.onChange.bind(this),
            columns: [
                 {
                    title: "奖励时间",
                    key: "date",
                    width: 150,
                    dataIndex: "date",
                }, {
                    title: "金额",
                    key: "money",
                    dataIndex: "money",
                    width: 150,
                    render:(val)=>{
                        return "￥"+val
                    }
                }, {
                    title: "奖励类型",
                    key: "bonusType",
                    dataIndex: "bonusType",
                    width: 150,
                },{
                    title: "明细",
                    key: "desc",
                    dataIndex: "desc",
                    width: 150,
                },
            ]
        }

        return (<DataTable  {...tableConf} dataSource={list} pagination={false}/>)
    }

    render() {
        let {children} = this.props
        //模版没有好的解决方案，暂时这样处理
        //console.log(children)

        // if(children && children.type && children.type.WrappedComponent==ResumeFolderListView){
        //     return React.cloneElement(children)
        // }else{
        let {actions,router,reduce:{item}} = this.props
        let {visible} = this.state
        return (
            <Card type="inner">
                {children}
                {visible?<EmailFormView hideModal={this.hideModal.bind(this)}></EmailFormView>:null}
                <PersonalHead actions={actions} router={router} accountInfo={item} showModal={this.showModal.bind(this)}/>
                <Card title="奖励金记录">
                {this.renderTableList()}
                </Card>
            </Card>
        )
        // }
    }
}

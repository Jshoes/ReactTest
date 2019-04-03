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
    Dropdown,
    Icon,
} from 'antd'
import {Link} from 'react-router'
import moment from 'moment'
import ClientAPI,{emitter} from 'app-utils/externalUtils'
import PageView from 'components/Page'
import AdvancedSearchForm from 'components/AdvancedSearch'
import {Layout,Fixed,Pane} from 'components/Layout'
import DataTable from 'components/DataTable'
import ButtonGroupExt from 'components/ButtonGroupExt'
import CalendarPicker from 'components/CalendarPicker'
import TagSelect from 'components/TagSelect'
import Permission from 'components/Permission'
import DictUtils from 'app-utils/DictUtils'
import styles from './sharewindow.less'
const Option = Select.Option

export default class SharelView extends PageView {

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        let {actions,router} = this.props;
        actions.getShareCodeAction()
    }
    copyCode(){

        let {reduce:{promo}} = this.props
        let content = "推荐使用遇仁招聘管理系统来提高企业招聘效率，现在加入还有优惠。遇仁官网：http://www.yurenwang.net，邀请码："+promo
        new ClientAPI().onCopyToClipBoard(content)
    }


    render() {
        let {children} = this.props
        //模版没有好的解决方案，暂时这样处理
        //console.log(children)

        // if(children && children.type && children.type.WrappedComponent==ResumeFolderListView){
        //     return React.cloneElement(children)
        // }else{
        let {actions,router,reduce:{promo}} = this.props

        return (
            <Card type="inner">
                {children}
                <Card className="shareCardBox">
                    <div className="sharewindow-headBg">
                        <span className="your-promo">您的邀请码{promo}</span>

                    </div>
                    <div className="share-bottom">
                        <Row>
                            <div style={{lineHeight:"40px",textAlign:"center"}}>
                                <span>复制链接发送给好友</span>
                                <span class="shareContent">推荐使用遇仁招聘管理系统来提高企业招聘效率，现在加入还有优惠。遇仁官网：http://www.yurenwang.net，邀请码：{promo}</span>
                                <Button type="primary" onClick={this.copyCode.bind(this)}>复制邀请链接</Button>
                            </div>
                        </Row>
                    </div>
                    <h3>活动规则介绍</h3>
                    <ol>
                        <li>活动时间 ：本活动自2018年4月1日开始</li>
                        <li>活动期间，新用户在遇仁官网注册成功，系统自动赠送通用抵扣券1张（面额100元）、通信抵扣券2张（面额分别是50元、100元）</li>
                        <li>活动期间，用户成功购买遇仁.招聘管理系统后，将额外获取遇仁.招聘管理系统的推广邀请码，您可以将该邀请码分享给您的同事、朋友，一旦对方成功购买遇仁招聘管理系统并输入您             的邀请码，则代表对方是您的推广客户，您将获得遇仁提供的200元现金红包一份，多买多得，收益无上限。同时，对方购买系统时，可以通过输入邀请码，一次性获得80元现金红包。分享的越多，您就有机会获得更多的现金红包</li>
                        <li>推广获得的现金红包，系统在3个工作日内，自动打入您在遇仁.招聘管理系统--个人中心的账户中，您可以通过支付宝提取该现金</li>
                        <li>在邀请和获取奖励金的过程中，如存在违规行为（包括但不限于非真实企业帐号购买、违规企业购买、利用系统漏洞、黑客工具、套现等非正常方式），我们将取消用户的奖励金发放，并有权回收个人奖励金余额</li>
                        <li>遇仁将依法经营活动，但活动受政府机关指令停办或者活动遭受网络攻击或系统故障需要暂停举办的，则活动可能无法顺利进行，此种情况视为活动故障，遇仁及其关联公司均无须对此承担责任或进行补偿</li>
                        <li>遇仁可根据本次活动的实际情况对活动规则进行变动或调整，相关变动或调整将公布在活动页面上，并于公布时生效</li>
                        <li>本活动的最终解释权归遇仁所有</li>
                    </ol>
                </Card>
            </Card>
        )
        // }
    }
}

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Input,
    Table,
    Select,
    DatePicker,
    Modal,
    Menu,
    List,
    Popconfirm,
    Card,
    Radio,
    Checkbox,
    message,
    AutoComplete,
    Dropdown,
    Icon,
} from 'antd'
import moment from 'moment';
import {Link} from 'react-router'
import AdvancedSearchForm from 'app/components/AdvancedSearch'
import BaseForm,{FormItem} from 'app/components/BaseForm'
import PageView from 'app/components/Page'
import {Layout,Fixed,Pane} from 'app/components/Layout'
import DictUtils from 'app/utils/DictUtils'
import CalendarPicker from 'app/components/CalendarPicker'
import styles from './JobStyles.less'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option
const Search = Input.Search;
const AutoCompleteOption = AutoComplete.Option;

class ShowChannelIcon extends Component{
  renderChannel(){
    let {channel} = this.props
    return <Icon type={"icon-channel"+channel} title={DictUtils.getDictLabelByValue("channel",channel)}/>
  }
  render(){
    return(
      <span style={{marginLeft:10}}>
        {this.renderChannel()}
      </span>
    )
  }
}

class MuliteTagsSplit extends Component{
  renderTags(){
    let {tags} = this.props
    return tags.filter((it,idx)=>{
      return it != "" && it != null
    }).join(" | ")
  }
  render(){
    return (
      <span>
        {this.renderTags()}
      </span>
    )
  }
}
MuliteTagsSplit.propTypes = {
  tags: PropTypes.array,
}

MuliteTagsSplit.defaultProps = {
  tags: [],
}

class JobDetailIsShow extends Component{
  render(){
    let {isShow,desc} =this.props
      if(isShow&&desc){
        return(
          <div className="jobDetail-show">{desc}</div>
        )
      }else{
        return null
      }
  }
}

function salaryCombine(lower,upper){
  if(!lower&&!upper){
    return '面议'
  }else{
    return `${lower}-${upper}`
  }
}


export default class JobListView extends PageView {
    constructor(props) {
        super(props);
        this.state = {
          toggleFlag:true,
          btnDis:false
        }
    }

    componentDidMount(){
      const {actions}=this.props
      //actions.listCompany()
    }

    handleReSearch(){
      this.setState({
        toggleFlag:true
      })
    }
    saveFormRef = (form) => {
      this.form = form;
    }
    advFormRef = (form)=>{
      this.advForm = form
    }


    renderSelectOption(data,idx){
      return (<Select.Option value={data.keyValue} key={idx}>{data.keyName}</Select.Option>)
    }
    renderCompanyOption(data,idx){
      return (<Select.Option value={data.id} key={idx}>{data.company}</Select.Option>)
    }
/*<Select name="companyId" label="" placeholder="选择公司" fetch={`${APP_SERVER}/company/listJson`} renderItem={this.renderCompanyOption} />*/
/*<Input name="companyId" label="" defaultValue="f7cc3ef821c5410fa645c0f7873716fd"/>*/
    renderSearchBar() {
        let {reduce:{companys}} = this.props
        return (
          <div className="searchHead-box">
            <AdvancedSearchForm autoSubmitForm={false} filterSubmitHandler={this.handleSubmit.bind(this)} ref={this.advFormRef}>
              <Select name="channel" label="" style={{width:240}} placeholder="选择渠道" fetch={DictUtils.getDictByType("channel")} renderItem={this.renderSelectOption} />
              <Select name="companyId" label="" style={{width:240,marginRight:80}} placeholder="选择公司" fetch={`${APP_SERVER}/company/listJson`} renderItem={this.renderCompanyOption} />
            </AdvancedSearchForm>
          </div>
        )
    }
    togglePub(idx){
      let {actions} = this.props
      actions.togglePubAction(idx)
    }
    toggleLoc(idx){
      let {actions} = this.props
      actions.toggleLocAction(idx)
    }

    handleSubmit(values){
      // e.preventDefault()
      let {actions} = this.props
      // console.log(e,values)
      this.advForm.form.validateFieldsAndScroll({force:true},(err,values) => {
         if (err) {
           return;
         }
         if(values.channel && values.companyId){
           actions.companySearchAction(values)
           this.setState({
             toggleFlag:false
           })
         }
      })
    }
    asyncJob(e){
      e.preventDefault()
      let {actions,router} = this.props
      this.advForm.form.validateFieldsAndScroll((err,values) => {
          if (err) {
             return;
          }
          if(values.channel && values.companyId){
            actions.synchronousAction(values)
          }
       });
    }

    handleImport(e){
      e.preventDefault()
      let {actions,router} = this.props
      this.form.validateFieldsAndScroll({force:true},(err,values) => {
         if (err) {
           return;
         }
         if(!values.jobIdList || values.jobIdList.length <= 0){
           message.warning("请选择导入的职位！",5)
           return
         }
         this.setState({
           btnDis:true
         })
         actions.jobSearchResultMergeAction(values)
       });
    }

    renderToolbar() {

        let {actions} = this.props;
        let {btnDis} = this.state
        return (
              <Button.Group>
                <Button onClick={this.asyncJob.bind(this)}>同步职位</Button>
                <Button htmlType='submit' permission="importJob" onClick={this.handleImport.bind(this)}>导入职位</Button>
              </Button.Group>
        )
    }

    renderJobUninitList() {
      let {reduce:{pub_list}} = this.props
        return (
          <List
            className="job-list"
            itemLayout="horizontal"
            loading={false}
            header={<div className="jobSearchList-header">未入库职位</div>}
            dataSource={pub_list}
            renderItem={(item,idx) => (
              <List.Item actions={item.isShow?[<a onClick={this.togglePub.bind(this,idx)}><Icon type="up" />收起</a>]:[<a onClick={this.togglePub.bind(this,idx)}><Icon type="down" />展开</a>]}
                extra={<JobDetailIsShow isShow={item.isShow} desc={item.jobDescription}/>}
                >
                <div className="listItem-box">
                  <div className="checkbox-box">
                      <Checkbox value={item.channelId}/>
                  </div>
                  <div className="jobDetail-box">
                    <div>
                      <h3 className="jobDetail-title">
                        <MuliteTagsSplit tags={[item.jobTitle,item.companyName]} />
                        <ShowChannelIcon channel={item.channel} />
                      </h3>
                    </div>
                    <div>
                      <MuliteTagsSplit tags={[item.address,salaryCombine(item.salaryLower,item.salaryUpper),DictUtils.getDictLabelByValue("education",item.degree)]} />
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )
    }
    renderJobList(){
      let {reduce:{loc_list}} = this.props
        return (
          <List
            className="job-list"
            itemLayout="horizontal"
            header={<div className="jobSearchList-header">已入库职位</div>}
            loading={false}
            dataSource={loc_list}
            renderItem={(item,idx) => (
              <List.Item actions={item.isShow?[<a onClick={this.toggleLoc.bind(this,idx)}><Icon type="up" />收起</a>]:[<a onClick={this.toggleLoc.bind(this,idx)}><Icon type="down" />展开</a>]}
                extra={<JobDetailIsShow isShow={item.isShow} desc={item.jobDescription}/>}
                >
                <div className="listItem-box">
                  <div className="jobDetail-box">
                    <div>
                      <h3 className="jobDetail-title">
                        <MuliteTagsSplit tags={[item.jobTitle,item.companyName]} />
                        <ShowChannelIcon channel={item.channel} />
                      </h3>
                    </div>
                    <div>
                      <MuliteTagsSplit tags={[item.address,salaryCombine(item.salaryLower,item.salaryUpper),DictUtils.getDictLabelByValue("education",item.degree)]} />
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )
    }
    renderSearchList(){
      let {reduce:{loc_list , pub_list}} = this.props
      let arr = pub_list ? pub_list.map(it=>it.channelId) : []
      if(loc_list.length ||  pub_list.length){
        return (
          <div>
            <FormItem>
              <Checkbox.Group defaultValue={arr} name="jobIdList" style={{width:"100%"}}>
                {this.renderJobUninitList()}
              </Checkbox.Group>
            </FormItem>
            {this.renderJobList()}
          </div>
        )
      }else{
        return <div className="list-no-data importSearch">暂无任何记录</div>
      }

    }

    render() {
        let {children,reduce:{pub_list}} = this.props
        let {toggleFlag} = this.state
        let arr = pub_list ? pub_list.map(it=>it.channelId) : []
          return (
            <Card type="inner" className="jobs-result-list">
                <div className="searchBar-box">
                  {this.renderSearchBar()}
                  {this.renderToolbar()}
                </div>
                <BaseForm onSubmit={this.handleImport.bind(this)} ref={this.saveFormRef}>
                  {!toggleFlag?
                    this.renderSearchList()
                    :
                    <div className="search-no-select">暂无选择查询</div>
                  }
                </BaseForm>
            </Card>
        )
    }
}

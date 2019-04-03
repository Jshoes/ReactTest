import React, {Component, PropTypes} from 'react'
import {
    Row,
    Avatar,
    Col,
  Button,
  Input,
  Table,
  Dropdown,
  Icon,
} from 'antd'
import {Link} from 'react-router'
import moment from 'moment';
import WrapperComponent from "../../decorators/WrapperComponent"
import NestedComponent from '../../decorators/NestedComponent'
import ResumeDetailShow,{EliteDetailShow} from 'components/Resume'


function filterPathSpec(path){
  let arr = path.split("/")
  arr.length = arr.length - 2
  return arr.join("/")
}


@NestedComponent()
export default class EliteDetailView extends Component {

  constructor(props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    let {actions,router} = this.props;
    let oldParams = prevProps.params
    let newParams = this.props.params
    if (JSON.stringify(newParams) !== JSON.stringify(oldParams)){
      actions.itemAction({...newParams})
    }
  }
  componentWillMount() {
    let {actions,router} = this.props;
    actions.itemAction({...router.params})
    actions.tagsAction()
  }

    filterPath(path){
        if(path.indexOf("/resume/folder")>=0){
            return "/resume/folder"
        }else if(path.indexOf("/resume/list")>=0){
            return "/resume/list"
        }else if(path.indexOf("/interview/calendar")>=0){
            return "/interview/calendar"
        }else if(path.indexOf("/interview/list")>=0){
            return "/interview/list"
        }else if(path.indexOf("/job/searchResume")>=0 ){
          return filterPathSpec(path)
        }else if(path.indexOf("/job")>=0){
            return "/job/list"
        }else if(path.indexOf("/credit")>=0){
            return "/credit"
        }else if(path.indexOf("/dashboard")>=0){
            return "/dashboard"
        }else if(path.indexOf("/elite")>=0){
            return "/elite"
        }
    }

  render() {
      let {actions,router,reduce,params,location} = this.props;
      let pathCurr  = this.filterPath(router.getCurrentLocation().pathname)
      /*返回路径 暂时写死 此处一定是返回详情的*/
      location.state.pathname=`${pathCurr}/${params.talentId}/detail`
      let relatedPath ={
          pathname:`${pathCurr}/${params.talentId}/detail/connect`,
          state:location.state
      }
      console.log(relatedPath)
      let btnGroup = (
          <div className="resume-option-box">
              <Button><Link to={relatedPath}>关联职位</Link></Button>
          </div>
      )

      return (
          <EliteDetailShow router={router} actions={actions} reduce={reduce} btnGroup={btnGroup} eliteFlag={true}/>
    )
  }
}

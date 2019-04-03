
import React,{Component} from 'react'
import {
    Row,
    Avatar,
    Col,
    Button,
    Input,
    Table,
    Dropdown,
    Menu,
    Select,
    Modal,
    Tabs,
    Icon,
} from 'antd'
import {Link} from 'react-router'
import NestedComponent from 'app/decorators/NestedComponent'
import DictUtils from 'app-utils/DictUtils'
import Layout,{Fixed,Pane} from 'app/components/Layout'
import ResumeDetailView from './ResumeDetail.view'


const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;



@NestedComponent()
export default class PersonInfoDetailSame extends Component{
  render(){
    let resumeList = [{
      id:"123",
      name:"zhangsan"
    },{
      id:"456",
      name:"lisi"
    }]
    return (
      <div>
        <ul>
          {resumeList.map((it,idx)=>{
            return <li key={idx}>id:{it.id},name:{it.name}</li>
          })}
        </ul>
        <ResumeDetailView {...this.props}/>
      </div>
    )
  }
}

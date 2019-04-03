/**
 * Created by Administrator on 2018/1/29.
 */


import React,{Component} from 'react'
import {
    Row,
    Avatar,
    Col,
    Button,
    Input,
    Table,
    Tag,
    Spin,
    Dropdown,
    Icon,
    Switch,
    Popconfirm
} from 'antd'
import WrapperComponent from "../../decorators/WrapperComponent"
import {ModalDetailView} from 'components/Modal.view'
import DictUtils from 'app-utils/DictUtils'
import moment from 'moment'
import styles from './index.less'

class JobHead extends Component{

    renderJobTag(tags){
        if(tags){
            return tags.split('、').map((item,index)=>{
                return <Tag key={index} color="cyan" style={{borderRadius:8}}>{item}</Tag>
            })
        }
    }
    cutNullArr(arr){
        let newArr = arr.filter((it,idx)=>{
            return it != "" && it != null && it != undefined
        })
        return newArr || []
    }
    renderSwitch(item,handleChange){
      if(item.status){
        console.log(item.status,item.status == 1? true:false)
        return <Switch defaultChecked={item.status == 1? true:false} onChange={handleChange}/>
      }
    }

    render(){
        let {item,handleChange,handleClick} = this.props;
        return (
            <div style={{borderBottom:"10px solid #e3e6ed",paddingBottom:10}}>
                <Row gutter={6}>
                    <Col span={2}>
                        <Avatar shape="square" size="lagre" icon="layout" style={{ backgroundColor: '#57b4f1' }}/>
                    </Col>
                    <Col span={22}>
                        <Row gutter={6}>
                            <span>{item.jobTitle}</span>

                            <div className="isOpen-box">
                                <div className="switchBox">当前职位状态：
                                  {item.status?<Switch defaultChecked={item.status == 1? true:false} onChange={handleChange}/>:""}
                                </div>
                                {item.ifShow?<div className="deleteBox"><Popconfirm title="确认要删除职位吗？" onConfirm={handleClick}><Icon type="delete" style={{fontSize:16,verticalAlign:"middle",cursor:"pointer" }}/></Popconfirm></div>:""}
                            </div>
                        </Row>
                        <Row gutter={6}>
                            {this.cutNullArr([
                                !item.salaryLower && !item.salaryUpper? "面议" : item.salaryLower+"-"+item.salaryUpper,
                                DictUtils.getDictLabelByValue("education",item.degree),
                                item.address,
                                !item.workExperienceLower && !item.workExperienceUpper ?  "工作经验不限" : item.workExperienceLower+"-"+item.workExperienceUpper+"年"
                            ]).join(" | ")}
                        </Row>
                    </Col>
                </Row>
                <Row gutter={6} style={{marginTop:10}}>
                    <Col span={22} offset={2}>
                        {this.renderJobTag(item.jobLabel)}
                    </Col>
                </Row>
                <Row gutter={6} style={{marginTop:10}}>
                    <Col span={7}>
                        招聘负责人：{item.hrAcc}
                    </Col>
                </Row>
            </div>
        )
    }
}

class JobDescribes extends Component{

    renderDescr(desc){
        return desc.map((item,index)=>{
            return <li key={index}>{item}</li>
        })
    }
    renderRequire(require){
        return require.map((item,index)=>{
            return <li key={index}>{item}</li>
        })
    }

    render(){
        let {item} = this.props;
        return(
            <div style={{marginTop:20}}>
                <Row gutter={6}>
                    <Col span={22} offset={2}>
                        <h3>职位描述：</h3>
                    </Col>
                </Row>
                {/*<Row gutter={6}>
                    <Col span={22} offset={2}>
                        职责描述：
                    </Col>
                </Row>*/}
                {/*<Row gutter={6}>
                    <Col span={22} offset={2}>
                        <ol>
                            this.renderDescr(jobDescrib.jobdesc.responsibilty)
                            {item.jobDescription}
                        </ol>
                    </Col>
                </Row>*/}
                <Row gutter={6}>
                    <Col span={22} offset={2}>
                        任职要求：
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={22} offset={2}>
                       {/* <ol dangerouslySetInnerHTML={}>
                            this.renderRequire(jobDescrib.jobdesc.requirement)
                        </ol>*/}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: item.jobDescription
                            }}>
                        </div>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={22} offset={2}>
                        <h3>工作地址：</h3>
                    </Col>
                </Row>
                <Row gutter={6}>
                    <Col span={22} offset={2}>
                        {item.addressDetail}
                </Col>
                </Row>
            </div>
        )
    }
}

@WrapperComponent(ModalDetailView)
export default class JobDetailShow extends Component{

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        let {actions,router,reduce} = this.props;
    }

    render(){
        let {actions,router,reduce,handleChange,handleClick} = this.props;
        let {item} = reduce;
        return (
             <Spin tip="Loading..." spinning={reduce.spins.itemSpin}>
              <div className="jobDetail-box">
                  <JobHead item={item} handleChange={handleChange} handleClick={handleClick} />
                  <JobDescribes item={item}/>
              </div>
            </Spin>
        )
    }
}

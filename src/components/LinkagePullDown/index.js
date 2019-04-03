import React,{Component} from "react"
import ReactDOM from 'react-dom'
import {
    Button,
    Input,
    Table,
    Select,
    DatePicker,
    Modal,
    Slider,
    Menu,
    Popover,
    Icon,
} from 'antd'
import PropTypes from 'prop-types'
const InputGroup = Input.Group
const { Option, OptGroup } = Select;

export default class LinkagePullDown extends Component{
    constructor(props){
        super(props)
        let {options,value,onChange} = this.props
        //console.log("1111",value)
        this.state = {
            min:value?value[0]:(options?options[ 0 ].keyValue:undefined),
            max:value?value[1]:(options?options[ options.length - 1 ].keyValue:undefined),
            values:[value?value[0]:undefined,value?value[1]:undefined]
        }
        // onChange(value)
    }

    componentWillReceiveProps(nextProps){
       if(this.props.options != nextProps.options){
            let {options} = nextProps
           //if(!value){
           //console.log("8!",options[ options.length - 1 ].keyValue,options)
               this.setState({
                 max : options[ options.length - 1 ].keyValue,
                 min : options[ 0 ].keyValue
               })
           //}

       }

    }

    handleChange(type,val){
        let onChange = this.props.onChange
        let {options} = this.props
        let {values,min,max} = this.state
        //console.log(this.props,this.props.value)
        //console.log("value",this.props.value?this.props.value[0]:"")
        /*清除时的处理*/
        if(!val){
            this.setState({
                max : options[ options.length - 1 ].keyValue,
                min : options[ 0 ].keyValue,
                values : [undefined,undefined]
            },function(){
                onChange && onChange(undefined)
            })
            return false
        }
        if(type == "min"){
            this.setState({
                min:val,
                values:[val,values[1]?values[1]:max]
            },function(){
                onChange && onChange(this.state.values)
            })
        }
        if(type == "max"){
            this.setState({
                max:val,
                values:[values[0]?values[0]:min,val]
            },function(){
                onChange && onChange(this.state.values)
            })
        }


    }

    renderOption(type){
        let {options,renderItem} = this.props
        let {min,max} = this.state
        if(type == "min"){
            return options && options.map((it,idx)=>{
                    /*if(renderItem){
                        renderItem(it,idx,"min",max)
                    }else{*/
                    /*console.log("result",max && (parseInt(it.keyValue) > parseInt(max)),"max",max,"keyVal",it.keyValue,"options",options)*/
                        return <Option key={idx} value={it.keyValue} disabled={ max && (parseInt(it.keyValue) > parseInt(max))?true:false}>{it.keyName}</Option>
                    /*}*/
                })
        }else if(type == "max"){
            return options && options.map((it,idx)=>{
                    /*if(renderItem){
                        renderItem(it,idx,"max",min)
                    }else {*/
                        return <Option key={idx} value={it.keyValue} disabled={ min && (parseInt(it.keyValue) < parseInt(min) )? true : false}>{it.keyName}</Option>
                   /* }*/
                })
        }

    }
    render(){
        let {value,rules} = this.props
        return (
            <InputGroup compact style={{ display:"flex"}}>
                <Select style={{width:"50%"}} allowClear onChange={this.handleChange.bind(this,"min")} value={ value&&value[0]?value[0]+"":""} getPopupContainer={()=>ReactDOM.findDOMNode(this)} rules={rules}>
                    {this.renderOption("min")}
                </Select>
                <Input style={{ borderRight: "0",borderLeft:"0",padding:"0",pointerEvents: 'none', backgroundColor: '#fff',width:"10px", flexShrink:0 }} placeholder="~" readOnly />
                <Select className="linkageRightSelect" style={{width:"50%"}} allowClear onChange={this.handleChange.bind(this,"max")} value={value&&value[1]?value[1]+"":""} getPopupContainer={()=>ReactDOM.findDOMNode(this)} rules={rules}>
                    {this.renderOption("max")}
                </Select>
            </InputGroup>
        )
    }
}

LinkagePullDown.propTypes = {
    options: PropTypes.array,
    defaultValue: PropTypes.array,
}

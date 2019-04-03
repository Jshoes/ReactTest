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

export default class SelectRange extends Component{
    constructor(props){
        super(props)
        let {options,value,onChange} = this.props
        this.state = {
            min:value?value[0]:"",
            max:value?value[1]:""
        }
        onChange(value)
    }
    componentWillReceiveProps(nextProps){
        let {value} = this.props
       if(this.props.options != nextProps.options){
            let {options} = nextProps
           //if(!value){
               this.setState({
                 max : options[ options.length - 1 ].keyValue,
                 min : options[ 0 ].keyValue
               })
           //}

       }
    }
    getDataMax(arr){
        if(arr){
            let newArr = arr.sort(function(a,b){
                return a.keyValue - b.keyValue
            })
            // console.log(newArr)
        }
    }

    handleChange(type,val){
        let onChange = this.props.onChange
        let {options} = this.props
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
                min:val
            })
            if(onChange){
                let {max} = this.state
                onChange([val,max])
            }
        }
        if(type == "max"){
            this.setState({
                max:val
            })
            if(onChange){
                let {min} = this.state
                onChange([min,val])
            }
        }


    }

    renderOption(type){
        let {options,renderItem} = this.props
        let {min,max} = this.state
        // console.log(options)
        if(type == "min"){
            return options && options.filter((it)=>it.type=='min').map((it,idx)=>{
                    if(renderItem){
                        renderItem(it,idx,"min",max)
                    }else{
                        return <Option key={idx} value={it.keyValue} disabled={it.keyValue>max?true:false}>{it.keyName}</Option>
                    }
                })
        }else if(type == "max"){
            return options && options.filter((it)=>it.type=='max').map((it,idx)=>{
                    if(renderItem){
                        renderItem(it,idx,"max",min)
                    }else {
                        return <Option key={idx} value={it.keyValue} disabled={ it.keyValue < min ? true : false}>{it.keyName}</Option>
                    }
                })
        }

    }
    render(){
        let {value} = this.props
        return (
            <InputGroup compact style={{ display:"flex" }}>
                <Select style={{width:"50%"}} allowClear onChange={this.handleChange.bind(this,"min")} value={value&&value[0]?(value[0]+""):""} getPopupContainer={()=>ReactDOM.findDOMNode(this)}>
                    {this.renderOption("min")}
                </Select>
                <Input style={{ borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff',width:"30px", flexShrink:0 }} placeholder="~" readOnly />
                <Select style={{width:"50%"}} allowClear onChange={this.handleChange.bind(this,"max")} value={value&&value[1]?(value[1]+""):""} getPopupContainer={()=>ReactDOM.findDOMNode(this)}>
                    {this.renderOption("max")}
                </Select>
            </InputGroup>
        )
    }
}

SelectRange.propTypes = {
    options: PropTypes.array,
    defaultValue: PropTypes.array,
}

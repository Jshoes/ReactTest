import React from 'react'
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
import Trigger from 'rc-trigger'
import styles from './index.less'
const InputGroup = Input.Group

export default class DropDownSlider extends React.Component{

    state = {
        initialValue:[],
        visible:false
    }
    // constructor(props) {
    //     super(props)
    //     console.log(props)
    //     this.state.initialValue=props.initialValue
    // }
    //
    componentWillReceiveProps(nextProps){
      let {value} = nextProps
      this.setState({
        initialValue:value || []
      });
    }
    clearSelection (e) {
        const onChange = this.props.onChange;
       e.preventDefault();
       e.stopPropagation();
       this.setState({
         initialValue:[]
       })
       if (onChange) {
         onChange([]);
       }
     }
    renderInputValue(value){
        let {marks} =this.props
        // return marks && marks.filter((it)=>{
        //   return value.indexOf(Number(it.keyValue))>=0
        // }).map((it)=>{
        //   return it.keyName
        // }) || []
        return value.map((v)=>{
            return  marks && marks.filter((it)=>{
              return it.keyValue==v
            }).map((it)=>{
              return it.keyName
            })
        })
    }

    changeMarksData(values){
        let obj={};
        values && values.map((item,idx)=>{
            let translateKey = Number(item.keyValue)
            obj[translateKey] = item.keyName
        })
        return obj;
    }
    handleChangeSlide(value){
      const onChange = this.props.onChange;
      if(value[0]==undefined){
        value[0]=value[1]
      }
        this.setState({
            initialValue:value
        })

        if (onChange) {
          onChange(value);
        }
    }
    showPopover(){
      this.setState({
        visible:true
      })
    }

    render(){
        let {name,marks,label,allowClear,disabled,prefixCls,getPopupContainer} = this.props
        let {initialValue,visible} = this.state
        let slide = (
            <div className="component-sliderBar">
              <Slider range={true} step={null} value={initialValue}  marks={this.changeMarksData(marks)} onChange={this.handleChangeSlide.bind(this)}/>
            </div>
        )
        var clearIcon = allowClear && !disabled && initialValue.length > 0 || this.state.initialValue ? React.createElement(Icon, { type: 'cross-circle', className: 'ant-select-selection' + '__clear', onClick: this.clearSelection.bind(this) }) : null
        return (
             <Trigger popup={slide} popupClassName="DropDownSlider-popup" getPopupContainer={getPopupContainer} action={["click"]} popupAlign={{
                points: ['tl', 'bl'],
                offset: [0, 3]
              }}>
                {/*<Input name={name} value={this.renderInputValue(initialValue)} onClick={this.showPopover.bind(this)} placeholder={label} className="slider-datashow" readOnly/>*/}
                <div onClick={this.showPopover.bind(this)} className="dropdownSliderBox" >
                    <InputGroup compact >
                         <Input  placeholder=""   readOnly  value={this.renderInputValue(initialValue)[0]}/>
                         <Input style={{ borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" readOnly />
                         <Input style={{  borderLeft: 0 }} placeholder="" readOnly value={this.renderInputValue(initialValue)[1]} />
                     </InputGroup>
                    {initialValue.length>0?clearIcon:null}
                </div>
             </Trigger>
        )
    }
}

DropDownSlider.propTypes = {
    marks: PropTypes.array,
}

export class DropDownSliderForo extends DropDownSlider{

    constructor(props){
        super(props)

        this.state.initialValue=props.value || []
    }

    changeMarksData(values){
        let obj={};
        values && values.map((item,idx)=>{
            obj[idx] = item.keyName
        })
        return obj;
    }
    handleChangeSlide(values){
        let {marks} =this.props
        const onChange = this.props.onChange;
        // console.log(values)
        if(values[0]==undefined){
          values[0]=values[1]
        }
        this.setState({
            initialValue:this.tanslateSliderLabel(values)
        })

        if (onChange) {
            onChange(this.tanslateSliderLabel(values));
        }
    }
    tanslateSliderLabel(values){
        let {marks} = this.props
       if(values[0] === undefined){
           values[0] = values[1]
       }
        if(values[1] === undefined){
            values[1] = values[0]
        }
        return [ marks[values[0]].keyValue,marks[values[1]].keyValue]
    }

    translateSliderValue(values){
        let {marks} =this.props
        return values.map((v)=>{
          return marks.filter((m,idx)=>{
            if(v==m.keyName){
              m.value=idx
            }
            return v==m.keyName
          })
        }).map((it)=>{
          return it.value
        })
    }
    render(){
        let {marks,name,label,getPopupContainer} = this.props
        let {initialValue,visible} = this.state
        let slide = (
            <div className="component-sliderBar">
                <Slider range={true} step={null} marks={this.changeMarksData(marks)} max={marks.length - 1} onChange={this.handleChangeSlide.bind(this)}/>
            </div>
        )
        return(
            <Trigger popup={slide}  getPopupContainer={getPopupContainer} popupClassName="DropDownSlider-popup" action={["click"]} popupAlign={{
                points: ['tl', 'bl'],
                offset: [0, 4]
            }}>
                <div onClick={this.showPopover.bind(this)} className="dropdownSliderBox">
                    <InputGroup compact >
                        <Input style={{ textAlign: 'center',width:"45%" }} placeholder=""   readOnly  value={initialValue[0]}/>
                        <Input style={{ width: "10%", borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" readOnly />
                        <Input style={{ textAlign: 'center', borderLeft: 0,width:"45%" }} placeholder="" readOnly value={initialValue[1]} />
                    </InputGroup>
                      {initialValue.length>0?clearIcon:null}
                </div>
            </Trigger>
        )
    }
}
DropDownSliderForo.propTypes = {
    marks: PropTypes.array,
}
export class DropDownSliderNew extends DropDownSliderForo{
    constructor(props){
        super(props)

        this.state.initialValue=props.value || []
    }

    translateInputValue(marks,value){
        // console.log(marks,value)
        if(value){
            return marks.filter((it,idx)=>{
                return it.keyValue == value
            }).map((it)=>{
                return it.keyName
            })
        }else{
            return ""
        }
    }

    render(){
        let {marks,name,label,allowClear,disabled,getPopupContainer} = this.props
        let {initialValue,visible} = this.state
        // console.log(marks)
        let slide = (
            <div className="component-sliderBar">
                <Slider range={true} step={null} marks={this.changeMarksData(marks)} max={marks && (marks.length - 1)} onChange={this.handleChangeSlide.bind(this)}/>
            </div>
        )
        var clearIcon = allowClear && !disabled && initialValue.length > 0 || this.state.initialValue ? React.createElement(Icon, { type: 'cross-circle', className: 'ant-select-selection' + '__clear', onClick: this.clearSelection.bind(this) }) : null
        return(
            <Trigger popup={slide} popupClassName="DropDownSlider-popup" getPopupContainer={getPopupContainer}  action={["click"]} popupAlign={{
                points: ['tr', 'br'],
                offset: [0, 3]
            }}>
                <div onClick={this.showPopover.bind(this)} className="dropdownSliderBox">
                    <InputGroup compact >
                        <Input style={{ textAlign: 'center',width:"45%" }} placeholder=""   readOnly  value={this.translateInputValue(marks,initialValue[0])}/>
                        <Input style={{ width: "10%", borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" readOnly />
                        <Input style={{ textAlign: 'center', borderLeft: 0,width:"45%" }} placeholder="" readOnly value={this.translateInputValue(marks,initialValue[1])} />
                    </InputGroup>
                    {initialValue.length>0?clearIcon:null}
                </div>

            </Trigger>
        )
    }
}
DropDownSliderNew.propTypes = {
    marks: PropTypes.array,
}

import React from 'react'
import {
    Input,
    Menu,
    Checkbox,
    Row,
    Col,
    Icon,
} from 'antd'
import PropTypes from 'prop-types'
import Trigger from 'rc-trigger'

const CheckboxGroup = Checkbox.Group

export default class CatalogPicker extends React.Component{
    state = {
        initialValue:[],
        visible:false
    }
    componentWillReceiveProps(nextProps){
      let {value} = nextProps
      this.setState({
        initialValue:value || []
      });
    }
    handleChangeSlide(value){
      const onChange = this.props.onChange;
        this.setState({
            initialValue:value
        })
        console.log(value)
        if (onChange) {
          onChange(value);
        }
    }
    renderOptions(){
        let {placement,name,options,label} = this.props
        return (
          <CheckboxGroup defaultValue={['Pear']} >
            <Row>
              <Col span={8}>
                <Checkbox value="A">A</Checkbox>
              </Col>
              <Col span={8}><Checkbox value="B">B</Checkbox><Icon type="caret-down" /></Col>
              <Col span={8}><Checkbox value="C">C</Checkbox><Icon type="caret-down" /></Col>
              <Col span={8}><Checkbox value="D">D</Checkbox><Icon type="caret-down" /></Col>
              <Col span={8}><Checkbox value="E">E</Checkbox></Col>
              <Col span={8}><Checkbox value="F">F</Checkbox></Col>
              <Col span={8}><Checkbox value="G">G</Checkbox></Col>
              <Col span={8}><Checkbox value="H">H</Checkbox></Col>
              <Col span={8}><Checkbox value="I">I</Checkbox></Col>
            </Row>
          </CheckboxGroup>
        )
    }
    render(){
        let {placement,name,options,label} = this.props
        let {initialValue,visible} = this.state
        let slide = (
          <div style={{ height: 30,width:300 }}>
            {this.renderOptions()}
          </div>
        )
        return (
             <Trigger popup={slide} popupClassName="catalog-picker-popup" action={["click"]} popupAlign={{
                points: ['tl', 'bl'],
                offset: [0, 3]
              }}>
                <Input name={name} value={initialValue} placeholder={label} />
            </Trigger>
        )
    }
}

CatalogPicker.propTypes = {
    options: PropTypes.array,
}


import React from 'react';
import {shallow,mount,render} from 'enzyme';
import {DatePicker} from 'antd'
import CalendarPicker from '../index'


const setup = () => {
  // 模拟 props
  const props = {
    // Jest 提供的mock 函数
    //onAddClick: jest.fn()
  }

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(
    <CalendarPicker />
  );
  return {
    props,
    wrapper
  }
}

describe('CalendarPicker render', () => {
  const { wrapper, props } = setup();
  it('CalendarPicker instanceOf DatePicker', (done) => {
    expect(wrapper.instance()).toBeInstanceOf(CalendarPicker)
    done()
  })

  it('CalendarPicker has defaultProps ', (done) => {
    //console.log(wrapper.props)
    expect(wrapper.prop('showToday')).toEqual(true)
    expect(wrapper.prop('format')).toEqual("YYYY-MM-DD")
    expect(wrapper.prop('minDate')).toEqual("1900-01-01")
    expect(wrapper.prop('maxDate')).toEqual("2299-01-01")
    done()
  })

  it.skip('CalendarPicker disabledDate method',(done)=>{
    //wrapper
  //  console.log(wrapper)
    done()
  })
})

import React from 'react'
import {shallow,mount,render} from 'enzyme'

import {
  Input,
  Select,
} from 'antd'
import TimelineList from '../index'

const setup = (props={}) => {
  // 模拟 props

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(
    <TimelineList {...props}/>
  );

  return {
    props,
    wrapper
  }
}



describe("AdvancedSearchForm shallow render", () => {
  xit("render without params", (done) => {
    const { wrapper, props } = setup();
    expect(wrapper.instance()).toBeInstanceOf(TimelineList)
    done()
  });

  it("render with params",(done)=>{
    var list=[{
      title:"aa",
      createDate:'2018-07-07'
    },{
      title:"bb",
      createDate:'2018-07-08'
    },{
      title:"cc",
      createDate:'2018-07-09'
    },{
      title:"cc",
      createDate:'2018-07-08'
    }]
    function listItemRender(item){
      return  ( <div>aaa</div>)
    }
    const wrapper =shallow(
      <TimelineList list={list} itemRender={listItemRender} />
    )
    expect(wrapper.find('List')).toHaveLength(3)
    expect(wrapper.find('Timeline')).toHaveLength(1)
    done()
  })

  xit("render with childrens than 7 max render 7",(done)=>{
    const wrapper =shallow(
      <AdvancedSearchForm keysOption={[{
        label:"name",
        value:0
      }]}>
        <CalendarPicker label="通话时间" name="callTime" />
        <Input name="callState" label="呼叫类型"  />
        <Input name="callState1" label="呼叫类型"  />
        <Input name="callState2" label="呼叫类型"  />
        <Input name="callState3" label="呼叫类型"  />
        <Input name="callState4" label="呼叫类型"  />
        <Input name="callState5" label="呼叫类型"  />
        <Input name="callState6" label="呼叫类型"  />
        <Input name="callState7" label="呼叫类型"  />
        <Input name="callState8" label="呼叫类型"  />
        <Input name="callState9" label="呼叫类型"  />
        <Input name="callState10" label="呼叫类型"  />
        <Select name="inputAcc" label="hr" />
      </AdvancedSearchForm>
    );
    expect(wrapper.find('FormItem[colon=false]')).toHaveLength(7)
  //  expect(wrapper.find('CalendarPicker[name="callTime"]').exists()).toBe(true)
    done()
  })
});

describe("AdvancedSearchForm shallow render and behavior", () => {
  xit("submit filterSubmitHandler",(done)=>{
    const props={
      keysOption:[{
        label:"name",
        value:0
      }],
      filterSubmitHandler:jest.fn()
    }
    const wrapper =mount(
      <AdvancedSearchForm {...props}>
        <Input name="callState" label="呼叫类型"  />
        <Input name="callState2" label="呼叫类型"  />
      </AdvancedSearchForm>
    );
    // console.log(wrapper.find('Button[htmlType="submit"]'))
    const e={
      preventDefault:jest.fn()
    }
    wrapper.find('Button[htmlType="submit"]').simulate('click',e)
    // console.log(props.filterSubmitHandler.mock.calls)
    expect(props.filterSubmitHandler.mock.calls.length).toBe(1)
    expect(props.filterSubmitHandler.mock.calls).toContainEqual([{
      callState:undefined,
      callState2:undefined,
      keyType:0,
      keyWord:undefined
    }])
    done()
  })

  xit('expand AdvancedSearchForm by children than 3')
})

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SoundListView from '../view/SoundList.view'
import mockGlobal from 'app-utils/MockGlobal'
import {Select} from 'antd'
import DataTable from 'app-components/DataTable'
import AdvancedSearchForm from 'app-components/AdvancedSearch'

const setup = () => {
  // 模拟 props
  const props = {
    // Jest 提供的mock 函数
    onAddClick: jest.fn(),
    actions:{
      listAction:jest.fn()
    },
    items:[],
    reduce:{
      list:new Map(),
      spins:{
        tableSpin:false
      }
    }
  }

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<SoundListView {...props} />)
  return {
    props,
    wrapper
  }
}

describe('SoundListView 组件是否渲染', () => {
  const { wrapper, props } = setup()
  // case1
  // 通过查找存在 Input,测试组件正常渲染
  it('SoundListView Component should be render', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
    expect(wrapper.find(DataTable).exists())
    expect(wrapper.find(AdvancedSearchForm).exists())
  //  expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('SoundListView search Component should be render',()=>{
    // expect(wrapper.find('table').exists());
  //  console.dir(wrapper.find(Select).first().props().name)
    expect(wrapper.find(Select).first().props().name).toEqual("define14")
    expect(wrapper.find(Select).last().props().name).toEqual("inputName")
    //expect(toJson(wrapper)).toMatchSnapshot()
  })

})

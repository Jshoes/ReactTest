import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MemberFormView from '../MemberForm.view'
import {Select} from 'antd'
import BaseForm from 'app-components/BaseForm'
import AdvancedSearchForm from 'app-components/AdvancedSearch'

const setup = () => {
  // 模拟 props
  const props = {
    // Jest 提供的mock 函数
    onAddClick: jest.fn(),
    actions:{
      listAction:jest.fn()
    },
    reduce:{
      list:new Map(),
      spins:{
        tableSpin:false
      }
    }
  }

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<MemberFormView {...props} />)
  return {
    props,
    wrapper
  }
}

describe('MemberFormView 组件是否渲染', () => {
  const { wrapper, props } = setup();
  // case1
  // 通过查找存在 Input,测试组件正常渲染
  it('MemberFormView Component should be render', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
    expect(wrapper.find(BaseForm).exists())
  //  expect(toJson(wrapper)).toMatchSnapshot();
  })
})

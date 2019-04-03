import React from 'react'
import { shallow } from 'enzyme'
import {CreditForm} from '../CreditForm.view'
import {Form,Input} from 'antd'
import BaseForm,{FormItem} from 'components/BaseForm'
const setup = () => {
  // 模拟 props
  const props = {
    // Jest 提供的mock 函数
    //onAddClick: jest.fn()
    params:{
      resumeId:1
    }
  }

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<CreditForm {...props} />)
  return {
    props,
    wrapper
  }
}

describe('CreditForm 组件是否渲染', () => {
  const { wrapper, props } = setup();
  // case1
  // 通过查找存在 Input,测试组件正常渲染
  it('CreditListView Component should be render', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    expect(wrapper.find(BaseForm).exists());
  })

  it('CreditListView item name exists', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    expect(wrapper.find('[name="resumeId"]').exists());
    expect(wrapper.find('[name="recordId"]').exists());
  })
})

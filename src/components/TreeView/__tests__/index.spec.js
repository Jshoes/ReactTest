import React from 'react'
import {shallow,mount,render} from 'enzyme'

import {
  Input,
  Select,
} from 'antd'
import TreeView from '../index'

const setup = (props={}) => {
  // 模拟 props

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(
    <TreeView {...props}/>
  );

  return {
    props,
    wrapper
  }
}



describe("TreeView shallow render", () => {
  it("render without params", (done) => {
    const { wrapper, props } = setup();
    expect(wrapper.instance()).toBeInstanceOf(TreeView)
    done()
  });
})

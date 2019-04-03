import React from 'react'
import {shallow,mount,render} from 'enzyme'

import {
  Button,
} from 'antd'
import ButtonGroupExt from '../ButtonGroupExt'

const setup = (props={},children) => {
  // 模拟 props

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(React.cloneElement(ButtonGroupExt,props,children));

  return {
    props,
    wrapper
  }
}

describe("ButtonGroupExt shallow render", () => {
  xit("render with childrens", (done) => {
    const { wrapper, props } = shallow(<ButtonGroupExt showSize={5}>
        <Button icon="download" />
        <Button icon="download" />
        <Button icon="download" />
        <Button icon="download" />
      </ButtonGroupExt>)
    expect(wrapper.instance()).toBeInstanceOf(ButtonGroupExt)
    done()
  });
})

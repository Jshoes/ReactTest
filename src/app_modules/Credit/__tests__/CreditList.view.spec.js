import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CreditListView from '../CreditList.view'
import DataTable from 'components/DataTable'
import AdvancedSearchForm from 'components/AdvancedSearch'

const setup = () => {
  // 模拟 props
  const props = {
    // Jest 提供的mock 函数
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
  const wrapper = shallow(<CreditListView {...props} />)
  return {
    props,
    wrapper
  }
}

describe('CreditListView 组件是否渲染', () => {
  const { wrapper, props } = setup();
  // case1
  // 通过查找存在 Input,测试组件正常渲染
  it('CreditListView Component should be render', (done) => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html

    // expect(wrapper.find(AdvancedSearchForm).exists()).toBe(true)
    expect(wrapper.find(DataTable).exists()).toBe(true);
    done()
   // console.log(wrapper.find(DataTable).props())
   // expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('AdvancedSearchForm Component should be render',(done)=>{
    expect(wrapper.find(AdvancedSearchForm).exists()).toBe(true)
    expect(wrapper.find('[name="recordId"]').exists()).toBe(true)
    expect(wrapper.find('[name="inputTimeStr"]').exists()).toBe(true)
    done()
  })

  it('creditList must call listAction 1',(done)=>{
    // console.log(wrapper,props)
    expect(props.actions.listAction.mock.calls.length).toBe(1)
    done()
  })

  it('creditList table columns',(done)=>{
    console.log(wrapper.find(DataTable).props('abc'))
    expect(wrapper.find(DataTable).prop('columns').length).toBe(10);

    done()
  })
})

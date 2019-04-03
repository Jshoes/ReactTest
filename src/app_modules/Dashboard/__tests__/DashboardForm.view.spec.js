import React from 'react';
import {shallow,mount,render} from 'enzyme';
import DashboardForm from '../DashboardForm.view'
import moment from 'moment'

  const props = {
    // Jest 提供的mock 函数
    actions:{
      itemAction:jest.fn()
    }
  }

const setup = () => {
  // 模拟 props
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(
    <DashboardForm />
  );

  return {
    props,
    wrapper
  }
}

describe('DashboardFormView shallow render', () => {
  const { wrapper, props } = setup();
  it('DashBoardform instanceOf From', (done) => {
    expect(wrapper.instance()).toBeInstanceOf(DashboardForm)
    expect(wrapper.find('form').exists());
    done()
  })

  it('DashboardFrom render with props is empty',(done) =>{
    const initialValues={
    }
    const wrapper = shallow( <DashboardForm />)
    done()
    // console.log(wrapper.props('params'))
  })



  describe('DashboardFormView full render', () => {
    it('DashboardFrom render with props',(done) =>{
      const initialValues={
        id:1,title:"ttt",content:"cccc",scheduleStartTime:'2018-02-02',scheduleEndTime:"2018-03-03",remindType:"1",remindSms:"1"
      }
      const wrapper = mount(
        <DashboardForm route={{breadcrumbName:"DashboardForm"}} {...props} params={{id:12}} item={initialValues} />
      );
      done()
    })
  })


})


import React,{Component} from 'react'
import {Layout,Fixed,Pane} from '../Layout'
import { shallow } from 'enzyme'


describe('测试layout布局组件', function(){
  it('组件render without children',()=>{
    let layoutComponent = shallow(<Layout></Layout>)
    let fixedComponent = shallow(<Fixed></Fixed>)
    let paneComponent = shallow(<Pane></Pane>)
  //  expect(layoutComponent.equals('<div className="layout"></div>').toEqual(true);
  //  expect(fixedComponent.equals('<div className="layout-fixed"></div>').toEqual(true);
  //  expect(paneComponent.equals('<div className="layout-pane"></div>').toEqual(true);
  })
  it('测试组件render带children',()=>{
    let layoutComponent = shallow(<Layout>layout</Layout>)
    expect(layoutComponent.find(".layout").exists()).toBe(true)
    expect(layoutComponent.find(".layout").text()).toEqual("layout")
    let fixedComponent = shallow(<Fixed>fixed</Fixed>)
    expect(fixedComponent.find(".layout-fixed").exists()).toBe(true)
    expect(fixedComponent.find(".layout-fixed").text()).toEqual("fixed")
    let paneComponent = shallow(<Pane>pane</Pane>)
    expect(paneComponent.find(".layout-pane").exists()).toBe(true)
    expect(paneComponent.find(".layout-pane").text()).toEqual("pane")
  })
  it('测试组件props传递',()=>{
    let layoutComponent = shallow(<Layout direction="column"/>)
    expect(layoutComponent.prop('style').flexDirection).toEqual('column')
    expect(layoutComponent).toMatchSnapshot();
  })
  it('测试组件错误props传递',()=>{
    let layoutComponent = shallow(<Layout direction="rows"/>)
    expect(layoutComponent.prop('style').flexDirection).toEqual('rows')
    expect(layoutComponent).toMatchSnapshot();

  })
  it('测试组件nest',()=>{
      let layoutComponent = shallow(<Layout direction="rows">
        <Fixed></Fixed>
        <Pane></Pane>
      </Layout>)
      expect(layoutComponent.contains(<Fixed></Fixed>)).toEqual(true);
      expect(layoutComponent.contains(<Pane></Pane>)).toEqual(true);
  })
  it('测试组件复合nest',()=>{
      let layoutComponent = shallow(<Layout direction="rows">
        <Fixed>header</Fixed>
        <Pane>
          <Layout direction="column">
            <Fixed>side</Fixed>
            <Pane>content</Pane>
          </Layout>
        </Pane>
      </Layout>)
      expect(layoutComponent.contains(<Fixed>header</Fixed>)).toEqual(true);
    //  expect(layoutComponent.find(<Pane/>).childAt(0).type()).toEqual("");
  })
})

import React from 'react'
import {Router,createMemoryHistory } from 'react-router'
import {shallow,mount,render} from 'enzyme'
import toJson from 'enzyme-to-json'
import Routes from '../routes'
import Container,{DashboardFormContainer,MessageCenterContainer} from '../container'

const setup = (history) => {
  const props = {
  }
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(
    React.cloneElement(Routes,{path:"/",history:history})
  );
  // console.log(wrapper)
  return {
    props,
    history,
    wrapper
  }
}
describe('测试路径组件渲染', () => {

  it('visit /', (done) => {
  const {wrapper}=setup(createMemoryHistory('/'))
    let expectedCompoments =[
      Container
    ]
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })
  it('visit /edit/1 wich param id:1', (done) => {
  const {wrapper}=setup(createMemoryHistory('/edit/1'))
    let expectedCompoments =[
      Container,DashboardFormContainer
    ]
    let expectedParam={
      id:"1"
    }
    expect(wrapper.prop('params')).toEqual(expectedParam)
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })

  it('visit /add', (done) => {
  const {wrapper}=setup(createMemoryHistory('/add'))
    let expectedCompoments =[
      Container,DashboardFormContainer
    ]
    let expectedParam={
    }
    expect(wrapper.prop('params')).toEqual(expectedParam)
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })

  it('visit /message/1 params type:1', (done) => {
  const {wrapper}=setup(createMemoryHistory('/message/1'))
    let expectedCompoments =[
      MessageCenterContainer
    ]
    let expectedParam={
      type:"1"
    }
    expect(wrapper.prop('params')).toEqual(expectedParam)
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })
})

describe('path ', () => {

  it('visit / -> /add ', (done) => {
  const {wrapper,history}=setup(createMemoryHistory('/'))
  //console.dir(wrapper.prop('router').push("/edit/1"))
  //console.dir(wrapper.props('location'))
  console.log(history.push("/edit/1"))
    // let expectedCompoments =[
    //   Container
    // ]
    // expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })
})

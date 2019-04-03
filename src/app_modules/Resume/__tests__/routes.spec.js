import React from 'react'
import {Router,createMemoryHistory } from 'react-router'
import {shallow,mount,render} from 'enzyme'
import toJson from 'enzyme-to-json'
import Routes,{RoutesResume} from '../routes'
import Container,{JoinFormContainer,ResumeDetailContainer,OfferFormContainer,EntryFormContainer,RelatedFormContainer,FeedbackFormContainer,RejectFormContainer,FeedFormContainer,FolderContainer,RemarksFormContainer ,ResumeRemarkContainer} from '../container'

import {DetailContainer} from 'app/app_modules/Job/container'
import {creditFormContainer} from 'app/app_modules/Credit/container'
import {DelayContainer} from 'app/app_modules/Interview/container'

describe('测试路径组件渲染', () => {
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
  it('visit /list', (done) => {
  const {wrapper}=setup(createMemoryHistory('/list'))
    let expectedCompoments =[
      Container
    ]
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })
  it('visit /folder', (done) => {
  const {wrapper}=setup(createMemoryHistory('/folder'))
    let expectedCompoments =[
      FolderContainer
    ]
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })

  it('visit /remark', (done) => {
  const {wrapper}=setup(createMemoryHistory('/remark'))
    let expectedCompoments =[
      ResumeRemarkContainer
    ]
    let expectedParam={
    }
    expect(wrapper.prop('params')).toEqual(expectedParam)
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })
})

describe('RoutesResume unit case ', () => {
  const setup = (history) => {
    const props = {
    }
    // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
    const wrapper = shallow(
      React.cloneElement(RoutesResume,{path:"/",history:history})
    );
    // console.log(wrapper)
    return {
      props,
      history,
      wrapper
    }
  }
  it('visit RoutesResume :resumeId -> 12 ', (done) => {
    const {wrapper,history}=setup(createMemoryHistory('12'))
     let expectedCompoments = undefined
     expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })

  it('visit RoutesResume :resumeId/detail -> /12/detail ', (done) => {
    const {wrapper,history}=setup(createMemoryHistory('/12/detail'))
    let expectedCompoments =[
       ResumeDetailContainer
     ]
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })

  it('visit RoutesResume :resumeId/detail/add -> /12/detail/add ', (done) => {
    const {wrapper,history}=setup(createMemoryHistory('/12/detail/add'))
    let expectedCompoments =[
       ResumeDetailContainer,
       creditFormContainer
    ]
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })

  it('visit RoutesResume :resumeId/add -> /12/add ', (done) => {
    const {wrapper,history}=setup(createMemoryHistory('/12/add'))
    let expectedCompoments =[
       creditFormContainer
    ]
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })

  it('visit RoutesResume :resumeId/detail/offer -> /12/detail/offer ', (done) => {
    const {wrapper,history}=setup(createMemoryHistory('/12/detail/offer'))
    let expectedCompoments =[
       ResumeDetailContainer,
       OfferFormContainer
    ]
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })

  it('visit RoutesResume :resumeId/offer -> /12/offer ', (done) => {
    const {wrapper,history}=setup(createMemoryHistory('/12/offer'))
    let expectedCompoments =[
       OfferFormContainer
    ]
    expect(wrapper.prop('components')).toEqual(expectedCompoments)
    done()
  })
})

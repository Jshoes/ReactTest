const sum = function(a,b){
  return a + b
}

test('sum (1,2) tobe 3',()=>{
  expect(sum(1,2)).toBe(3)
})

import React from 'react'
import {shallow} from 'enzyme'
import CheckTag from '../src/components/CheckTag'

const checkTagComp = shallow(<CheckTag></CheckTag>)

describe('checktag sth',()=>{
  it("chekctag is render with div.ant-tag-checkable ",()=>{
    expect(checkTagComp.find('div.ant-tag-checkable').exists())
  })
})

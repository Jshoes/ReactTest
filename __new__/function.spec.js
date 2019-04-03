const sum = function(a,b){
  return a + b
}

test('sum (1,2) tobe 3',()=>{
  expect(sum(1,2)).toBe(3)
})

import React,{Component} from 'react'
import {shallow} from 'enzyme'
import CheckTag from '../src/components/CheckTag'

const checkTagComp = shallow(<CheckTag checked={true}>123</CheckTag>)

describe('checktag sth',()=>{
	it("chekctag is render with div.ant-tag-checkable ",()=>{
		expect(checkTagComp.find("div.ant-tag-checkable").exists())
	})

	it("checktag props test",()=>{
		expect(checkTagComp.prop("checked")).toBeTruthy()
	})

	it("checktag children text match",()=>{
		expect("123").toMatch(checkTagComp.prop("children"))
	})

	it("checktag instanceof what",()=>{
		expect(checkTagComp.instance()).toBeInstanceOf(CheckTag)
	})

	it("checktag prop change",()=>{
		const checkTagComp = shallow(<CheckTag>aaa</CheckTag>)
	})
})

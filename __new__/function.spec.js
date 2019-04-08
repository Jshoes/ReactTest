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

  /*测试是否被调用props传入的方法 toBeCalled*/
  // it('When the Enter key was pressed, onAddClick() shoule be called', () => {
  //   // mock input 输入和 Enter事件
  //   const mockEvent = {
  //     keyCode: 13, // enter 事件
  //     target: {
  //       value: 'Test'
  //     }
  //   }
  //   // 通过 Enzyme 提供的 simulate api 模拟 DOM 事件
  //   wrapper.find('input').simulate('keyup',mockEvent)
  //   // 判断 props.onAddClick 是否被调用
  //   expect(props.onAddClick).toBeCalled()
  // })
})

/*reducer测试*/
// import * as actions from '../../src/actions/index'
// import * as types from '../../src/constants/actionTypes'
//
// describe('actions', () => {
//   it('should create an action to add a todo', () => {
//     const text = 'Finish docs'
//     const expectedAction = {
//       type: types.ADD_TODO,
//       text
//     }
//     expect(actions.addTodo(text)).toEqual(expectedAction)
//   })
// })

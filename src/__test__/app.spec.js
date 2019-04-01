import React,{Component} from 'react'
import ReactDom from 'react-dom'
import APP from '../App'
import renderer from 'react-test-renderer'

it("it real renders",()=>{
  const component = renderer.create(
    <div></div>
  )
})

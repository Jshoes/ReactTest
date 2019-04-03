import React,{Component} from 'react'
import WrapperComponent from '../WrapperComponent'
import { shallow } from 'enzyme'

describe('createContainer function', function(){
  class Wrapped extends Component{
    render (){
      let {children}=this.props
      return(
        <div className="Wrapped">{children}</div>
      )
    }
  }


    @WrapperComponent(Wrapped)
    class Demo extends Component{
      render(){
        return (<div className="demo">demo</div>)
      }
    }

  it('测试WrapperComponent包装组件存在', () => {

     const wrapperDemo = shallow(<Demo  />)
     expect(wrapperDemo.find(Wrapped).exists());
     expect(wrapperDemo.find('.demo').exists());
  })
  it('测试WrapperComponent包装存在关系', () => {

     const wrapperDemo = shallow(<Demo />)
     expect(wrapperDemo.find(Wrapped)).toHaveLength(1)

  })
  it('测试存在父子关系')
  it('测试参数传送')
});

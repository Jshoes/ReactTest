
import {expect,assert} from 'chai'
import {CONSTANTS} from '../action'
import {reduce,initialState} from '../reducer'

describe('passport reducer test', () => {
  it('should be undefined',()=>{
    expect(reduce(initialState,{type:undefined}))
    .to.eql(initialState)
  })

  it('should be auth success',()=>{
    let authObject={
      msg:"登陆成功",
      authID:'abdcdfe',
      loginTime:'2015-12-12',
      expiresTime:'2015-12-12',
      userid:"123456",
      username:"jaxchow",
      nickname:"jax",
    }
    expect(reduce(initialState,{ type:CONSTANTS.AUTH_SUCCESS, ...authObject })).to.eql(authObject)
  })

  it('should be auth verify',()=>{
    let authObject={
      authID:"ABa3r33422sxxx",
      loginTime: 1459227790173,
      expiresTime: 1459217790173,
      userid:"1234",
      username:'jaxchow',
      nickname:'jax'
    }
    let expected = reduce(authObject,{ type:CONSTANTS.AUTH_VERIFY})
    assert.include(expected,{
      msg: '用户身份认证已过期',
      authID:""
    })
  })

})

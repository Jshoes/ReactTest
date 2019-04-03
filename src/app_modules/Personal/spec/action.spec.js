import {expect} from 'chai'
import {createStore,compose, applyMiddleware,combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import mockStore from 'app-utils/MockStore'
import createStoreWithMiddleware from 'app-utils/CreateStore'
import {reduce} from '../reducer'
import {CONSTANTS,doLogin} from '../action'

const store = createStoreWithMiddleware(reduce)

describe('passport actions test', () => {
  it('should be doLogin by test,test AUTH_SUCCESS',(done)=>{
    let authObj={
        authID:"ABa3r33422sxxx",
        loginTime:1459227790173,
        expiresTime:1459217790173,
        userid:"1234",
        username:'jaxchow',
        nickname:'jax'
    }
    const expectedActions = [
      {type :CONSTANTS.AUTH_SUCCESS, ...authObj},
    ]
    const mkStore = mockStore(store.getState(), expectedActions,done)
    mkStore.dispatch(doLogin("test2","test"))
  })

  it.skip('should be doLogin by test,test1  AUTH_FAILURE',(done)=>{
    let authObj={
      "authID": ""
    }
    const expectedActions = [
      {type :CONSTANTS.AUTH_FAILURE, ...authObj},
    ]
    const mkStore = mockStore(store.getState(), expectedActions,done)
    mkStore.dispatch(doLogin(test,test))
  })
})

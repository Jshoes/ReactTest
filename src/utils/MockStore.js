import {applyMiddleware} from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunk]

/*
export default function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.')
  }
  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function'
          ? getState()
          : getState
      },
      dispatch(action) {
        const expectedAction = expectedActions.shift()
        try {
          expect(action).toEqual(expectedAction)
          if (done && !expectedActions.length) {
            done()
          }
          return action
        } catch (e) {
          console.log(e)
          done(e)
        }
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(thunkMiddleware, ...middlewares)(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}
*/
//configureMockStore(middlewares)
const mockStore = configureMockStore(middlewares)
export default mockStore


import CONSTANTS from '../action'
import reducer,{initialState} from '../reducer'

describe('books reducer test', () => {
  it('should be undefined',()=>{
    expect(reducer(initialState,{type:undefined})).toEqual(initialState)
  })
})


import CONSTANTS from '../action'
import reducer,{initialState} from '../reducer'

describe('reducer test case', () => {
  it('should be undefined',()=>{
    expect(reducer(initialState,{type:undefined})).toEqual(initialState)
  })
})

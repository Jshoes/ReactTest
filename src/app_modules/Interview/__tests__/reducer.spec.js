
import CONSTANTS from '../action'
import reducer,{initialState} from '../reducer'

describe('reducer test', () => {
  it('should be undefined',()=>{
    expect(reducer(initialState,{type:undefined})).toEqual(initialState)
  })
  it.skip(' reducer saveTodos',()=>{
    expect(reducer(initialState,{type:CONSTANTS.SAVE_TODOS,payload:{list:[]}})).toEqual(initialState)
  })
})

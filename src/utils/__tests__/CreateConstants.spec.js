import createConstants from '../CreateConstants'

var CONSTANTS;

describe('createContainer function', function(){
  beforeEach(()=>{
     CONSTANTS=createConstants("namespace","save_item,save_list")

  })

  it('check createConstants create UpperCase', () => {
    expect(CONSTANTS.SAVE_ITEM).toBe("namespace_save_item")
    expect(CONSTANTS.SAVE_LIST).toBe("namespace_save_list")
  })
  it('check createConstants length eq 2',() =>{
    expect(Object.entries(CONSTANTS).length).toBe(2)
  })
});


describe('createTypes', () => {
  it.skip('createType')
});


describe('createActionRoute', () => {
  it.skip('createActionRoute listRoute')
  it.skip('createActionRoute addRoute')
  it.skip('createActionRoute editRoute')
  it.skip('createActionRoute detailRoute')
  it.skip('createActionRoute backRoute')
});

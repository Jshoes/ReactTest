// import InputGroup from '../components/InputGroup'
//
//
// test('InputStrGroup instanceof what function',()=>{
//     expect(InputGroup).toBeInstanceOf(Function)
//     console.log(expect(InputGroup).toBeInstanceOf(Function))
// })


const sum = function(a,b){
  return a + b
}




test("sum fn result",()=>{
  it('add 1 + 3 to equal 3',()=>{
    expect(sum(1,2)).toBe(3)
  })

  it('add -1 + 3 to equal 2 ',()=>{
    expect(sum(2,2)).toBe(4)
  })
})

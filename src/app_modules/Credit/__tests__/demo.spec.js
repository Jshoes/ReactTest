 function sum(a,b){
   if(typeof(b)!=="number"){
     throw new Error("b is not number")
   }
   return a+b
 }
   //sum.spec.js
   //import sum from './sum.js'
   beforeAll(() => {
     console.log("beforeAll")
   });
   afterAll(() => {
     console.log("afterAll")
   });
   afterEach(() => {
     console.log("afterEach")
   });

   beforeEach(() => {
     console.log("beforeEach")
   });
   describe("sum方法测试", () => {
     it("结果测试", () => {
       expect(3).toBe(sum(1,2))
     });

     it.skip("边界测试", () => {
       expect(NaN).toBe(sum(1,undefined))
       expect(NaN).toBe(sum(undefined,1))
       expect(NaN).toBe(sum(undefined,undefined))
       expect("1abc").toBe(sum(1,"abc"))
     });

     it.skip("错误测试",()=>{

       expect(4).not.toBe(sum(1,2))
     })

     it.skip("throw",()=>{
       // expect(sum(1,"abc")).toThrowError(/b/)
     })
   });

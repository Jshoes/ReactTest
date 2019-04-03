title: 前端单元测试
author:
  name: jaxchow
output: unitcase.html
controls: true

--

# 前端单元测试
## 前端模块化功能单元测试

--

### 什么是单元测试

  是针对 程序的最小单元 来进行正确性检验的测试工作。程序单元是应用的最小可测试部件。一个单元可能是单个程序、类、对象、方法等。 ——维基百科

--

### 单元测试好处

    * 它是一种验证行为：程序中的每一项功能都是测试来验证它的正确性。
    * 它是一种设计行为：编写单元测试将使我们从调用者观察、思考。特别是先写测试（test-first），迫使我们把程序设计成易于调用和可测试的，即迫使我们解除软件中的耦合。
    * 它是一种编写文档的行为：单元测试是一种无价的文档，它是展示函数或类如何使用的最佳文档。这份文档是可编译、可运行的，并且它保持最新，永远与代码同步。
    * 它具有回归性：自动化的单元测试避免了代码出现回归，编写完成之后，可以随时随地的快速运行测试。

    缺点多数围绕着工作量的问题引发的

    * 保证程序正确性需要之写更多的代码
--

### 单元测试知识点

  * 测试工具 jest mocha junit
  * 断言库 chai assert
  * 用例
  * mock

--

### 单元测试例子

```javascript
    // sum.js
    export default function sum(a,b){
      return a+b
    }
    //sum.spec.js
    //import sum from './sum.js'
    describe("sum方法测试", () => {
      it("结果测试", () => {
        expect(3).toBe(sum(1,2))
      });
      it("边界测试", () => {
        expect(NaN).toBe(sum(1,undefined))
        expect(NaN).toBe(sum(undefined,1))
        expect(NaN).toBe(sum(undefined,undefined))
        expect("1abc").toBe(sum(1,"abc"))
      });
    });

```
[demo](atom:///Users/jaxchow/workspace/rsm-application/src/app_modules/Credit/__tests__/demo.spec.js)

--

### Mock 函数

  Mock 函数可以轻松地测试代码之间的连接——这通过擦除函数的实际实现，捕获对函数的调用 ( 以及在这些调用中传递的参数) ，在使用 new 实例化时捕获构造函数的实例，或允许测试时配置返回值的形式来实现。Jest中有两种方式的Mock Function，一种是利用Jest提供的Mock Function创建，另外一种是手动创建来覆写本身的依赖实现。通过 mock function 可以轻松地得到回调函数的调用次数、参数等调用信息，而不需要编写额外的代码去获取相关数据，让测试用例变得更可读。

--
### Mock 示例

```javascript
  function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  }
  const mockCallback = jest.fn();
  forEach([0, 1], mockCallback);

  // 此模拟函数被调用了两次
  expect(mockCallback.mock.calls.length).toBe(2);

  // 第一次调用函数时的第一个参数是 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // 第二次调用函数时的第一个参数是 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  const myMock = jest.fn();
  console.log(myMock());
  myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
// 10 ,x,true,true
```
[mock](atom:///Users/jaxchow/workspace/rsm-application/src/app_modules/Credit/__tests__/mock.spec.js)
--

### 单元测试一些建议

 * 用例先行，再修改主程序；
 * 越重要的代码，越要写单元测试；
 * 代码做不到单元测试，多思考如何改进，而不是放弃；
 * 边写业务代码，边写单元测试，而不是完成整个新功能后再写；
 * 多思考如何改进、简化测试代码；

 > 写单元测试更多的是对自己的代码负责。有测试用例的代码，别人更容易看懂，以后别人接手你的代码时，也可能放心做改动。

--

### 相关资源

  * [jest](https://facebook.github.io/jest/)
  * [前端测试框架Jest系列教程 -- Mock Functions（模拟器](https://www.cnblogs.com/Wolfmanlq/p/8025329.html)
  * [百科](https://baike.baidu.com/item/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95/1917084?fr=aladdin)
  * [谈谈为什么写单元测试--简书](https://www.jianshu.com/p/fa41fb80d2b8)

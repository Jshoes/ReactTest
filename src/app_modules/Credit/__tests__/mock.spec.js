
describe("测试mock", () => {
  it("mock function", () => {
    function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  }
  const mockCallback = jest.fn();
  forEach([0, 1], mockCallback);

  // 此模拟函数被调用了两次
  console.log("calls.length",mockCallback.mock.calls.length)
  expect(mockCallback.mock.calls.length).toBe(2);

  // 第一次调用函数时的第一个参数是 0
  console.log("calls[0][0]",mockCallback.mock.calls.length)
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // 第二次调用函数时的第一个参数是 1
  console.log("call[1][0]",mockCallback.mock.calls.length)
  expect(mockCallback.mock.calls[1][0]).toBe(1);


  });
  it("mock return ", () => {
    const myMock = jest.fn();
    console.log(myMock());
    myMock.mockReturnValue(true).mockReturnValueOnce('x').mockReturnValueOnce(10);
    console.log(myMock(),myMock(),myMock(),myMock())
  });
});

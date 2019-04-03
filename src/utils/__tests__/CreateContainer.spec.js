import createContainer from '../CreateContainer'


describe('createContainer function', function(){
  beforeEach(()=>{
    createContainer()
  })

  it('check createStyles', () => {
    var styles = document.querySelector("style")
    expect(styles.nodeName).toEqual('STYLE')
     //expect(toJson(styles)).toMatchSnapshot();

  })
  it('check appContrainer exist',() =>{
    var appContrainer = document.querySelector(".app")
    expect(appContrainer.nodeName).toEqual("DIV")
     //expect(toJson(appContrainer)).toMatchSnapshot();
  })
});

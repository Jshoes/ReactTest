import {expect} from 'chai'
import API from '../api'


describe('passport test', () => {
  it('user logining system',(done)=>{
      new API().fetchLogin().then(json=>{
        expect(json.msg).to.eql('ok')
        done()
      }).catch(ex=>{
        console.error(ex)
        expect(json.msg).to.eql('error')
        done()
      })
  })

  it('user logout system',(done)=>{
      new API().fetchLogout().then(json=>{
        expect(json.msg).to.eql('ok')
        done()
      }).catch(ex=>{
        console.error(ex)
        expect(json.msg).to.eql('error')
        done()
      })
  })
})

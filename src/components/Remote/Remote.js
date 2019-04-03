import React,{Component} from 'react'
import PropTypes from 'prop-types'



export default class Remote extends Component{
    state={
      visiable:true
    }

    fetchData(fetchUrl){
      fetch(fetchUrl)
      .then(response => response.json())
      .then((json) => {
        if(json.status == 0){
          console.log("success")
          this.setState({
            visiable:false
          })
        }else{
          console.log("未绑定")
        }

      });
    }

    componentWillMount(){
      let {uri} = this.props
      // this.fetchData(uri)
    }

    render(){
      let {children,renderItem} = this.props
      let {visiable} = this.state
      let element=children

      if(visiable){
        return React.cloneElement(element)
      }else{
        return null
      }
    }

}

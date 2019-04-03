import React, {Component, PropTypes} from 'react'
//import {reduxForm,Field} from 'redux-form'
import {IframePage} from 'components/Page'

let previewUrl=""
if (process.env.NODE_ENV === 'development') {
  previewUrl= "/client/preview.html#/edit"
}else{
  previewUrl= "/preview#/edit"
}




class WeSiteView extends Component {
  componentWillMount() {
  }
  render() {
    let {params, reduce} = this.props;
    //	let model=preduce.list[0]

    let item = {}
    return (
      <div className="containerSettings" style={{height:'100%',overflow:'hidden',position: 'absolute', left: '10px', right: '10px'}}>
       <IframePage src={previewUrl} name="IframePage">111</IframePage>
      </div>
    )
  }
}

export default WeSiteView

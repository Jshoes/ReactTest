
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

export default(ConnectContainer) => (InnerComponent,reducerName,actions) => {
  const mapStateToProps = (state,ownProps) => {
    return {reduce: state[reducerName],appReducer:state.appReducer}
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(actions, dispatch),
      dispatch
    };
  }
  // return class extends Component {
  //   render() {
  //     console.log(InnerComponent,reducerName,actions)
  return connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(InnerComponent)
  //   }
  // }
}

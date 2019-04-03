import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import SideLayout from 'app/decorators/SideLayout'
import LogSideView from './views/LogSide.view'
import LogListView from './views/LogList.view'
import LogDetailView from './views/LogDetail.view'
import JobDetailView from '../Job/views/JobDetail.view'
import * as actions from './action'
import {reducerListSelector} from 'app-model/reducerSelector'
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

// let Container = connect((state,ownProps)=>{
// 	return {
// 		items:reducerListSelector(state.ORMReducer,"Log"),
//     appReducer:state.appReducer
//   }
// }, mapDispatchToProps, null, {pure: false})(LogView)

// let LogSideContainer = connect((state,ownProps)=>{
// 	return {
// 		// items:reducerListSelector(state.ORMReducer,"Log"),
//     // appReducer:state.appReducer
//   }
// }, mapDispatchToProps, null, {pure: false})(LogSideView)


let LogListContainer = connect((state,ownProps)=>{
	return {
		items:reducerListSelector(state.ORMReducer,"Log"),
		appReducer:state.appReducer,
		logReducer:state.logReducer
  }
}, mapDispatchToProps, null, {pure: false})(SideLayout(LogSideView)(LogListView))


let LogDetailContainer = connect((state,ownProps)=>{
	return {
		// items:reducerDetailSelector(state.ORMReducer,"Log"),
		// appReducer:state.appReducer,
		logDetail:state.logReducer.logDetail
  }
}, mapDispatchToProps, null, {pure: false})(LogDetailView)


export {LogListContainer,LogDetailContainer}
// export default Container;

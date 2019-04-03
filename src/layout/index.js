/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:50:07+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-02-06T14:31:13+08:00
* @Description: App Layout container
*/

import React from 'react'
import PropTypes from 'prop-types';

import Layout,{Fixed,Pane} from 'components/Layout'
import HeaderSide from './header'
import ContentSide from './content'
import Notifycation from './notifycation'


import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as actions from './action'


const mapStateToProps = (state) => {
  return {reduce: state.appReducer}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}


@connect(mapStateToProps, mapDispatchToProps, null, {pure: false})
export default class AppLayout extends React.Component {
  // @Action('fetchInitCongif')
  static childContextTypes = {
    appReducer:PropTypes.object
  }

  getChildContext(){
     var { reduce } =this.props;
     return {
        appReducer:reduce
     };
  }


  componentWillMount(){
    let {actions} = this.props;
    actions.fetchInitConfig()

    //actions.loadPeople()
  }
  render() {
    return (
        <Layout direction="column" >
				{process.env.NODE_ENV === 'development'?
					(<Fixed {...this.props} style={{display:'flex'}}>
            <HeaderSide/>
					</Fixed>)
					:null}
          <Pane style={{display:'flex'}}>
            <Notifycation />
            <ContentSide>
              {this.props.children}
            </ContentSide>
          </Pane>
        </Layout>
    )
  }
}



@connect(mapStateToProps, mapDispatchToProps, null, {pure: false})
export class App extends React.Component {
  // @Action('fetchInitCongif')
  componentWillMount(){
    let {actions} = this.props;
    actions.fetchInitConfig()

    //actions.loadPeople()
  }
  render() {
    return this.props.children
  }
}

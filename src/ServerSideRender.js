
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {renderToString} from 'react-dom/server'
import {Router, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import { createHistory } from 'history';
import AppRouter from './router'
import store from './store'
import createContainer from './utils/CreateContainer'
import DevTools from './utils/DevTools'
import {createMemoryHistory} from 'history';

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <Router routes={AppRouter()} history={createMemoryHistory()}></Router>
      </Provider>
    )
  }
}

export {App}
export default App

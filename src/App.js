/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:28:29+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2018-04-16T14:32:48+08:00
* @Description: application entry files
*/

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
//import {renderToString} from 'react-dom/server'
import { AppContainer} from 'react-hot-loader'
import AppRouter from './router'
import {Provider} from 'react-redux'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN'
import { PersistGate } from 'redux-persist/integration/react'
import store, {persistor} from './store'
import createContainer from 'app-utils/CreateContainer'
import theme from './themes/index.less'
if (process.env.NODE_ENV === 'development') {
 // just for production code
 //development
   // require('./mock/index')
}



export default class App extends Component{
  render(){
    return (
      <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </LocaleProvider>
    )
  }
}
ReactDOM.render(<App/>,createContainer())

//全局设定
/**
*   hot replace
*   todos: 后续优化
*/
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./router', () => {
      const AppRouter = require('./router').default;
      ReactDOM.render(
        <LocaleProvider locale={zh_CN}>
          <Provider store={store}>
            <AppContainer>
              <AppRouter />
            </AppContainer>
          </Provider>
        </LocaleProvider>
      , createContainer())
    })
  }
 }

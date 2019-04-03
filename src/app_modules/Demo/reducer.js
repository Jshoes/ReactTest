/**
* @Author: jax <jaxchow>
* @Date:   2016-02-23T20:34:45+08:00
* @Email:  jaxchow@gmail.com
 * @Last modified by:
 * @Last modified time: 2017-09-11T17:48:54+08:00
*/

import {createStore, combineReducers} from 'redux';

import {CONSTANTS, LIST_ITEM} from './action'

// TODO: 调整本地数据结构
let initialState = {}

//TODO： 拆分reduce。update\get
function reduce(state = initialState, action) {
  let {map} = state
  // console.log(CONSTANTS.SAVE_BATCH,action.type)
  switch (action.type) {
    default:
      return state;
  }
}

//const userReducer = combineReducers({reduce});
export {reduce, initialState};
export default reduce;

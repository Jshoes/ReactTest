import fetch from 'isomorphic-fetch'
import {routerActions, push, replace} from 'react-router-redux'
import ActionsRouter from 'app-utils/ActionRouterUtils'
import {reduce, initialState} from './reducer'

//TODO: 调整命名及常量定义
export const CONSTANTS = {
  NEW_ITEM: 'SOUND_NEW_ITEM'
}

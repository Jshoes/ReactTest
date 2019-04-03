
import createStoreByReducer from 'app-utils/CreateStore'
import reducer from './reducer'

let store = createStoreByReducer(reducer)

export default store

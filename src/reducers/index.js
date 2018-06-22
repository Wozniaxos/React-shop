import { combineReducers } from 'redux'
import session from './session'
import users from './users'
import products from './products'

const rootReducer = combineReducers({
  session,
  users,
  products,
})

export default rootReducer

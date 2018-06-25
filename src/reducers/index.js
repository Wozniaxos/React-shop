import { combineReducers } from 'redux'
import session from './session'
import users from './users'
import products from './products'
import order from './products'

const rootReducer = combineReducers({
  session,
  users,
  products,
  order,
})

export default rootReducer

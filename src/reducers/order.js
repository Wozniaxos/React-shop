import { ORDER_ITEMS_SET } from '../store/order/actions'

const INITIAL_STATE = {
  byId: {},
  list: [],
}

const applySetOrderItems = (state, action) => ({
  ...state,
  byId: action.items,
  list: Object.keys(action.items),
})

function order(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ORDER_ITEMS_SET: {
      return applySetOrderItems(state, action)
    }
    default:
      return state
  }
}

export default order

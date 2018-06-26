import { ORDER_SET, ORDER_ITEMS_SET } from '../store/order/actions'

const INITIAL_STATE = {
  byId: {},
  list: [],
  orderItemsById: {},
  orderListItems: [],
}

const applySetOrder = (state, action) => ({
  ...state,
  byId: action.order,
  list: Object.keys(action.order),
})

const applySetOrderItems = (state, action) => ({
  ...state,
  orderItemsById: action.items,
  orderListItems: Object.keys(action.items),
})

function order(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ORDER_SET: {
      return applySetOrder(state, action)
    }
    case ORDER_ITEMS_SET: {
      return applySetOrderItems(state, action)
    }
    default:
      return state
  }
}

export default order

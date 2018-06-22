const INITIAL_STATE = {
  all: {},
}

const applySetProducts = (state, action) => ({
  ...state,
  all: action.products,
})

function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'PRODUCTS_SET': {
      return applySetProducts(state, action)
    }
    default:
      return state
  }
}

export default products

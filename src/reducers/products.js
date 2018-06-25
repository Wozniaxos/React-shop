const INITIAL_STATE = {
  byId: {},
  list: [],
  highlighted: null,
}

const applySetProducts = (state, action) => ({
  ...state,
  byId: action.products,
  list: Object.keys(action.products),
})

const applyHighlightProduct = (state, action) => ({
  ...state,
  highlighted: action.product,
})

function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'PRODUCTS_SET': {
      return applySetProducts(state, action)
    }
    case 'PRODUCT_HIGHLIGHT': {
      return applyHighlightProduct(state, action)
    }
    default:
      return state
  }
}

export default products

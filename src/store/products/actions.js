export const PRODUCTS_SET = 'PRODUCTS_SET'
export const PRODUCT_HIGHLIGHT = 'PRODUCT_HIGHLIGHT'

export const setProducts = products => ({ type: PRODUCTS_SET, products })
export const highlightProduct = product => ({ type: PRODUCT_HIGHLIGHT, product })

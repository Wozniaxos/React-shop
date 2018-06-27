export const ORDER_SET = 'ORDER_SET'
export const ORDER_ITEMS_SET = 'ORDER_ITEMS_SET'

export const setOrder = order => ({ type: ORDER_SET, order })
export const setOrderItems = items => ({ type: ORDER_ITEMS_SET, items })

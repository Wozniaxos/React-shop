import React from 'react'
import PropTypes from 'prop-types'
import OrderRow from './OrderRow'
import AddToOrderButton from './AddToOrderButton'
import Amount from './Amount'

const OrderList = ({ list, products }) => (
  <div>
    {list.map(key => (
      <OrderRow
        AmountComponent={Amount}
        ButtonComponent={AddToOrderButton}
        item={products[key]}
        key={key}
      />
    ))}
  </div>
)

OrderList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  products: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default OrderList

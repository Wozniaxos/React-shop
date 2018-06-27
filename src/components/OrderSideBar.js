import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import OrderRow from './OrderRow'
import RemoveFromOrderButton from './RemoveFromOrderButton'

export default class OrderSideBar extends PureComponent {
  state = { totalPrice: 0 }
  countTotalPrice = () => {
    const { items, itemsList } = this.props
    return itemsList.reduce((totalPrice, listItem) => {
      const itemPrice = items[listItem].price * items[listItem].amount
      return (totalPrice += parseInt(itemPrice))
    }, 0)
  }
  componentDidMount() {
    this.setState({ totalPrice: this.countTotalPrice() })
  }
  componentDidUpdate() {
    this.setState({ totalPrice: this.countTotalPrice() })
  }

  render() {
    const { items, itemsList } = this.props
    return (
      <div>
        <h2>Products in order</h2>
        {itemsList.map(key => (
          <OrderRow ButtonComponent={RemoveFromOrderButton} item={items[key]} key={key} />
        ))}
        <p>Total price: {this.state.totalPrice} zł</p>
      </div>
    )
  }
}

OrderSideBar.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

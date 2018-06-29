import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class OrderRow extends PureComponent {
  state = { amount: 1 }
  increaseAmount = () => {
    this.setState({ amount: this.state.amount + 1 })
  }
  decreaseAmount = () => {
    const { amount } = this.state
    if (amount > 1) {
      this.setState({ amount: this.state.amount - 1 })
    }
  }
  render() {
    const { item, ButtonComponent, AmountComponent, currentUser, orderItems } = this.props
    const { amount } = this.state
    return (
      <div className="order-row">
        {AmountComponent ? (
          <div>
            <p className="row-item-info">
              {item.name} {item.price} zł
            </p>
            <AmountComponent
              amount={amount}
              decrease={this.decreaseAmount}
              increase={this.increaseAmount}
            />
          </div>
        ) : (
          <div>
            <p className="row-item-info">
              {item.amount}x {item.name} {item.price} zł
            </p>
          </div>
        )}
        <ButtonComponent
          amount={amount}
          currentUser={currentUser}
          item={item}
          orderItems={orderItems}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  orderItems: state.order.orderItemsById,
})

OrderRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  ButtonComponent: PropTypes.func.isRequired,
  AmountComponent: PropTypes.func,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  orderItems: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(OrderRow)

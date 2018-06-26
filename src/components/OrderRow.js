import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Product extends PureComponent {
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
    const { item, ButtonComponent, AmountComponent } = this.props
    return (
      <div className="order-row">
        {AmountComponent ? (
          <div>
            {item.name} {item.price} zł
            <AmountComponent
              amount={this.state.amount}
              decrease={this.decreaseAmount}
              increase={this.increaseAmount}
            />
          </div>
        ) : (
          <div>
            {item.amount}x {item.name} {item.price} zł
          </div>
        )}
        <ButtonComponent amount={this.state.amount} item={item} />
      </div>
    )
  }
}

Product.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  ButtonComponent: PropTypes.func.isRequired,
  AmountComponent: PropTypes.func,
}

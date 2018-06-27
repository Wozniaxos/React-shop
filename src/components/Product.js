import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Product extends PureComponent {
  handleclick = () => {
    const { highlight, product } = this.props
    highlight(product)
  }

  render() {
    const { product } = this.props
    return (
      <div onClick={this.handleclick}>
        {product.name} {product.price} zł
      </div>
    )
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  highlight: PropTypes.func.isRequired,
}

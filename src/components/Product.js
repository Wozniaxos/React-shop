import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Product extends PureComponent {
  handleclick = () => {
    const { highlight, product, id } = this.props
    product.id = id
    highlight(product)
  }

  render() {
    const { product } = this.props
    return <div onClick={this.handleclick}> {product.name} </div>
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  highlight: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

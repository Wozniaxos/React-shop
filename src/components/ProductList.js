import React from 'react'
import PropTypes from 'prop-types'

const ProductList = ({ products }) => (
  <div>
    <h2>List of Products</h2>
    <p>Products fetched from DB</p>

    {Object.keys(products).map(key => <div key={key}>{products[key].name}</div>)}
  </div>
)

ProductList.propTypes = {
  products: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default ProductList

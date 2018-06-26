import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import ProductEditForm from './ProductEditForm'
import { highlightProduct } from '../store/products/actions'
import DeleteButton from './DeleteButton'
import { connect } from 'react-redux'

const ProductList = ({ highlighted, list, products, highlight }) => (
  <div>
    <h2>List of Products</h2>
    <p>Products fetched from DB</p>

    {list.map(key => <Product highlight={highlight} id={key} key={key} product={products[key]} />)}
    {highlighted && (
      <div>
        <h2>Edit Form</h2>
        <ProductEditForm highlight={highlight} product={highlighted} />
        <DeleteButton
          afterDelete={highlight}
          afterDeleteParams={null}
          entity={'Product'}
          itemId={highlighted.id}
        />
      </div>
    )}
  </div>
)

ProductList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  highlighted: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  products: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  highlight: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  highlight: highlightProduct,
}

export default connect(null, mapDispatchToProps)(ProductList)

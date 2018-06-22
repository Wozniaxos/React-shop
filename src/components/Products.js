import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withAuthorization from './withAuthorization'
import { db } from '../firebase'
import ProductList from './ProductList'
import ProductAddForm from './ProductAddForm'

class Products extends Component {
  componentDidMount() {
    const { onSetProducts } = this.props
    db.handleChangesFor('Product', snapshot => onSetProducts(snapshot.val() || {}))
  }

  render() {
    const { products } = this.props

    return (
      <div>
        <h1>Products</h1>

        {Object.keys(products).length > 0 && <ProductList products={products} />}
        <ProductAddForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.all,
})

const mapDispatchToProps = dispatch => ({
  onSetProducts: products => dispatch({ type: 'PRODUCTS_SET', products }),
})

const authCondition = authUser => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
)(Products)

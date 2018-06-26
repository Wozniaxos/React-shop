import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withAuthorization from './withAuthorization'
import { db } from '../firebase'
import ProductList from './ProductList'
import ProductAddForm from './ProductAddForm'
import { setProducts } from '../store/products/actions'

class Products extends Component {
  componentDidMount() {
    const { onSetProducts } = this.props
    db.handleChangesFor('Product', snapshot => onSetProducts(snapshot.val() || {}))
  }

  render() {
    const { highlighted, productList, products } = this.props

    return (
      <div>
        <h1>Products</h1>

        {productList.length > 0 && (
          <ProductList highlighted={highlighted} list={productList} products={products} />
        )}
        <ProductAddForm />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  productList: state.products.list,
  products: state.products.byId,
  highlighted: state.products.highlighted,
})

const mapDispatchToProps = {
  onSetProducts: setProducts,
}

const authCondition = authUser => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
)(Products)

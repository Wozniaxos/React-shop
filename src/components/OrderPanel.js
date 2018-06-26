import React, { Component } from 'react'
import OrderList from './OrderList'
import OrderSideBar from './OrderSideBar'
import { setProducts } from '../store/products/actions'
import { setOrderItems } from '../store/order/actions'
import { connect } from 'react-redux'
import { db } from '../firebase'

class OrderPanel extends Component {
  componentDidMount() {
    const { onSetProducts, onSetOrderItems } = this.props
    db.fetchAndHandleChangesFor('Product', snapshot => onSetProducts(snapshot.val() || {}))
    db.fetchAndHandleChangesFor('Order', snapshot => onSetOrderItems(snapshot.val() || {}))
  }

  render() {
    const { productList, orderItemsList, products, orderItems } = this.props

    return (
      <div>
        <div>
          <h1>Products</h1>
          {productList.length > 0 && <OrderList list={productList} products={products} />}
        </div>
        <div>
          {orderItemsList.length > 0 && (
            <OrderSideBar items={orderItems} itemsList={orderItemsList} />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  productList: state.products.list,
  products: state.products.byId,
  orderItemsList: state.order.list,
  orderItems: state.order.byId,
})

const mapDispatchToProps = {
  onSetProducts: setProducts,
  onSetOrderItems: setOrderItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPanel)

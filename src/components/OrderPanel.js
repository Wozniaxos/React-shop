import React, { Component } from 'react'
import OrderList from './OrderList'
import OrderSideBar from './OrderSideBar'
import { setProducts } from '../store/products/actions'
import { setOrderItems } from '../store/order/actions'
import { connect } from 'react-redux'
import { db } from '../firebase'

class OrderPanel extends Component {
  getCurrentUserOrder = orders => {
    const { currentUser } = this.props
    if (currentUser.order) {
      return orders[currentUser.order]
    }
  }

  componentDidMount() {
    const { setProducts, setOrderItems } = this.props
    db.fetchAndHandleChangesFor('Product', snapshot => setProducts(snapshot.val() || {}))
    db.fetchAndHandleChangesFor('Order', snapshot => {
      const orders = snapshot.val()
      if (orders) {
        const userOrder = this.getCurrentUserOrder(orders)
        userOrder ? setOrderItems(userOrder.items || {}) : setOrderItems({})
      }
    })
  }

  render() {
    const { productList, orderListItems, products, orderItems } = this.props

    return (
      <div className="order-panel">
        <div className="order-list">
          <h2>Add products to order</h2>
          {productList.length > 0 && <OrderList list={productList} products={products} />}
        </div>
        <div className="order-sidebar">
          {orderListItems.length > 0 && (
            <OrderSideBar items={orderItems} itemsList={orderListItems} />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  productList: state.products.list,
  products: state.products.byId,
  orderListItems: state.order.orderListItems,
  orderItems: state.order.orderItemsById,
  currentUser: state.users.currentUser,
})

const mapDispatchToProps = {
  setProducts,
  setOrderItems,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPanel)

import React, { PureComponent } from 'react'
import { db } from '../firebase'
import { connect } from 'react-redux'

const removeItemFromOrder = (currentUser, item, currentItems) => {
  const orderId = currentUser['order']
  const orderPayload = {
    id: orderId,
    items: currentItems,
  }
  orderPayload.items[item.id] = null
  db.update('Order', orderPayload)
}

class RemoveFromOrderButton extends PureComponent {
  removeFromOrder = event => {
    const { currentUser, item, orderItems } = this.props

    removeItemFromOrder(currentUser, item, orderItems)
    event.preventDefault()
  }
  render() {
    return <button onClick={this.removeFromOrder}> Remove from order </button>
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  orderItems: state.order.orderItemsById,
})

export default connect(mapStateToProps)(RemoveFromOrderButton)

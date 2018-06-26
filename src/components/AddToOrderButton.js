import React, { PureComponent } from 'react'
import { db } from '../firebase'
import { connect } from 'react-redux'

const createNewOrderIfNoExist = (user, newOrderKey) => {
  db.create('Order', {
    id: newOrderKey,
    user,
    items: {},
  })
  return db.update('User', {
    id: user.id,
    username: user.username,
    email: user.email,
    order: newOrderKey,
  })
}

const addItemToOrder = ({ currentUser, item, orderItems, newOrderKey, amount }) => {
  const orderId = currentUser['order']
  const orderPayload = {
    id: newOrderKey || orderId,
    items: orderItems,
  }
  item['amount'] = amount
  orderPayload.items[item.id] = item
  db.update('Order', orderPayload)
}

class AddToOrderButton extends PureComponent {
  addToOrder = event => {
    const { currentUser, item, orderItems, amount } = this.props
    if (!currentUser.order) {
      const newOrderKey = db.initializeKey('Order')
      createNewOrderIfNoExist(currentUser, newOrderKey)
      addItemToOrder({ currentUser, item, orderItems, newOrderKey, amount })
    } else {
      addItemToOrder({ currentUser, item, orderItems, amount })
    }
    event.preventDefault()
  }
  render() {
    return <button onClick={this.addToOrder}> Add to order </button>
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  orderItems: state.order.orderItemsById,
})

export default connect(mapStateToProps)(AddToOrderButton)

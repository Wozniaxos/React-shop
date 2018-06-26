import React, { Component } from 'react'
import withAuthorization from './withAuthorization'
import OrderPanel from './OrderPanel'

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Shop</h1>
        <OrderPanel />
      </div>
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(HomePage)

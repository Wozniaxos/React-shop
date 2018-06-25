import React, { PureComponent } from 'react'
import { db } from '../firebase'

export default class DeleteButton extends PureComponent {
  deleteItem = event => {
    const { itemId, callback, entity, callbackParams } = this.props
    db
      .destroy(entity, {
        id: itemId,
      })
      .then(() => callback(callbackParams))
    event.preventDefault()
  }
  render() {
    return <button onClick={this.deleteItem}> Delete </button>
  }
}

import React, { PureComponent } from 'react'
import { db } from '../firebase'

export default class DeleteButton extends PureComponent {
  deleteItem = event => {
    const { item, afterDelete, entity, afterDeleteParams } = this.props
    db
      .destroy(entity, {
        id: item.id,
      })
      .then(() => afterDelete(afterDeleteParams))
    event.preventDefault()
  }
  render() {
    return <button onClick={this.deleteItem}> Delete </button>
  }
}

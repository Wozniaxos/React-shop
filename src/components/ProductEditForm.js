import React, { PureComponent } from 'react'
import { validateFields } from '../utils/validator'
import { db } from '../firebase'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  name: '',
  error: null,
}

export default class ProductEditForm extends PureComponent {
  state = { ...INITIAL_STATE }

  onSubmit = event => {
    const { name } = this.state
    const { product, highlight } = this.props
    const payload = {
      id: product.id,
      name,
    }
    db.update('Product', payload).then(() => highlight(null))
    this.setState({ ...INITIAL_STATE })
    event.preventDefault()
  }

  render() {
    const { name, error } = this.state

    const isInvalid = !validateFields({
      name,
    })

    return (
      <div>
        <h3> {this.props.product.name} </h3>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={event => this.setState(byPropKey('name', event.target.value))}
            placeholder="Product Name"
            type="text"
            value={name}
          />
          <button disabled={isInvalid} type="submit">
            Save Edit
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    )
  }
}

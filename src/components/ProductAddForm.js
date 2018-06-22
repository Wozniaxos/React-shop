import React, { Component } from 'react'
import { validateFields } from '../utils/validator'
import { db } from '../firebase'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  name: '',
  error: null,
}

export default class ProductAddForm extends Component {
  state = { ...INITIAL_STATE }

  onSubmit = event => {
    const { name } = this.state
    db.create('Product', {
      name,
    })
    this.setState({ ...INITIAL_STATE })
    event.preventDefault()
  }

  render() {
    const { name, error } = this.state

    const isInvalid = !validateFields({
      name,
    })

    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={event => this.setState(byPropKey('name', event.target.value))}
          placeholder="Product Name"
          type="text"
          value={this.state.name}
        />
        <button disabled={isInvalid} type="submit">
          Add product
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

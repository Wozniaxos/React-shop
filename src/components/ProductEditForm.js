import React, { PureComponent } from 'react'
import { validateFields } from '../utils/validator'
import { db } from '../firebase'

const INITIAL_STATE = {
  name: '',
  isInvalid: true,
  error: null,
}

export default class ProductEditForm extends PureComponent {
  state = INITIAL_STATE

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { name } = this.state

      const isInvalid = !validateFields({
        name,
      })
      this.setState({ isInvalid })
    })
  }

  onSubmit = event => {
    const { name } = this.state
    const { product, highlight } = this.props
    const payload = {
      id: product.id,
      name,
    }
    db
      .update('Product', payload)
      .then(() => highlight(null))
      .catch(error => this.setState({ error }))
    this.setState(INITIAL_STATE)
    event.preventDefault()
  }

  render() {
    const { name, isInvalid, error } = this.state

    return (
      <div>
        <h3> {this.props.product.name} </h3>
        <form onSubmit={this.onSubmit}>
          <input
            name="name"
            onChange={this.handleChange}
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

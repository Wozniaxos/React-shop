import React, { PureComponent } from 'react'
import { validateFields } from '../utils/validator'
import { db } from '../firebase'

const INITIAL_STATE = {
  name: '',
  price: '',
  isInvalid: true,
  error: null,
}

export default class ProductEditForm extends PureComponent {
  state = INITIAL_STATE

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { name, price } = this.state

      const isInvalid = !validateFields({
        name,
        number: price,
      })
      this.setState({ isInvalid })
    })
  }

  onSubmit = event => {
    const { name, price } = this.state
    const { product, highlight } = this.props
    const payload = {
      id: product.id,
      name,
      price,
    }
    db
      .update('Product', payload)
      .then(() => highlight(null))
      .catch(error => this.setState({ error }))
    this.setState(INITIAL_STATE)
    event.preventDefault()
  }

  render() {
    const { name, price, isInvalid, error } = this.state

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
          <input
            name="price"
            onChange={this.handleChange}
            placeholder="Product Price"
            type="text"
            value={price}
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

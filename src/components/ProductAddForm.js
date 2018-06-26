import React, { Component } from 'react'
import { validateFields } from '../utils/validator'
import { db } from '../firebase'

const INITIAL_STATE = {
  name: '',
  isInvalid: true,
  error: null,
}

export default class ProductAddForm extends Component {
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
    db
      .create('Product', {
        name,
      })
      .catch(error => this.setState({ error }))
    this.setState(INITIAL_STATE)
    event.preventDefault()
  }

  render() {
    const { name, isInvalid, error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="name"
          onChange={this.handleChange}
          placeholder="Product Name"
          type="text"
          value={name}
        />
        <button disabled={isInvalid} type="submit">
          Add product
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

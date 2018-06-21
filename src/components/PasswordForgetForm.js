import React, { Component } from 'react'
import { auth } from '../firebase'
import { validateFields } from '../utils/validator'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  error: null,
}

export default class PasswordForgetForm extends Component {
  state = { ...INITIAL_STATE }

  onSubmit = event => {
    const { email } = this.state

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { email, error } = this.state

    const isInvalid = !validateFields({
      email,
    })

    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          placeholder="Email Address"
          type="text"
          value={this.state.email}
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

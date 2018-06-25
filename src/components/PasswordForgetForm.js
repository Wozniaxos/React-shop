import React, { Component } from 'react'
import { auth } from '../firebase'
import { validateFields } from '../utils/validator'

const INITIAL_STATE = {
  email: '',
  isInvalid: true,
  error: null,
}

export default class PasswordForgetForm extends Component {
  state = INITIAL_STATE

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { email } = this.state

      const isInvalid = !validateFields({
        email,
      })
      this.setState({ isInvalid })
    })
  }

  onSubmit = event => {
    const { email } = this.state

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(INITIAL_STATE)
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  render() {
    const { email, error, isInvalid } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          onChange={this.handleChange}
          placeholder="Email Address"
          type="text"
          value={email}
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

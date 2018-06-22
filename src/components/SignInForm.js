import React, { Component } from 'react'
import { auth } from '../firebase'
import { HOME } from '../constants/routes'
import { validateFields } from '../utils/validator'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

export default class SignInForm extends Component {
  state = { ...INITIAL_STATE }

  onSubmit = event => {
    const { email, password } = this.state
    const { history } = this.props

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        history.push(HOME)
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { email, password, error } = this.state

    const isInvalid = !validateFields({
      password,
      email,
    })

    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          placeholder="Email Address"
          type="text"
          value={email}
        />
        <input
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          placeholder="Password"
          type="password"
          value={password}
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

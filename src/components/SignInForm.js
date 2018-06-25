import React, { Component } from 'react'
import { auth } from '../firebase'
import { HOME } from '../constants/routes'
import { validateFields } from '../utils/validator'

const INITIAL_STATE = {
  email: '',
  password: '',
  isInvalid: true,
  error: null,
}

export default class SignInForm extends Component {
  state = INITIAL_STATE

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state

      const isInvalid = !validateFields({
        password,
        email,
      })
      this.setState({ isInvalid })
    })
  }

  onSubmit = event => {
    const { email, password } = this.state
    const { history } = this.props

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(INITIAL_STATE)
        history.push(HOME)
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  render() {
    const { email, password, isInvalid, error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          onChange={this.handleChange}
          placeholder="Email Address"
          type="text"
          value={email}
        />
        <input
          name="password"
          onChange={this.handleChange}
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

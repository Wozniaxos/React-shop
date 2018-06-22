import React, { Component } from 'react'
import { auth, db } from '../firebase'
import { HOME } from '../constants/routes'
import { validateFields, validatePasswordCompatibility } from '../utils/validator'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  validatedForm: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

export default class SignUpForm extends Component {
  state = { ...INITIAL_STATE }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state
    const { history } = this.props

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db
          .create('User', {
            id: authUser.user.uid,
            username,
            email,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE })
            history.push(HOME)
          })
          .catch(error => {
            this.setState(byPropKey('error', error))
          })
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
    event.preventDefault()
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state

    const validFields = validateFields({
      password: passwordOne,
      email,
      name: username,
    })

    let isInvalid = !validFields || !validatePasswordCompatibility(passwordOne, passwordTwo)

    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          placeholder="Full Name"
          type="text"
          value={username}
        />
        <input
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          placeholder="Email Address"
          type="text"
          value={email}
        />
        <input
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          placeholder="Password"
          type="password"
          value={passwordOne}
        />
        <input
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          placeholder="Confirm Password"
          type="password"
          value={passwordTwo}
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

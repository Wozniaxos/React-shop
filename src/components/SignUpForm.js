import React, { Component } from 'react'
import { auth, db } from '../firebase'
import { HOME } from '../constants/routes'
import { validateFields, validatePasswordCompatibility } from '../utils/validator'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isInvalid: true,
  error: null,
}

export default class SignUpForm extends Component {
  state = INITIAL_STATE

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { username, email, passwordOne, passwordTwo } = this.state

      const validFields = validateFields({
        password: passwordOne,
        email,
        name: username,
      })
      let isInvalid = !validFields || !validatePasswordCompatibility(passwordOne, passwordTwo)
      this.setState({ isInvalid })
    })
  }

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
            this.setState(INITIAL_STATE)
            history.push(HOME)
          })
          .catch(error => {
            this.setState({ error })
          })
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault()
  }

  render() {
    const { username, email, passwordOne, passwordTwo, isInvalid, error } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          onChange={this.handleChange}
          placeholder="Full Name"
          type="text"
          value={username}
        />
        <input
          name="email"
          onChange={this.handleChange}
          placeholder="Email Address"
          type="text"
          value={email}
        />
        <input
          name="passwordOne"
          onChange={this.handleChange}
          placeholder="Password"
          type="password"
          value={passwordOne}
        />
        <input
          name="passwordTwo"
          onChange={this.handleChange}
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

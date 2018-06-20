import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { auth } from '../firebase'

import * as routes from '../constants/routes'

const SignUpPage = ({ history }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>
)

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit(event) {
    const { username, email, passwordOne } = this.state
    const { history } = this.props

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.HOME)
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state

    const validateEmail = () => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || !validateEmail(email) || username === ''

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
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

const SignUpLink = () => (
  <p>
    Dont have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
)

export default withRouter(SignUpPage)

export { SignUpForm, SignUpLink }

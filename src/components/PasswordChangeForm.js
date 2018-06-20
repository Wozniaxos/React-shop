import React, { Component } from 'react'

import { auth } from '../firebase'
import { validatePasswordCompatibility, validateFields } from '../utils/validator'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  state = { ...INITIAL_STATE }

  onSubmit = event => {
    const { passwordOne } = this.state

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state

    const validFields = validateFields({
      password: passwordOne,
    })

    const isInvalid = !validFields || !validatePasswordCompatibility(passwordOne, passwordTwo)

    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          placeholder="New Password"
          type="password"
          value={passwordOne}
        />
        <input
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          placeholder="Confirm New Password"
          type="password"
          value={passwordTwo}
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default PasswordChangeForm
import React, { Component } from 'react'

import { auth } from '../firebase'
import { validatePasswordCompatibility, validateFields } from '../utils/validator'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  isInvalid: true,
  error: null,
}

class PasswordChangeForm extends Component {
  state = INITIAL_STATE

  handleChange = event => {
    const { passwordOne, passwordTwo } = this.state

    this.setState({ [event.target.name]: event.target.value }, () => {
      const validFields = validateFields({
        password: passwordOne,
      })
      const isInvalid = !validFields || !validatePasswordCompatibility(passwordOne, passwordTwo)
      this.setState({ isInvalid })
    })
  }

  onSubmit = event => {
    const { passwordOne } = this.state

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(INITIAL_STATE)
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  render() {
    const { passwordOne, passwordTwo, isInvalid, error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          onChange={this.handleChange}
          placeholder="New Password"
          type="password"
          value={passwordOne}
        />
        <input
          name="passwordTwo"
          onChange={this.handleChange}
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

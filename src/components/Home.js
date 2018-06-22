import React, { Component } from 'react'
import withAuthorization from './withAuthorization'

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Here will be the store with side bars etc</p>
      </div>
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(HomePage)

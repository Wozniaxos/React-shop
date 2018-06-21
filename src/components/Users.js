import React, { Component } from 'react'

import withAuthorization from './withAuthorization'
import { db } from '../firebase'
import UserList from './UserList'

class Users extends Component {
  state = { users: null }

  componentDidMount() {
    db.onceGetUsers().then(snapshot => this.setState({ users: snapshot.val() }))
  }

  render() {
    const { users } = this.state

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        {!!users && <UserList users={users} />}
      </div>
    )
  }
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(Users)

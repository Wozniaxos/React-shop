import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withAuthorization from './withAuthorization'
import { db } from '../firebase'

class HomePage extends Component {
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

const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key => <div key={key}>{users[key].username}</div>)}
  </div>
)

UserList.propTypes = {
  users: PropTypes.objectOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(HomePage)

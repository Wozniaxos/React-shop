import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withAuthorization from './withAuthorization'
import { db } from '../firebase'
import UserList from './UserList'

class Users extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()))
  }

  render() {
    const { users } = this.props

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        {Object.keys(users).length > 0 && <UserList users={users} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.all,
})

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
})

const authCondition = authUser => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
)(Users)

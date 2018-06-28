import React from 'react'
import PropTypes from 'prop-types'

const UserList = ({ users }) => (
  <div className="user-list">
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

export default UserList

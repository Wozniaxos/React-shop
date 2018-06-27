import React from 'react'

import { auth } from '../firebase/firebase'
import { connect } from 'react-redux'
import { authChange } from '../store/session/actions'
import { setCurrentUser } from '../store/users/actions'
import { db } from '../firebase'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onAuthChange, setCurrent } = this.props

      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          db.handleInitialLoadFor('User').then(users => {
            const currentUser = users.val()[authUser.uid]
            setCurrent(currentUser)
            onAuthChange(authUser)
          })
        } else {
          onAuthChange(null)
        }
      })
    }

    render() {
      return <Component />
    }
  }

  const mapDispatchToProps = {
    onAuthChange: authChange,
    setCurrent: setCurrentUser,
  }

  return connect(null, mapDispatchToProps)(WithAuthentication)
}

export default withAuthentication

import React from 'react'

import auth from '../firebase/firebase'
import AuthUserContext from './AuthUserContext'

const withAuthentication = Component =>
  class WithAuthentication extends React.Component {
    state = { authUser: null }

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        this.setState({ authUser: authUser || null })
      })
    }

    render() {
      const { authUser } = this.state

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      )
    }
  }

export default withAuthentication

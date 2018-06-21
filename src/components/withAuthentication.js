import React from 'react'

import { auth } from '../firebase/firebase'
import { connect } from 'react-redux'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onAuthChange } = this.props

      auth.onAuthStateChanged(authUser => {
        onAuthChange(authUser || null)
      })
    }

    render() {
      return <Component />
    }
  }

  const mapDispatchToProps = dispatch => ({
    onAuthChange: authUser => dispatch({ type: 'AUTH_USER_SET', authUser }),
  })

  return connect(null, mapDispatchToProps)(WithAuthentication)
}

export default withAuthentication

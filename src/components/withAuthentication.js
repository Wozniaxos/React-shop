import React from 'react'

import { auth } from '../firebase/firebase'
import { connect } from 'react-redux'
import { authChange } from '../store/session/actions'

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

  const mapDispatchToProps = {
    onAuthChange: authChange,
  }

  return connect(null, mapDispatchToProps)(WithAuthentication)
}

export default withAuthentication

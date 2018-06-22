import React from 'react'
import NavigationAuth from './NavigationAuth'
import NavigationNonAuth from './NavigationNonAuth'
import { connect } from 'react-redux'

const Navigation = ({ authUser }) => (
  <div> {authUser ? <NavigationAuth /> : <NavigationNonAuth />} </div>
)

const mapStateToProps = state => ({
  authUser: state.session.authUser,
})

export default connect(mapStateToProps)(Navigation)

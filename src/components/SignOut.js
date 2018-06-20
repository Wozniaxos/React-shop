import React from 'react'

import { auth } from '../firebase'

const SignOutButton = () => (
  <button onClick={auth.doSignOut} type="button">
    Sign Out
  </button>
)

export default SignOutButton

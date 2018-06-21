import React from 'react'
import { Link } from 'react-router-dom'

import { SIGN_IN, LANDING } from '../constants/routes'

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={LANDING}>Landing</Link>
    </li>
  </ul>
)

export default NavigationNonAuth

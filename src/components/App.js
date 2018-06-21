import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './Navigation'
import LandingPage from './Landing'
import SignUpPage from './SignUp'
import SignInPage from './SignIn'
import PasswordForgetPage from './PasswordForget'
import HomePage from './Home'
import AccountPage from './Account'
import Users from './Users'
import withAuthentication from './withAuthentication'

import * as routes from '../constants/routes'

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route component={() => <LandingPage />} exact path={routes.LANDING} />
      <Route component={() => <SignUpPage />} exact path={routes.SIGN_UP} />
      <Route component={() => <SignInPage />} exact path={routes.SIGN_IN} />
      <Route component={() => <PasswordForgetPage />} exact path={routes.PASSWORD_FORGET} />
      <Route component={() => <HomePage />} exact path={routes.HOME} />
      <Route component={() => <AccountPage />} exact path={routes.ACCOUNT} />
      <Route component={() => <Users />} exact path={routes.USERS} />
    </div>
  </Router>
)

export default withAuthentication(App)

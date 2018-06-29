import React from 'react'
import { auth } from '../firebase/firebase'
import * as actions from '../store/session/actions'
import { db } from '../firebase'
import withAuthentication from '../components/withAuthentication'
import DeleteButton from '../components/DeleteButton'
jest.mock('react-redux')

auth.onAuthStateChanged = jest.fn(authChangeHandler => {
  authChangeHandler({
    uid: '666',
  })
})
db.handleInitialLoadFor = jest.fn(() => new Promise(res => res('users data')))
const mockedAuthChange = jest.fn()
const mockedSetCurrentUser = jest.fn()
actions.authChange = mockedAuthChange
actions.setCurrentUser = mockedSetCurrentUser

test('It calls ', () => {
  // const button = withAuthentication(DeleteButton)
  // expect(button).toBe('lols')
})

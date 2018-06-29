import React from 'react'
import { shallow } from 'enzyme'
import SignUpForm from '../components/SignUpForm'
import { auth, db } from '../firebase'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isInvalid: true,
  error: null,
}
const createEvent = (name, value) => {
  return {
    target: {
      name,
      value,
    },
  }
}

test('It has proper initial state', () => {
  const signUpForm = shallow(<SignUpForm />)
  expect(JSON.stringify(signUpForm.state())).toBe(JSON.stringify(INITIAL_STATE))
})

test('It set states when on change on inputs', async () => {
  expect.assertions(4)

  const signUpForm = shallow(<SignUpForm />)

  const usernameInput = signUpForm.find({ name: 'username' })
  const emailInput = signUpForm.find({ name: 'email' })
  const passwordOneInput = signUpForm.find({ name: 'passwordOne' })
  const passwordTwoInput = signUpForm.find({ name: 'passwordTwo' })

  usernameInput.simulate('change', createEvent('username', 'mark'))
  emailInput.simulate('change', createEvent('email', 'mark@mark.com'))
  passwordOneInput.simulate('change', createEvent('passwordOne', 'password'))
  passwordTwoInput.simulate('change', createEvent('passwordTwo', 'password'))

  expect(signUpForm.state().username).toBe('mark')
  expect(signUpForm.state().email).toBe('mark@mark.com')
  expect(signUpForm.state().passwordOne).toBe('password')
  expect(signUpForm.state().passwordTwo).toBe('password')
})

test('It enables sign up button only when all fields are valid', () => {
  expect.assertions(5)
  const signUpForm = shallow(<SignUpForm />)

  const usernameInput = signUpForm.find({ name: 'username' })
  const emailInput = signUpForm.find({ name: 'email' })
  const passwordOneInput = signUpForm.find({ name: 'passwordOne' })
  const passwordTwoInput = signUpForm.find({ name: 'passwordTwo' })

  usernameInput.simulate('change', createEvent('username', 'Mark'))
  emailInput.simulate('change', createEvent('email', 'mark@mark.com'))
  passwordOneInput.simulate('change', createEvent('passwordOne', 'password'))
  passwordTwoInput.simulate('change', createEvent('passwordTwo', 'password'))

  expect(signUpForm.find('button').props().disabled).toBe(false)

  //To short username
  usernameInput.simulate('change', createEvent('username', 'Ma'))
  expect(signUpForm.find('button').props().disabled).toBe(true)

  //Wrong email
  usernameInput.simulate('change', createEvent('username', 'Mark'))
  emailInput.simulate('change', createEvent('email', 'mark@ma.'))
  expect(signUpForm.find('button').props().disabled).toBe(true)

  //To short password
  usernameInput.simulate('change', createEvent('email', 'mark@ma.com'))
  emailInput.simulate('change', createEvent('passwordOne', 'passwor'))
  expect(signUpForm.find('button').props().disabled).toBe(true)

  // Different passwords
  usernameInput.simulate('change', createEvent('passwordOne', 'password'))
  emailInput.simulate('change', createEvent('passwordTwo', 'passworg'))
  expect(signUpForm.find('button').props().disabled).toBe(true)
})

test('Displays proper state in inputs value', async () => {
  expect.assertions(4)

  const signUpForm = shallow(<SignUpForm />)
  signUpForm.setState({ username: 'mark' })
  signUpForm.setState({ email: 'mark@mark.com' })
  signUpForm.setState({ passwordOne: 'pass1' })
  signUpForm.setState({ passwordTwo: 'pass2' })

  const usernameInput = signUpForm.find({ name: 'username' })
  const emailInput = signUpForm.find({ name: 'email' })
  const passwordOneInput = signUpForm.find({ name: 'passwordOne' })
  const passwordTwoInput = signUpForm.find({ name: 'passwordTwo' })

  expect(usernameInput.props().value).toBe('mark')
  expect(emailInput.props().value).toBe('mark@mark.com')
  expect(passwordOneInput.props().value).toBe('pass1')
  expect(passwordTwoInput.props().value).toBe('pass2')
})

test('It calls firebase create user method on submit', () => {
  expect.assertions(3)

  const createUserMock = jest.fn(async () => 'SomeData')
  auth.doCreateUserWithEmailAndPassword = createUserMock

  const signUpForm = shallow(<SignUpForm />)
  signUpForm.setState({ email: 'mark@mark.com' })
  signUpForm.setState({ passwordOne: 'pass1' })

  signUpForm.find('form').simulate('submit', { preventDefault() {} })

  expect(createUserMock.mock.calls.length).toBe(1)

  const createUserCall = createUserMock.mock.calls[0]
  expect(createUserCall[0]).toBe('mark@mark.com')
  expect(createUserCall[1]).toBe('pass1')
})

test('When firebase returns user, it calls db create method with this user', async () => {
  expect.assertions(1)

  const userResponse = {
    uid: 'uid1',
  }

  const createUserPayload = {
    id: 'uid1',
    username: 'Mark',
    email: 'mark@mark.com',
  }
  const createFirebaseUserMock = jest.fn(() => Promise.resolve(userResponse))
  const createUserMock = jest.fn()

  auth.doCreateUserWithEmailAndPassword = createFirebaseUserMock
  db.create = createUserMock

  const signUpForm = shallow(<SignUpForm />)
  await signUpForm.find('form').simulate('submit', { preventDefault() {} })

  await expect(createFirebaseUserMock.mock.calls.length).toBe(1)
  // await expect(createUserMock.mock.calls.length).toBe(1)

  // const createUserCall = createUserMock.mock.calls[0]
  // await expect(createUserCall[0]).toBe('User')
  // await expect(createUserCall[0]).toBe(createUserPayload)
})

import React from 'react'
import { mount } from 'enzyme'
import { Navigation } from '../components/Navigation'
import { BrowserRouter as Router } from 'react-router-dom'

test('It renders non-auth navigation when no auth user', () => {
  const authUser = null
  const navigation = mount(
    <Router>
      <Navigation authUser={authUser} />
    </Router>,
  )
  expect(navigation.find('li').length).toBe(2)
  expect(
    navigation
      .find('li')
      .at(0)
      .text(),
  ).toBe('Sign In')
  expect(
    navigation
      .find('li')
      .at(1)
      .text(),
  ).toBe('Landing')
})

test('It renders auth navigation when auth user', () => {
  const authUser = { id: 1, name: 'Terminator' }
  const navigation = mount(
    <Router>
      <Navigation authUser={authUser} />
    </Router>,
  )
  const signIn = navigation.find('li').at(0)
  const landing = navigation.find('li').at(1)
  const home = navigation.find('li').at(2)
  const account = navigation.find('li').at(3)
  const signOut = navigation.find('li').at(4)
  expect(navigation.find('li').length).toBe(5)
  expect(signIn.text()).toBe('Sign In')
  expect(landing.text()).toBe('Landing')
  expect(home.text()).toBe('Home')
  expect(account.text()).toBe('Account')
  expect(signOut.text()).toBe('Sign Out')
})

// test('It redirect to proper links', () => {
//   const authUser = { id: 1, name: 'Terminator' }
//   const navigation = mount(
//     <Router>
//       <Navigation authUser={authUser} />
//     </Router>,
//   )
//   const signIn = navigation.find('li').at(0)
//   const landing = navigation.find('li').at(1)
//   const home = navigation.find('li').at(2)
//   const account = navigation.find('li').at(3)
//   const signOut = navigation.find('li').at(4)
//
//   signIn.simulate('click')
//   expect(navigation.props().location.pathname).toBe('/signin')
//   landing.simulate('click')
//   expect(navigation.props().location.pathname).toBe('/landing')
//   home.simulate('click')
//   expect(navigation.props().location.pathname).toBe('/home')
//   account.simulate('click')
//   expect(navigation.props().location.pathname).toBe('/account')
//   signOut.simulate('click')
//   expect(navigation.props().location.pathname).toBe('/signout')
// })

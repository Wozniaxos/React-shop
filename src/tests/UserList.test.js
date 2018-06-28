import React from 'react'
import { shallow } from 'enzyme'
import UserList from '../components/UserList'

const users = {
  1: {
    id: 1,
    username: 'Terminator',
    email: 'terminator@killer.com',
  },
  2: {
    id: 2,
    username: 'SongoKu',
    email: 'songo@ku.com',
  },
  3: {
    id: 2,
    username: 'Justin Bieber',
    email: 'justin@bieber.com',
  },
}

test('It renders properly all users passed to list', () => {
  expect.assertions(4)
  const userList = shallow(<UserList users={users} />)
  const usersElements = userList.find('.user')
  expect(usersElements.length).toBe(3)
  expect(usersElements.at(0).text()).toBe('Terminator')
  expect(usersElements.at(1).text()).toBe('SongoKu')
  expect(usersElements.at(2).text()).toBe('Justin Bieber')
})

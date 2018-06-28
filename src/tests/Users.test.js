import React from 'react'
import { shallow, mount } from 'enzyme'
import { Users } from '../components/Users'
import { db } from '../firebase'

const initialUsers = {}

const usersResponse = {
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
    username: 'SongoKu',
    email: 'songo@ku.com',
  },
}

const response = {
  val: () => {
    return usersResponse
  },
}

test('It calls handler for fetch users from db and call method to set users state with all users from db as payload', async () => {
  expect.assertions(4)
  const handlerInitialLoadMock = jest.fn(async () => response)
  const onSetUsers = jest.fn()

  db.handleInitialLoadFor = handlerInitialLoadMock

  await shallow(<Users onSetUsers={onSetUsers} users={initialUsers} />)

  expect(handlerInitialLoadMock.mock.calls.length).toBe(1)
  expect(onSetUsers.mock.calls.length).toBe(1)

  const handlerInitialLoadCall = handlerInitialLoadMock.mock.calls[0]
  expect(handlerInitialLoadCall[0]).toBe('User')

  const onSetUsersCall = onSetUsers.mock.calls[0]
  expect(JSON.stringify(onSetUsersCall[0])).toBe(JSON.stringify(usersResponse))
})

test('It render users list child when there is at least one user in props', async () => {
  const handlerInitialLoadMock = jest.fn(async () => response)
  const onSetUsers = jest.fn()

  db.handleInitialLoadFor = handlerInitialLoadMock

  const usersComponent = await mount(<Users onSetUsers={onSetUsers} users={usersResponse} />)
  expect(usersComponent.find('.user-list').exists()).toBe(true)
})

test('It doesnt render users list child when there is no user in props', async () => {
  const handlerInitialLoadMock = jest.fn(async () => response)
  const onSetUsers = jest.fn()

  db.handleInitialLoadFor = handlerInitialLoadMock

  const usersComponent = await mount(<Users onSetUsers={onSetUsers} users={initialUsers} />)
  expect(usersComponent.find('.user-list').exists()).toBe(false)
})

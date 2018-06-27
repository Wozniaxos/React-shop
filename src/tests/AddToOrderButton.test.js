import React from 'react'
import { shallow } from 'enzyme'
import AddToOrderButton from '../components/AddToOrderButton'
import { db } from '../firebase'

const item = {
  id: '1',
  name: 'Product',
  price: 9,
}

const currentUser = {
  id: '1',
  username: 'terminator',
  email: 'terminator@killer.com',
}

const orderItems = {}

const amount = 3

test('Call create for order and 2 update methods (on user to add order and on order to ad item) when user doesnt have order yet', () => {
  expect.assertions(6)

  const createOrderPayload = JSON.stringify({
    id: '666',
    user: currentUser,
    items: {},
  })
  const updateOrderPayload = JSON.stringify({
    id: '666',
    items: {
      1: {
        id: '1',
        name: 'Product',
        price: 9,
        amount,
      },
    },
  })
  const currentUserCopy = Object.assign({}, currentUser)
  currentUserCopy['order'] = '666'

  const updateUserPayload = JSON.stringify(currentUserCopy)

  const mockedCreate = jest.fn((entity, payload) => {
    expect(entity).toBe('Order')
    expect(JSON.stringify(payload)).toBe(createOrderPayload)
  })
  const mockedUpdate = jest.fn((entity, payload) => {
    entity === 'User'
      ? expect(JSON.stringify(payload)).toBe(updateUserPayload)
      : expect(JSON.stringify(payload)).toBe(updateOrderPayload)
  })
  const mockedInitializeKey = jest.fn(() => '666')

  db.create = mockedCreate
  db.update = mockedUpdate
  db.initializeKey = mockedInitializeKey

  const addToOrderButton = shallow(
    <AddToOrderButton
      amount={amount}
      currentUser={currentUser}
      item={item}
      orderItems={orderItems}
    />,
  )
  addToOrderButton.find('button').simulate('click', { preventDefault() {} })
  expect(mockedCreate.mock.calls.length).toBe(1)
  expect(mockedUpdate.mock.calls.length).toBe(2)
})

test('Call only one update method on order when user have order already', () => {
  expect.assertions(4)

  currentUser.order = '1'

  const updateOrderPayload = JSON.stringify({
    id: '1',
    items: {
      1: {
        id: '1',
        name: 'Product',
        price: 9,
        amount,
      },
    },
  })

  const mockedCreate = jest.fn()
  const mockedUpdate = jest.fn((entity, payload) => {
    expect(entity).toBe('Order')
    expect(JSON.stringify(payload)).toBe(updateOrderPayload)
  })
  db.create = mockedCreate
  db.update = mockedUpdate
  const addToOrderButton = shallow(
    <AddToOrderButton
      amount={amount}
      currentUser={currentUser}
      item={item}
      orderItems={orderItems}
    />,
  )
  addToOrderButton.find('button').simulate('click', { preventDefault() {} })
  expect(mockedCreate.mock.calls.length).toBe(0)
  expect(mockedUpdate.mock.calls.length).toBe(1)
})

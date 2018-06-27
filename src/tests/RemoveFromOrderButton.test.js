import React from 'react'
import { shallow } from 'enzyme'
import RemoveFromOrderButton from '../components/RemoveFromOrderButton'
import { db } from '../firebase'

const item = {
  id: '1',
}

const currentUser = {
  order: '1',
}

const orderItems = {
  1: {
    name: 'Product',
    price: 10,
  },
}

test('Call update method on order with proper payload with removed particular item', () => {
  expect.assertions(3)

  const removeItemFromOrderPayload = JSON.stringify({
    id: '1',
    items: {
      1: null,
    },
  })

  const mockedUpdate = jest.fn((entity, payload) => {
    expect(entity).toBe('Order')
    expect(JSON.stringify(payload)).toBe(removeItemFromOrderPayload)
  })

  db.update = mockedUpdate

  const removeFromOrderButton = shallow(
    <RemoveFromOrderButton currentUser={currentUser} item={item} orderItems={orderItems} />,
  )
  removeFromOrderButton.find('button').simulate('click', { preventDefault() {} })
  expect(mockedUpdate.mock.calls.length).toBe(1)
})

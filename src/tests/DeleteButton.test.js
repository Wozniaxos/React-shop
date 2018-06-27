import React from 'react'
import { shallow } from 'enzyme'
import DeleteButton from '../components/DeleteButton'
import { db } from '../firebase'

test('Invoke destroy db method and proper callback with proper params passed to component', async () => {
  expect.assertions(4)

  const item = {
    id: '1',
  }

  const afterDeleteParams = 'Mine string param'
  const afterDelete = jest.fn(params => expect(params).toBe(afterDeleteParams))

  const deletePayload = JSON.stringify({
    id: '1',
  })
  const destroyMock = jest.fn((entity, payload) => {
    expect(entity).toBe('User')
    expect(JSON.stringify(payload)).toBe(deletePayload)
    return new Promise(res => res('success'))
  })

  db.destroy = destroyMock

  const deleteButton = shallow(
    <DeleteButton
      afterDelete={afterDelete}
      afterDeleteParams={afterDeleteParams}
      entity={'User'}
      item={item}
    />,
  )
  const button = deleteButton.find('button')
  await button.simulate('click', { preventDefault() {} })

  expect(afterDelete.mock.calls.length).toBe(1)
})

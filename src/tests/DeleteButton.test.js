import React from 'react'
import { shallow } from 'enzyme'
import DeleteButton from '../components/DeleteButton'
import { db } from '../firebase'

test('Invoke destroy db method and proper callback with proper params passed to component', async () => {
  expect.assertions(5)

  const item = {
    id: '1',
  }

  const afterDeleteParams = 'Mine string param'
  const afterDelete = jest.fn()

  const deletePayload = JSON.stringify({
    id: '1',
  })
  const destroyMock = jest.fn(() => new Promise(res => res('success')))

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
  expect(destroyMock.mock.calls.length).toBe(1)

  const deleteCall = destroyMock.mock.calls[0]
  expect(deleteCall[0]).toBe('User')
  expect(JSON.stringify(deleteCall[1])).toBe(deletePayload)

  const afterDeleteCall = afterDelete.mock.calls[0]
  expect(afterDeleteCall[0]).toBe(afterDeleteParams)
})

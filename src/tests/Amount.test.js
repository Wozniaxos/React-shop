import React from 'react'
import { shallow } from 'enzyme'
import Amount from '../components/Amount'

test('Invoke increase, and decrease methods on proper increase and decrease buttons', () => {
  expect.assertions(2)

  const increase = jest.fn()
  const decrease = jest.fn()

  const amount = shallow(<Amount decrease={decrease} increase={increase} />)
  const increaseButton = amount.find('.increase-button')
  const decreaseButton = amount.find('.decrease-button')
  increaseButton.simulate('click')
  increaseButton.simulate('click')
  decreaseButton.simulate('click')
  decreaseButton.simulate('click')
  decreaseButton.simulate('click')

  expect(increase.mock.calls.length).toBe(2)
  expect(decrease.mock.calls.length).toBe(3)
})

test('Display proper amount', () => {
  expect.assertions(1)

  const number = 9
  const amount = shallow(<Amount amount={number} />)

  expect(amount.find('p').text()).toBe('9')
})

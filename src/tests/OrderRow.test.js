import React from 'react'
import { mount } from 'enzyme'
import { OrderRow } from '../components/OrderRow'
import AddToOrderButton from '../components/AddToOrderButton'
import RemoveFromOrderButton from '../components/RemoveFromOrderButton'
import Amount from '../components/Amount'

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

test('It shows product information in proper format depends on row place - in product-list or current-order', () => {
  expect.assertions(2)

  const itemInOrder = Object.assign({}, item)
  itemInOrder.amount = 1

  const rowInCurrentOrder = mount(
    <OrderRow
      ButtonComponent={RemoveFromOrderButton}
      currentUser={currentUser}
      item={itemInOrder}
      orderItems={orderItems}
    />,
  )
  expect(rowInCurrentOrder.find('.row-item-info').text()).toBe('1x Product 9 zł')

  const rowInProductsOrderList = mount(
    <OrderRow
      AmountComponent={Amount}
      ButtonComponent={AddToOrderButton}
      currentUser={currentUser}
      item={item}
      orderItems={orderItems}
    />,
  )
  expect(rowInProductsOrderList.find('.row-item-info').text()).toBe('Product 9 zł')
})

test('It renders different button component passed in props', () => {
  expect.assertions(2)

  const firstOrderRow = mount(
    <OrderRow
      ButtonComponent={AddToOrderButton}
      currentUser={currentUser}
      item={item}
      orderItems={orderItems}
    />,
  )
  expect(firstOrderRow.find('button').text()).toBe(' Add to order ')

  const secondOrderRow = mount(
    <OrderRow
      ButtonComponent={RemoveFromOrderButton}
      currentUser={currentUser}
      item={item}
      orderItems={orderItems}
    />,
  )
  expect(secondOrderRow.find('button').text()).toBe(' Remove from order ')
})

test('It renders with initial amount equal 1, increase and decrease by 1 on increase/decrease button click. Cant decrease lower than 1', () => {
  expect.assertions(5)

  const orderRow = mount(
    <OrderRow
      AmountComponent={Amount}
      ButtonComponent={AddToOrderButton}
      currentUser={currentUser}
      item={item}
      orderItems={orderItems}
    />,
  )
  const amountLabel = orderRow.find('.amount').find('p')
  const increaseButton = orderRow.find('.increase-button')
  const decreaseButton = orderRow.find('.decrease-button')

  expect(amountLabel.text()).toBe('1')

  increaseButton.simulate('click')
  increaseButton.simulate('click')

  expect(amountLabel.text()).toBe('3')

  decreaseButton.simulate('click')
  expect(amountLabel.text()).toBe('2')
  decreaseButton.simulate('click')
  expect(amountLabel.text()).toBe('1')
  decreaseButton.simulate('click')
  expect(amountLabel.text()).toBe('1')
})

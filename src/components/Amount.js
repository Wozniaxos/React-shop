import React, { PureComponent } from 'react'
import CountUpButton from './CountUpButton'
import CountDownButton from './CountDownButton'

export default class Amount extends PureComponent {
  render() {
    const { amount, increase, decrease } = this.props
    return (
      <div className="amount">
        <CountDownButton click={decrease} number={amount} />
        <p>{amount}</p>
        <CountUpButton click={increase} number={amount} />
      </div>
    )
  }
}

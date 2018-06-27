import React, { PureComponent } from 'react'

export default class Amount extends PureComponent {
  render() {
    const { amount, increase, decrease } = this.props
    return (
      <div className="amount">
        <button onClick={decrease}> - </button>
        <p>{amount}</p>
        <button onClick={increase}> + </button>
      </div>
    )
  }
}

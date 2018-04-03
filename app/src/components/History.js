import React, { Component } from 'react'

class History extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="history">
        <span className="iconfont icon-previous"></span>
        <span className="iconfont icon-next"></span>
      </div>
    )
  }
}

export default History

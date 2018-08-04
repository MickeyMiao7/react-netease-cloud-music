import React, { Component } from 'react'

class Comment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <h1> Comment Page {this.props.match.url}</h1>
    )
  }

}

export default Comment
import React, { Component } from 'react'

class Playlist extends Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {

  }


  render() {
    return(
      <ul className="playlist">
        <li>Test</li>
        <li>Test</li>
      </ul>
    )
  }

}

export default Playlist
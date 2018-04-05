import React, { Component } from 'react'

class Player extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="player">
        <div className="player-control">
          <span className="iconfont icon-skipprevious"></span>
          <span className="iconfont icon-play"></span>
          <span className="iconfont icon-skipnext"></span>
        </div>

        <div className="time-bar">

        </div>
        <div className="volume"></div>
      </div>
    )
  }
}

export default Player
import React, { Component } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

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
          <span className="current-time">00:00</span>
          
          <Slider />
          <span className="duration">00:00</span>
        </div>
        <div className="volume"></div>
      </div>
    )
  }
}

export default Player
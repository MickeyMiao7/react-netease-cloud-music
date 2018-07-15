import React, { Component } from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'

import { connect } from 'react-redux'

import ClientService from '../service/ClientService'

const clientService = new ClientService()
const createSliderWithTooltip = Slider.createSliderWithTooltip
const Handle = Slider.Handle

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )
}


class Player extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const src = `http://music.163.com/song/media/outer/url?id=${this.props.selectedTrack}.mp3`
    console.log(`In Player, ID=${src}`)
    
    return (
      <div className="player">
        <div className="player-control">
          <span className="iconfont icon-skipprevious"></span>
          <span className="iconfont icon-play"></span>
          <span className="iconfont icon-skipnext"></span>
        </div>

        <div className="time-bar">
          <span className="current-time">00:00</span>
          
          <Slider class="time" defaultValue={0} handle={handle} />
          <span className="duration">00:00</span>
        </div>

        <div className="volume">
          <span className="iconfont icon-volumemedium"></span>
          <Slider class="vol" defaultValue={0} handle={handle} />
        </div>
        <audio
          src={src}
          autoPlay>
        </audio>

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedTrack: state.selectedTrack
  }
}

export default connect(mapStateToProps)(Player)
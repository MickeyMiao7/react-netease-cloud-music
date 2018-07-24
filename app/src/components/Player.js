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
    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.onVolChange = this.onVolChange.bind(this)
  }

  static defaultValue = {
    isPlaying: false,
  }

  state = {
    volume: 100,
    curTime: 0,
  }

  componentDidMount() {
    this.audio = this.refs['audio']

    this.audio.onended = () => {

      console.log("end")
    }

    this.audio.ontimeupdate = () => {
      const cur = Math.floor(this.audio.currentTime)
      if (cur != this.state.curTime) {
      this.setState({
          curTime: cur
        })
      }
    }
  }

  handlePlayClick() {
    console.log('Click the "play" button')
    if (this.props.isPlaying === false) {
      this.audio.play()
    }
    else 
      this.audio.pause()
    this.props.isPlaying = !this.props.isPlaying
  }

  onVolChange(value) {
    this.audio.volume = value / 100
    this.setState({
      volume: value
    })
  }

  render() {
    const track = this.props.selectedTrack
    console.log(track)
    const src = track.id ? `http://music.163.com/song/media/outer/url?id=${track.id}.mp3` : ''
    console.log(`In audio, src=${src}`)
    
    return (
      <div className="player">
        <div className="player-control">
          <span className="iconfont icon-skipprevious"></span>
          <span ref="play" className="iconfont icon-play" onClick={this.handlePlayClick}></span>
          <span className="iconfont icon-skipnext"></span>
        </div>

        <div className="time-bar">
          <Slider class="time" defaultValue={0} handle={handle} />
          <span className="current-time">00:00</span> / 
          <span className="duration">00:00</span>
        </div>

        <div className="volume">
          <span className="iconfont icon-volumemedium"></span>
          <Slider ref="vol" class="vol" defaultValue={this.state.volume} handle={handle} onChange={this.onVolChange} />
        </div>
        <audio
          ref="audio"
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
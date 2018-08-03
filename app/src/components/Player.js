import React, { Component } from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'

import { connect } from 'react-redux'

import { formatDuration } from '../utils/util'
import { play, pause } from '../actions/PlayerAction'
import { loadTrack, setNextTrack } from '../actions/PlaylistAction'

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
    this.handleNextClick = this.handleNextClick.bind(this)
    this.onVolChange = this.onVolChange.bind(this)
    this.onTimeSliderChange = this.onTimeSliderChange.bind(this)
  }

  static defaultValue = {
    duration: 0
  }

  state = {
    volume: 100,
    curTime: 0,
    curTimePercentage: 0,
  }

  componentDidMount() {
    this.audio = this.refs['audio']

    this.audio.onended = this.nextSong

    this.audio.ontimeupdate = () => {
      const cur = Math.floor(this.audio.currentTime)
      
      if (cur != this.state.curTime) {
        let curTimePercentage = cur * 1000 * 100 / this.props.duration
        this.setState({
          curTime: cur,
          curTimePercentage: curTimePercentage
        })
      }
    }
  }

  handlePlayClick() {
    const { play, pause } = this.props
    if (this.audio && this.audio.readyState === 4){
      if (this.props.isPlaying === false) {
        play()
        this.audio.play()
      }
      else {
        pause()
        this.audio.pause()
      }
    }

    else if (this.audio && this.audio.readyState != 4) {
      console.log(`audio is not ready: current state ${this.audio.readyState}`)
    }
  }

  nextSong = () => { 
    const { nextTrack, loadTrack, playingPlaylist, setNextTrack } = this.props

    loadTrack(nextTrack)

    const tracks = playingPlaylist.tracks
    const index = tracks.indexOf(nextTrack)

    let newNextTrack = tracks[index == tracks.length - 1 ? 0 : index + 1]
    // console.log(`tracks length: ${tracks.length}, playingTrackIndex: ${tracks.indexOf(playingTrack)}, nextTrackIndex: ${index} newNextTrackindex: ${index == tracks.length - 1 ? 0 : index + 1}`)
    setNextTrack(newNextTrack)

  }

  handleNextClick() {
    this.nextSong()
  }

  onVolChange(value) {
    this.audio.volume = value / 100
    this.setState({
      volume: value
    })
  }

  onTimeSliderChange(value) {
    this.audio.currentTime = Math.floor(value * this.props.duration / (100 * 1000))
    this.setState(
      {
        currentTime: this.audio.currentTime,
        curTimePercentage: value
      }
    )
    // console.log(`Current time changed to: ${this.audio.currentTime}`)
  }

  render() {
    const track = this.props.playingTrack, 
          isPlaying = this.props.isPlaying

    // console.log(track)
    const src = track.id ? `http://music.163.com/song/media/outer/url?id=${track.id}.mp3` : ''

    this.props.duration = track.duration || 0
    let _duration = formatDuration(this.props.duration)

    // let curTime = this.state.curTime
    const { curTime, curTimePercentage } = this.state
    let _curTime = formatDuration(curTime * 1000)

    // const currentTime = this.state.
    
    // console.log(`In audio, src=${src}`)
    
    return (
      <div className="player">
        <div className="player-control">
          <span className="iconfont icon-skipprevious"></span>
          <span ref="play" className={"iconfont " + (isPlaying ? "icon-pause" : "icon-play")} onClick={this.handlePlayClick} ></span>
          <span className="iconfont icon-skipnext" onClick={this.handleNextClick}></span>
        </div>

        <div className="time-bar-slider">
          <Slider class="time" step={0.1} min={0} max={100} defaultValue={0} value={curTimePercentage} handle={handle} onChange={this.onTimeSliderChange} tipFormatter={null} />
        </div>

        <div className="time-bar">
          <span className="current-time">{_curTime[0]}:{_curTime[1]}</span> 
          <span className="duration">/{_duration[0]}:{_duration[1]}</span>
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
    isPlaying: state.isPlaying,
    playingTrack: state.playingTrack,
    nextTrack: state.nextTrack,
    playingPlaylist: state.playingPlaylist
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    play: () => {
      dispatch(play())
    },
    pause: () => {
      dispatch(pause())
    },
    loadTrack: (track) => {
      dispatch(loadTrack(track))
    },  
    setNextTrack: (track) => {
      dispatch(setNextTrack(track))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
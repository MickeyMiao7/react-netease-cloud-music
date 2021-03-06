import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadTrack, loadPlaylist, setNextTrack, setPlayingPlaylist } from '../actions/PlaylistAction'
import { play } from '../actions/PlayerAction'

import { msToTime, formatNumber } from '../utils/util'

import { NavLink } from 'react-router-dom'

class TrackList extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(track, playlist) {
    const playingTrack = this.props.playingTrack
    if (track.id != playingTrack.id) {
      const tracks = playlist.tracks
      const index = tracks.indexOf(track)
      this.props.activateSelectedTrack(track)
      this.props.play()
      this.props.setNextTrack(tracks[index == tracks.length - 1 ? 0 : index + 1])
      this.props.setPlayingPlaylist(playlist)
    }
  }

  render() {
    
    const playlist = this.props.lastPlaylist
    // console.log(playlist)
    // console.log(this.props.match)
    const { playingTrack } = this.props
    return (
      <table className="track-list">
        <thead>
          <tr>
            <td className="td-index"></td>
            <td className="td-operation">操作</td>
            <td className="td-title">音乐标题</td>
            <td className="td-artist">歌手</td>
            <td className="td-album">专辑</td>
            <td className="td-duration">时长</td>
          </tr>
        </thead>
        <tbody>
          {
            playlist.tracks.map((track, index) => {
              const trackName = track.alia.length ? track.alia[0] : track.name
              const artist = track.ar.length ? track.ar[0] : { name: '' }
              const album = track.al || { name: '' }
              return (
                <tr key={index} onClick={(event) => {
                  if (event.target.tagName == 'A' ) {
                    return
                  } 
                  this.handleClick(track, playlist)
                }}>
                  <td>
                    {formatNumber(index + 1)}
                  </td>
                  <td className="operation">
                    <span className={"iconfont icon-play-circle " + (playingTrack.id == track.id ? "playing": "")}></span>
                  </td>
                  <td>{trackName}</td>
                  <td className="td-artist"><NavLink to={`/artist/${track.ar[0].id}`}>{artist.name}</NavLink></td>
                  <td className="td-album"><NavLink to={`/album/${album.id}`}>{album.name}</NavLink></td>
                  <td className="td-duration">{msToTime(track.dt)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    playingTrack: state.playingTrack,
    lastPlaylist: state.lastPlaylist
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    activateSelectedTrack: (track) => {
      dispatch(loadTrack(track))
    },

    play: ()=> {
      dispatch(play())
    },

    setNextTrack: (track) => {
      dispatch(setNextTrack(track))
    },

    setPlayingPlaylist: (playlist) => {
      dispatch(setPlayingPlaylist(playlist))
    },

    loadPlaylist: (id) => {
      dispatch(loadPlaylist(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList)
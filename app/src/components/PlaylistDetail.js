import React, { Component } from 'react'
import { connect } from 'react-redux'
import { convertDate, msToTime, formatNumber } from '../utils/util'

import { loadTrack } from '../actions/PlaylistAction'

class PlaylistDetail extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  state = {

  }

  handleClick(id) {
    console.log(id)
    this.props.activateSelectedTrack(id)
  }

  render() {
    const { playlist, activateSelectedTrack } = this.props
    console.log(playlist)
    const createTime = convertDate(playlist.createTime)
    const coverImgUrl = playlist.coverImgUrl || require('../resources/img/placeholder-track.png')
    const avatarUrl = playlist.creator.avatarUrl || ''
    const dispatch = this.props.dispatch
    
    return (
      <div className="playlist-detail">
        <div className="intro">
          <img className="cover" src={coverImgUrl} alt=""/>
          <div className="content">
            <section>
              <div className="title">
                <span className="label-playlist">歌单</span>
                <span className="playlist-title">我喜欢的音乐</span>
              </div>
              <div className="count">
                <div>
                  <p>歌曲数</p>
                  <p>{playlist.trackCount}</p>
                </div>
                <div>
                  <p>播放数</p>
                  <p>{playlist.playCount}</p>
                </div>
              </div>
            </section>
            <section>
              <img className="creator-avatar" src={avatarUrl} alt=""/>
              <span className="creator-nickname">{playlist.creator.nickname}</span>
              <span className="create-time">{createTime}创建</span>
            </section>
         </div>
        </div>
        <div className="table">
          <nav className="track-tab">
            <a href="" className="selected">歌曲列表</a>
            <a href="">评论</a>
          </nav>
          <table className="track-table">
            <thead>
              <tr>
                <td className="index"></td>
                <td className="name">音乐标题</td>
                <td className="artists">歌手</td>
                <td className="album">专辑</td>
                <td className="time">时长</td>
              </tr>
            </thead>
            <tbody>
              {
                playlist.tracks.map((track, index) => {
                  const trackName = track.alias.length ? track.alias[0] : track.name
                  const artist = track.artists.length ? track.artists[0] : {name: ''}
                  const album = track.album || {name: ''}
                  return (
                    <tr key={index} onClick={() => this.handleClick(track.id)}>
                      <td>{formatNumber(index + 1)}</td>
                      <td>{trackName}</td>
                      <td>{artist.name}</td>
                      <td>{album.name}</td>
                      <td>{msToTime(track.duration)}</td>
                    </tr>
                  ) 
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    playlist: state.selectedPlaylist
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    activateSelectedTrack: (id) => {
      dispatch(loadTrack(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetail);

// export default PlaylistDetail
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, NavLink, Route } from 'react-router-dom'

import { convertDate, msToTime, formatNumber } from '../utils/util'

import { loadTrack, loadPlaylist, setNextTrack, setPlayingPlaylist, load } from '../actions/PlaylistAction'
import { play } from '../actions/PlayerAction'

import Comment from './Comment'

class Playlist extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  state = {

  }

  handleClick(track, playlist) {
    const tracks = playlist.tracks
    const index = tracks.indexOf(track)
    this.props.activateSelectedTrack(track)
    this.props.play()
    this.props.setNextTrack(tracks[index == tracks.length - 1 ? 0 : index + 1])
    this.props.setPlayingPlaylist(playlist)
  }

 componentDidMount() {
    // console.log(this.props.match.params.id)
    this.props.loadPlaylist(this.props.match.params.id)
  }

  componentWillUpdate() {
    // console.log(this.props.load(this.props.match.params.id))
    // console.log('Update')
    // this.props.loadPlaylist(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      this.props.loadPlaylist(nextProps.match.params.id)
    }
  }

  componentDidUpdate() {

  }

  shouldComponentUpdate(nextProps) {
    return nextProps.lastPlaylist.id != this.props.lastPlaylist.id
  }

  render() {
    // const id = this.props.match.params.id
    // this.props.loadPlaylist(id)

    // console.log(this.props.lastPlaylist)

    const playlist = this.props.lastPlaylist
    console.log(playlist)
    console.log(this.props.match)
    const { playingTrack } = this.props
    const createTime = convertDate(playlist.createTime)
    const coverImgUrl = playlist.coverImgUrl || require('../resources/img/placeholder-track.png')
    const avatarUrl = playlist.creator.avatarUrl || ''
    
    return (
      <BrowserRouter basename={`${this.props.match.url}`}> 
      <div className="playlist">
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
            <NavLink to={`/comment`} activeClassName="selected">评论</NavLink>
            <a href="" className="selected">歌曲列表</a>
            <a href="">评论</a>
            <a href="">收藏者</a>
          </nav>
          
          {/* <Route path="/comment" component={Comment} /> */}
          
          {/* <table className="track-table">
            <thead>
              <tr>
                <td className="index"></td>
                <td className="operation">操作</td>
                <td className="title">音乐标题</td>
                <td className="artists">歌手</td>
                <td className="album">专辑</td>
                <td className="duration">时长</td>
              </tr>
            </thead>
            <tbody>
              {
                playlist.tracks.map((track, index) => {
                  const trackName = track.alias.length ? track.alias[0] : track.name
                  const artist = track.artists.length ? track.artists[0] : {name: ''}
                  const album = track.album || {name: ''}
                  return (
                    <tr key={index} onClick={() => this.handleClick(track, playlist)}>
                      <td>{playingTrack.id == track.id ? 
                        <span className="iconfont icon-volumemedium"></span> : 
                        formatNumber(index + 1)}
                      </td>
                      <td></td> 
                      <td>{trackName}</td>
                      <td>{artist.name}</td>
                      <td>{album.name}</td>
                      <td className="duration">{msToTime(track.duration)}</td>
                    </tr>
                  ) 
                })
              }
            </tbody>
          </table> */}

        </div>

      </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    playlist: state.selectedPlaylist,
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
    load: load
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);

// export default PlaylistDetail
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import axios from 'axios'

import { msToTime, formatNumber, convertDate } from '../utils/util'
import ActionTypes from '../actions/ActionTypes'

import { loadTrack, loadPlaylist, setNextTrack, setPlayingPlaylist } from '../actions/PlaylistAction'
import { play } from '../actions/PlayerAction'

class AlbumMini extends Component {
  constructor(props) {
    super(props)
    this.state = {
      album: {},
      songs: []
    }
    this.handleSongClick = this.handleSongClick.bind(this)
  }

  handleSongClick(song, songs, album) {
    const playingTrack = this.props.playingTrack
    const playlist = Object.assign({}, {tracks: songs, type: "album"}, album)
    if (song.id != playingTrack.id) {
      const index = songs.indexOf(song)
      this.props.activateSelectedTrack(song)
      this.props.play()
      this.props.setNextTrack(songs[index == songs.length - 1 ? 0 : index + 1])
      this.props.setPlayingPlaylist(playlist)
    }
  }


  async loadAlbum(id) {
    const dispacth = this.props.dispatch
    dispacth({type: ActionTypes.REQUEST_ARTIST_ALBUM})
    const res = await axios.get('/3rdpartyAPI/album', {
      params:
        {
          id: id,
        }
    }).then(response => {
      const data = response.data
      dispacth({ type: ActionTypes.RECEIVE_ARTIST_ALBUM_SUCCESS, data: data})
      return data
    }).catch(error => {
      dispacth({ type: ActionTypes.RECEIVE_ARTIST_ALBUM_FAILURE, data: error })
    })
    return res
  }

  componentDidMount() {
    this.loadAlbum(this.props.id).then(res => {
      this.setState({
        album: res.album,
        songs: res.songs
      })
    })
  }

  render() {
    const { album, songs } = this.state
    const renderedSongs = songs.length > 10 ? songs.slice(0, 10) : songs
    // console.log(renderedSongs)
    const { playingTrack } = this.props
    return (
      <section className="album-mini">
        <section className="left">
          <div className="cover">
            <img className="album-pic" src={album.picUrl} />
            <NavLink to={`/album/${album.id}`} />
          </div>
          <span className="publish-time">{convertDate(album.publishTime)}</span>
        </section>

        <section className="right">
          <p className="album-name">{album.name}</p>
          <table className="album-list">
            {renderedSongs.map((song, index) => 
              <tr onClick={() => this.handleSongClick(song, songs, album)}>
                <td className="index">{formatNumber(index + 1)}</td>
                <td className="operation">
                  <span className={"iconfont icon-play-circle " + (playingTrack.id == song.id ? "playing" : "")}></span>
                </td>
                <td className="name">{song.name}</td>
                <td className="duration">{msToTime(song.dt)}</td>
              </tr>
            )}
          </table>
          {songs.length > 10 &&
            <NavLink to={`/album?id=${album.id}`}>查看全部{songs.length}首 > </NavLink>
          }
            
        </section>

      </section>

    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
    playingTrack: state.playingTrack,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch: dispatch,

    activateSelectedTrack: (track) => {
      dispatch(loadTrack(track))
    },

    play: () => {
      dispatch(play())
    },

    setNextTrack: (track) => {
      dispatch(setNextTrack(track))
    },

    setPlayingPlaylist: (playlist) => {
      dispatch(setPlayingPlaylist(playlist))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumMini)
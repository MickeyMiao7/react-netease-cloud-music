import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, NavLink, Route } from 'react-router-dom'

import axios from 'axios'

import { convertDate } from '../utils/util'

import ActionTypes from '../actions/ActionTypes'

import AlbumTrackList from './AlbumTrackList'
import AlbumDetail from './AlbumDetail'
import Comment from './Comment'

class Album extends Component {
  constructor (props) {
    super(props)
    this.state = {
      album: {
        artist: {
          name: '',
          id: 0
        }
      },
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
    this.loadAlbum(this.props.match.params.id).then(res => {
      this.setState({
        album: res.album,
        songs: res.songs
      })
    })
  }

  render() {
    const { album, songs } = this.state
    const renderedSongs = songs.length > 10 ? songs.slice(0, 10) : songs
    const { playingTrack } = this.props
    // console.log(album)
    
    return (      
      <div className="album">
        <div className="intro">
          <div className="cover">
            <img className="album-pic" src={album.picUrl} />
          </div>
          <div className="content">
            <div className="title">
              <span className="label-theme-color">专辑</span>
              <span className="album-name">{album.name}</span>
            </div>
            <div className="others">
              <section>歌手: <NavLink to={`/artist/${album.artist.id}`}>{album.artist.name}</NavLink></section>
              <section>发行时间: <span className="publish-time">{convertDate(album.publishTime)}</span></section>
            </div>
          </div>
        </div>
        
        <nav className="tab">
          <NavLink to={`${this.props.match.url}/track-list`} activeClassName="selected">歌曲列表</NavLink>
          <NavLink to={`${this.props.match.url}/comment`} activeClassName="selected">评论</NavLink>
          <NavLink to={`${this.props.match.url}/detail`} activeClassName="selected">专辑详情</NavLink>
        </nav>

        <Switch>
          <Route path={`${this.props.match.path}/track-list`} exact render={ props => <AlbumTrackList {...props} tracks={songs} album={album}/>} />
          <Route path={`${this.props.match.path}/comment`}  exact render={props => <Comment {...props} type="album"/>} />
          <Route path={`${this.props.match.path}/detail`}  exact render={props => <AlbumDetail {...props} description={album.description}/>} />
          <Redirect path={this.props.match.path} to={{
            pathname: `${this.props.match.path}/track-list`
          }}/>
        </Switch>
      </div>
           
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
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);

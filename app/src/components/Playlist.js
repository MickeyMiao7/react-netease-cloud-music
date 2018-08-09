import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, NavLink, Route } from 'react-router-dom'

import { convertDate } from '../utils/util'

import { loadPlaylist } from '../actions/PlaylistAction'

import Comment from './Comment'
import Subscriber from './Subscriber'
import TrackList from './TrackList'

class Playlist extends Component {
  constructor (props) {
    super(props)
  }

 componentDidMount() {
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

  // shouldComponentUpdate(nextProps) {
  //     return nextProps.lastPlaylist.id != this.props.lastPlaylist.id
  // }


   render() {
    // const id = this.props.match.params.id
    // this.props.loadPlaylist(id)

    // console.log(this.props.lastPlaylist)

    const playlist = this.props.lastPlaylist
    const subscribers = playlist.subscribers || []
    // console.log(playlist)

    const commentCount = playlist.commentCount || 0
    const createTime = convertDate(playlist.createTime)
    const coverImgUrl = playlist.coverImgUrl || require('../resources/img/placeholder-track.png')
    const avatarUrl = playlist.creator.avatarUrl || ''

    
    return (
      <div className="playlist">
        <div className="intro">
          <img className="cover" src={coverImgUrl} alt=""/>
          <div className="content">
            <section>
              <div className="title">
                <span className="label-playlist">歌单</span>
                <span className="playlist-title">{playlist.name}</span>
              </div>
              <div className="count">
                <div>
                  <p>歌曲数</p>
                  <p className="bold">{playlist.trackCount}</p>
                </div>
                <div>
                  <p>播放数</p>
                  <p className="bold">{playlist.playCount}</p>
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
        <nav className="track-tab">
          <NavLink to={`${this.props.match.url}/track-list`} activeClassName="selected">歌曲列表</NavLink>
          <NavLink to={`${this.props.match.url}/comment`} activeClassName="selected">评论({commentCount})</NavLink>
          <NavLink to={`${this.props.match.url}/subscriber`} activeClassName="selected">收藏者</NavLink>
  
        </nav>

        <Switch>
          <Route path={`${this.props.match.path}/track-list`} component={TrackList} />
          <Route path={`${this.props.match.path}/comment`} render={(props) => <Comment {...props} type="playlist" />} />
          <Route path={`${this.props.match.path}/subscriber`} render={(props) => <Subscriber {...props} subscribers={subscribers} />} />
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
    loadPlaylist: (id) => {
      dispatch(loadPlaylist(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);

// export default PlaylistDetail
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'

import MiniTrack from './MiniTrack'

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      selectedId: 0
    }
  }


  handleClick(id) {
    if (id !== this.state.selectedId) {
      this.setState({
        selectedId: id,
      })
      // this.props.onPlaylistClick(id);
    }
  }


  render() {
    const { userPlaylist, playingTrack, userId } = this.props
    const createdPlaylist = userPlaylist.filter(playlist => playlist.userId === userId)
    const subscribedPlaylist = userPlaylist.filter(playlist => playlist.userId != userId)
    

    return(
      <div className="aside-container">
      <nav>
      <ul className="side-bar">
        <li><p className="side-bar-header">推荐</p>
          <ul>
            <li>
              <NavLink to="/recommendation" activeClassName="selected">
                <span className="iconfont icon-musicbyinle"></span>发现音乐
              </NavLink>
            </li>
            {/* <li><NavLink to="/fm">私人FM</NavLink></li> */}
          </ul>
        </li>
        {/* <li><p className="side-bar-header">我的音乐</p></li> */}
        <li><p className="side-bar-header">创建的歌单</p>
          <ul>
            {
              createdPlaylist.map((playlist) => {
                 let { name, id } = playlist
                 return (
                   <li onClick={() => {this.handleClick(id)}} key={id} >
                     <NavLink to={`/playlist/${id}`} activeClassName="selected">
                       <span className="iconfont icon-musicmenu"></span>{name}
                     </NavLink>
                   </li>
                 )
              })
            }
          </ul>
        </li>
        <li><p className="side-bar-header">收藏的歌单</p>
          <ul>
            {
              subscribedPlaylist.map((playlist) => {
                 let { name, id } = playlist
                 return (
                   <li onClick={() => {this.handleClick(id)}} key={id} >
                     <NavLink to={`/playlist/${id}`} activeClassName="selected">
                       <span className="iconfont icon-musicmenu"></span>{name}
                     </NavLink>
                   </li>
                 )
              })
            }
            {/* <li><span className="iconfont icon-like"></span>我喜欢的音乐</li> */}
          </ul>
        </li>
      </ul>
      </nav>
      
      {
        playingTrack.id > 0 &&
        <MiniTrack track={playingTrack} />
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.userId,
    playingTrack: state.playingTrack
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Navigation)
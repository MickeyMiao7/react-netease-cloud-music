import React, { Component } from 'react'

import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import axios from 'axios'

import ActionTypes from '../actions/ActionTypes'
import { convertPlayCount } from '../utils/util'


class Recommentation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hotPlaylists: []
    }
  }

  async loadHotPlaylist(limit=28) {
    const dispacth = this.props.dispatch
    dispacth({type: ActionTypes.REQUEST_HOT_PLAYLIST})
    const res = await axios.get('/3rdpartyAPI/top/playlist/highquality', {
      params:
        {
          limit: limit,
        }
    }).then(response => {
      const data = response.data
      dispacth({ type: ActionTypes.RECEIVE_HOT_PLAYLIST_SUCCESS, data: data.playlists})
      return data.playlists
    }).catch(error => {
      dispacth({ type: ActionTypes.RECEIVE_HOT_PLAYLIST_FAILURE, data: error })
    })
    return res
  }

  componentDidMount() {
    this.loadHotPlaylist().then(res => {
      this.setState({
        hotPlaylists: res
      })
    })
  }

  render() {
    const { hotPlaylists } = this.state
    console.log(this.state.hotPlaylists)
    return (
      <div className="recommendation">
        <div className="hot-playlists">
          <h2><span>热门精选</span></h2>
          <div className="playlists-container">
          {
            hotPlaylists.map(playlist => {
              return (
                <section className="hot-playlist">
                  <img src={playlist.coverImgUrl} />
                  <NavLink className="img-a" to={`/playlist/${playlist.id}`}></NavLink>
                  <NavLink to={`/playlist/${playlist.id}`}>
                    <section className="description">{playlist.name}</section>
                  </NavLink>
                    <span className="play-count"><span className="iconfont icon-headseterji"></span>{convertPlayCount(playlist.playCount)}</span>
                </section>
              )
          })
          }
          </div>
        </div>
      </div>


      // <div class="carousel-container">
      //   {/* <div class="left"> */}
      //   {/* </div> */}
      //   <CSSTransition in={this.state.render} timeout={500} classNames="middle" >
      //     <div class="middle">
      //     </div>
      //   </CSSTransition >
      //   {/* <div class="left"> */}
      //   {/* </div> */}
      // </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommentation);


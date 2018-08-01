import React, { Component } from 'react'
import { connect } from 'react-redux'
import History from '../components/History'
import SearchBar from '../components/SearchBar'
import ToolBar from '../components/Toolbar'
import Player from '../components/Player'
import Playlist from '../components/Playlist'
import PlaylistDetail from '../components/PlaylistDetail'

import { login } from '../actions/UserAction'
import { loadUserPlaylist, loadSelectedPlaylist } from '../actions/PlaylistAction'

import ActionTypes from '../actions/ActionTypes'

class App extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
  }

  componentDidMount() {
    let userId = 47458264
    // let userId = 78843035
    const dispatch = this.props.dispatch
    new Promise((resolve, reject)=> {
      dispatch(login(userId))
      resolve()
    })
    .then(()=> {
      dispatch(loadUserPlaylist(userId))
    })
    // dispatch(loadUserPlaylist(this.props.userId))
    // this.props.dispatch(
     //  dispatch({ type: 'REQUEST_USER_LOGIN' })
     //  setTimeout(() => {
     //    dispatch(login(userId))
     //    dispatch({ type: 'RECEIVE_USER_LOGIN' })
     //  }, 3000)
     // })
  }

  render() {
    const { dispatch, userId, userPlaylist, selectedPlaylist, selectedTrack, ...others } = this.props
    return(
      <div id="netease-music">
        <header>
          <div className="logo">
          </div>
          <h1 className="titlefont">网易云音乐</h1>
          <History/>
          <SearchBar/>
          <ToolBar/>
        </header>
        <main>
          <aside>
            <Playlist 
              userPlaylist={userPlaylist}
              onPlaylistClick={id => {dispatch(loadSelectedPlaylist(id))}}
            />
          </aside>
          <PlaylistDetail />
        </main>
        <footer>
          <Player />
        </footer>
      </div>
    )
  }

}

function mapStateToProps(state) {
  // console.log('connect state', state)

  return {
    userId: state.userId,
    userPlaylist: state.userPlaylist,
    selectedPlaylist: state.selectedPlaylist,
    playingPlaylist: state.playingPlaylist,
    playingTrack: state.playingTrack,
    nextTrack: state.nextTrack,
    isPlaying: state.isPlaying,
    error: state.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // login: userId => dispatch(login(userId))
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default connect(mapStateToProps)(App)
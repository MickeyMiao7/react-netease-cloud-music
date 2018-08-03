import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Recommendation from '../components/Recommendation'
import History from '../components/History'
import SearchBar from '../components/SearchBar'
import ToolBar from '../components/Toolbar'
import Player from '../components/Player'
import Navigation from '../components/Navigation'
import Playlist from '../components/Playlist'

import { login } from '../actions/UserAction'
import { loadUserPlaylist, loadSelectedPlaylist } from '../actions/PlaylistAction'


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
      <BrowserRouter basename="/">
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
            <Navigation 
              userPlaylist={userPlaylist}
              // onPlaylistClick={id => {dispatch(loadSelectedPlaylist(id))}}
            />
          </aside>
          <Route path="/playlist/:id" component={ Playlist } />
          <Route path="/recommendation" component={ Recommendation } />
          {/* <Recommendation /> */}
          
        </main>
        <footer>
          <Player />
        </footer>
      </div>
      </BrowserRouter >
    )
  }

}

function mapStateToProps(state) {

  return {
    userId: state.userId,
    userPlaylist: state.userPlaylist,
    playingPlaylist: state.playingPlaylist,
    playingTrack: state.playingTrack,
    nextTrack: state.nextTrack,
    isPlaying: state.isPlaying,
    error: state.error,
    lastPlaylist: state.lastPlaylist
  }
}


// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default connect(mapStateToProps)(App)
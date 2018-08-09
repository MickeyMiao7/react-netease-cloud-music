import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Recommendation from '../components/Recommendation'
import Artist from '../components/Artist'
// import History from '../components/History'
// import SearchBar from '../components/SearchBar'
import Player from '../components/Player'
import Navigation from '../components/Navigation'
import Playlist from '../components/Playlist'

import { login } from '../actions/UserAction'
import { loadUserPlaylist, loadSelectedPlaylist } from '../actions/PlaylistAction'
import Album from '../components/Album';


class App extends Component {
  constructor(props) {
    super(props)
    // console.log(this.props)
  }
  
  async userLogin(id) {
    const { dispatch } = this.props
    await dispatch(login(id))
    await dispatch(loadUserPlaylist(id))
  }

  componentDidMount() {
    let userId = 47458264
    // let userId = 78843035

    this.userLogin(userId)
    // const dispatch = this.props.dispatch
    // new Promise((resolve, reject)=> {
    //   dispatch(login(userId))
    //   resolve()
    // })
    // .then(()=> {
    //   dispatch(loadUserPlaylist(userId))
    // })

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
          <div className="title">
          </div>
          {/* <h1 className="titlefont">网易云音乐</h1> */}
          {/* <History/>
          <SearchBar/> */}
          {/* <ToolBar/> */}
        </header>
        <main>
          <aside>
            <Navigation 
              userPlaylist={userPlaylist}
              // onPlaylistClick={id => {dispatch(loadSelectedPlaylist(id))}}
            />
          </aside>
          <section className="main-page">
          <Switch>
              <Route path="/" exact component={Recommendation} />
              <Route path="/playlist/:id" component={Playlist} />
              <Route path="/recommendation" component={Recommendation} />
              <Route path="/artist/:id" component={Artist} />
              <Route path="/album/:id" component={Album} />
              <Redirect path="/" to={{
                pathname: '/recommendation'
              }
              } />
          </Switch>
          </section>
          
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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, NavLink, Route } from 'react-router-dom'

import ActionTypes from '../actions/ActionTypes'
import axios from 'axios'

import ArtistDetail from '../components/ArtistDetail'
import ArtistAlbum from '../components/ArtistAlbum'

// 相似歌手接口暂不可用
// import ArtistSimilar from '../components/ArtistSimilar'


class Artist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      artist: {
        name: '',
        alias: [],
        picUrl: '',
        img1v1Url: '',
        musicSize: 0,
        albumSize: 0,
        mvSize: 0,

      }
    }
  }

 async loadArtist(id) {
    const dispatch = this.props.dispatch
    dispatch({type: ActionTypes.REQUEST_ARTIST})
    const result = await axios.get('/3rdpartyAPI/artists', {
      params: {
        id: id
      }
    }).then(response => {
      const artist = response.data.artist
      dispatch({type: ActionTypes.RECEIVE_ARTIST_SUCCESS, data: artist})
      return artist
    }).catch(error => {
      dispatch({type: ActionTypes.RECEIVE_ARTIST_FAILURE, data: error})
    })
    return result
  }

  componentDidMount() {
    this.loadArtist(this.props.match.params.id).then(data => {
      this.setState({
        artist: data
      })
    })
  }


  render() {
    const { musicSize, albumSize, name, picUrl, alias, img1v1Url, mvSize } = this.state.artist
    const imgUrl = img1v1Url || require('../resources/img/placeholder-track.png')
    return (
      // <h1>{this.props.match.params.id}</h1>
      <div className="artist">
        <div className="intro">
          <img className="cover" src={imgUrl} />
          <div className="content">
            <div className="title">
              <span className="label-theme-color">歌手</span>
              <span className="artist-name">{name}</span>
              <p className="alias">{alias.join('; ')}</p>
            </div>
            <div className="count">
              {musicSize > 0  && <p>单曲数: <span className="span-count">{musicSize}</span></p>}
              {albumSize > 0 && <p>专辑数: <span className="span-count">{albumSize}</span></p>}
              {mvSize > 0 && <p>MV数: <span className="span-count">{mvSize}</span></p>}
            </div>
          </div>
        </div>
        
        <nav className="tab">
          <NavLink to={`${this.props.match.url}/album`} activeClassName="selected">专辑</NavLink>
          {/* <NavLink to={`${this.props.match.url}/comment`} activeClassName="selected">MV</NavLink> */}
          <NavLink to={`${this.props.match.url}/detail`} activeClassName="selected">歌手详情</NavLink>
          {/* <NavLink to={`${this.props.match.url}/similar`} activeClassName="selected">相似歌手</NavLink> */}
        </nav>

        <Switch>
          <Route path={`${this.props.match.path}/album`} exact component={ArtistAlbum} />
          <Route path={`${this.props.match.path}/detail`}  exact render={props => <ArtistDetail {...props} name={name}/>} />
          <Redirect path={this.props.match.path} to={{
            pathname: `${this.props.match.path}/album`
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

export default connect(mapStateToProps, mapDispatchToProps)(Artist);

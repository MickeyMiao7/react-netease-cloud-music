import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

import ActionTypes from '../actions/ActionTypes'
import AlbumMini from './AlbumMini'

class AritistAlbum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hotAlbums: []
    }
  }


  async loadArtistAlbum(id, limit=10) {
    const dispacth = this.props.dispatch
    dispacth({type: ActionTypes.REQUEST_ARTIST_ALBUM})
    const res = await axios.get('/3rdpartyAPI/artist/album', {
      params:
        {
          id: id,
          limit: limit
        }
    }).then(response => {
      const data = response.data
      // console.log(data)
      dispacth({ type: ActionTypes.RECEIVE_ARTIST_ALBUM_SUCCESS, data: data})
      return data
    }).catch(error => {
      dispacth({ type: ActionTypes.RECEIVE_ARTIST_ALBUM_FAILURE, data: error })
    })
    return res
  }

  componentDidMount() {
    this.loadArtistAlbum(this.props.match.params.id).then(res => {
      this.setState({
        hotAlbums: res.hotAlbums
      })
    })
  }

  render() {
    const { hotAlbums } = this.state
    console.log(hotAlbums)
    return (
      <div className="artist-album">
        { 
          hotAlbums.map(album => 
            <AlbumMini id={album.id} />
          )
        }
      </div>

    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AritistAlbum)
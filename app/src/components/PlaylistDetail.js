import React, { Component } from 'react'

class PlaylistDetail extends Component {
  constructor (props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);

  }
  render() {
    return (
      <div className="playlist-detail">
        <div className="intro">
          <img className="cover" src="" alt=""/>
          <div className="content">
            <span className="label-playlist">Playlist</span>
            <span className="title">English</span>
            <span className="icon"></span>
            <span className=""></span>
            <span className="title">English</span>
          </div>
        </div>
        <div className="table">

        </div>

      </div>
    )
  }
}

export default PlaylistDetail
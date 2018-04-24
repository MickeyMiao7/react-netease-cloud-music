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
            <section>
              <span className="label-playlist">Playlist</span>
              <span className="title">English</span>
              <span className="icon"></span>
              <span className=""></span>
              <span className="icon"></span>
            </section>
            <section>
              <img className="creator-avatar" src="" alt=""/>
              <span className="creator-nickname">Mickey</span>
              <span className="create-time">2018-04-24 Created</span>
            </section>
            <section>
              Tag:
            </section>
            <section>
              Description:
            </section>
         </div>
        </div>
        <div className="table">

        </div>

      </div>
    )
  }
}

export default PlaylistDetail
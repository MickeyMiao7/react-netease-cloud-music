import React, { Component } from 'react'

class PlaylistDetail extends Component {
  constructor (props) {
    super(props)
    // this.handleClick = this.handleClick.bind(this);

  }
  render() {
    return (
      <div className="playlist-detail">
        <div className="intro">
          <img className="cover" src="" alt=""/>
          <div className="content">
            <section>
              <div className="title">
                <span className="label-playlist">歌单</span>
                <span className="playlist-title">我喜欢的音乐</span>
              </div>
              <div className="count">
                <div>
                  <p>歌曲数</p>
                  <p>0</p>
                </div>
                <div>
                  <p>播放数</p>
                  <p>0</p>
                </div>
              </div>
            </section>
            <section>
              <img className="creator-avatar" src="" alt=""/>
              <span className="creator-nickname">Mickey</span>
              <span className="create-time">2018-04-24创建</span>
            </section>
         </div>
        </div>
        <div className="table">
          <nav>
            <a href=""> Info</a>
          </nav>
        </div>

      </div>
    )
  }
}

export default PlaylistDetail
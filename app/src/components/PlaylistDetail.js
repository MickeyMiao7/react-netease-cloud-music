import React, { Component } from 'react'

class PlaylistDetail extends Component {
  constructor (props) {
    super(props)
    this.props.playlist = {
    }
    // this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const playlist = this.props.playlist
    
    return (
      <div className="playlist-detail">
        <div className="intro">
          <img className="cover" src={require('../resources/img/placeholder-track.png')} alt=""/>
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
          <nav className="track-tab">
            <a href="">歌曲列表</a>
            <a href="">评论</a>
            <a href="">收藏者</a>
          </nav>
          <table className="track-table">
            <thead>
              <tr>
                <td className="name">音乐标题</td>
                <td className="artists">歌手</td>
                <td className="album">专辑</td>
                <td className="time">时长</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    )
  }
}

export default PlaylistDetail